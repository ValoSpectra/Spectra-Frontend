import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
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
      transition(":enter", [style({ opacity: "0" }), animate("0.5s", style({ opacity: "1" }))]),

      transition(":leave", animate("0.5s", style({ opacity: "0" }))),
    ]),
  ],
})
export class TimeoutComponent implements OnInit, AfterViewInit {
  @ViewChild(TrackerComponent) trackerComponent!: TrackerComponent;
  groupCode = "UNKNOWN";
  socketService!: SocketService;
  match: any;
  timeout: any;
  timeoutUrl!: string;
  team!: string;;
  tournamentBackgroundUrl!: string;
  constructor(
    private route: ActivatedRoute,
    private config: Config,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.groupCode = params["groupCode"]?.toUpperCase() || "UNKNOWN";
      this.team = params["team"] || "";
      console.log(`Requested group code is ${this.groupCode}`);
      console.log(`Requested team is ${this.team}`);
    });
  }
  ngOnInit(): void {
    this.match = {
      groupCode: "A",
      isRanked: false,
      isRunning: true,
      roundNumber: 0,
      roundPhase: "combat",
      teams: [{ players: [] }, { players: [] }],
      spikeState: { planted: false },
      map: "Ascent",
      tools: {
        timeout: {
          team: "tech",
          time: 30,
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
        : "../../assets/misc/endround-bg.webp";
    this.preloadImage(this.tournamentBackgroundUrl);
  }
  ngAfterViewInit(): void {
    this.socketService.subscribe((data: any) => {
      this.updateTimeout(data);
    });
  }
  public updateTimeout(data: any) {
    delete data.eventNumber;
    delete data.replayLog;
    this.match = data;
    this.timeout = this.match.tools.timeout;
  }
  private preloadImage(url: string): void {
    const img = new Image();
    img.src = url;
  }
  setTournamentBackgroundImage(): string {
    return `url(${this.tournamentBackgroundUrl})`;
  }
}
