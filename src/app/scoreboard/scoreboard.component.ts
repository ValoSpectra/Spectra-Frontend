import { Component, Input } from "@angular/core";

@Component({
  selector: "app-scoreboard",
  templateUrl: "./scoreboard.component.html",
  styleUrls: ["./scoreboard.component.scss"],
})
export class ScoreboardComponent {
  @Input() match!: any;

  trackByPlayerId(index: number, player: any) {
    return player.playerId;
  }

  numSequence(n: number): number[] {
    return Array(n);
  }
}
