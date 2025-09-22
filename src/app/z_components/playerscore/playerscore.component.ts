import { Component, computed, inject, input, Input } from "@angular/core";
import { UltimateTrackerComponent } from "../ultimate-tracker/ultimate-tracker.component";
import { AbilitiesComponent } from "../abilities/abilities.component";
import { DataModelService } from "../../services/dataModel.service";
import { AgentNameService } from "../../services/agentName.service";
import { AgentRoleService } from "../../services/agentRole.service";
import { DisplayNameService } from "../../services/displayName.service";

@Component({
  selector: "app-playerscore-new",
  imports: [UltimateTrackerComponent, AbilitiesComponent],
  templateUrl: "./playerscore.component.html",
  styleUrl: "./playerscore.component.css",
})
export class PlayerscoreComponent {
  dataModel = inject(DataModelService);
  getDisplayName = inject(DisplayNameService).getDisplayName;

  @Input() player!: any;

  @Input() right = false;
  // @Input() color: "attacker" | "defender" = "defender";
  color = input<string>();

  readonly backgroundClass = computed(() => {
    return `bg-fade-${this.color()}-${this.right ? "right" : "left"}`;
  });

  readonly textColor = computed(() =>
    this.color() == "attacker" ? "text-attacker-shield/80" : "text-defender-shield/80",
  );

  getAgentName(agent: string) {
    return AgentNameService.getAgentName(agent);
  }

  getAgentRole(agent: string): string {
    return AgentRoleService.getAgentRole(agent);
  }
}

@Component({
  selector: "app-playerscore-minimal-new",
  imports: [],
  templateUrl: "./playerscore-minimal.component.html",
  styleUrl: "./playerscore.component.css",
})
export class PlayerscoreMinimalComponent extends PlayerscoreComponent {}
