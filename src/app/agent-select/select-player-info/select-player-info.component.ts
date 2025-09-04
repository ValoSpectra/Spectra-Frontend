import { Component, Input } from "@angular/core";
import { AgentRoleService } from "../../services/agentRole.service";
import { trigger, transition, style, animate } from "@angular/animations";
import { NgClass } from "@angular/common";
import { NameoverridePipe } from "../../pipes/nameoverride.pipe";

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
  imports: [NgClass, NameoverridePipe],
})
export class SelectPlayerInfoComponent {
  @Input() player: any;
  @Input() color: "attacker" | "defender" = "attacker";
  @Input() overrideNames = new Map<string, string>();

  getAgentRole(agent: string) {
    return AgentRoleService.getAgentRole(agent);
  }

  getOverrideNames(): Map<string, string> {
    let toReturn = this.overrideNames;
    if (!toReturn) {
      toReturn = new Map<string, string>();
    }
    return toReturn;
  }
}
