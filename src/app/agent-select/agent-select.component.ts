import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { TrackerComponent } from "../tracker/tracker.component";
import { ActivatedRoute } from "@angular/router";
import { SocketService } from "../services/SocketService";
import { Config } from "../shared/config";
import { trigger, transition, style, animate } from "@angular/animations";
import { AutoswitchComponent } from "../autoswitch/autoswitch.component";

@Component({
  selector: "app-agent-select",
  templateUrl: "./agent-select.component.html",
  styleUrls: ["./agent-select.component.scss"],
  animations: [
    trigger("fade", [
      transition(":enter", [style({ opacity: "0" }), animate("0.5s", style({ opacity: "1" }))]),

      transition(":leave", animate("0.5s", style({ opacity: "0" }))),
    ]),
  ],
})
export class AgentSelectComponent implements OnInit, AfterViewInit {
  @ViewChild(TrackerComponent) trackerComponent!: TrackerComponent;
  groupCode = "UNKNOWN";
  socketService!: SocketService;

  match: any;
  teamLeft: any;
  teamRight: any;

  constructor(
    private route: ActivatedRoute,
    private config: Config,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.groupCode = params["groupCode"]?.toUpperCase() || "UNKNOWN";
      console.log(`Requested group code is ${this.groupCode}`);
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
        seriesInfo: {
          needed: 1,
          wonLeft: 0,
          wonRight: 0,
          mapInfo: [],
        },
      },
    };

    this.teamLeft = this.match.teams[0];
    this.teamRight = this.match.teams[1];

    this.socketService = SocketService.getInstance(this.config.serverEndpoint, this.groupCode);
  }

  ngAfterViewInit(): void {
    this.socketService.subscribe((data: any) => {
      this.updateMatch(data);
    });
  }

  isAutoswitch(): boolean {
    return this.route.component === AutoswitchComponent;
  }

  shouldDisplay(): boolean {
    if (this.isAutoswitch()) {
      if (this.match.roundPhase === "LOBBY") {
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
  }

  trackByPlayerId(index: number, player: any) {
    return player.playerId;
  }
}
