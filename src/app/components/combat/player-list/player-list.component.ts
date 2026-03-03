import { Component, computed, inject } from "@angular/core";
import {
  PlayerCombatCardComponent,
  PlayerCombatCardMinimalComponent,
} from "../player-combat-card/player-combat-card.component";
import { DataModelService } from "../../../services/dataModel.service";
import { OneVersusOneService } from "../../../services/1v1.service";

@Component({
  selector: "app-combat-player-list",
  imports: [PlayerCombatCardComponent, PlayerCombatCardMinimalComponent],
  templateUrl: "./player-list.component.html",
  styleUrl: "./player-list.component.css",
})
export class CombatPlayerListComponent {
  dataModel = inject(DataModelService);
  readonly oneVsOneService = inject(OneVersusOneService);

  isOneVersusOne = computed(() => this.oneVsOneService.isOneVersusOne());

  isShown = computed(() => {
    if (this.dataModel.match().roundPhase == "shopping") return false;
    return !this.isOneVersusOne();
  });

  delayClass(index: number): string {
    return `animate-delay-${(4 - index) * 50 + 100}`;
  }
}
