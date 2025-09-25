import { Component, inject } from "@angular/core";
import { MatchOverlayComponent } from "../overlays/match-overlay/match-overlay.component";
import { AgentSelectOverlayComponent } from "../overlays/agent-select-overlay/agent-select-overlay.component";
import { DataModelService } from "../services/dataModel.service";

@Component({
  selector: "app-autoswitch",
  templateUrl: "./autoswitch.component.html",
  styleUrl: "./autoswitch.component.css",
  imports: [MatchOverlayComponent, AgentSelectOverlayComponent],
})
export class AutoswitchComponent {
  readonly dataModel = inject(DataModelService);
}
