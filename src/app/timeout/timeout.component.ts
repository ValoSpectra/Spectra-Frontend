import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from "@angular/core";
import { TrackerComponent } from "../tracker/tracker.component";
import { SocketService } from "../services/SocketService";
import { ActivatedRoute } from "@angular/router";
import { Config } from "../shared/config";
import { trigger, transition, style, animate } from "@angular/animations";
import { AutoswitchComponent } from "../autoswitch/autoswitch.component";

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
  team!: string;
  tournamentBackgroundUrl = "../../assets/misc/backdrop.webp";
  timeLeft!: number; //Store remaining time in seconds
  interval: any;
  test = false;
  /* 
  Display state : 
  * ready will be true once the data is received from the server
  * completed will be true once the timer is completed
  */
  ready = false;
  completed = false;
  constructor(
    private route: ActivatedRoute,
    private config: Config,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.test = params["test"] === "true";
      this.groupCode = params["groupCode"]?.toUpperCase() || "UNKNOWN";
      this.team = params["team"] || "";
      console.log(`Requested group code is ${this.groupCode}`);
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
        timeout: {
          display: false,
          team: "tech",
          time: 60,
          maxtimeout: 2,
          teamLeft: 0,
          teamRight: 0,
        },
      },
    };
    this.timeout = this.match.tools.timeout;
    this.socketService = SocketService.getInstance(this.config.serverEndpoint, this.groupCode);
    this.tournamentBackgroundUrl =
      this.match?.tournamentBackgroundUrl && this.match.tournamentBackgroundUrl !== ""
        ? this.match.tournamentBackgroundUrl
        : "../../assets/misc/backdrop.webp";
    this.preloadImage(this.tournamentBackgroundUrl);
    this.preloadImage(this.match.teams[0].teamUrl);
    this.preloadImage(this.match.teams[1].teamUrl);
  }
  isAutoswitch(): boolean {
    return this.route.component === AutoswitchComponent;
  }
  shouldDisplay(): boolean {
    if (this.isAutoswitch()) {
      if (this.match.tools.timeout.display) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  ngAfterViewInit(): void {
    this.match.tools.timeout.team = this.team;
    this.timeLeft = this.match.tools.timeout?.time ?? 60;
    if (this.test) {
      this.ready = true;
      this.startTimer();
    }
    this.socketService.subscribe((data: any) => {
      this.updateTimeout(data);
      this.ready = true;
      this.startTimer();
    });
  }
  public updateTimeout(data: any) {
    delete data.eventNumber;
    delete data.replayLog;
    this.match = data;
    this.timeout = this.match.tools.timeout;
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.completed = true;
      }
    }, 1000);
  }
  private preloadImage(url: string): void {
    const img = new Image();
    img.src = url;
  }
  convertInt(value: string): number {
    return parseInt(value, 10);
  }
  setTournamentBackgroundImage(): string {
    return `url(${this.tournamentBackgroundUrl})`;
  }
  getProgressWidth(): string {
    return `${(this.timeLeft / (this.match.tools.timeout?.time ?? 60)) * 100}%`;
  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
