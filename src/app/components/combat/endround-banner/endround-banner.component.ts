import { Component, computed, effect, inject, Signal, signal, WritableSignal } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { TranslateKeys } from "../../../services/i18nHelper";
import { DataModelService } from "../../../services/dataModel.service";
import { IRoundWinBox, IRoundWinBoxSponsors } from "../../../services/Types";

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

  roundWonType: WritableSignal<TranslateKeys> = signal(TranslateKeys.Endround_RoundWin);

  clutch: number[] = [-1, -1];

  roundWinBox: Signal<IRoundWinBox> = computed(() => this.dataModel.roundWinBox());
  roundWonSponsor: Signal<IRoundWinBoxSponsors> = computed(() => this.calculateSponsor());

  private calculateClutch(): void {
    const teamOne = this.dataModel.match().teams[0];
    const teamTwo = this.dataModel.match().teams[1];

    const aliveCountTeamOne = teamOne.players.filter((player) => player.isAlive).length;
    const aliveCountTeamTwo = teamTwo.players.filter((player) => player.isAlive).length;

    if (aliveCountTeamOne < 1 || aliveCountTeamOne >= 2) this.clutch[0] = 0;
    if (aliveCountTeamTwo < 1 || aliveCountTeamTwo >= 2) this.clutch[1] = 0;

    if ((aliveCountTeamOne == 1 && aliveCountTeamTwo >= 2) || this.clutch[0] == 1)
      this.clutch[0] = 1;
    if ((aliveCountTeamTwo == 1 && aliveCountTeamOne >= 2) || this.clutch[1] == 1)
      this.clutch[1] = 1;
  }

  private calculateRoundWonType(): TranslateKeys {
    const wonTeam = this.dataModel.match().teams[this.teamWon()];
    const lostTeam = this.dataModel.match().teams[this.teamWon() === 0 ? 1 : 0];

    let ace = false;
    let flawless = true;
    let teamAce = true;
    // Todo: implement Thrifty round ceremonies when data gets available by Overwolf
    const thrifty = false;

    const lostTeamPlayerNames = new Set(lostTeam.players.map((player) => player.name));

    lostTeam.players.forEach((player) => {
      if (player.isAlive) flawless = false;
    });
    for (const player of wonTeam.players) {
      if (player.killedPlayerNames) {
        const killsFromLostTeam = player.killedPlayerNames.filter((playerName) =>
          lostTeamPlayerNames.has(playerName),
        );

        if (new Set(killsFromLostTeam).size >= 5) {
          ace = true;
          break;
        }
      }
      if (player.deathsThisRound >= 1) flawless = false;
      if (!(player.killsThisRound >= 1)) teamAce = false;
    }

    if (ace) return TranslateKeys.Endround_RoundAce;
    if (this.clutch[this.teamWon()]) return TranslateKeys.Endround_RoundClutch;
    if (teamAce) return TranslateKeys.Endround_RoundTeamAce;
    if (flawless) return TranslateKeys.Endround_RoundFlawless;
    if (thrifty) return TranslateKeys.Endround_RoundThrifty;
    return TranslateKeys.Endround_RoundWin;
  }

  private calculateSponsor(): IRoundWinBoxSponsors {
    const teamwon = this.teamWon();
    const roundWonType = this.roundWonType();

    const initialSponsor: IRoundWinBoxSponsors = {
      wonTeam: "all",
      roundCeremonie: ["all"],
      iconUrl: "",
      backdropUrl: "",
    };

    if (this.roundWinBox().sponsors.length == 0) return initialSponsor;

    let sponsor: IRoundWinBoxSponsors = this.roundWinBox().sponsors[0];

    this.roundWinBox().sponsors.forEach((spons) => {
      if (
        spons.wonTeam == "all" ||
        (spons.wonTeam == "left" && teamwon == 0) ||
        (spons.wonTeam == "right" && teamwon == 1)
      ) {
        if (
          spons.roundCeremonie.includes("all") ||
          (spons.roundCeremonie.includes("normal") && roundWonType == TranslateKeys.Endround_RoundWin) ||
          (spons.roundCeremonie.includes("ace") && roundWonType == TranslateKeys.Endround_RoundAce) ||
          (spons.roundCeremonie.includes("clutch") && roundWonType == TranslateKeys.Endround_RoundClutch) ||
          (spons.roundCeremonie.includes("teamAce") && roundWonType == TranslateKeys.Endround_RoundTeamAce) ||
          (spons.roundCeremonie.includes("flawless") && roundWonType == TranslateKeys.Endround_RoundFlawless) ||
          (spons.roundCeremonie.includes("thrifty") && roundWonType == TranslateKeys.Endround_RoundThrifty)
        ) {
          sponsor = spons;
        }
      }
    });
    return sponsor;
  }

  bannerBackgroundUrl = computed(() => {
    const backdropSponsor = this.roundWonSponsor().backdropUrl;
    const backdropTournament = this.dataModel.tournamentInfo().backdropUrl;
    if (this.roundWinBox().type == "sponsors" && backdropSponsor && backdropSponsor !== "")
      return backdropSponsor;
    if (
      this.roundWinBox().type == "tournamentInfo" &&
      backdropTournament &&
      backdropTournament !== ""
    )
      return backdropTournament;
    else return false;
  });

  bannerTopIconUrl = computed(() => {
    const logoSponsor = this.roundWonSponsor().iconUrl;
    const logoTournament = this.dataModel.tournamentInfo().logoUrl;
    if (this.roundWinBox().type == "sponsors" && logoSponsor && logoSponsor !== "")
      return logoSponsor;
    if (this.roundWinBox().type == "tournamentInfo" && logoTournament && logoTournament !== "")
      return logoTournament;
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
    return `gradient-head-to-head-${this.dataModel.teams()[0].isAttacking ? "attacker" : "defender"}`;
  });

  readonly winningTeamBackgroundClass = computed(() => {
    return `gradient-${this.leftWon() ? "left" : "right"}-${this.dataModel.match().attackersWon ? "attacker" : "defender"}`;
  });

  _ref = effect(() => {
    const roundPhase = this.dataModel.match().roundPhase;
    const roundNumber = this.dataModel.match().roundNumber;

    this.calculateClutch();

    if (roundPhase === "end") {
      if (roundNumber === this.lastInRoundNumber) return;
      this.lastInRoundNumber = roundNumber;

      setTimeout(() => {
        this.roundWonType.set(this.calculateRoundWonType());

        this.runAnimation = true;
        this.hide = false;
        this.animateOut = false;
        setTimeout(() => {
          this.runAnimation = false;

          this.clutch = [-1, -1];
        }, 2600);
      }, 200);
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
