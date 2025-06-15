import { Component, Input } from "@angular/core";
import { AgentRoleService } from "../../services/agentRole.service";
import { trigger, transition, style, animate } from "@angular/animations";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-select-player-info",
  templateUrl: "./select-player-info.component.html",
  styleUrl: "./select-player-info.component.scss",
  animations: [
    trigger("lockAnimation", [
      transition("false => true, void => true", [
        style({ filter: "grayscale(1) brightness(200%)" }),
        animate("350ms", style({ filter: "grayscale(0) brightness(100%)" })),
      ]),
    ]),
    trigger("characterSwitch", [
      transition("* <=> *", [style({ opacity: "0" }), animate("100ms", style({ opacity: "1" }))]),
    ]),
  ],
  imports: [NgClass],
})
export class SelectPlayerInfoComponent {
  @Input() player: any;
  @Input() color: "attacker" | "defender" = "attacker";

  getAgentRole(agent: string) {
    return AgentRoleService.getAgentRole(agent);
  }
}
