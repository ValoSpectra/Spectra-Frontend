import { Component, inject, Input, OnInit } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { ActivatedRoute } from "@angular/router";
import { NgIf } from "@angular/common";
import { TopinfoComponent } from "../topscore/topinfo/topinfo.component";
import { TopscoreComponent } from "../topscore/topscore.component";
import { EndroundComponent } from "../endround/endround.component";
import { CombatComponent } from "../combat/combat.component";
import { ScoreboardComponent } from "../scoreboard/scoreboard.component";

@Component({
  selector: "app-tracker",
  templateUrl: "./tracker.component.html",
  styleUrls: ["./tracker.component.scss"],
  animations: [
    trigger("fade", [
      transition(":enter", [style({ opacity: "0" }), animate("0.5s", style({ opacity: "1" }))]),
      transition(":leave", animate("0.5s", style({ opacity: "0" }))),
    ]),
    trigger("fadeFast", [transition(":leave", animate("0.25s ease-out", style({ opacity: "0" })))]),
  ],
  imports: [
    NgIf,
    TopinfoComponent,
    TopscoreComponent,
    EndroundComponent,
    CombatComponent,
    ScoreboardComponent,
  ],
})
export class TrackerComponent implements OnInit {
  private route = inject(ActivatedRoute);

  @Input() hideAuxiliary = false;

  activelyTracking = false;
  currentTrackId: string | null = null;
  match: any = null;
  teamLeft: any = null;
  teamRight: any = null;

  ranksEnabled = false;
  ranksByName: any = {};

  async ngOnInit(): Promise<void> {
    //setting up with empty match state so certain ui parts dont complain
    this.match = {
      groupCode: "A",
      isRanked: false,
      isRunning: true,
      roundNumber: 0,
      roundPhase: "LOBBY",
      teams: [{ players: [] }, { players: [] }],
      spikeState: { planted: false },
      map: "Ascent",
      tools: {
        seriesInfo: {
          needed: 1,
          wonLeft: 0,
          wonRight: 0,
          mapInfo: [],
        },
        seedingInfo: {
          left: "",
          right: "",
        },
        tournamentInfo: {
          name: "",
          logoUrl: "",
          backdropUrl: "",
        },
        timeoutDuration: 60,
        sponsorInfo: {
          enabled: false,
          duration: 5000,
          sponsors: [],
        },
        watermarkInfo: {
          spectraWatermark: true,
          customTextEnabled: false,
          customText: "",
        },
      },
      timeoutState: {
        techPause: false,
        leftTeam: false,
        leftTeamStartTime: 0,
        rightTeam: false,
        rightTeamStartTime: 0,
      },
    };

    if (this.ranksEnabled) {
      // this.ranksByName = this.inhouseTrackerService.getRanksFromSheet();
    }
  }

  isAutoswitch(): boolean {
    return this.route.snapshot.parent?.routeConfig?.path == "autoswitch";
  }

  isMinimal(): boolean {
    if (this.route.snapshot.data["minimal"]) {
      return this.route.snapshot.data["minimal"];
    } else {
      return false;
    }
  }

  autoDisplayPhases = ["shopping", "combat", "end", "game_start", "game_end"];

  shouldDisplay(): boolean {
    if (this.isAutoswitch()) {
      if (this.autoDisplayPhases.includes(this.match.roundPhase)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  public updateMatch(data: any) {
    delete data.eventNumber;
    delete data.replayLog;
    this.match = data;

    this.teamLeft = this.match.teams[0];
    this.teamRight = this.match.teams[1];

    this.match.ranksEnabled = this.ranksEnabled;
    this.match.ranksByName = this.ranksByName;
  }

  resetTracker() {
    if (!this.activelyTracking) return;
    this.currentTrackId = null;
  }

  numSequence(n: number): number[] {
    return Array(n);
  }
}
