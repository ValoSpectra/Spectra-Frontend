import { Component, computed, inject } from "@angular/core";
import {
  PlayerCombatCardComponent,
  PlayerCombatCardMinimalComponent,
} from "../player-combat-card/player-combat-card.component";
import { DataModelService } from "../../../services/dataModel.service";

@Component({
  selector: "app-combat-player-list",
  imports: [PlayerCombatCardComponent, PlayerCombatCardMinimalComponent],
  templateUrl: "./player-list.component.html",
  styleUrl: "./player-list.component.css",
})
export class CombatPlayerListComponent {
  dataModel = inject(DataModelService);

  isShown = computed(() => this.dataModel.match().roundPhase !== "shopping");

  delayClass(index: number): string {
    const ret = `animate-delay-${(4 - index) * 50 + 100}`;
    return ret;
  }
}
