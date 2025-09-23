import { Component, computed, inject, input, Input } from "@angular/core";
import { AgentNameService } from "../../../services/agentName.service";
import { AgentRoleService } from "../../../services/agentRole.service";
import { DataModelService } from "../../../services/dataModel.service";
import { DisplayNameService } from "../../../services/displayName.service";
import { UltimateTrackerComponent } from "../../common/ultimate-tracker/ultimate-tracker.component";
import { AbilitiesComponent } from "../../common/abilities/abilities.component";

@Component({
  selector: "app-playerscore-new",
  imports: [UltimateTrackerComponent, AbilitiesComponent],
  templateUrl: "./player-scoreboard-card.component.html",
  styleUrl: "./player-scoreboard-card.component.css",
})
export class PlayerScoreboardCardComponent {
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
  templateUrl: "./player-scoreboard-card-minimal.component.html",
  styleUrl: "./player-scoreboard-card.component.css",
})
export class PlayerScoreboardCardMinimalComponent extends PlayerScoreboardCardComponent {}
