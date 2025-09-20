import { Component, computed, inject } from "@angular/core";
import {
  PlayerscoreComponent,
  PlayerscoreMinimalComponent,
} from "../playerscore/playerscore.component";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-scoreboard-new",
  imports: [PlayerscoreComponent, PlayerscoreMinimalComponent],
  templateUrl: "./scoreboard.component.html",
  styleUrl: "./scoreboard.component.css",
})
export class ScoreboardComponent {
  dataModel = inject(DataModelService);

  isShown = computed(() => this.dataModel.match().roundPhase === "shopping");
}
