import { Component, Input } from "@angular/core";

interface recordType {
  type: string;
  wasAttack: boolean;
  round: number;
}

interface matchType {
  switchRound: number;
  firstOtRound: number;
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
  selector: "app-roundreasons",
  templateUrl: "./roundreasons.component.html",
  styleUrls: ["./roundreasons.component.scss"],
})
export class RoundreasonsComponent {
  @Input() match!: matchType;
  public readonly assets: string = "../../../assets";
}
