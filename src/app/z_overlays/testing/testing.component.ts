import { Component, inject, signal } from "@angular/core";
import { MatchOverlayComponent } from "../match-overlay/match-overlay.component";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-testing-new",
  imports: [MatchOverlayComponent],
  templateUrl: "./testing.component.html",
  styleUrl: "./testing.component.css",
})
export class TestingComponent {
  dataModel = inject(DataModelService);

  //#region General button handlers
  changeRoundPhase() {
    this.dataModel.match.update((v) => {
      const ret = v;
      if (ret.roundPhase == "shopping") {
        ret.roundPhase = "combat";
      } else if (ret.roundPhase == "combat") {
        ret.roundPhase = "end";
      } else if (ret.roundPhase == "LOBBY") {
        ret.roundPhase = "end";
      } else {
        ret.roundPhase = "shopping";
      }
      return ret;
    });
  }

  swapTeamColors() {
    this.dataModel.match.update((v) => {
      const ret = v;
      ret.teams.forEach((team: any) => {
        team.isAttacking = !team.isAttacking;
        team.players.forEach((player: any) => {
          player.hasSpike = false;
        });
      });
      return ret;
    });
  }

  spikeTimer?: NodeJS.Timeout;

  plantSpike() {
    this.dataModel.match.update((v) => {
      const ret = v;
      ret.spikeState.planted = true;
      ret.spikeState.defused = false;
      ret.spikeState.detonated = false;
      return ret;
    });
    this.spikeTimer = setTimeout(() => {
      this.defuseSpike();
    }, 45 * 1000);
  }

  defuseSpike() {
    this.dataModel.match.update((v) => {
      const ret = v;
      ret.spikeState.planted = false;
      ret.spikeState.defused = true;
      ret.spikeState.detonated = false;
      return ret;
    });
    clearTimeout(this.spikeTimer);
    this.spikeTimer = undefined;
  }

  showInterface = signal(true);
  toggleInterface() {
    this.showInterface.update((v) => !v);
  }

  switchBackground() {}
  //#endregion

  //#region Team button handlers
  addPlayer(teamIndex: number) {
    this.dataModel.match.update((v) => {
      const ret = v;
      const team = ret.teams[teamIndex];

      return ret;
    });
  }

  removePlayer(teamIndex: number) {
    this.dataModel.match.update((v) => {
      const ret = v;
      const team = ret.teams[teamIndex];

      return ret;
    });
  }

  winRound(teamIndex: number) {
    this.dataModel.match.update((v) => {
      const ret = v;
      const team = ret.teams[teamIndex];
      team.roundsWon++;
      team.roundsWon %= 13;
      ret.roundNumber = ret.teams[0].roundsWon + ret.teams[1].roundsWon + 1;
      return ret;
    });
  }
  //#endregion

  //#region Player button handlers
  killPlayer(teamIndex: number, playerIndex: number) {
    this.dataModel.match.update((v) => {
      const ret = v;
      ret.teams[teamIndex].players[playerIndex].isAlive = false;
      ret.teams[teamIndex].players[playerIndex].health = 0;
      return ret;
    });
  }

  revivePlayer(teamIndex: number, playerIndex: number) {
    this.dataModel.match.update((v) => {
      const ret = v;
      ret.teams[teamIndex].players[playerIndex].isAlive = true;
      ret.teams[teamIndex].players[playerIndex].health = 100;
      return ret;
    });
  }

  giveUltPoint(teamIndex: number, playerIndex: number) {
    this.dataModel.match.update((v) => {
      const ret = v;
      const player = ret.teams[teamIndex].players[playerIndex];
      player.currUltPoints++;
      player.ultReady = player.currUltPoints == player.maxUltPoints;
      return ret;
    });
  }

  useUltimate(teamIndex: number, playerIndex: number) {
    this.dataModel.match.update((v) => {
      const ret = v;
      const player = ret.teams[teamIndex].players[playerIndex];
      player.currUltPoints = 0;
      player.ultReady = false;
      return ret;
    });
  }

  armorOrder = ["Heavy", "Regen", "Light", "None"];
  changeShield(teamIndex: number, playerIndex: number) {
    this.dataModel.match.update((v) => {
      const ret = v;
      const player = ret.teams[teamIndex].players[playerIndex];
      let i = this.armorOrder.findIndex((e) => e == player.armorName);
      i++;
      i %= this.armorOrder.length;
      player.armorName = this.armorOrder[i];
      player.health = Math.floor(Math.random() * 100) + 1;
      return ret;
    });
  }

  weaponOrder = ["Vandal", "Operator", "Classic", "Spectre"];
  changeWeapon(teamIndex: number, playerIndex: number) {
    this.dataModel.match.update((v) => {
      const ret = v;
      const player = ret.teams[teamIndex].players[playerIndex];
      let i = this.weaponOrder.findIndex((e) => e == player.highestWeapon);
      i++;
      i %= this.weaponOrder.length;
      player.highestWeapon = this.weaponOrder[i];
      return ret;
    });
  }

  makeCaptain(teamIndex: number, playerIndex: number) {
    this.dataModel.match.update((v) => {
      const ret = v;
      const player = ret.teams[teamIndex].players[playerIndex];
      ret.teams[teamIndex].players.forEach((e: any) => (e.isCaptain = false));
      player.isCaptain = true;
      return ret;
    });
  }

  spectate(teamIndex: number, playerIndex: number) {
    this.dataModel.match.update((v) => {
      const ret = v;
      const player = ret.teams[teamIndex].players[playerIndex];
      ret.teams[0].players.forEach((e: any) => (e.isObserved = false));
      ret.teams[1].players.forEach((e: any) => (e.isObserved = false));
      player.isObserved = true;
      return ret;
    });
  }

  giveSpike(teamIndex: number, playerIndex: number) {
    this.dataModel.match.update((v) => {
      const ret = v;
      const player = ret.teams[teamIndex].players[playerIndex];
      ret.teams[teamIndex].players.forEach((e: any) => (e.hasSpike = false));
      player.hasSpike = true;
      return ret;
    });
  }

  changeStats(teamIndex: number, playerIndex: number) {
    this.dataModel.match.update((v) => {
      const ret = v;
      const player = ret.teams[teamIndex].players[playerIndex];
      player.kills = Math.floor(Math.random() * 20);
      player.deaths = Math.floor(Math.random() * 20);
      player.assists = Math.floor(Math.random() * 20);
      return ret;
    });
  }
  //#endregion
}
