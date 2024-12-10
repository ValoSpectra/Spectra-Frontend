import { Component, Input } from "@angular/core";

@Component({
  selector: "app-combat",
  templateUrl: "./combat.component.html",
  styleUrls: ["./combat.component.scss"],
})
export class CombatComponent {
  @Input() match!: any;

  trackByPlayerId(index: number, player: any) {
    return player.playerId;
  }

  numSequence(n: number): number[] {
    return Array(n);
  }
}
