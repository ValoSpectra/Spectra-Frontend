import { Component, Input } from "@angular/core";
import { AgentNameService } from "../../services/agentName.service";
import { AgentRoleService } from "../../services/agentRole.service";
import { NgIf, NgFor } from "@angular/common";
import { AbilitiesComponent } from "../../abilities/abilities.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-playerscore",
  templateUrl: "./playerscore.component.html",
  styleUrls: ["./playerscore.component.scss"],
  imports: [NgIf, NgFor, AbilitiesComponent],
})
export class PlayerscoreComponent {
  public readonly assets: string = "../../../assets";

  @Input() match!: any;
  @Input() player!: any;
  @Input() color!: "attacker" | "defender";
  @Input() side!: "left" | "right";
  @Input() hideAuxiliary = false;

  get showAssistCounts() {
    return this.match.teams.findIndex((e: any) => e.hasDuplicateAgents) == -1;
  }

  numSequence(n: number): number[] {
    return Array(n);
  }

  getAgentName(agent: string): string {
    return AgentNameService.getAgentName(agent);
  }

  getAgentRole(agent: string): string {
    return AgentRoleService.getAgentRole(agent);
  }
}

@Component({
  selector: "app-playerscore-minimal",
  templateUrl: "./playerscore-minimal.component.html",
  styleUrls: ["./playerscore.component.scss"],
  imports: [TranslateModule, NgIf],
})
export class PlayerscoreMinimalComponent extends PlayerscoreComponent {}
