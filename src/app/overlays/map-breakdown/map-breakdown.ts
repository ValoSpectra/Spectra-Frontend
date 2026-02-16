import { HttpClient } from "@angular/common/http";
import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import {
  StatsApiMatch,
  StatsApiMatchTeam,
  StatsApiMatchPlayer,
  StatsApiMatchResponse,
  StatsApiCeremonies,
  StatsApiWinReasons,
} from "../../components/breakdown/StatsApiMapping";
import { TranslateKeys } from "../../services/i18nHelper";
import { Config } from "../../shared/config";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-map-breakdown",
  imports: [TranslatePipe],
  templateUrl: "./map-breakdown.html",
  styleUrl: "./map-breakdown.css",
})
export class MapBreakdown implements OnInit, OnDestroy {
  protected config = inject(Config);
  private leftTeamName = "Blue";
  private rightTeamName = "Red";

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

  protected leftFirstKills = 0;
  protected rightFirstKills = 0;

  protected leftTotalKills = 0;
  protected rightTotalKills = 0;

  protected leftAverageACS = 0;
  protected rightAverageACS = 0;

  protected leftAverageLoadoutValue = 0;
  protected rightAverageLoadoutValue = 0;

  protected leftRetakeRate = 0;
  protected rightRetakeRate = 0;

  protected leftKillTradeRate = 0;
  protected rightKillTradeRate = 0;

  protected leftThrifties = 0;
  protected leftAces = 0;
  protected leftClutches = 0;
  protected leftFlawless = 0;
  protected leftWonPostPlants = 0;

  protected rightThrifties = 0;
  protected rightAces = 0;
  protected rightClutches = 0;
  protected rightFlawless = 0;
  protected rightWonPostPlants = 0;

  protected roundReasons: Record<
    number,
    { winner: 0 | 1; reason: "defused" | "detonated" | "kills" | "timeout" }
  > = {};

  private hasReceivedData = false;
  private pollTimerRef?: ReturnType<typeof setInterval>;
  private routeSubscription?: Subscription;

  ngOnInit() {
    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      this.hideBg = params["hideBg"] === "true" || params["hideBg"] === "1";
      let groupCode = params["groupCode"];
      if (groupCode) {
        groupCode = groupCode.toUpperCase();
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

    this.leftPlayers.forEach((player) => {
      this.leftAverageACS += player.stats.acs || 0;
    });
    this.rightPlayers.forEach((player) => {
      this.rightAverageACS += player.stats.acs || 0;
    });

    this.leftAverageACS = Math.round(this.leftAverageACS / (this.leftPlayers?.length || 1));
    this.rightAverageACS = Math.round(this.rightAverageACS / (this.rightPlayers?.length || 1));

    this.leftTotalKills = this.leftPlayers.reduce(
      (sum, player) => sum + (player.stats.kills || 0),
      0,
    );
    this.rightTotalKills = this.rightPlayers.reduce(
      (sum, player) => sum + (player.stats.kills || 0),
      0,
    );

    this.calculateKillTradeRates();

    this.leftAverageLoadoutValue = Math.round(
      this.leftPlayers.reduce(
        (sum, player) => sum + (player.economy.loadout_value.average || 0),
        0,
      ) / (this.leftPlayers?.length || 1),
    );
    this.rightAverageLoadoutValue = Math.round(
      this.rightPlayers.reduce(
        (sum, player) => sum + (player.economy.loadout_value.average || 0),
        0,
      ) / (this.rightPlayers?.length || 1),
    );

    let leftRetakeOpportunities = 0;
    let rightRetakeOpportunities = 0;
    let leftRetakeSuccesses = 0;
    let rightRetakeSuccesses = 0;

    this.statsData.rounds.forEach((round) => {
      if (round.plant != null) {
        if (round.plant.player.team === this.rightTeamName) {
          leftRetakeOpportunities++;
          if (round.winning_team === this.leftTeamName) {
            leftRetakeSuccesses++;
          }
        } else if (round.plant.player.team === this.leftTeamName) {
          rightRetakeOpportunities++;
          if (round.winning_team === this.rightTeamName) {
            rightRetakeSuccesses++;
          }
        }
      }

      switch (round.ceremony) {
        case StatsApiCeremonies.Thrifty:
          if (round.winning_team === this.leftTeamName) {
            this.leftThrifties++;
          } else if (round.winning_team === this.rightTeamName) {
            this.rightThrifties++;
          }
          break;
        case StatsApiCeremonies.Ace:
          if (round.winning_team === this.leftTeamName) {
            this.leftAces++;
          } else if (round.winning_team === this.rightTeamName) {
            this.rightAces++;
          }
          break;
        case StatsApiCeremonies.Clutch:
          if (round.winning_team === this.leftTeamName) {
            this.leftClutches++;
          } else if (round.winning_team === this.rightTeamName) {
            this.rightClutches++;
          }
          break;
        case StatsApiCeremonies.Flawless:
          if (round.winning_team === this.leftTeamName) {
            this.leftFlawless++;
          } else if (round.winning_team === this.rightTeamName) {
            this.rightFlawless++;
          }
          break;
        default:
          break;
      }

      if (round.plant != null) {
        if (round.winning_team === this.leftTeamName) {
          this.leftWonPostPlants++;
        } else if (round.winning_team === this.rightTeamName) {
          this.rightWonPostPlants++;
        }
      }

      switch (round.result) {
        case StatsApiWinReasons.Timeout:
          this.roundReasons[round.id] = {
            winner: round.winning_team === this.leftTeamName ? 0 : 1,
            reason: "timeout",
          };
          break;
        case StatsApiWinReasons.Defused:
          this.roundReasons[round.id] = {
            winner: round.winning_team === this.leftTeamName ? 0 : 1,
            reason: "defused",
          };
          break;
        case StatsApiWinReasons.Detonated:
          this.roundReasons[round.id] = {
            winner: round.winning_team === this.leftTeamName ? 0 : 1,
            reason: "detonated",
          };
          break;
        case StatsApiWinReasons.Kills:
          this.roundReasons[round.id] = {
            winner: round.winning_team === this.leftTeamName ? 0 : 1,
            reason: "kills",
          };
          break;
        default:
          this.roundReasons[round.id] = {
            winner: round.winning_team === this.leftTeamName ? 0 : 1,
            reason: "timeout",
          };
          break;
      }
    });

    this.leftRetakeRate = Math.round((leftRetakeSuccesses / (leftRetakeOpportunities || 1)) * 100);
    this.rightRetakeRate = Math.round(
      (rightRetakeSuccesses / (rightRetakeOpportunities || 1)) * 100,
    );

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
      if (player.team_id === this.leftTeamName) {
        this.leftFirstKills += player.stats.firstKills || 0;
      } else if (player.team_id === this.rightTeamName) {
        this.rightFirstKills += player.stats.firstKills || 0;
      }
    }
  }

  private calculateKillTradeRates() {
    const kills = [...(this.statsData?.kills || [])].sort(
      (a, b) => a.round - b.round || a.time_in_round_in_ms - b.time_in_round_in_ms,
    );

    let leftEligibleKills = 0;
    let rightEligibleKills = 0;
    let leftTradedKills = 0;
    let rightTradedKills = 0;

    for (let index = 0; index < kills.length; index++) {
      const kill = kills[index];

      if (!kill?.killer?.puuid || !kill?.victim?.puuid) {
        continue;
      }

      if (kill.killer.team === kill.victim.team) {
        continue;
      }

      if (kill.killer.team === this.leftTeamName) {
        leftEligibleKills++;
      } else if (kill.killer.team === this.rightTeamName) {
        rightEligibleKills++;
      } else {
        continue;
      }

      let isTradedWithinFiveSeconds = false;
      for (let nextIndex = index + 1; nextIndex < kills.length; nextIndex++) {
        const nextKill = kills[nextIndex];

        if (nextKill.round !== kill.round) {
          break;
        }

        if (nextKill.time_in_round_in_ms - kill.time_in_round_in_ms > 5000) {
          break;
        }

        if (
          nextKill.killer.team === kill.victim.team &&
          nextKill.victim.puuid === kill.killer.puuid
        ) {
          isTradedWithinFiveSeconds = true;
          break;
        }
      }

      if (isTradedWithinFiveSeconds) {
        if (kill.killer.team === this.leftTeamName) {
          leftTradedKills++;
        } else {
          rightTradedKills++;
        }
      }
    }

    this.leftKillTradeRate = Math.round((leftTradedKills / (leftEligibleKills || 1)) * 100);
    this.rightKillTradeRate = Math.round((rightTradedKills / (rightEligibleKills || 1)) * 100);
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

  roundReasonValues() {
    return Object.values(this.roundReasons);
  }
}

export interface AuthTeam {
  name: string;
  tricode: string;
  url: string;
}
