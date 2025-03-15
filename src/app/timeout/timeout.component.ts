import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from "@angular/core";
import { TrackerComponent } from "../tracker/tracker.component";
import { SocketService } from "../services/SocketService";
import { ActivatedRoute } from "@angular/router";
import { Config } from "../shared/config";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-timeout",
  templateUrl: "./timeout.component.html",
  styleUrls: ["./timeout.component.scss"],
  animations: [
    trigger("fade", [
      transition(":enter", [style({ opacity: "0" }), animate("0.3s", style({ opacity: "1" }))]),

      transition(":leave", animate("0.3s", style({ opacity: "0" }))),
    ]),
  ],
})
export class TimeoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(TrackerComponent) trackerComponent!: TrackerComponent;
  groupCode = "UNKNOWN";
  socketService!: SocketService;
  match: any;
  timeout: any; //Store timeout data extracted from match object
  tournamentBackgroundUrl = "../../assets/misc/backdrop.webp";
  timeLeft!: number; //Store remaining time in seconds
  interval: any;
  anyTimeout = false;

  constructor(
    private route: ActivatedRoute,
    private config: Config,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.groupCode = params["groupCode"]?.toUpperCase() || "UNKNOWN";
    });
  }

  ngOnInit(): void {
    this.match = {
      groupCode: "A",
      teams: [
        {
          isAttacking: true,
          teamName: "Team Name",
          teamTricode: "TEAM",
          teamUrl: "assets/misc/icon.webp",
          roundsWon: 0,
          spentThisRound: 1000,
          players: [],
        },
        {
          isAttacking: false,
          teamName: "Team Name",
          teamTricode: "TEAM",
          teamUrl: "assets/misc/icon.webp",
          roundsWon: 0,
          spentThisRound: 1000,
          players: [],
        },
      ],
      tools: {
        timeoutDuration: 60,
      },
      timeoutState: {
        techPause: false,
        leftTeam: false,
        leftTeamStartTime: 0,
        rightTeam: false,
        rightTeamStartTime: 0,
      },
    };

    this.timeout = this.match.timeoutState;
    this.socketService = SocketService.getInstance(this.config.serverEndpoint, this.groupCode);
    this.tournamentBackgroundUrl =
      this.match?.tools?.tournamentInfo?.backdropUrl &&
      this.match.tools.tournamentInfo.backdropUrl !== ""
        ? this.match.tools.tournamentInfo.backdropUrl
        : "../../assets/misc/backdrop.webp";
    this.preloadImage(this.tournamentBackgroundUrl);
    this.preloadImage(this.match.teams[0].teamUrl);
    this.preloadImage(this.match.teams[1].teamUrl);
  }

  ngAfterViewInit(): void {
    this.timeLeft = this.match.tools.timeoutDuration || 60;
    this.socketService.subscribe((data: any) => {
      this.updateTimeout(data);
    });
  }

  public updateTimeout(data: any) {
    this.match = data;

    const newTimeout = this.match.timeoutState;
    if (newTimeout.techPause && newTimeout.techPause !== this.timeout.techPause) {
      this.anyTimeout = true;
    }

    if (newTimeout.leftTeam && newTimeout.leftTeam !== this.timeout.leftTeam) {
      this.anyTimeout = true;
    }

    if (newTimeout.rightTeam && newTimeout.rightTeam !== this.timeout.rightTeam) {
      this.anyTimeout = true;
    }

    if (this.anyTimeout && !newTimeout.techPause && !newTimeout.leftTeam && !newTimeout.rightTeam) {
      this.anyTimeout = false;
      this.timeLeft = this.match.tools.timeoutDuration || 60;
    }

    this.timeLeft = newTimeout.timeRemaining;
    this.timeout = this.match.timeoutState;
  }

  private preloadImage(url: string): void {
    const img = new Image();
    img.src = url;
  }

  setTournamentBackgroundImage(): string {
    return `url(${this.tournamentBackgroundUrl})`;
  }

  getProgressWidth(): string {
    return `${(this.timeLeft / (this.match.tools.timeoutDuration || 60)) * 100}%`;
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
