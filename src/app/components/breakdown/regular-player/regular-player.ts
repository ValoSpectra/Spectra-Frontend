import { Component, Input, OnInit } from "@angular/core";
import { AgentNameService } from "../../../services/agentName.service";
import { AgentRoleService } from "../../../services/agentRole.service";
import { StatsApiMatchPlayer } from "../StatsApiMapping";

@Component({
  selector: "app-regular-player",
  imports: [],
  templateUrl: "./regular-player.html",
  styleUrl: "./regular-player.css",
})
export class RegularPlayer implements OnInit {
  @Input({ required: true })
  player!: StatsApiMatchPlayer;

  @Input()
  isRight = false;

  agentInternalName = "";

  ngOnInit() {
    this.agentInternalName = AgentNameService.getAgentInternalName(this.player.agent.name!)!;
  }

  getAgentRole(name: string): string {
    return AgentRoleService.getAgentRole(name);
  }

  round(num: number) {
    return Math.round(num);
  }
}
