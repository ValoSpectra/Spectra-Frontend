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
  tournamentUrl = "../../assets/misc/logo.webp";

  tournamentBackgroundUrl = "../../assets/misc/backdrop.webp";

  teamWon = 0;
  ngOnInit(): void {
    this.tournamentUrl =
      this.match?.tools?.tournamentInfo?.logoUrl && this.match.tools.tournamentInfo.logoUrl !== ""
        ? this.match.tools.tournamentInfo.logoUrl
        : "../../assets/misc/logo.webp";

    this.tournamentBackgroundUrl =
      this.match?.tools?.tournamentInfo?.backdropUrl &&
      this.match.tools.tournamentInfo.backdropUrl !== ""
        ? this.match.tools.tournamentInfo.backdropUrl
        : "../../assets/misc/backdrop.webp";

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
