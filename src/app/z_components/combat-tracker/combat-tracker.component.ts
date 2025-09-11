import { Component, computed, inject } from "@angular/core";
import { DataModelService } from "../../services/dataModel.service";
import { PlayerCombatCardComponent } from "../player-combat-card/player-combat-card.component";

@Component({
  selector: "app-combat-tracker",
  imports: [PlayerCombatCardComponent],
  templateUrl: "./combat-tracker.component.html",
  styleUrl: "./combat-tracker.component.css",
})
export class CombatTrackerComponent {
  dataModel = inject(DataModelService);

  isShown = computed(() => this.dataModel.match().roundPhase !== "shopping");

  delayClass(index: number): string {
    const ret = `animate-delay-${(5 - index) * 50 + 200}`;
    return ret;
  }
}
