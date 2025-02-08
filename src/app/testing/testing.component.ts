import { AfterViewInit, Component, ViewChild, ViewContainerRef } from "@angular/core";
import { TrackerComponent } from "../tracker/tracker.component";
import { SocketService } from "../services/SocketService";
import { ActivatedRoute } from "@angular/router";
import { TeamControllerComponent } from "./team-controller/team-controller.component";

@Component({
  selector: "app-testing",
  templateUrl: "./testing.component.html",
  styleUrls: ["./testing.component.scss"],
})
export class TestingComponent implements AfterViewInit {
  @ViewChild(TrackerComponent) trackerComponent!: TrackerComponent;
  @ViewChild("team1") team1!: TeamControllerComponent;
  @ViewChild("team2") team2!: TeamControllerComponent;
  groupCode = "UNKNOWN";
  socketService!: SocketService;

  matchData: any;
  isSpikePlanted = false;
  roundPhase: "shopping" | "combat" | "end" = "combat";

  showInterface = true;
  showBackground = true;
  backgroundClass = "bg1";
  backgroundClassId = 1;

  constructor(
    private route: ActivatedRoute,
    private viewContainerRef: ViewContainerRef,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.groupCode = params["groupCode"]?.toUpperCase() || "UNKNOWN";
      console.log(`Requested group code is ${this.groupCode}`);
    });
  }

  // ngOnInit(): void {
  //   const siteUrl = window.location.hostname;
  //   // this.socketService = new SocketService(`http://${siteUrl}:5200`, this.groupCode);
  // }

  ngAfterViewInit(): void {
    // this.socketService.subscribe((data: any) => {this.trackerComponent.updateMatch(data)});
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
    };

    this.team2.swapColor();
    this.trackerComponent.updateMatch(this.matchData);
    for (let i = 0; i < 5; i++) {
      this.team1.addPlayer();
      this.team2.addPlayer();
    }

    this.roundPhase = this.matchData.roundPhase;
  }

  changeRoundPhase(): void {
    if (this.matchData.roundPhase == "shopping") {
      this.matchData.roundPhase = "combat";
    } else if (this.matchData.roundPhase == "combat") {
      this.matchData.roundPhase = "end";
    } else if (this.matchData.roundPhase == "LOBBY") {
      this.matchData.roundPhase = "end";
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
