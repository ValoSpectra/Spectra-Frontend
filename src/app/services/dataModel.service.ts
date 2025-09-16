import { computed, inject, Injectable, signal } from "@angular/core";
import { SocketService } from "./SocketService";
import { IMapbanSessionData, IMatchData } from "./Types";
import { ActivatedRoute } from "@angular/router";
import { Config } from "../shared/config";
import { isEqual } from "lodash";

@Injectable({
  providedIn: "root",
})
export class DataModelService {
  protected route = inject(ActivatedRoute);
  protected config = inject(Config);

  constructor() {
    this.route.queryParams.subscribe((params) => {
      this.groupCode.set(params["groupCode"] || "");
      this.sessionId.set(params["sessionId"] || "");
      this.paramLang.set(params["lang"]?.toLowerCase() || "en");
      this.hideAuxiliary.set(params["hideAuxiliary"] || false);
    });

    if (this.route.firstChild && this.route.firstChild.firstChild) {
      this.route.firstChild!.firstChild!.data.subscribe((data) => {
        this.minimalMode.set(data["minimal"]);
      });
    }

    if (!this.config.serverEndpoint || this.config.serverEndpoint.length === 0) {
      console.error("No server endpoint configured, cannot connect to match data");
      return;
    }

    if (!this.groupCode() || this.groupCode().length === 0) {
      console.error("No group code provided, cannot connect to match data");
    } else {
      SocketService.getInstance().subscribeMatch(this.onMatchUpdate.bind(this));
      SocketService.getInstance().connectMatch(this.config.serverEndpoint, this.groupCode());
    }

    if (this.sessionId() && this.sessionId().length > 0) {
      if (!this.config.mapbanEndpoint || this.config.mapbanEndpoint.length === 0) {
        console.error("No mapban endpoint configured, cannot connect to mapban data");
      } else {
        SocketService.getInstance().subscribeMapban(this.onMapbanUpdate.bind(this));
        SocketService.getInstance().connectMapban(this.config.mapbanEndpoint, {
          sessionId: this.sessionId(),
        });
      }
    }
  }

  private onMatchUpdate(data: any) {
    this.match.set(data);
  }

  private onMapbanUpdate(data: any) {
    this.mapban.set(data);
  }

  public readonly groupCode = signal("");
  public readonly sessionId = signal("");
  public readonly paramLang = signal("en");
  public readonly minimalMode = signal(false);
  public readonly hideAuxiliary = signal(false);

  public readonly match = signal<IMatchData>(initialMatchData, { equal: () => false });
  public readonly teams = computed(() => this.match().teams, { equal: () => false });
  public readonly timeoutState = computed(() => this.match().timeoutState, {
    equal: isEqual,
  });
  public readonly spikeState = computed(() => this.match().spikeState, {
    equal: isEqual,
  });
  public readonly seriesInfo = computed(() => this.match().tools.seriesInfo);
  public readonly seedingInfo = computed(() => this.match().tools.seedingInfo);
  public readonly sponsorInfo = computed(() => this.match().tools.sponsorInfo);
  public readonly watermarkInfo = computed(() => this.match().tools.watermarkInfo);
  public readonly tournamentInfo = computed(() => this.match().tools.tournamentInfo);

  public readonly mapban = signal<IMapbanSessionData>(initialMapbanData, { equal: () => false });
}

//setting up with empty match state so certain ui parts dont complain
const initialMatchData: IMatchData = {
  groupCode: "A",
  isRanked: false,
  isRunning: true,
  roundNumber: 0,
  roundPhase: "LOBBY",
  teams: [
    {
      teamName: "",
      teamUrl: "",
      teamTricode: "",
      spentThisRound: 0,
      isAttacking: false,
      roundsWon: 0,
      players: [],
    },
    {
      teamName: "",
      teamUrl: "",
      teamTricode: "",
      spentThisRound: 0,
      isAttacking: false,
      roundsWon: 0,
      players: [],
    },
  ],
  spikeState: { planted: false, defused: false, detonated: false },
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
      enabled: false,
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
    // Disabling the watermark/setting a custom text without Spectra Plus is against the License terms and strictly forbidden
    watermarkInfo: {
      spectraWatermark: true,
      customTextEnabled: false,
      customText: "",
    },
    playercamsInfo: { enable: false },
    nameOverrides: { overrides: "" },
  },
  timeoutState: {
    techPause: false,
    leftTeam: false,
    rightTeam: false,
    timeRemaining: 0,
  },
  showAliveKDA: false,
  switchRound: 12,
  firstOtRound: 25,
  attackersWon: false,
};

const initialMapbanData: IMapbanSessionData = {
  sessionIdentifier: "",
  organizationName: "",
  isSupporter: false,
  teams: [],
  format: undefined,
  availableMaps: [],
  selectedMaps: [],
  stage: "ban",
  actingTeamCode: "",
  actingTeam: 0,
};
