import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { DataModelService } from "./dataModel.service";

@Injectable({
  providedIn: "root",
})
export class OneVersusOneService {
  private dataModel = inject(DataModelService);

  private oneVersusOneTriggered = signal<boolean>(false);
  private storedLeftPlayerIndex = signal<number>(2);
  private storedRightPlayerIndex = signal<number>(2);

  constructor() {
    effect(() => {
      const teams = this.dataModel.teams();
      const aliveLeft = teams[0].players.filter((p: any) => p.isAlive).length;
      const aliveRight = teams[1].players.filter((p: any) => p.isAlive).length;

      if (aliveLeft === 1 && aliveRight === 1) {
        this.oneVersusOneTriggered.set(true);
        const leftPlayerIndex = teams[0].players.findIndex((p: any) => p.isAlive);
        const rightPlayerIndex = teams[1].players.findIndex((p: any) => p.isAlive);
        this.storedLeftPlayerIndex.set(leftPlayerIndex);
        this.storedRightPlayerIndex.set(rightPlayerIndex);
      }
      if (this.oneVersusOneTriggered() && (aliveLeft >= 2 || aliveRight >= 2)) {
        this.oneVersusOneTriggered.set(false);
      }
    });
  }

  isOneVersusOne = computed(() => this.oneVersusOneTriggered());
  leftPlayerIndex = computed(() => this.storedLeftPlayerIndex());
  rightPlayerIndex = computed(() => this.storedRightPlayerIndex());

  leftPlayer = computed(() => {
    if (this.isOneVersusOne()) {
      const index = this.storedLeftPlayerIndex();
      return this.dataModel.teams()[0]?.players[index] || null;
    }
    return this.dataModel.teams()[0]?.players.find((p: any) => p.isAlive) || null;
  });

  rightPlayer = computed(() => {
    if (this.isOneVersusOne()) {
      const index = this.storedRightPlayerIndex();
      return this.dataModel.teams()[1]?.players[index] || null;
    }
    return this.dataModel.teams()[1]?.players.find((p: any) => p.isAlive) || null;
  });
}
