import { Component, computed, inject } from "@angular/core";
import {
  PlayerscoreComponent,
  PlayerscoreMinimalComponent,
} from "../playerscore/playerscore.component";
import { DataModelService } from "../../services/dataModel.service";
import { TranslatePipe } from "@ngx-translate/core";
import { TranslateKeys } from "../../services/i18nHelper";

@Component({
  selector: "app-scoreboard-new",
  imports: [PlayerscoreComponent, PlayerscoreMinimalComponent, TranslatePipe],
  templateUrl: "./scoreboard.component.html",
  styleUrl: "./scoreboard.component.css",
})
export class ScoreboardComponent {
  dataModel = inject(DataModelService);
  TranslateKeys = TranslateKeys;

  isShown = computed(() => this.dataModel.match().roundPhase === "shopping");
}
