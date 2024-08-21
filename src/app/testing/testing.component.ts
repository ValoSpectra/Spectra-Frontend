import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TrackerComponent } from '../tracker/tracker.component';
import { SocketService } from '../services/SocketService';
import { ActivatedRoute } from '@angular/router';
import { TeamControllerComponent } from './team-controller/team-controller.component';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit, AfterViewInit {

  @ViewChild(TrackerComponent) trackerComponent!: TrackerComponent;
  @ViewChild("team1") team1!: TeamControllerComponent;
  @ViewChild("team2") team2!: TeamControllerComponent;
  groupCode: string = "UNKNOWN";
  socketService!: SocketService;

  matchData: any;
  isSpikePlanted = false;
  roundPhase: "shopping" | "combat" = "combat";

  showInterface = true;
  showBackground = true;
  backgroundClass = "bg1";
  backgroundClassId = 0;

  constructor(private route: ActivatedRoute, private viewContainerRef: ViewContainerRef) {
    this.route.queryParams.subscribe(params => {
      this.groupCode = params['groupCode']?.toUpperCase() || "UNKNOWN";
      console.log(`Requested group code is ${this.groupCode}`);
    });
  }

  ngOnInit(): void {
    const siteUrl = window.location.hostname;
    // this.socketService = new SocketService(`http://${siteUrl}:5200`, this.groupCode);
  }

  ngAfterViewInit(): void {
    // this.socketService.subscribe((data: any) => {this.trackerComponent.updateMatch(data)});
    this.matchData = this.trackerComponent.match;
    this.matchData.teams[0] = this.team1.getData();
    this.matchData.teams[1] = this.team2.getData();
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
    }
    else {
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
    this.backgroundClassId %= 5
  }

}
