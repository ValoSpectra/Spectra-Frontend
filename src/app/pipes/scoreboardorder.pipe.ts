import { Pipe, type PipeTransform } from "@angular/core";

@Pipe({ name: "appScoreboardOrder" })
export class ScoreboardOrderPipe implements PipeTransform {
  transform(players: any): MinPlayer[] {
    if (!Array.isArray(players)) return [];

    players.sort((a: any, b: any) => {
      if (a.kills < b.kills) return 1;
      if (a.kills > b.kills) return -1;
      // If kills are identical, sort by deaths (higher KDA first)
      if (a.deaths < b.deaths) return -1;
      return 0;
    });
    return players;
  }
}

export interface MinPlayer {
  playerId: string;
  kills: number;
  deaths: number;
  maxUltPoints: number;
}
