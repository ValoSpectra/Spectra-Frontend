import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-player-controller',
  templateUrl: './player-controller.component.html',
  styleUrl: './player-controller.component.scss'
})
export class PlayerControllerComponent {
  @Output() spikeTakenEvent = new EventEmitter<void>();
  @Output() captainTakenEvent = new EventEmitter<void>();
  @Output() spectateTakenEvent = new EventEmitter<void>();

  @Input() showInterface: boolean = true;
  @Input({transform: booleanAttribute}) flipInterface: boolean = false;

  @Input() teamId: number = 0;

  inCombat = true;
  inShopping = false;
  @Input() 
  set gamePhase(v : string) {
    if (v == "combat") {
      this.inCombat = true;
      this.inShopping = false;
    }
    else {
      this.inCombat = false;
      this.inShopping = true;
    }
  }
  

  isAttacking = false;
  weaponOrder = ["Vandal", "Operator", "Classic", "Spectre"];
  moneyOrder = [2900, 4700, 0, 1600];
  shieldOrder = [50, 25, 0];

  static agentIndex = [0, 0];
  static agentOrder = [["Reyna", "Killjoy", "Skye", "Yoru", "Astra"], ["KAYO", "Chamber", "Neon", "Fade", "Harbor"]];

  static playerNameIndex = [0, 0];
  static playerNameOrder = [["Voodoo One", "Twoperator", "ThreeOfLife", "Fourcefield", "FIVEbyFIVE"], ["AlpacaHoarder", "BeeSting", "CowTipper", "DodoDaniel", "Eeliminator"]];


  playerObject = {
    name: "Test",
    playerId: 0,
    isAlive: true,
    agentProper: "Jett",
    isObserved: false,
    initialShield: this.shieldOrder[0],
    money: 2100,
    moneySpent: 2900,
    highestWeapon: this.weaponOrder[0],
    isCaptain: false,
    currUltPoints: 2,
    maxUltPoints: 7,
    ultReady: false,
    hasSpike: false,
    kills: 0,
    deaths: 0,
    assists: 0
  };

  constructor() {
    this.changeStats();
    this.playerObject.playerId = Math.floor(Math.random() * (99999 - 11111 + 1) + 11111);
  }

  ngOnDestroy() {
    PlayerControllerComponent.agentIndex[this.teamId]--;
    PlayerControllerComponent.playerNameIndex[this.teamId]--;
  }

  getData(): any {
    this.playerObject.agentProper = PlayerControllerComponent.agentOrder[this.teamId][PlayerControllerComponent.agentIndex[this.teamId]++];
    this.playerObject.name = PlayerControllerComponent.playerNameOrder[this.teamId][PlayerControllerComponent.playerNameIndex[this.teamId]++];
    return this.playerObject;
  }

  kill(): void {
    this.playerObject.isAlive = false;
    this.stopSpectate();
    this.playerObject.initialShield = this.shieldOrder[2];
  }

  revive(): void {
    this.playerObject.isAlive = true;
    this.playerObject.initialShield = this.shieldOrder[0];
  }

  giveUltPoint(): void {
    this.playerObject.currUltPoints++;
    if (this.playerObject.currUltPoints == this.playerObject.maxUltPoints) {
      this.playerObject.ultReady = true;
    }
  }

  useUlt(): void {
    this.playerObject.ultReady = false;
    this.playerObject.currUltPoints = 0;
  }

  makeLeader(): void {
    this.captainTakenEvent.emit();
    this.playerObject.isCaptain = true;
  }

  removeLeader(): void {
    this.playerObject.isCaptain = false;
  }

  giveSpike(): void {
    this.spikeTakenEvent.emit();
    this.playerObject.hasSpike = true;
  }

  removeSpike(): void {
    this.playerObject.hasSpike = false;
  }

  spectate(): void {
    this.spectateTakenEvent.emit();
    this.playerObject.isObserved = true;
  }

  stopSpectate(): void {
    this.playerObject.isObserved = false;
  }

  changeWeapon(): void {
    var i = this.weaponOrder.findIndex(e => e == this.playerObject.highestWeapon);
    i++;
    i %= this.weaponOrder.length;
    this.playerObject.highestWeapon = this.weaponOrder[i];

    //money change here
    var j = this.moneyOrder.findIndex(e => e == this.playerObject.moneySpent);
    this.playerObject.money += this.playerObject.moneySpent;
    j++;
    j %= this.moneyOrder.length;
    this.playerObject.moneySpent = this.moneyOrder[j];
    this.playerObject.money -= this.playerObject.moneySpent;
  }

  changeShield(): void {
    var i = this.shieldOrder.findIndex(e => e == this.playerObject.initialShield);
    i++;
    i %= this.shieldOrder.length;
    this.playerObject.initialShield = this.shieldOrder[i];
  }

  changeStats(): void {
    this.playerObject.kills = Math.floor(Math.random() * 20);
    this.playerObject.deaths = Math.floor(Math.random() * 20);
    this.playerObject.assists = Math.floor(Math.random() * 20);
  }
}
