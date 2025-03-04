import { Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-combat",
  templateUrl: "./combat.component.html",
  styleUrls: ["./combat.component.scss"],
})
export class CombatComponent {
  @Input() match!: any;

  constructor(private route: ActivatedRoute) {}

  isMinimal(): boolean {
    if (this.route.snapshot.data["minimal"]) {
      return this.route.snapshot.data["minimal"];
    } else {
      return false;
    }
  }

  trackByPlayerId(index: number, player: any) {
    return player.playerId;
  }

  numSequence(n: number): number[] {
    return Array(n);
  }
}
