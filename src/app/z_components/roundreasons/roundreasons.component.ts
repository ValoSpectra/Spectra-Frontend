import { Component, Input } from "@angular/core";

interface recordType {
  type: string;
  wasAttack: boolean;
  round: number;
}

interface matchType {
  switchRound: number;
  firstOtRound: number;
  roundNumber: number;
  teams: [
    {
      teamTricode: string;
      roundRecord: recordType[];
    },
    {
      teamTricode: string;
      roundRecord: recordType[];
    },
  ];
}

@Component({
  selector: "app-roundreasons-new",
  imports: [],
  templateUrl: "./roundreasons.component.html",
  styleUrl: "./roundreasons.component.css",
})
export class RoundreasonsComponent {
  @Input() match!: matchType;
}
