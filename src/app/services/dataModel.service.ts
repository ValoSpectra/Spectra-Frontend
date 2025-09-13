import { computed, inject, Injectable, signal } from "@angular/core";
import { SocketService } from "./SocketService";
import { IMatchData } from "./Types";
import { ActivatedRoute } from "@angular/router";
import { Config } from "../shared/config";

@Injectable({
  providedIn: "root",
})
export class DataModelService {
  protected route = inject(ActivatedRoute);
  protected config = inject(Config);

  constructor() {
    this.route.queryParams.subscribe((params) => {
      this.groupCode.set(params["groupCode"]);
      this.paramLang.set(params["lang"]?.toLowerCase() || "en");
    });

    if (this.route.firstChild && this.route.firstChild.firstChild) {
      this.route.firstChild!.firstChild!.data.subscribe((data) => {
        this.minimalMode.set(data["minimal"]);
      });
    }

    SocketService.getInstance().subscribeMatch(this.onMatchUpdate.bind(this));
    SocketService.getInstance().connectMatch(this.config.serverEndpoint, this.groupCode());
  }

  private onMatchUpdate(data: any) {
    this.match.set(data);
  }

  public readonly groupCode = signal("");
  public readonly paramLang = signal("en");
  public readonly minimalMode = signal(false);

  public readonly match = signal(initialMatchData, { equal: () => false });
  public readonly teams = computed(() => this.match().teams, { equal: () => false });
  public readonly timeoutState = computed(() => this.match().timeoutState, { equal: () => false });
  public readonly spikeState = computed(() => this.match().spikeState);
  public readonly seriesInfo = computed(() => this.match().tools.seriesInfo);
  public readonly seedingInfo = computed(() => this.match().tools.seedingInfo);
  public readonly sponsorInfo = computed(() => this.match().tools.sponsorInfo);
  public readonly watermarkInfo = computed(() => this.match().tools.watermarkInfo);
  public readonly tournamentInfo = computed(() => this.match().tools.tournamentInfo);
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
