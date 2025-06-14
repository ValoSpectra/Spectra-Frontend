import { Component } from "@angular/core";
import { AgentSelectComponent } from "../agent-select/agent-select.component";
import { OverlayComponent } from "../overlay/overlay.component";

@Component({
  selector: "app-autoswitch",
  templateUrl: "./autoswitch.component.html",
  styleUrl: "./autoswitch.component.scss",
  imports: [AgentSelectComponent, OverlayComponent],
  standalone: false,
})
export class AutoswitchComponent {}
