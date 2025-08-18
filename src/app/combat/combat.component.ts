import { Component, Input, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgIf, NgFor } from "@angular/common";
import {
  InhouseTrackerPlayercardComponent,
  InhouseTrackerPlayercardMinimalComponent,
} from "./playercard/playercard.component";

@Component({
  selector: "app-combat",
  templateUrl: "./combat.component.html",
  styleUrls: ["./combat.component.scss"],
  imports: [
    NgIf,
    NgFor,
    InhouseTrackerPlayercardComponent,
    InhouseTrackerPlayercardMinimalComponent,
  ],
})
export class CombatComponent {
  private route = inject(ActivatedRoute);

  @Input() match!: any;
  @Input() hideAuxiliary = false;

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
