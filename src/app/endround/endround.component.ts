import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
@Component({
  selector: "app-endround",
  templateUrl: "./endround.component.html",
  styleUrls: ["./endround.component.scss"],
  animations: [
    trigger("fade-endround", [transition(":leave", animate("0s", style({ opacity: "0" })))]),
  ],
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
