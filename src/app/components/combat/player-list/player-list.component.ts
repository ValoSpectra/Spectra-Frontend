import { Component, computed, effect, inject, signal } from "@angular/core";
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

  private lastRoundNumber = signal<number>(-1);
  private oneVersusOneTriggered = signal<boolean>(false);

  constructor() {
    // Effect to track round changes and 1v1 state
    effect(() => {
      const currentRound = this.dataModel.match().roundNumber;
      const previousRound = this.lastRoundNumber();

      // Reset 1v1 state when round changes
      if (currentRound !== previousRound) {
        this.oneVersusOneTriggered.set(false);
        this.lastRoundNumber.set(currentRound);
      }

      // Check if 1v1 condition is met
      const teams = this.dataModel.teams();
      const aliveLeft = teams[0].players.filter((p: any) => p.isAlive).length;
      const aliveRight = teams[1].players.filter((p: any) => p.isAlive).length;

      if (aliveLeft === 1 && aliveRight === 1) {
        this.oneVersusOneTriggered.set(true);
      } else {
        this.oneVersusOneTriggered.set(false);
      }
    });
  }

  isOneVersusOne = computed(() => this.oneVersusOneTriggered());

  isShown = computed(() => {
    const rightPhase = this.dataModel.match().roundPhase !== "shopping";
    const not1v1 = !this.isOneVersusOne();
    return rightPhase && not1v1;
  });

  delayClass(index: number): string {
    const ret = `animate-delay-${(4 - index) * 50 + 100}`;
    return ret;
  }
}
