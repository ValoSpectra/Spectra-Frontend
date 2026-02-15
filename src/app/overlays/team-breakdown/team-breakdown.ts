import { Component, inject, OnDestroy, OnInit } from "@angular/core";
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
import { Subscription } from "rxjs";

@Component({
  selector: "app-team-breakdown",
  imports: [MvpPlayer, RegularPlayer, TranslatePipe],
  templateUrl: "./team-breakdown.html",
  styleUrl: "./team-breakdown.css",
})
export class TeamBreakdown implements OnInit, OnDestroy {
  protected config = inject(Config);
  private leftTeamName = "Red";
  private rightTeamName = "Blue";

  protected http = inject(HttpClient);
  protected route = inject(ActivatedRoute);
  TranslateKeys = TranslateKeys;

  protected hideBg = false;

  protected statsData?: StatsApiMatch;
  protected roundsPlayed = 0;

  protected leftTeam?: StatsApiMatchTeam;
  protected rightTeam?: StatsApiMatchTeam;

  protected leftPlayers?: StatsApiMatchPlayer[];
  protected rightPlayers?: StatsApiMatchPlayer[];

  private hasReceivedData = false;
  private pollTimerRef?: ReturnType<typeof setInterval>;
  private routeSubscription?: Subscription;

  ngOnInit() {
    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      this.hideBg = params["hideBg"] === "true" || params["hideBg"] === "1";
      const groupCode = params["groupCode"];
      if (groupCode) {
        this.hasReceivedData = false;
        this.stopPolling();
        this.fetchStats(groupCode);
        this.startPolling(groupCode);
      } else {
        this.stopPolling();
      }
    });
  }

  ngOnDestroy() {
    this.stopPolling();
    this.routeSubscription?.unsubscribe();
  }

  private startPolling(groupCode: string) {
    this.pollTimerRef = setInterval(() => {
      if (this.hasReceivedData) {
        this.stopPolling();
        return;
      }
      this.fetchStats(groupCode);
    }, 15000);
  }

  private stopPolling() {
    if (this.pollTimerRef) {
      clearInterval(this.pollTimerRef);
      this.pollTimerRef = undefined;
    }
  }

  private fetchStats(groupCode: string) {
    this.http
      .get<StatsApiMatchResponse>(`${this.config.statsEndpoint}/getStats`, {
        params: { code: groupCode },
      })
      .subscribe((response: StatsApiMatchResponse) => {
        if (this.hasReceivedData || !response.data?.players?.length) {
          return;
        }

        this.hasReceivedData = true;
        this.stopPolling();
        this.processStatsData(response.data, groupCode);
      });
  }

  processStatsData(data: StatsApiMatch, groupCode: string) {
    this.statsData = data;
    this.roundsPlayed = this.statsData.rounds.length;

    this.leftTeam = this.statsData.teams.find((team) => team.team_id === this.leftTeamName);
    this.rightTeam = this.statsData.teams.find((team) => team.team_id === this.rightTeamName);

    // Do this here so that when the players get distributed they definitely have the info
    this.calculateFirstKills();

    this.leftPlayers = this.statsData.players.filter(
      (player) => player.team_id === this.leftTeamName,
    );
    this.rightPlayers = this.statsData.players.filter(
      (player) => player.team_id === this.rightTeamName,
    );

    this.leftPlayers.forEach((player) => {
      player.stats.acs = Math.round(player.stats.score / (this.roundsPlayed || 1));
    });
    this.rightPlayers.forEach((player) => {
      player.stats.acs = Math.round(player.stats.score / (this.roundsPlayed || 1));
    });

    this.leftPlayers.sort((a, b) => (b.stats.acs || 0) - (a.stats.acs || 0));
    this.rightPlayers.sort((a, b) => (b.stats.acs || 0) - (a.stats.acs || 0));

    this.http
      .get<{ leftTeam: AuthTeam; rightTeam: AuthTeam }>(
        `${this.config.extrasEndpoint}/getTeamInfoForCode`,
        {
          params: { groupCode },
        },
      )
      .subscribe((data: { leftTeam: AuthTeam; rightTeam: AuthTeam }) => {
        this.processTeamInfo(data);
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
