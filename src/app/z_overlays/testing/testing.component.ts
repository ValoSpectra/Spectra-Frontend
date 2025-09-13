import { Component, inject, OnInit, signal } from "@angular/core";
import { MatchOverlayComponent } from "../match-overlay/match-overlay.component";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-testing-new",
  imports: [MatchOverlayComponent],
  templateUrl: "./testing.component.html",
  styleUrl: "./testing.component.css",
})
export class TestingComponent implements OnInit {
  dataModel = inject(DataModelService);
  match: any;

  ngOnInit(): void {
    this.match = {
      groupCode: "A",
      isRanked: false,
      isRunning: true,
      roundNumber: 10,
      roundPhase: "combat",
      spikeState: { planted: false, defused: false, detonated: false },
      map: "Ascent",
      switchRound: 12,
      firstOtRound: 25,
      tools: {
        seriesInfo: {
          needed: 3,
          wonLeft: 2,
          wonRight: 2,
          mapInfo: [
            {
              type: "past",
              map: "Fracture",
              left: {
                score: 13,
                logo: "assets/misc/icon.webp",
              },
              right: {
                score: 9,
                logo: "assets/misc/icon.webp",
              },
            },
            {
              type: "present",
              logo: "assets/misc/icon.webp",
            },
            {
              type: "future",
              map: "Haven",
              logo: "assets/misc/icon.webp",
            },
          ],
        },
        seedingInfo: {
          left: "Group A",
          right: "Group B",
        },
        tournamentInfo: {
          enabled: true,
          name: "",
          logoUrl: "",
          backdropUrl: "",
        },
        timeoutDuration: 60,
        sponsorInfo: {
          enabled: true,
          duration: 5000,
          sponsors: ["assets/misc/logo.webp", "assets/misc/icon.webp"],
        },
        watermarkInfo: {
          customText: "",
          customTextEnabled: false,
          spectraWatermark: true,
        },
      },
      timeoutState: {
        techPause: false,
        leftTeam: false,
        rightTeam: false,
        timeRemaining: 0,
      },
      teams: [
        {
          players: [
            {
              name: "Testg",
              playerId: 0,
              isAlive: true,
              agentInternal: "Vampire",
              isObserved: false,
              armorName: "Heavy",
              money: 2100,
              moneySpent: 2900,
              highestWeapon: "Operator",
              isCaptain: false,
              currUltPoints: 2,
              maxUltPoints: 7,
              ultReady: false,
              hasSpike: false,
              scoreboardAvailable: true,
              auxiliaryAvailable: {
                health: true,
                abilities: true,
                scoreboard: true,
              },
              kills: 0,
              deaths: 0,
              assists: 0,
              health: 100,
              abilities: {
                grenade: 1,
                ability1: 1,
                ability2: 0,
              },
              iconNameSuffix: "",
            },
            {
              name: "Test",
              playerId: 0,
              isAlive: true,
              agentInternal: "Smonk",
              isObserved: false,
              armorName: "Heavy",
              money: 2100,
              moneySpent: 2900,
              highestWeapon: "Vandal",
              isCaptain: false,
              currUltPoints: 2,
              maxUltPoints: 7,
              ultReady: false,
              hasSpike: false,
              scoreboardAvailable: true,
              auxiliaryAvailable: {
                health: true,
                abilities: true,
                scoreboard: true,
              },
              kills: 0,
              deaths: 0,
              assists: 0,
              health: 100,
              abilities: {
                grenade: 1,
                ability1: 1,
                ability2: 0,
              },
              iconNameSuffix: "",
            },
            {
              name: "Test",
              playerId: 0,
              isAlive: true,
              agentInternal: "Wushu",
              isObserved: false,
              armorName: "Heavy",
              money: 2100,
              moneySpent: 2900,
              highestWeapon: "Vandal",
              isCaptain: false,
              currUltPoints: 2,
              maxUltPoints: 7,
              ultReady: false,
              hasSpike: false,
              scoreboardAvailable: true,
              auxiliaryAvailable: {
                health: true,
                abilities: true,
                scoreboard: true,
              },
              kills: 0,
              deaths: 0,
              assists: 0,
              health: 100,
              abilities: {
                grenade: 1,
                ability1: 1,
                ability2: 0,
              },
              iconNameSuffix: "",
            },
            {
              name: "Test",
              playerId: 0,
              isAlive: true,
              agentInternal: "Wushu",
              isObserved: false,
              armorName: "Heavy",
              money: 2100,
              moneySpent: 2900,
              highestWeapon: "Vandal",
              isCaptain: false,
              currUltPoints: 2,
              maxUltPoints: 7,
              ultReady: false,
              hasSpike: false,
              scoreboardAvailable: true,
              auxiliaryAvailable: {
                health: true,
                abilities: true,
                scoreboard: true,
              },
              kills: 0,
              deaths: 0,
              assists: 0,
              health: 100,
              abilities: {
                grenade: 1,
                ability1: 1,
                ability2: 0,
              },
              iconNameSuffix: "",
            },
            {
              name: "Test",
              playerId: 0,
              isAlive: true,
              agentInternal: "Wushu",
              isObserved: false,
              armorName: "Heavy",
              money: 2100,
              moneySpent: 2900,
              highestWeapon: "Vandal",
              isCaptain: false,
              currUltPoints: 2,
              maxUltPoints: 7,
              ultReady: false,
              hasSpike: false,
              scoreboardAvailable: true,
              auxiliaryAvailable: {
                health: true,
                abilities: true,
                scoreboard: true,
              },
              kills: 0,
              deaths: 0,
              assists: 0,
              health: 100,
              abilities: {
                grenade: 1,
                ability1: 1,
                ability2: 0,
              },
              iconNameSuffix: "",
            },
          ],
          teamName: "The Naturals",
          teamUrl: "assets/misc/icon.webp",
          teamTricode: "INT",
          spentThisRound: 1000,
          isAttacking: false,
          roundsWon: 5,
          roundRecord: [
            { type: "detonated", wasAttack: true, round: 1 },
            { type: "lost", wasAttack: true, round: 2 },
            { type: "kills", wasAttack: true, round: 3 },
            { type: "timeout", wasAttack: true, round: 4 },
            { type: "lost", wasAttack: true, round: 5 },
            { type: "kills", wasAttack: true, round: 6 },
            { type: "lost", wasAttack: true, round: 7 },
            { type: "defused", wasAttack: true, round: 8 },
            { type: "lost", wasAttack: true, round: 9 },
            { type: "lost", wasAttack: true, round: 10 },
            { type: "detonated", wasAttack: true, round: 11 },
            { type: "lost", wasAttack: true, round: 12 },
            { type: "kills", wasAttack: false, round: 13 },
            { type: "timeout", wasAttack: false, round: 14 },
            { type: "lost", wasAttack: false, round: 15 },
            { type: "kills", wasAttack: false, round: 16 },
            { type: "lost", wasAttack: false, round: 17 },
            { type: "defused", wasAttack: false, round: 18 },
            { type: "lost", wasAttack: false, round: 19 },
            { type: "lost", wasAttack: false, round: 20 },
            { type: "lost", wasAttack: true, round: 21 },
            { type: "lost", wasAttack: false, round: 22 },
            { type: "lost", wasAttack: false, round: 23 },
            { type: "defused", wasAttack: false, round: 24 },
            { type: "lost", wasAttack: true, round: 25 },
            { type: "lost", wasAttack: false, round: 26 },
          ],
        },
        {
          players: [
            {
              name: "Test",
              playerId: 0,
              isAlive: true,
              agentInternal: "Wushu",
              isObserved: false,
              armorName: "Heavy",
              money: 2100,
              moneySpent: 2900,
              highestWeapon: "Vandal",
              isCaptain: false,
              currUltPoints: 2,
              maxUltPoints: 7,
              ultReady: false,
              hasSpike: false,
              scoreboardAvailable: true,
              auxiliaryAvailable: {
                health: true,
                abilities: true,
                scoreboard: true,
              },
              kills: 0,
              deaths: 0,
              assists: 0,
              health: 100,
              abilities: {
                grenade: 1,
                ability1: 1,
                ability2: 0,
              },
              iconNameSuffix: "",
            },
            {
              name: "Test",
              playerId: 0,
              isAlive: true,
              agentInternal: "Wushu",
              isObserved: false,
              armorName: "Heavy",
              money: 2100,
              moneySpent: 2900,
              highestWeapon: "Vandal",
              isCaptain: false,
              currUltPoints: 2,
              maxUltPoints: 7,
              ultReady: false,
              hasSpike: false,
              scoreboardAvailable: true,
              auxiliaryAvailable: {
                health: true,
                abilities: true,
                scoreboard: true,
              },
              kills: 0,
              deaths: 0,
              assists: 0,
              health: 100,
              abilities: {
                grenade: 1,
                ability1: 1,
                ability2: 0,
              },
              iconNameSuffix: "",
            },
            {
              name: "Test",
              playerId: 0,
              isAlive: true,
              agentInternal: "Wushu",
              isObserved: false,
              armorName: "Heavy",
              money: 2100,
              moneySpent: 2900,
              highestWeapon: "Vandal",
              isCaptain: false,
              currUltPoints: 2,
              maxUltPoints: 7,
              ultReady: false,
              hasSpike: false,
              scoreboardAvailable: true,
              auxiliaryAvailable: {
                health: true,
                abilities: true,
                scoreboard: true,
              },
              kills: 0,
              deaths: 0,
              assists: 0,
              health: 100,
              abilities: {
                grenade: 1,
                ability1: 1,
                ability2: 0,
              },
              iconNameSuffix: "",
            },
            {
              name: "Test",
              playerId: 0,
              isAlive: true,
              agentInternal: "Wushu",
              isObserved: false,
              armorName: "Heavy",
              money: 2100,
              moneySpent: 2900,
              highestWeapon: "Vandal",
              isCaptain: false,
              currUltPoints: 2,
              maxUltPoints: 7,
              ultReady: false,
              hasSpike: false,
              scoreboardAvailable: true,
              auxiliaryAvailable: {
                health: true,
                abilities: true,
                scoreboard: true,
              },
              kills: 0,
              deaths: 0,
              assists: 0,
              health: 100,
              abilities: {
                grenade: 1,
                ability1: 1,
                ability2: 0,
              },
              iconNameSuffix: "",
            },
            {
              name: "Test",
              playerId: 0,
              isAlive: true,
              agentInternal: "Wushu",
              isObserved: false,
              armorName: "Heavy",
              money: 2100,
              moneySpent: 2900,
              highestWeapon: "Vandal",
              isCaptain: false,
              currUltPoints: 2,
              maxUltPoints: 7,
              ultReady: false,
              hasSpike: false,
              scoreboardAvailable: true,
              auxiliaryAvailable: {
                health: true,
                abilities: true,
                scoreboard: true,
              },
              kills: 0,
              deaths: 0,
              assists: 0,
              health: 100,
              abilities: {
                grenade: 1,
                ability1: 1,
                ability2: 0,
              },
              iconNameSuffix: "",
            },
          ],
          teamName: "The Zoologists",
          teamUrl: "assets/misc/icon.webp",
          teamTricode: "ZOO",
          spentThisRound: 1000,
          isAttacking: true,
          roundsWon: 5,
          roundRecord: [
            { type: "lost", wasAttack: false, round: 1 },
            { type: "defused", wasAttack: false, round: 2 },
            { type: "lost", wasAttack: false, round: 3 },
            { type: "lost", wasAttack: false, round: 4 },
            { type: "kills", wasAttack: false, round: 5 },
            { type: "lost", wasAttack: false, round: 6 },
            { type: "detonated", wasAttack: false, round: 7 },
            { type: "lost", wasAttack: false, round: 8 },
            { type: "kills", wasAttack: false, round: 9 },
            { type: "timeout", wasAttack: false, round: 10 },
            { type: "lost", wasAttack: false, round: 11 },
            { type: "defused", wasAttack: false, round: 12 },
            { type: "lost", wasAttack: true, round: 13 },
            { type: "lost", wasAttack: true, round: 14 },
            { type: "kills", wasAttack: true, round: 15 },
            { type: "lost", wasAttack: true, round: 16 },
            { type: "detonated", wasAttack: true, round: 17 },
            { type: "lost", wasAttack: true, round: 18 },
            { type: "kills", wasAttack: true, round: 19 },
            { type: "timeout", wasAttack: true, round: 20 },
            { type: "lost", wasAttack: true, round: 21 },
            { type: "kills", wasAttack: true, round: 22 },
            { type: "lost", wasAttack: true, round: 23 },
            { type: "lost", wasAttack: true, round: 24 },
            { type: "kills", wasAttack: false, round: 25 },
            { type: "kills", wasAttack: true, round: 26 },
          ],
        },
      ],
    };
    this.dataModel.match.set(this.match);
  }

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

  techPause() {
    this.stopTimeoutTimer();
    this.dataModel.match.update((v) => {
      const ret = v;
      ret.timeoutState.techPause = !ret.timeoutState.techPause;
      return ret;
    });
  }
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

  timeout(teamIndex: number) {
    if (
      (teamIndex == 0 && this.dataModel.timeoutState().leftTeam) ||
      (teamIndex == 1 && this.dataModel.timeoutState().rightTeam)
    ) {
      //allows to toggle the timeout back off
      this.stopTimeoutTimer();
      return;
    }
    this.stopTimeoutTimer();
    this.dataModel.match.update((v) => {
      const ret = v;
      ret.timeoutState.techPause = false;
      ret.timeoutState.leftTeam = teamIndex == 0 ? !ret.timeoutState.leftTeam : false;
      ret.timeoutState.rightTeam = teamIndex == 1 ? !ret.timeoutState.rightTeam : false;
      ret.timeoutState.timeRemaining = ret.tools.timeoutDuration;
      return ret;
    });
    this.startTimeoutTimer();
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

  timeoutTimerRef?: NodeJS.Timeout;
  startTimeoutTimer() {
    this.timeoutTimerRef = setInterval(() => {
      this.dataModel.match.update((v) => {
        const ret = v;
        ret.timeoutState.timeRemaining--;
        return ret;
      });
      if (this.dataModel.timeoutState().timeRemaining <= 0) {
        this.stopTimeoutTimer();
      }
    }, 1000);
  }

  stopTimeoutTimer() {
    clearInterval(this.timeoutTimerRef);
    this.dataModel.match.update((v) => {
      const ret = v;
      ret.timeoutState.leftTeam = false;
      ret.timeoutState.rightTeam = false;
      ret.timeoutState.timeRemaining = 0;
      return ret;
    });
  }
}
