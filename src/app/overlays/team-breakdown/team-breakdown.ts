import { Component, inject, OnInit } from "@angular/core";
import { Config } from "../../shared/config";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import {
  StatsApiMatch,
  StatsApiMatchPlayer,
  StatsApiMatchResponse,
  StatsApiMatchTeam,
} from "../../components/breakdown/StatsApiMapping";
import { MvpPlayer } from "../../components/breakdown/mvp-player/mvp-player";
import { RegularPlayer } from "../../components/breakdown/regular-player/regular-player";
import { TranslateKeys } from "../../services/i18nHelper";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-team-breakdown",
  imports: [MvpPlayer, RegularPlayer, TranslatePipe],
  templateUrl: "./team-breakdown.html",
  styleUrl: "./team-breakdown.css",
})
export class TeamBreakdown implements OnInit {
  protected config = inject(Config);

  protected http = inject(HttpClient);
  protected route = inject(ActivatedRoute);
  TranslateKeys = TranslateKeys;

  protected statsData?: StatsApiMatch;
  protected roundsPlayed = 0;

  protected leftTeam?: StatsApiMatchTeam;
  protected rightTeam?: StatsApiMatchTeam;

  protected leftPlayers?: StatsApiMatchPlayer[];
  protected rightPlayers?: StatsApiMatchPlayer[];

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const groupCode = params["groupCode"];
      if (groupCode) {
        this.http
          .get<StatsApiMatchResponse>(`${this.config.statsEndpoint}/getStats`, {
            params: { code: groupCode },
          })
          .subscribe((data: StatsApiMatchResponse) => {
            this.processStatsData(data.data, groupCode);
          });
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  processStatsData(data: StatsApiMatch, groupCode: string) {
    this.statsData = data;
    this.statsData.metadata.map.name = "Corrode";
    this.roundsPlayed = this.statsData.rounds.length;

    this.leftTeam = this.statsData.teams.find((team) => team.team_id === "Red");
    this.rightTeam = this.statsData.teams.find((team) => team.team_id === "Blue");

    // Do this here so that when the players get distributed they definitely have the info
    this.calculateFirstKills();

    this.leftPlayers = this.statsData.players.filter((player) => player.team_id === "Red");
    this.rightPlayers = this.statsData.players.filter((player) => player.team_id === "Blue");

    this.leftPlayers.forEach((player) => {
      player.stats.acs = Math.round(player.stats.score / (this.roundsPlayed || 1));
    });
    this.rightPlayers.forEach((player) => {
      player.stats.acs = Math.round(player.stats.score / (this.roundsPlayed || 1));
    });

    this.leftPlayers.sort((a, b) => (b.stats.acs || 0) - (a.stats.acs || 0));
    this.rightPlayers.sort((a, b) => (b.stats.acs || 0) - (a.stats.acs || 0));

    // this.http
    //   .get<{ leftTeam: AuthTeam; rightTeam: AuthTeam }>(
    //     `${this.config.extrasEndpoint}/getTeamInfoForCode`,
    //     {
    //       params: { groupCode },
    //     },
    //   )
    //   .subscribe((data: { leftTeam: AuthTeam; rightTeam: AuthTeam }) => {
    //     this.processTeamInfo(data);
    //   });

    this.processTeamInfo({
      leftTeam: {
        name: "G2 Esports",
        tricode: "G2",
        url: "https://eu.valospectra.com/assets/misc/icon.webp",
      },
      rightTeam: {
        name: "Fnatic",
        tricode: "FNC",
        url: "https://eu.valospectra.com/assets/misc/icon.webp",
      },
    });
  }

  calculateFirstKills() {
    const fkById: Record<string, number> = {};
    this.statsData?.players.forEach((player) => {
      fkById[player.puuid] = 0;
    });

    let currentRound = -1;
    for (const kill of this.statsData?.kills || []) {
      if (kill.round !== currentRound) {
        currentRound = kill.round;
        fkById[kill.killer.puuid] = (fkById[kill.killer.puuid] || 0) + 1;
      }
    }

    for (const player of this.statsData?.players || []) {
      player.stats.firstKills = fkById[player.puuid] || 0;
    }
  }

  processTeamInfo(teamInfo: { leftTeam: AuthTeam; rightTeam: AuthTeam }) {
    this.leftTeam = {
      ...this.leftTeam!,
      name: teamInfo.leftTeam.name,
      tricode: teamInfo.leftTeam.tricode,
      url: teamInfo.leftTeam.url,
    };
    this.rightTeam = {
      ...this.rightTeam!,
      name: teamInfo.rightTeam.name,
      tricode: teamInfo.rightTeam.tricode,
      url: teamInfo.rightTeam.url,
    };
  }

  numSequence(n: number): number[] {
    return Array(n);
  }
}

export interface AuthTeam {
  name: string;
  tricode: string;
  url: string;
}
