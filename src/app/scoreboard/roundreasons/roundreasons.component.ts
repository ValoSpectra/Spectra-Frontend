import { Component, Input, OnInit } from '@angular/core';

type recordType = {
  type: string;
  wasAttack: boolean;
  round: number;
}

type matchType = {
  switchRound: number;
  firstOtRound: number;
  teams: [
    {
      teamTricode: string,
      roundRecord: recordType[]
    },
    {
      teamTricode: string,
      roundRecord: recordType[]
    }
  ]
}

@Component({
  selector: 'app-roundreasons',
  templateUrl: './roundreasons.component.html',
  styleUrls: ['./roundreasons.component.scss'],
})
export class RoundreasonsComponent {
  @Input() match!: matchType;
  public readonly assets: String = "../../../assets";

  constructor() {
  }

}
