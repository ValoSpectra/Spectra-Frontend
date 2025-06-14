import { AfterViewInit, Component, inject, OnInit, ViewChild } from "@angular/core";
import { TrackerComponent } from "../tracker/tracker.component";
import { ActivatedRoute } from "@angular/router";
import { SocketService } from "../services/SocketService";
import { Config } from "../shared/config";
import { trigger, transition, style, animate } from "@angular/animations";
import { NgIf, NgFor } from "@angular/common";
import { SelectPlayerInfoComponent } from "./select-player-info/select-player-info.component";
import { SelectTeamInfoComponent } from "./select-team-info/select-team-info.component";
import { TranslateService } from "@ngx-translate/core";
import { LanguageAliasService } from "../services/languageAlias.service";

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
  imports: [NgIf, NgFor, SelectPlayerInfoComponent, SelectTeamInfoComponent],
  standalone: false,
})
export class AgentSelectComponent implements OnInit, AfterViewInit {
  private route = inject(ActivatedRoute);
  private config = inject(Config);
  private translate = inject(TranslateService);

  @ViewChild(TrackerComponent) trackerComponent!: TrackerComponent;
  groupCode = "UNKNOWN";
  lang = "en";
  socketService!: SocketService;

  match: any;
  teamLeft: any;
  teamRight: any;

  constructor() {
    this.route.queryParams.subscribe((params) => {
      this.groupCode = params["groupCode"]?.toUpperCase() || "UNKNOWN";
      const paramLang = params["lang"]?.toLowerCase() || "en";
      this.lang = LanguageAliasService.resolveLanguageAlias(paramLang);
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

    this.socketService = SocketService.getInstance().connectMatch(
      this.config.serverEndpoint,
      this.groupCode,
    );

    this.translate.use(this.lang);
  }

  ngAfterViewInit(): void {
    this.socketService.subscribeMatch((data: any) => {
      this.updateMatch(data);
    });
  }

  isAutoswitch(): boolean {
    return this.route.snapshot.parent?.routeConfig?.path == "autoswitch";
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

    // Construct map for name overrides if it's a string (from JSON). The server might keep it as JSON to avoid issues.
    const tempOverrides = this.match?.tools?.nameOverrides?.overrides || null;
    if (typeof tempOverrides === "string") {
      this.match.tools.nameOverrides.overrides = this.jsonToMap(tempOverrides);
    }
  }

  trackByPlayerId(index: number, player: any) {
    return player.playerId;
  }

  private jsonToMap(json: string): Map<string, string> {
    try {
      const obj = JSON.parse(json);
      if (Array.isArray(obj)) {
        return new Map(obj);
      } else {
        throw new Error("Invalid JSON format for Map");
      }
    } catch (error) {
      console.error("Failed to parse JSON to Map:", error);
      return new Map();
    }
  }
}
