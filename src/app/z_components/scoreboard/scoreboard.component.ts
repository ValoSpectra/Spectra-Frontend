import { Component, inject, Input } from "@angular/core";
import { PlayerscoreComponent } from "../playerscore/playerscore.component";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-scoreboard-new",
  imports: [PlayerscoreComponent],
  templateUrl: "./scoreboard.component.html",
  styleUrl: "./scoreboard.component.css",
})
export class ScoreboardComponent {
  dataModel = inject(DataModelService);
}
