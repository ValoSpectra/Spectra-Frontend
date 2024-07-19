import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

enum Colors {
  ATTACKER_REG = "rgba(232, 130, 125, 0.75)",
  ATTACKER_FEINT = "rgba(232, 130, 125, 0.35)",
  DEFENDER_REG = "rgba(125, 232, 187, 0.75)",
  DEFENDER_FEINT = "rgba(125, 232, 187, 0.35)",
}

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ 'opacity': '0' }),
        animate('0.5s', style({ 'opacity': '1' }))
      ]),

      transition(':leave',
        animate('0.5s', style({ 'opacity': '0' }))
      )
    ])
  ]
})
export class TrackerComponent implements OnInit {

  activelyTracking: boolean = false;
  currentTrackId: string | null = null;
  match: any = null;
  teamLeft: any = null;
  teamRight: any = null;

  ranksEnabled: boolean = false;
  ranksByName: any = {};

  teamLeftColor: string = Colors.ATTACKER_REG;
  teamLeftColorFeint: string = Colors.ATTACKER_FEINT;
  teamRightColor: string = Colors.DEFENDER_REG;
  teamRightColorFeint: string = Colors.DEFENDER_FEINT;

  groupCode: string = "UNKNOWN";

  constructor(private route: ActivatedRoute) {
    const siteUrl = window.location.hostname;
  }

  async ngOnInit(): Promise<void> {

    this.route.queryParams.subscribe(params => {
      this.groupCode = params['groupCode'].toUpperCase();
      console.log(`Requested group code is ${this.groupCode}`);
    });

    //setting up with empty match state so certain ui parts dont complain
    this.match = {"groupCode":"A","isRanked":false,"isRunning":true,"roundNumber":0,"roundPhase":"combat","teams":[{"players":[]},{"players":[]}]};
    
    if (this.ranksEnabled) {
      // this.ranksByName = this.inhouseTrackerService.getRanksFromSheet();
    }
  }

  public updateMatch(data: any) {
    this.match = data;
    this.teamLeft = this.match.teams[0];
    this.teamRight = this.match.teams[1];

    // this.teamLeft.teamName = "TIRA";
    // this.teamRight.teamName = "DNKL";
    this.teamLeftColor = this.teamLeft.isAttacking ? Colors.ATTACKER_REG : Colors.DEFENDER_REG;
    this.teamLeftColorFeint = this.teamLeft.isAttacking ? Colors.ATTACKER_FEINT : Colors.DEFENDER_FEINT;
    this.teamRightColor = this.teamRight.isAttacking ? Colors.ATTACKER_REG : Colors.DEFENDER_REG;
    this.teamRightColorFeint = this.teamRight.isAttacking ? Colors.ATTACKER_FEINT : Colors.DEFENDER_FEINT;

    this.match.ranksEnabled = this.ranksEnabled;
    this.match.ranksByName = this.ranksByName;
  }

  resetTracker() {
    if (!this.activelyTracking) return;
    this.currentTrackId = null;
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
