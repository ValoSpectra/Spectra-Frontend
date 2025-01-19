import { Component, OnInit, ViewChild, Input } from "@angular/core";
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

export class TimeoutComponent implements OnInit {
    @ViewChild(TrackerComponent) trackerComponent!: TrackerComponent;
    @Input() match!: any;
    team: string = this.match.timeout.team || "tech";
    time: number = this.match.timeout.time || 30;
    maxtimeout: number = this.match.timeout.maxtimeout || 2;
    teamLeft: number = this.match.timeout.teamLeft || 0;
    teamRight: number = this.match.timeout.teamRight || 0;
    groupCode = "UNKNOWN";
    socketService!: SocketService;
    constructor(
        private route: ActivatedRoute,
        private config: Config,
      ) {
        this.route.queryParams.subscribe((params) => {
          this.groupCode = params["groupCode"]?.toUpperCase() || "UNKNOWN";
          console.log(`Requested group code is ${this.groupCode}`);
          this.team = params["team"]! || "tech";
          this.time = params["time"]! || 30;
          this.maxtimeout = params["maxtimeout"]! || 2;
          this.teamLeft = params["teamLeft"]! || 0;
          this.teamRight = params["teamRight"]! || 0;
          console.log(`Timeout called by ${this.team}`);
          console.log(`Timeout with ${this.time} seconds`);
          console.log(`Timeout with ${this.maxtimeout} max timeouts`);
          console.log(`Timeout with ${this.teamLeft} timeout(s) left for left team`);
          console.log(`Timeout with ${this.teamRight} timeouts(s) left for right team`);
        });
      }
    timeoutUrl: string = "";
    tournamentBackgroundUrl: string =
    this.match?.tournamentBackgroundUrl && this.match.tournamentBackgroundUrl !== ""
      ? this.match.tournamentBackgroundUrl
      : "../../assets/misc/endround-bg.webp";
    
    ngOnInit(): void {
        this.socketService = SocketService.getInstance(this.config.serverEndpoint, this.groupCode);
        this.preloadImage(this.tournamentBackgroundUrl);
    }
    private preloadImage(url: string): void {
        const img = new Image();
        img.src = url;
    }
    setTournamentBackgroundImage(): string {
        return `url(${this.tournamentBackgroundUrl})`;
    }
}