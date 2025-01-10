import { Component, OnInit } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-tracker",
  templateUrl: "./tracker.component.html",
  styleUrls: ["./tracker.component.scss"],
  animations: [
    trigger("fade", [
      transition(":enter", [style({ opacity: "0" }), animate("0.5s", style({ opacity: "1" }))]),

      transition(":leave", animate("0.5s", style({ opacity: "0" }))),
    ]),
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
      map: "Ascent",
      mapInfo: [
        {
          type: "past",
          map: "Fracture",
          left: {
            logo: "assets/misc/icon.webp",
            score: 13,
          },
          right: {
            logo: "assets/misc/icon.webp",
            score: 7,
          },
        },

        {
          type: "present",
          map: "Ascent",
          logo: "assets/misc/icon.webp",
        },

        {
          type: "future",
          map: "Bind",
          logo: "assets/misc/icon.webp",
        },
      ],
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
