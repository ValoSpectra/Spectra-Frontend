import { Component, inject } from "@angular/core";
import { DataModelService } from "../../services/dataModel.service";
import { AgentSelectPlayerInfoComponent } from "./player-info/player-info.component";

@Component({
  selector: "app-agent-select",
  imports: [AgentSelectPlayerInfoComponent],
  templateUrl: "./agent-select.component.html",
  styleUrl: "./agent-select.component.css",
})
export class AgentSelectComponent {
  readonly dataModel = inject(DataModelService);
}
