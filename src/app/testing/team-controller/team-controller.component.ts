import { booleanAttribute, Component, ComponentRef, EventEmitter, Input, numberAttribute, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { PlayerControllerComponent } from '../player-controller/player-controller.component';

@Component({
  selector: 'app-team-controller',
  templateUrl: './team-controller.component.html',
  styleUrl: './team-controller.component.scss'
})
export class TeamControllerComponent {

  @ViewChild("playerControllerSpace", {read: ViewContainerRef}) playerControllerSpace!: ViewContainerRef;
  @Output() roundWinEvent = new EventEmitter<void>();
  @Output() spectateTakenEvent = new EventEmitter<void>();
  @Input({transform: booleanAttribute}) flipInterface: boolean = false;
  @Input({transform: numberAttribute}) teamId: number = 0;
  @Input() teamName!: string;
  @Input() teamCode!: string;

  _roundPhase: "shopping" | "combat" = "combat";
  @Input() 
  set roundPhase(s: "shopping" | "combat") {
    this._roundPhase = s;
    this.propagateRoundPhase(s);
  }
  get roundPhase() {
    return this._roundPhase;
  }

  _showInterface: boolean = true;
  @Input() 
  set showInterface(b: boolean) {
    this._showInterface = b;
    this.propagateInterfaceState(b);
  }
  get showInterface() {
    return this._showInterface;
  }

  playerControllers: ComponentRef<PlayerControllerComponent>[] = [];

  players: PlayerControllerComponent[] = [];
  teamObject = {
    players: this.players,
    isAttacking: false,
    teamName: "Team Name",
    teamTricode: "TEAM",
    teamUrl: "assets/misc/icon.webp",
    roundsWon: 0,
    spentThisRound: 1000,
    roundRecord: [],
  };

  getData(): any {
    this.teamObject.teamName = this.teamName;
    this.teamObject.teamTricode = this.teamCode;
    return this.teamObject;
  }

  addPlayer(): void {
    const newPlayerControllerRef = this.playerControllerSpace.createComponent<PlayerControllerComponent>(PlayerControllerComponent);
    this.playerControllers.push(newPlayerControllerRef);

    newPlayerControllerRef.instance.isAttacking = this.teamObject.isAttacking;
    newPlayerControllerRef.instance.showInterface = this.showInterface;
    newPlayerControllerRef.instance.flipInterface = this.flipInterface;
    newPlayerControllerRef.instance.gamePhase = this.roundPhase;
    newPlayerControllerRef.instance.teamId = this.teamId;
    newPlayerControllerRef.instance.spikeTakenEvent.subscribe(this.spikeCleanse.bind(this));
    newPlayerControllerRef.instance.captainTakenEvent.subscribe(this.captainCleanse.bind(this));
    newPlayerControllerRef.instance.spectateTakenEvent.subscribe(this.clearSpectate.bind(this));

    this.players.push(newPlayerControllerRef.instance.getData());
  }

  removePlayer(): void {
    const playerController = this.playerControllers.pop();
    playerController?.destroy();
    this.players.pop();
  }

  swapColor(): void {
    this.teamObject.isAttacking = !this.teamObject.isAttacking;

    for (let i = 0; i < this.playerControllers.length; i++) {
      const player = this.playerControllers[i].instance;
      player.isAttacking = this.teamObject.isAttacking;
      player.removeSpike();
    }
  }

  addRoundwin(): void {
    this.teamObject.roundsWon++;
    this.teamObject.roundsWon %= 13;
    this.roundWinEvent.emit();
  }

  spikeCleanse(): void {
    for (let i = 0; i < this.playerControllers.length; i++) {
      this.playerControllers[i].instance.removeSpike();
    }
  }

  captainCleanse(): void {
    for (let i = 0; i < this.playerControllers.length; i++) {
      this.playerControllers[i].instance.removeLeader();
    }
  }
  
  private clearSpectate(): void {
    this.spectateCleanse();
    this.spectateTakenEvent.emit();
  }

  spectateCleanse(): void {
    for (let i = 0; i < this.playerControllers.length; i++) {
      this.playerControllers[i].instance.stopSpectate();
    }
  }

  propagateInterfaceState(state: boolean) {
    for (let i = 0; i < this.playerControllers.length; i++) {
      this.playerControllers[i].instance.showInterface = state;
    }
  }

  propagateRoundPhase(phase: "shopping" | "combat") {
    for (let i = 0; i < this.playerControllers.length; i++) {
      this.playerControllers[i].instance.gamePhase = phase;
    }
  }

}
