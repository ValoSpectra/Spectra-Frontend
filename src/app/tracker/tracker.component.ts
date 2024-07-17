import { Component, OnInit } from '@angular/core';
// import { BotConnectorService } from '../services/bot-connector.service';
// import { InhouseTrackerService } from '../services/inhouse-tracker.service';
import { trigger, transition, style, animate } from '@angular/animations';
import * as io from "socket.io-client";
import { ActivatedRoute } from '@angular/router';

enum Colors {
  ATTACKER_REG = "rgba(232, 130, 125, 0.75)",
  ATTACKER_FEINT = "rgba(232, 130, 125, 0.35)",
  DEFENDER_REG = "rgba(125, 232, 187, 0.75)",
  DEFENDER_FEINT = "rgba(125, 232, 187, 0.35)",
}

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ 'opacity': '0' }),
        animate('0.5s', style({ 'opacity': '1' }))
      ]),

      transition(':leave',
        animate('0.5s', style({ 'opacity': '0' }))
      )
    ])
  ]
})
export class TrackerComponent implements OnInit {

  activelyTracking: boolean = false;
  currentTrackId: string | null = null;
  match: any = null;
  teamLeft: any = null;
  teamRight: any = null;

  ranksEnabled: boolean = false;
  ranksByName: any = {};

  teamLeftColor: string = Colors.ATTACKER_REG;
  teamLeftColorFeint: string = Colors.ATTACKER_FEINT;
  teamRightColor: string = Colors.DEFENDER_REG;
  teamRightColorFeint: string = Colors.DEFENDER_FEINT;

  socket: io.Socket;
  groupCode: string = "UNKNOWN";

  constructor(private route: ActivatedRoute) {
    const siteUrl = window.location.hostname;
    this.socket = io.connect(`http://${siteUrl}:5200`, { autoConnect: true, reconnection: true});
  }

  async ngOnInit(): Promise<void> {

    this.route.queryParams.subscribe(params => {
      this.groupCode = params['groupCode'];
      console.log(`Requested group code is ${this.groupCode}`);
    });

    this.match = null;
    //calling updateMatch here for test purposes before service connection is implemented
    this.updateMatch(
      {"groupCode":"A","isRanked":false,"isRunning":true,"roundNumber":5,"roundPhase":"combat","teams":[{"teamName":"Tiranthine","teamTricode":"TIRA","teamUrl":"https://i.bfz.moe/underpeel/logos/ABP.png","isAttacking":false,"hasHandledTeam":true,"roundsWon":2,"spentThisRound":8900,"spikeState":"","roundRecord":["lost","lost","kills","kills"],"players":[{"name":"Awesome","tagline":"OPera","playerId":"77a89a40-47cd-53d2-ace5-185590ce9dc6","position":0,"locked":true,"agentInternal":"Wushu","agentProper":"Jett","rankName":"Unranked","isAlive":true,"kills":3,"deaths":3,"assists":0,"kdRatio":1,"killsThisRound":3,"currUltPoints":3,"maxUltPoints":8,"ultReady":false,"money":300,"moneySpent":2550,"spentMoneyThisRound":true,"loadoutValue":0,"initialShield":0,"highestWeapon":"Sheriff","teamkills":0,"headshotkills":2,"headshotRatio":2,"killsByWeaponsAndAbilities":{"TX_Hud_Operator":1,"TX_Hud_Pistol_Revolver_S":1},"killsOnEnemyPlayer":{"tarnished":1,"XiphoidSkewer":1,"AM37":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{}},{"name":"AESIR Helix","tagline":"PRIME","playerId":"92c59ca8-53f8-53a3-a736-2b9ce9794fbb","position":1,"locked":true,"agentInternal":"Sequoia","agentProper":"Iso","rankName":"Unranked","isAlive":true,"kills":2,"deaths":4,"assists":0,"kdRatio":0.5,"killsThisRound":0,"currUltPoints":3,"maxUltPoints":7,"ultReady":false,"money":400,"moneySpent":400,"spentMoneyThisRound":true,"loadoutValue":0,"initialShield":0,"highestWeapon":"Ghost","teamkills":0,"headshotkills":0,"headshotRatio":0,"killsByWeaponsAndAbilities":{"TX_Hud_SMG_MP5_S":1,"TX_Hud_Volcano":1},"killsOnEnemyPlayer":{"Dunkel":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{"TX_Killfeed_Reyna":1}},{"name":"brockster","tagline":"brxck","playerId":"8cf0e502-ad1c-50ef-bcb9-a332eab4a322","position":2,"locked":true,"agentInternal":"Sprinter","agentProper":"Neon","rankName":"Unranked","isAlive":false,"kills":3,"deaths":4,"assists":0,"kdRatio":0.75,"killsThisRound":0,"currUltPoints":3,"maxUltPoints":7,"ultReady":false,"money":0,"moneySpent":850,"spentMoneyThisRound":true,"loadoutValue":0,"initialShield":0,"highestWeapon":"Knife","teamkills":0,"headshotkills":2,"headshotRatio":2,"killsByWeaponsAndAbilities":{"TX_Hud_Volcano":1,"TX_Hud_HMG":1,"TX_Neon_Ult":1},"killsOnEnemyPlayer":{"AM37":1,"tarnished":1,"XiphoidSkewer":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{"TX_Killfeed_Reyna":1}},{"name":"Tiranthine","tagline":"EUW","playerId":"99b03609-66cf-56f4-baa9-77cf3f1d4e30","position":3,"locked":true,"agentInternal":"Pandemic","agentProper":"Viper","rankName":"Unranked","isAlive":false,"kills":3,"deaths":4,"assists":0,"kdRatio":0.75,"killsThisRound":0,"currUltPoints":3,"maxUltPoints":9,"ultReady":false,"money":0,"moneySpent":4700,"spentMoneyThisRound":true,"loadoutValue":0,"initialShield":0,"highestWeapon":"Knife","teamkills":0,"headshotkills":2,"headshotRatio":1,"killsByWeaponsAndAbilities":{"TX_Hud_SMG_MP5_S":1,"TX_Hud_Volcano":1},"killsOnEnemyPlayer":{"tarnished":1,"AM37":1,"Dunkel":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{}},{"name":"Glass0202","tagline":"EUW","playerId":"3858c06e-050d-5699-a009-108bdc1bb080","position":4,"locked":true,"agentInternal":"Vampire","agentProper":"Reyna","rankName":"Unranked","isAlive":true,"kills":4,"deaths":3,"assists":2,"kdRatio":1.3333333333333333,"killsThisRound":4,"currUltPoints":4,"maxUltPoints":6,"ultReady":false,"money":400,"moneySpent":400,"spentMoneyThisRound":true,"loadoutValue":0,"initialShield":0,"highestWeapon":"Ghost","teamkills":0,"headshotkills":2,"headshotRatio":0.6666666666666666,"killsByWeaponsAndAbilities":{"TX_Hud_Operator":1,"TX_Hud_Volcano":1,"TX_Hud_Pistol_Luger_S":1},"killsOnEnemyPlayer":{"SilentNobushi":1,"AM37":1,"tarnished":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{}}],"playerCount":5},{"teamName":"Dunkel","teamTricode":"DNKL","teamUrl":"https://i.bfz.moe/underpeel/logos/RAZE.png","isAttacking":true,"hasHandledTeam":true,"roundsWon":2,"spentThisRound":6850,"spikeState":"","roundRecord":["kills","kills","lost","lost"],"players":[{"name":"XiphoidSkewer","tagline":"rtojp","playerId":"30312ef1-d5b0-51a5-8609-65c7584be076","position":0,"locked":true,"agentInternal":"Stealth","agentProper":"Yoru","rankName":"Unranked","isAlive":true,"kills":5,"deaths":2,"assists":1,"kdRatio":2.5,"killsThisRound":9,"currUltPoints":4,"maxUltPoints":7,"ultReady":false,"hasSpike":true,"money":0,"moneySpent":2850,"spentMoneyThisRound":true,"loadoutValue":0,"initialShield":0,"highestWeapon":"Sheriff","teamkills":0,"headshotkills":2,"headshotRatio":0.5,"killsByWeaponsAndAbilities":{"TX_Hud_LMG":1,"TX_Hud_HMG":1,"TX_Hud_Pistol_Revolver_S":1},"killsOnEnemyPlayer":{"AESIR Helix":1,"Awesome":1,"Glass0202":1,"brockster":1,"Tiranthine":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{"TX_Killfeed_Neon":1,"TX_Killfeed_Raze":1}},{"name":"AM37","tagline":"AM37","playerId":"7db6886d-4028-5697-9a22-22df5babf3bb","position":1,"locked":true,"agentInternal":"Sprinter","agentProper":"Neon","rankName":"Unranked","isAlive":false,"kills":2,"deaths":4,"assists":2,"kdRatio":0.5,"killsThisRound":0,"currUltPoints":3,"maxUltPoints":7,"ultReady":false,"money":0,"moneySpent":800,"spentMoneyThisRound":true,"loadoutValue":0,"initialShield":0,"highestWeapon":"Knife","teamkills":0,"headshotkills":0,"headshotRatio":0,"killsByWeaponsAndAbilities":{"TX_Hud_Pistol_Revolver_S":1,"TX_Hud_HMG":1},"killsOnEnemyPlayer":{"Awesome":1,"Tiranthine":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{}},{"name":"SilentNobushi","tagline":"EUW","playerId":"f8c0a808-50dc-5c5a-8d66-0aac34e814b3","position":2,"locked":true,"agentInternal":"Clay","agentProper":"Raze","rankName":"Unranked","isAlive":true,"kills":4,"deaths":2,"assists":1,"kdRatio":2,"killsThisRound":0,"currUltPoints":2,"maxUltPoints":8,"ultReady":false,"money":100,"moneySpent":700,"spentMoneyThisRound":true,"loadoutValue":0,"initialShield":0,"highestWeapon":"Ghost","teamkills":0,"headshotkills":1,"headshotRatio":0.5,"killsByWeaponsAndAbilities":{"TX_Hud_Pistol_Luger_S":1,"TX_Hud_Volcano":1},"killsOnEnemyPlayer":{"AESIR Helix":1,"Glass0202":1,"Tiranthine":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{"TX_Killfeed_Yoru":1}},{"name":"Dunkel","tagline":"Licht","playerId":"afd57152-b535-58d2-a18f-1d530edca8ae","position":3,"locked":true,"agentInternal":"Sequoia","agentProper":"Iso","rankName":"Unranked","isAlive":true,"kills":1,"deaths":3,"assists":0,"kdRatio":0.3333333333333333,"killsThisRound":0,"currUltPoints":2,"maxUltPoints":7,"ultReady":false,"money":100,"moneySpent":1350,"spentMoneyThisRound":true,"loadoutValue":0,"initialShield":0,"highestWeapon":"Ghost","teamkills":0,"headshotkills":0,"headshotRatio":0,"killsByWeaponsAndAbilities":{"TX_Hud_SMG_MP5_S":1},"killsOnEnemyPlayer":{"Glass0202":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{}},{"name":"tarnished","tagline":"lovem","playerId":"5b5c5055-9c2d-566e-9a89-fe3be0c61d22","position":4,"locked":true,"agentInternal":"Wushu","agentProper":"Jett","rankName":"Unranked","isAlive":false,"kills":6,"deaths":4,"assists":0,"kdRatio":1.5,"killsThisRound":0,"currUltPoints":3,"maxUltPoints":8,"ultReady":false,"money":0,"moneySpent":1150,"spentMoneyThisRound":true,"loadoutValue":0,"initialShield":0,"highestWeapon":"Knife","teamkills":0,"headshotkills":3,"headshotRatio":0.75,"killsByWeaponsAndAbilities":{"TX_Hud_Pistol_Revolver_S":1,"TX_Hud_Volcano":1,"TX_Hud_Operator":1},"killsOnEnemyPlayer":{"brockster":1,"Awesome":1,"Tiranthine":1,"AESIR Helix":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{}}],"playerCount":5}],"globalEventsTeamName":"TESTTEAM","map":"Sunset","spikePlanted":false,"spikeDetonated":false,"spikeDefused":false,"ranks":{"team1":["Iron_1","Immortal_2","Diamond_3","Silver_3","Radiant"],"team2":["Iron_3","Diamond_1","Ascdendant_2","Radiant","Ascendant_3"]},"replayLog":{"groupCode":"A","logStartTime":1714908309247,"fileName":"Match_A_1714908309247.replay","fileWriteStream":{"fd":41,"path":"./replays/Match_A_1714908309247.replay","flags":"w","mode":438,"flush":false,"bytesWritten":260524,"_events":{},"_writableState":{"highWaterMark":16384,"length":0,"corked":0,"writelen":0,"bufferedIndex":0,"pendingcb":0},"_eventsCount":2},"fileStartOffset":0,"writeReady":true,"isOpening":false,"isWriting":false,"writeBuffer":[]},"eventNumber":801}
      // {"groupCode":"A","isRanked":false,"isRunning":true,"roundNumber":4,"roundPhase":"shopping","teams":[{"teamName":"Tiranthine","teamTricode":"TIRA","teamUrl":"https://i.bfz.moe/underpeel/logos/ABP.png","isAttacking":false,"hasHandledTeam":true,"roundsWon":1,"spentThisRound":0,"spikeState":"","roundRecord":["lost","lost","kills"],"players":[{"name":"Awesome","tagline":"OPera","playerId":"77a89a40-47cd-53d2-ace5-185590ce9dc6","position":0,"locked":true,"agentInternal":"Wushu","agentProper":"Jett","rankName":"Unranked","isAlive":true,"kills":2,"deaths":2,"assists":0,"kdRatio":1,"killsThisRound":0,"currUltPoints":6,"maxUltPoints":8,"ultReady":false,"money":4700,"moneySpent":0,"spentMoneyThisRound":false,"loadoutValue":0,"initialShield":25,"highestWeapon":"Operator","teamkills":0,"headshotkills":2,"headshotRatio":2,"killsByWeaponsAndAbilities":{"TX_Hud_Operator":1},"killsOnEnemyPlayer":{"tarnished":1,"XiphoidSkewer":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{}},{"name":"AESIR Helix","tagline":"PRIME","playerId":"92c59ca8-53f8-53a3-a736-2b9ce9794fbb","position":1,"locked":true,"agentInternal":"Sequoia","agentProper":"Iso","rankName":"Unranked","isAlive":true,"kills":2,"deaths":3,"assists":0,"kdRatio":0.6666666666666666,"killsThisRound":0,"currUltPoints":7,"maxUltPoints":7,"ultReady":true,"money":4750,"moneySpent":0,"spentMoneyThisRound":false,"loadoutValue":0,"initialShield":0,"highestWeapon":"Classic","teamkills":0,"headshotkills":0,"headshotRatio":0,"killsByWeaponsAndAbilities":{"TX_Hud_SMG_MP5_S":1,"TX_Hud_Volcano":1},"killsOnEnemyPlayer":{"Dunkel":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{"TX_Killfeed_Reyna":1}},{"name":"brockster","tagline":"brxck","playerId":"8cf0e502-ad1c-50ef-bcb9-a332eab4a322","position":2,"locked":true,"agentInternal":"Sprinter","agentProper":"Neon","rankName":"Unranked","isAlive":true,"kills":1,"deaths":3,"assists":0,"kdRatio":0.3333333333333333,"killsThisRound":0,"currUltPoints":6,"maxUltPoints":7,"ultReady":false,"money":5750,"moneySpent":0,"spentMoneyThisRound":false,"loadoutValue":0,"initialShield":0,"highestWeapon":"Classic","teamkills":0,"headshotkills":1,"headshotRatio":1,"killsByWeaponsAndAbilities":{"TX_Hud_Volcano":1},"killsOnEnemyPlayer":{"AM37":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{}},{"name":"Tiranthine","tagline":"EUW","playerId":"99b03609-66cf-56f4-baa9-77cf3f1d4e30","position":3,"locked":true,"agentInternal":"Pandemic","agentProper":"Viper","rankName":"Unranked","isAlive":true,"kills":2,"deaths":2,"assists":0,"kdRatio":1,"killsThisRound":0,"currUltPoints":6,"maxUltPoints":9,"ultReady":false,"money":5200,"moneySpent":0,"spentMoneyThisRound":false,"loadoutValue":0,"initialShield":50,"highestWeapon":"Vandal","teamkills":0,"headshotkills":1,"headshotRatio":0.5,"killsByWeaponsAndAbilities":{"TX_Hud_SMG_MP5_S":1,"TX_Hud_Volcano":1},"killsOnEnemyPlayer":{"tarnished":1,"AM37":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{}},{"name":"Glass0202","tagline":"EUW","playerId":"3858c06e-050d-5699-a009-108bdc1bb080","position":4,"locked":true,"agentInternal":"Vampire","agentProper":"Reyna","rankName":"Unranked","isAlive":true,"kills":1,"deaths":2,"assists":1,"kdRatio":0.5,"killsThisRound":1,"currUltPoints":5,"maxUltPoints":6,"ultReady":false,"money":4700,"moneySpent":0,"spentMoneyThisRound":false,"loadoutValue":0,"initialShield":50,"highestWeapon":"Operator","teamkills":0,"headshotkills":0,"headshotRatio":0,"killsByWeaponsAndAbilities":{"TX_Hud_Operator":1},"killsOnEnemyPlayer":{"SilentNobushi":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{}}],"playerCount":5},{"teamName":"Dunkel","teamTricode":"DNKL","teamUrl":"https://i.bfz.moe/underpeel/logos/RAZE.png","isAttacking":true,"hasHandledTeam":true,"roundsWon":2,"spentThisRound":0,"spikeState":"","roundRecord":["kills","kills","lost"],"players":[{"name":"XiphoidSkewer","tagline":"rtojp","playerId":"30312ef1-d5b0-51a5-8609-65c7584be076","position":0,"locked":true,"agentInternal":"Stealth","agentProper":"Yoru","rankName":"Unranked","isAlive":true,"kills":1,"deaths":1,"assists":1,"kdRatio":1,"killsThisRound":0,"currUltPoints":4,"maxUltPoints":7,"ultReady":false,"money":7800,"moneySpent":0,"spentMoneyThisRound":false,"loadoutValue":0,"initialShield":0,"highestWeapon":"Classic","teamkills":0,"headshotkills":0,"headshotRatio":0,"killsByWeaponsAndAbilities":{"TX_Hud_LMG":1},"killsOnEnemyPlayer":{"AESIR Helix":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{}},{"name":"AM37","tagline":"AM37","playerId":"7db6886d-4028-5697-9a22-22df5babf3bb","position":1,"locked":true,"agentInternal":"Sprinter","agentProper":"Neon","rankName":"Unranked","isAlive":true,"kills":1,"deaths":2,"assists":0,"kdRatio":0.5,"killsThisRound":0,"currUltPoints":6,"maxUltPoints":7,"ultReady":false,"money":4500,"moneySpent":0,"spentMoneyThisRound":false,"loadoutValue":0,"initialShield":0,"highestWeapon":"Classic","teamkills":0,"headshotkills":0,"headshotRatio":0,"killsByWeaponsAndAbilities":{"TX_Hud_Pistol_Revolver_S":1},"killsOnEnemyPlayer":{"Awesome":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{}},{"name":"SilentNobushi","tagline":"EUW","playerId":"f8c0a808-50dc-5c5a-8d66-0aac34e814b3","position":2,"locked":true,"agentInternal":"Clay","agentProper":"Raze","rankName":"Unranked","isAlive":true,"kills":4,"deaths":1,"assists":0,"kdRatio":4,"killsThisRound":0,"currUltPoints":8,"maxUltPoints":8,"ultReady":true,"money":9000,"moneySpent":0,"spentMoneyThisRound":false,"loadoutValue":0,"initialShield":0,"highestWeapon":"Classic","teamkills":0,"headshotkills":1,"headshotRatio":0.5,"killsByWeaponsAndAbilities":{"TX_Hud_Pistol_Luger_S":1,"TX_Hud_Volcano":1},"killsOnEnemyPlayer":{"AESIR Helix":1,"Glass0202":1,"Tiranthine":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{"TX_Killfeed_Yoru":1}},{"name":"Dunkel","tagline":"Licht","playerId":"afd57152-b535-58d2-a18f-1d530edca8ae","position":3,"locked":true,"agentInternal":"Sequoia","agentProper":"Iso","rankName":"Unranked","isAlive":true,"kills":1,"deaths":2,"assists":0,"kdRatio":0.5,"killsThisRound":0,"currUltPoints":5,"maxUltPoints":7,"ultReady":false,"money":5050,"moneySpent":0,"spentMoneyThisRound":false,"loadoutValue":0,"initialShield":0,"highestWeapon":"Classic","teamkills":0,"headshotkills":0,"headshotRatio":0,"killsByWeaponsAndAbilities":{"TX_Hud_SMG_MP5_S":1},"killsOnEnemyPlayer":{"Glass0202":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{}},{"name":"tarnished","tagline":"lovem","playerId":"5b5c5055-9c2d-566e-9a89-fe3be0c61d22","position":4,"locked":true,"agentInternal":"Wushu","agentProper":"Jett","rankName":"Unranked","isAlive":true,"kills":5,"deaths":2,"assists":0,"kdRatio":2.5,"killsThisRound":0,"currUltPoints":0,"maxUltPoints":8,"ultReady":false,"money":5050,"moneySpent":0,"spentMoneyThisRound":false,"loadoutValue":0,"initialShield":0,"highestWeapon":"Classic","teamkills":0,"headshotkills":3,"headshotRatio":0.75,"killsByWeaponsAndAbilities":{"TX_Hud_Pistol_Revolver_S":1,"TX_Hud_Volcano":1},"killsOnEnemyPlayer":{"brockster":1,"Awesome":1,"Tiranthine":1},"killsOnTeammatePlayer":{},"assistsFromTeammate":{}}],"playerCount":5}],"globalEventsTeamName":"TESTTEAM","map":"Sunset","spikePlanted":false,"spikeDetonated":false,"spikeDefused":false,"ranks":{"team1":["Iron_1","Immortal_2","Diamond_3","Silver_3","Radiant"],"team2":["Iron_3","Diamond_1","Ascdendant_2","Radiant","Ascendant_3"]},"replayLog":{"groupCode":"A","logStartTime":1714908309247,"fileName":"Match_A_1714908309247.replay","fileWriteStream":{"fd":41,"path":"./replays/Match_A_1714908309247.replay","flags":"w","mode":438,"flush":false,"bytesWritten":160419,"_events":{},"_writableState":{"highWaterMark":16384,"length":0,"corked":0,"writelen":0,"bufferedIndex":0,"pendingcb":0},"_eventsCount":2},"fileStartOffset":0,"writeReady":true,"isOpening":false,"isWriting":false,"writeBuffer":[]},"eventNumber":500}
    );
    
    if (this.ranksEnabled) {
      // this.ranksByName = this.inhouseTrackerService.getRanksFromSheet();
    }

    this.socket.once("logon_success", () => { console.log("Logged on successfully") });
    this.socket.on("match_data", (data: string) => {
      this.updateMatch(JSON.parse(data));
    });
    this.socket.io.on("reconnect_attempt", (attempt: number) => {
      console.log(`Connection lost, attempting to reconnect to server (Attempt: ${attempt})`);
    });
    this.socket.io.on("reconnect", () => {
      this.socket.emit("logon", JSON.stringify({ groupCode: this.groupCode }));
      console.log("Reconnected to server");
    });

    this.socket.emit("logon", JSON.stringify({ groupCode: this.groupCode }));
  }

  updateMatch(data: any) {
    this.match = data;
    this.teamLeft = this.match.teams[0];
    this.teamRight = this.match.teams[1];

    // this.teamLeft.teamName = "TIRA";
    // this.teamRight.teamName = "DNKL";
    this.teamLeftColor = this.teamLeft.isAttacking ? Colors.ATTACKER_REG : Colors.DEFENDER_REG;
    this.teamLeftColorFeint = this.teamLeft.isAttacking ? Colors.ATTACKER_FEINT : Colors.DEFENDER_FEINT;
    this.teamRightColor = this.teamRight.isAttacking ? Colors.ATTACKER_REG : Colors.DEFENDER_REG;
    this.teamRightColorFeint = this.teamRight.isAttacking ? Colors.ATTACKER_FEINT : Colors.DEFENDER_FEINT;

    this.match.ranksEnabled = this.ranksEnabled;
    this.match.ranksByName = this.ranksByName;
  }

  resetTracker() {
    if (!this.activelyTracking) return;
    this.currentTrackId = null;
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
