/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AgentRoleService {
  static getAgentRole(agent: string) {
    return AgentRole[agent as keyof typeof AgentRole];
  }
}

enum AgentRole {
  "Aggrobot" = "Initiator",
  "BountyHunter" = "Initiator",
  "Breach" = "Initiator",
  "Cable" = "Sentinel",
  "Cashew" = "Initiator",
  "Clay" = "Duelist",
  "Deadeye" = "Sentinel",
  "Grenadier" = "Initiator",
  "Guide" = "Initiator",
  "Gumshoe" = "Sentinel",
  "Hunter" = "Initiator",
  "Killjoy" = "Sentinel",
  "Mage" = "Controller",
  "Nox" = "Sentinel",
  "Pandemic" = "Controller",
  "Pine" = "Sentinel",
  "Phoenix" = "Duelist",
  "Rift" = "Controller",
  "Sarge" = "Controller",
  "Sequoia" = "Duelist",
  "Smonk" = "Controller",
  "Sprinter" = "Duelist",
  "Stealth" = "Duelist",
  "Terra" = "Duelist",
  "Thorne" = "Sentinel",
  "Vampire" = "Duelist",
  "Wraith" = "Controller",
  "Wushu" = "Duelist",
}
