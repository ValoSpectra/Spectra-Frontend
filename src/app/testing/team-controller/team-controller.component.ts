import {
  booleanAttribute,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  numberAttribute,
  Output,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { PlayerControllerComponent } from "../player-controller/player-controller.component";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-team-controller",
  templateUrl: "./team-controller.component.html",
  styleUrl: "./team-controller.component.scss",
  imports: [NgIf],
  standalone: false,
})
export class TeamControllerComponent {
  @ViewChild("playerControllerSpace", { read: ViewContainerRef })
  playerControllerSpace!: ViewContainerRef;
  @Output() roundWinEvent = new EventEmitter<void>();
  @Output() spectateTakenEvent = new EventEmitter<void>();
  @Input({ transform: booleanAttribute }) flipInterface = false;
  @Input({ transform: numberAttribute }) teamId = 0;
  @Input() teamName!: string;
  @Input() teamCode!: string;

  _roundPhase: "shopping" | "combat" | "end" = "combat";
  @Input()
  set roundPhase(s: "shopping" | "combat" | "end") {
    this._roundPhase = s;
    this.propagateRoundPhase(s);
  }
  get roundPhase() {
    return this._roundPhase;
  }

  _showInterface = true;
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
    hasDuplicateAgents: false,
  };

  getData(): any {
    this.teamObject.teamName = this.teamName;
    this.teamObject.teamTricode = this.teamCode;
    return this.teamObject;
  }

  addPlayer(): void {
    const newPlayerControllerRef =
      this.playerControllerSpace.createComponent<PlayerControllerComponent>(
        PlayerControllerComponent,
      );
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

    for (const playerController of this.playerControllers) {
      const player = playerController.instance;
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
    for (const playerController of this.playerControllers) {
      playerController.instance.removeSpike();
    }
  }

  captainCleanse(): void {
    for (const playerController of this.playerControllers) {
      playerController.instance.removeLeader();
    }
  }

  private clearSpectate(): void {
    this.spectateCleanse();
    this.spectateTakenEvent.emit();
  }

  spectateCleanse(): void {
    for (const playerController of this.playerControllers) {
      playerController.instance.stopSpectate();
    }
  }

  propagateInterfaceState(state: boolean) {
    for (const playerController of this.playerControllers) {
      playerController.instance.showInterface = state;
    }
  }

  propagateRoundPhase(phase: "shopping" | "combat" | "end") {
    for (const playerController of this.playerControllers) {
      playerController.instance.gamePhase = phase;
    }
  }
}
