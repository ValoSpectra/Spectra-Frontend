import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-endround",
  templateUrl: "./endround.component.html",
  styleUrls: ["./endround.component.scss"],
})
export class EndroundComponent implements OnChanges {
  @Input() match!: any;
  teamWon = 0;
  ngOnChanges(changes: SimpleChanges) {
    if (changes["match"]) {
      const match = changes["match"].currentValue;
      if (match.attackersWon) {
        this.teamWon = match.teams[0].isAttacking ? 0 : 1;
      } else {
        this.teamWon = match.teams[0].isAttacking ? 1 : 0;
      }
    }
  }
}
