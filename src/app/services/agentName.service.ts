import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AgentNameService {
  static getAgentName(agent: string) {
    return AgentName[agent as keyof typeof AgentName];
  }
}

enum AgentName {
  "Aggrobot" = "Gekko",
  "BountyHunter" = "Fade",
  "Breach" = "Breach",
  "Cable" = "Deadlock",
  "Cashew" = "Tejo",
  "Clay" = "Raze",
  "Deadeye" = "Chamber",
  "Grenadier" = "KAY/O",
  "Guide" = "Skye",
  "Gumshoe" = "Cypher",
  "Hunter" = "Sova",
  "Killjoy" = "Killjoy",
  "Mage" = "Harbor",
  "Nox" = "Vyse",
  "Pandemic" = "Viper",
  "Pine" = "Veto",
  "Phoenix" = "Phoenix",
  "Rift" = "Astra",
  "Sarge" = "Brimstone",
  "Sequoia" = "Iso",
  "Smonk" = "Clove",
  "Sprinter" = "Neon",
  "Stealth" = "Yoru",
  "Terra" = "Waylay",
  "Thorne" = "Sage",
  "Vampire" = "Reyna",
  "Wraith" = "Omen",
  "Wushu" = "Jett",
}
