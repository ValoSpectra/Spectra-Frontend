import { Component, computed, inject } from "@angular/core";
import { DataModelService } from "../../../services/dataModel.service";
import { TranslateKeys } from "../../../services/i18nHelper";
import {
  PlayerScoreboardCardComponent,
  PlayerScoreboardCardMinimalComponent,
} from "../player-scoreboard-card/player-scoreboard-card.component";
import { ScoreboardOrderPipe } from "../../../pipes/scoreboardorder.pipe";
import { TimeoutCounter } from "../timeout-counter/timeout-counter";

@Component({
  selector: "app-scoreboard",
  imports: [
    PlayerScoreboardCardComponent,
    PlayerScoreboardCardMinimalComponent,
    ScoreboardOrderPipe,
    TimeoutCounter,
  ],
  templateUrl: "./scoreboard.component.html",
  styleUrl: "./scoreboard.component.css",
})
export class ScoreboardComponent {
  dataModel = inject(DataModelService);
  TranslateKeys = TranslateKeys;

  isShown = computed(() => this.dataModel.match().roundPhase === "shopping");

  shouldShowTimeoutCounter(teamIndex: number) {
    if (teamIndex == 0 && this.dataModel.timeoutState().leftTeam) return false;
    if (teamIndex == 1 && this.dataModel.timeoutState().rightTeam) return false;
    return this.dataModel.timeoutCounter().max > 0;
  }

  teamMoney(teamIndex: number): number {
    return this.dataModel.teams()[teamIndex].players.reduce((sum, player) => sum + player.money, 0);
  }

  teamSpent(teamIndex: number): number {
    return this.dataModel
      .teams()
      [teamIndex].players.reduce((sum, player) => sum + player.moneySpent, 0);
  }

  formatNumber(number: number): string {
    return this.dataModel.numberFormatter().format(number);
  }
}
