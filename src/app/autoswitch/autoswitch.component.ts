import { Component } from "@angular/core";
import { AgentSelectComponent } from "../agent-select/agent-select.component";
import { OverlayComponent } from "../overlay/overlay.component";
import { MatchOverlayComponent } from "../z_overlays/match-overlay/match-overlay.component";

@Component({
  selector: "app-autoswitch",
  templateUrl: "./autoswitch.component.html",
  styleUrl: "./autoswitch.component.scss",
  imports: [AgentSelectComponent, OverlayComponent, MatchOverlayComponent],
})
export class AutoswitchComponent {}
