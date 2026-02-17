import { Component, computed, effect, inject } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { TranslateKeys } from "../../../services/i18nHelper";
import { DataModelService } from "../../../services/dataModel.service";

@Component({
  selector: "app-endround",
  imports: [TranslatePipe],
  templateUrl: "./endround-banner.component.html",
  styleUrl: "./endround-banner.component.css",
})
export class EndroundBannerComponent {
  dataModel = inject(DataModelService);

  runAnimation = false;
  hide = true;
  animateOut = false;
  preload = true;

  lastInRoundNumber = -1;
  lastOutRoundNumber = -1;

  TranslateKeys = TranslateKeys;

  roundWonType = computed(() => {
    const wonTeam = this.dataModel.match().teams[this.teamWon()];

    let ace = false;
    let clutch = false;
    let flawless = true;
    let teamAce = true;
    // Todo: implement Thrifty round ceremonies when data gets available by Overwolf
    const thrifty = false;

    for (const player of wonTeam.players) {
      if (new Set(player.killedPlayerNames).size >= 5) {
        ace = true;
        break;
      }
      if (player.isAlive && !clutch) clutch = true;
      else if (player.isAlive && clutch) {
        clutch = false;
      }
      if (player.deathsThisRound >= 1) flawless = false;
      if (!(player.killsThisRound >= 1)) teamAce = false;
    }

    if (ace) return TranslateKeys.Endround_RoundAce;
    else if (clutch) return TranslateKeys.Endround_RoundClutch;
    else if (teamAce) return TranslateKeys.Endround_RoundTeamAce;
    else if (flawless) return TranslateKeys.Endround_RoundFlawless;
    else if (thrifty) return TranslateKeys.Endround_RoundThrifty;
    else return TranslateKeys.Endround_RoundWin;
  });

  tournamentBackgroundUrl = computed(() => {
    const backdrop = this.dataModel.tournamentInfo().backdropUrl;
    if (backdrop && backdrop !== "") return backdrop;
    else return false;
  });

  tournamentIconUrl = computed(() => {
    const logo = this.dataModel.tournamentInfo().logoUrl;
    if (logo && logo !== "") return logo;
    else return "assets/misc/logo.webp";
  });

  teamWon = computed(() => {
    if (this.dataModel.match().attackersWon) {
      return this.dataModel.teams()[0].isAttacking ? 0 : 1;
    } else {
      return this.dataModel.teams()[0].isAttacking ? 1 : 0;
    }
  });

  leftWon = computed(() => {
    return this.teamWon() === 0;
  });

  readonly waitingBackgroundClass = computed(() => {
    const test = `gradient-head-to-head-${this.dataModel.teams()[0].isAttacking ? "attacker" : "defender"}`;
    return test;
  });

  readonly winningTeamBackgroundClass = computed(() => {
    return `gradient-${this.leftWon() ? "left" : "right"}-${this.dataModel.match().attackersWon ? "attacker" : "defender"}`;
  });

  ref = effect(() => {
    const roundPhase = this.dataModel.match().roundPhase;
    const roundNumber = this.dataModel.match().roundNumber;
    if (roundPhase === "end") {
      if (roundNumber === this.lastInRoundNumber) return;
      this.lastInRoundNumber = roundNumber;

      this.runAnimation = true;
      this.hide = false;
      this.animateOut = false;
      setTimeout(() => {
        this.runAnimation = false;
      }, 2600);
    } else if (roundPhase === "shopping") {
      if (roundNumber === this.lastOutRoundNumber) return;
      this.lastOutRoundNumber = roundNumber;

      this.runAnimation = false;
      this.animateOut = true;
      setTimeout(() => {
        this.hide = true;
        this.animateOut = false;
      }, 300);
    }
  });
}
