import { AfterViewInit, Component, ViewChild, inject } from "@angular/core";
import { TrackerComponent } from "../tracker/tracker.component";
import { ActivatedRoute } from "@angular/router";
import { TeamControllerComponent } from "./team-controller/team-controller.component";
import { HttpClient } from "@angular/common/http";
import { NgIf } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { LanguageAliasService } from "../services/languageAlias.service";

@Component({
  selector: "app-testing",
  templateUrl: "./testing.component.html",
  styleUrls: ["./testing.component.scss"],
  imports: [TrackerComponent, NgIf, TeamControllerComponent],
})
export class TestingComponent implements AfterViewInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private translate = inject(TranslateService);

  @ViewChild(TrackerComponent) trackerComponent!: TrackerComponent;
  @ViewChild("team1") team1!: TeamControllerComponent;
  @ViewChild("team2") team2!: TeamControllerComponent;

  matchData: any;
  isSpikePlanted = false;
  roundPhase: "shopping" | "combat" | "end" = "combat";
  hideAuxiliary = false;

  loadingPreview = false;
  loadingPreviewText = "Loading preview match data...";
  previewCode = "";
  previewMatch = undefined;
  lang = "en";

  showInterface = true;
  showBackground = true;
  backgroundClass = "bg1";
  backgroundClassId = 1;

  constructor() {
    this.route.queryParams.subscribe((params) => {
      this.hideAuxiliary = params["hideAuxiliary"] != undefined;
      this.previewCode = params["previewCode"] || "";
      const paramLang = params["lang"]?.toLowerCase() || "en";
      this.lang = LanguageAliasService.resolveLanguageAlias(paramLang);
    });
  }

  async ngAfterViewInit() {
    if (this.previewCode !== "") {
      this.loadingPreview = true;
      this.http.get(`https://eu.valospectra.com:5101/preview/${this.previewCode}`).subscribe({
        next: (data: any) => {
          this.previewMatch = data;
          this.matchData = this.previewMatch;
          console.log("Preview match data loaded:", this.matchData);
          this.team2.swapColor();
          this.trackerComponent.updateMatch(this.matchData);
          for (let i = 0; i < 5; i++) {
            this.team1.addPlayer();
            this.team2.addPlayer();
          }

          this.roundPhase = this.matchData.roundPhase;

          this.loadingPreview = false;
        },
        error: (err) => {
          console.error("Error fetching preview match data:", err);
          this.previewCode = "";
          this.ngAfterViewInit();
        },
      });
    } else {
      this.matchData = this.trackerComponent.match;
      this.matchData.teams[0] = this.team1.getData();
      this.matchData.teams[1] = this.team2.getData();

      this.matchData.switchRound = 6;

      this.matchData.teams[0].roundRecord = [
        { type: "detonated", wasAttack: true, round: 1 },
        { type: "lost", wasAttack: true, round: 2 },
        { type: "kills", wasAttack: true, round: 3 },
        { type: "timeout", wasAttack: true, round: 4 },
        { type: "lost", wasAttack: true, round: 5 },
        { type: "kills", wasAttack: false, round: 6 },
        { type: "lost", wasAttack: false, round: 7 },
        { type: "defused", wasAttack: false, round: 8 },
        { type: "lost", wasAttack: false, round: 9 },
        { type: "lost", wasAttack: false, round: 10 },
      ];

      this.matchData.teams[1].roundRecord = [
        { type: "lost", wasAttack: false, round: 1 },
        { type: "defused", wasAttack: false, round: 2 },
        { type: "lost", wasAttack: false, round: 3 },
        { type: "lost", wasAttack: false, round: 4 },
        { type: "kills", wasAttack: false, round: 5 },
        { type: "lost", wasAttack: true, round: 6 },
        { type: "detonated", wasAttack: true, round: 7 },
        { type: "lost", wasAttack: true, round: 8 },
        { type: "kills", wasAttack: true, round: 9 },
        { type: "timeout", wasAttack: true, round: 10 },
      ];

      this.matchData.tools = {
        seriesInfo: {
          needed: 3,
          wonLeft: 1,
          wonRight: 2,
          mapInfo: [
            {
              type: "past",
              map: "Fracture",
              left: {
                score: 13,
                logo: "assets/misc/icon.webp",
              },
              right: {
                score: 9,
                logo: "assets/misc/icon.webp",
              },
            },
            {
              type: "present",
              logo: "assets/misc/icon.webp",
            },
            {
              type: "future",
              map: "Haven",
              logo: "assets/misc/icon.webp",
            },
          ],
        },
        seedingInfo: {
          left: "Group A",
          right: "Group B",
        },
        tournamentInfo: {
          name: "",
          logoUrl: "",
          backdropUrl: "",
          enabled: true,
        },
        watermarkInfo: {
          spectraWatermark: true,
          customTextEnabled: false,
          customText: "This is a tournament",
        },
        playercamsInfo: {
          enable: true,
          identifier: "SPPCDEBUG",
          enabledPlayers: ["VoodooOne#DEBUG", "AlpacaHoarder#DEBUG"],
        },
        nameOverrides: {
          overrides: new Map<string, string>([
            ["VoodooOne#DEBUG", "Voodoo One"],
            ["AlpacaHoarder#DEBUG", "AlpacaHoarder"],
          ]),
        },
      };
      this.team2.swapColor();
      this.trackerComponent.updateMatch(this.matchData);
      for (let i = 0; i < 5; i++) {
        this.team1.addPlayer();
        this.team2.addPlayer();
      }
      this.roundPhase = this.matchData.roundPhase;
      this.translate.use(this.lang);
      this.changeRoundPhase();
    }
  }

  changeRoundPhase(): void {
    if (this.matchData.roundPhase == "shopping") {
      this.matchData.roundPhase = "combat";
    } else if (this.matchData.roundPhase == "combat") {
      this.matchData.roundPhase = "end";
    } else if (this.matchData.roundPhase == "LOBBY") {
      this.matchData.roundPhase = "combat";
    } else {
      this.matchData.roundPhase = "shopping";
    }
    this.roundPhase = this.matchData.roundPhase;
  }

  swapTeamColors(): void {
    this.team1.swapColor();
    this.team2.swapColor();
  }

  updateRoundNumber(): void {
    const a = this.team1.teamObject.roundsWon;
    const b = this.team2.teamObject.roundsWon;
    this.matchData.roundNumber = a + b;
  }

  plantSpike(): void {
    this.matchData.spikeState = { planted: true, detonated: false, defused: false };
    this.isSpikePlanted = true;
    console.log(this.backgroundClassId);

    if (this.backgroundClassId == 1 || this.backgroundClassId == 3) {
      this.switchBackground();
    }
  }

  detonateDefuseSpike(): void {
    this.matchData.spikeState = { planted: false, detonated: false, defused: false };
    this.isSpikePlanted = false;
  }

  toggleInterface(): void {
    this.showInterface = !this.showInterface;
  }

  switchBackground(): void {
    this.backgroundClass = "bg" + ++this.backgroundClassId;
    this.backgroundClassId %= 5;
    if (this.isSpikePlanted && (this.backgroundClassId == 1 || this.backgroundClassId == 3)) {
      this.switchBackground();
    }
  }
}
