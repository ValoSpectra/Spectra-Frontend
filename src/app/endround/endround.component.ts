import { Component, Input, OnChanges, SimpleChanges, OnInit } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
@Component({
  selector: "app-endround",
  templateUrl: "./endround.component.html",
  styleUrls: ["./endround.component.scss"],
  animations: [
    trigger("fade-endround", [transition(":leave", animate("0s", style({ opacity: "0" })))]),
  ],
})
export class EndroundComponent implements OnChanges, OnInit {
  @Input() match!: any;
  tournamentUrl: string =
    this.match?.tournamentUrl && this.match.tournamentUrl !== ""
      ? this.match.tournamentUrl
      : "../../assets/misc/logo.webp";
  tournamentBackgroundUrl: string =
    this.match?.tournamentBackgroundUrl && this.match.tournamentBackgroundUrl !== ""
      ? this.match.tournamentBackgroundUrl
      : "../../assets/misc/endround-bg.webp";
  teamWon = 0;
  ngOnInit(): void {
    this.preloadImage(this.tournamentUrl);
    this.preloadImage(this.tournamentBackgroundUrl);
  }
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
  private preloadImage(url: string): void {
    const img = new Image();
    img.src = url;
  }
  setTournamentBackgroundImage(): string {
    return `url(${this.tournamentBackgroundUrl})`;
  }
}
