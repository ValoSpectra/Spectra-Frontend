import { Component, computed, inject } from "@angular/core";
import { DataModelService } from "../../../services/dataModel.service";
import { TranslateKeys } from "../../../services/i18nHelper";
import {
  PlayerScoreboardCardComponent,
  PlayerScoreboardCardMinimalComponent,
} from "../player-scoreboard-card/player-scoreboard-card.component";
import { ScoreboardOrderPipe } from "../../../pipes/scoreboardorder.pipe";

@Component({
  selector: "app-scoreboard",
  imports: [
    PlayerScoreboardCardComponent,
    PlayerScoreboardCardMinimalComponent,
    ScoreboardOrderPipe,
  ],
  templateUrl: "./scoreboard.component.html",
  styleUrl: "./scoreboard.component.css",
})
export class ScoreboardComponent {
  dataModel = inject(DataModelService);
  TranslateKeys = TranslateKeys;

  isShown = computed(() => this.dataModel.match().roundPhase === "shopping");

  teamMoney(teamIndex: number): number {
    return this.dataModel.teams()[teamIndex].players.reduce((sum, player) => sum + player.money, 0);
  }

  teamSpent(teamIndex: number): number {
    return this.dataModel
      .teams()
      [teamIndex].players.reduce((sum, player) => sum + player.moneySpent, 0);
  }
}
