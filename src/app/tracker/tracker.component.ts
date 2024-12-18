import { Component, OnInit } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";

// enum Colors {
//   ATTACKER_REG = 'rgba(232, 130, 125, 0.75)',
//   ATTACKER_FEINT = 'rgba(232, 130, 125, 0.35)',
//   DEFENDER_REG = 'rgba(125, 232, 187, 0.75)',
//   DEFENDER_FEINT = 'rgba(125, 232, 187, 0.35)',
// }

@Component({
  selector: "app-tracker",
  templateUrl: "./tracker.component.html",
  styleUrls: ["./tracker.component.scss"],
  animations: [
    trigger("fade", [
      transition(":enter", [style({ opacity: "0" }), animate("0.5s", style({ opacity: "1" }))]),

      transition(":leave", animate("0.5s", style({ opacity: "0" }))),
    ]),
    trigger("fade-endround", [transition(":leave", animate("0s", style({ opacity: "0" })))]),
  ],
})
export class TrackerComponent implements OnInit {
  activelyTracking = false;
  currentTrackId: string | null = null;
  match: any = null;
  teamLeft: any = null;
  teamRight: any = null;

  ranksEnabled = false;
  ranksByName: any = {};

  async ngOnInit(): Promise<void> {
    //setting up with empty match state so certain ui parts dont complain
    this.match = {
      groupCode: "A",
      isRanked: false,
      isRunning: true,
      roundNumber: 0,
      roundPhase: "combat",
      teams: [{ players: [] }, { players: [] }],
      spikeState: { planted: false },
    };

    if (this.ranksEnabled) {
      // this.ranksByName = this.inhouseTrackerService.getRanksFromSheet();
    }
  }

  public updateMatch(data: any) {
    delete data.eventNumber;
    delete data.replayLog;
    this.match = data;

    this.teamLeft = this.match.teams[0];
    this.teamRight = this.match.teams[1];

    this.match.ranksEnabled = this.ranksEnabled;
    this.match.ranksByName = this.ranksByName;
  }

  resetTracker() {
    if (!this.activelyTracking) return;
    this.currentTrackId = null;
  }

  numSequence(n: number): number[] {
    return Array(n);
  }
}
