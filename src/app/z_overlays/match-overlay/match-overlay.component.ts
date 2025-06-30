import { Component, OnInit } from "@angular/core";
import { MapinfoComponent } from "../../z_components/mapinfo/mapinfo.component";
import { TimerRounderComponent } from "../../z_components/timer-rounder/timer-rounder.component";

@Component({
  selector: "app-match-overlay",
  imports: [MapinfoComponent, TimerRounderComponent],
  templateUrl: "./match-overlay.component.html",
  styleUrl: "./match-overlay.component.css",
})
export class MatchOverlayComponent implements OnInit {
  match: any;

  async ngOnInit(): Promise<void> {
    //setting up with empty match state so certain ui parts dont complain
    this.match = {
      groupCode: "A",
      isRanked: false,
      isRunning: true,
      roundNumber: 0,
      roundPhase: "LOBBY",
      teams: [{ players: [] }, { players: [] }],
      spikeState: { planted: false },
      map: "Ascent",
      tools: {
        seriesInfo: {
          needed: 1,
          wonLeft: 0,
          wonRight: 0,
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
          left: "",
          right: "",
        },
        tournamentInfo: {
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
      },
      timeoutState: {
        techPause: false,
        leftTeam: false,
        leftTeamStartTime: 0,
        rightTeam: false,
        rightTeamStartTime: 0,
      },
    };
  }
}
