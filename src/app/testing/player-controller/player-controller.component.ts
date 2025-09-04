import { booleanAttribute, Component, EventEmitter, Input, Output, OnDestroy } from "@angular/core";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-player-controller",
  templateUrl: "./player-controller.component.html",
  styleUrl: "./player-controller.component.scss",
  imports: [NgIf],
})
export class PlayerControllerComponent implements OnDestroy {
  @Output() spikeTakenEvent = new EventEmitter<void>();
  @Output() captainTakenEvent = new EventEmitter<void>();
  @Output() spectateTakenEvent = new EventEmitter<void>();

  @Input() showInterface = true;
  @Input({ transform: booleanAttribute }) flipInterface = false;

  @Input() teamId = 0;

  inCombat = true;
  inShopping = false;
  inEnd = false;
  @Input()
  set gamePhase(v: string) {
    if (v == "combat") {
      this.inCombat = true;
      this.inShopping = false;
      this.inEnd = false;
    } else if (v == "shopping") {
      this.inCombat = false;
      this.inShopping = true;
      this.inEnd = false;
    } else {
      this.inCombat = false;
      this.inShopping = false;
      this.inEnd = true;
    }
  }

  isAttacking = false;
  weaponOrder = ["Vandal", "Operator", "Classic", "Spectre"];
  moneyOrder = [2900, 4700, 0, 1600];
  armorOrder = ["Heavy", "Regen", "Light", "None"];

  static agentIndex = [0, 0];
  static agentOrder = [
    ["Vampire", "Killjoy", "Guide", "Stealth", "Smonk"],
    ["Grenadier", "Terra", "Sprinter", "BountyHunter", "Mage"],
  ];

  static playerNameIndex = [0, 0];
  static playerNameOrder = [
    ["VoodooOne", "Twoperator", "ThreeOfLife", "Fourcefield", "FIVEbyFIVE"],
    ["AlpacaHoarder", "BeeSting", "CowTipper", "DodoDaniel", "Eeliminator"],
  ];

  playerObject = {
    name: "Test",
    tagline: "DEBUG",
    searchName: "Test #DEBUG",
    fullName: "Test#DEBUG",
    playerId: 0,
    isAlive: true,
    agentInternal: "Wushu",
    isObserved: false,
    armorName: this.armorOrder[0],
    money: 2100,
    moneySpent: 2900,
    highestWeapon: this.weaponOrder[0],
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
    this.playerObject.agentInternal =
      PlayerControllerComponent.agentOrder[this.teamId][
        PlayerControllerComponent.agentIndex[this.teamId]++
      ];
    this.playerObject.isObserved =
      this.teamId === 0 && PlayerControllerComponent.playerNameIndex[this.teamId] === 0
        ? true
        : false;
    this.playerObject.name =
      PlayerControllerComponent.playerNameOrder[this.teamId][
        PlayerControllerComponent.playerNameIndex[this.teamId]++
      ];
    this.playerObject.searchName = `${this.playerObject.name} #${this.playerObject.tagline}`;
    this.playerObject.fullName = `${this.playerObject.name}#${this.playerObject.tagline}`;
    return this.playerObject;
  }

  kill(): void {
    this.playerObject.isAlive = false;
    this.stopSpectate();
    this.playerObject.armorName = this.armorOrder[3];
    this.playerObject.health = 0;
  }

  revive(): void {
    this.playerObject.isAlive = true;
    this.playerObject.armorName = this.armorOrder[0];
    this.playerObject.health = 100;
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
    let i = this.weaponOrder.findIndex((e) => e == this.playerObject.highestWeapon);
    i++;
    i %= this.weaponOrder.length;
    this.playerObject.highestWeapon = this.weaponOrder[i];

    //money change here
    let j = this.moneyOrder.findIndex((e) => e == this.playerObject.moneySpent);
    this.playerObject.money += this.playerObject.moneySpent;
    j++;
    j %= this.moneyOrder.length;
    this.playerObject.moneySpent = this.moneyOrder[j];
    this.playerObject.money -= this.playerObject.moneySpent;
  }

  changeShield(): void {
    let i = this.armorOrder.findIndex((e) => e == this.playerObject.armorName);
    i++;
    i %= this.armorOrder.length;
    this.playerObject.armorName = this.armorOrder[i];
    this.playerObject.health = Math.floor(Math.random() * 100) + 1;
  }

  changeStats(): void {
    this.playerObject.kills = Math.floor(Math.random() * 20);
    this.playerObject.deaths = Math.floor(Math.random() * 20);
    this.playerObject.assists = Math.floor(Math.random() * 20);
  }
}
