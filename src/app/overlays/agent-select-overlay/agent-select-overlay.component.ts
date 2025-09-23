import { Component, inject } from "@angular/core";
import { DataModelService } from "../../services/dataModel.service";
import { AgentSelectPlayerInfoComponent } from "../../components/agent-select/player-info/player-info.component";

@Component({
  selector: "app-agent-select-overlay",
  imports: [AgentSelectPlayerInfoComponent],
  templateUrl: "./agent-select-overlay.component.html",
  styleUrl: "./agent-select-overlay.component.css",
})
export class AgentSelectOverlayComponent {
  readonly dataModel = inject(DataModelService);
}
