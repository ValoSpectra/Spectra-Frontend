import { Component, computed, inject } from "@angular/core";
import { DataModelService } from "../../../services/dataModel.service";
import { TranslatePipe } from "@ngx-translate/core";
import { TranslateKeys } from "../../../services/i18nHelper";
import {
  PlayerScoreboardCardComponent,
  PlayerScoreboardCardMinimalComponent,
} from "../player-scoreboard-card/player-scoreboard-card.component";

@Component({
  selector: "app-scoreboard",
  imports: [TranslatePipe, PlayerScoreboardCardComponent, PlayerScoreboardCardMinimalComponent],
  templateUrl: "./scoreboard.component.html",
  styleUrl: "./scoreboard.component.css",
})
export class ScoreboardComponent {
  dataModel = inject(DataModelService);
  TranslateKeys = TranslateKeys;

  isShown = computed(() => this.dataModel.match().roundPhase === "shopping");
}
