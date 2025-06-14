import { Component, Input } from "@angular/core";
import { NgIf, NgFor, SlicePipe } from "@angular/common";

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
  selector: "app-roundreasons",
  templateUrl: "./roundreasons.component.html",
  styleUrls: ["./roundreasons.component.scss"],
  imports: [NgIf, NgFor, SlicePipe],
  standalone: false,
})
export class RoundreasonsComponent {
  @Input() match!: matchType;
  public readonly assets: string = "../../../assets";

  public readonly roundRecordLength: number = 10;
  private readonly extraRounds: number = 1;

  getReasonStartIndex(): number {
    // Start index should be the first 10 rounds of the match OR
    // a 10 round window offset by the extra rounds to show
    return this.match.roundNumber + this.extraRounds - 1 < this.roundRecordLength
      ? 0
      : this.match.roundNumber + this.extraRounds - 1 - this.roundRecordLength;
  }
}
