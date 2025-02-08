import { Component, Input, OnChanges, SimpleChanges, OnInit } from "@angular/core";
@Component({
  selector: "app-endround",
  templateUrl: "./endround.component.html",
  styleUrls: ["./endround.component.scss"],
})
export class EndroundComponent implements OnChanges, OnInit {
  @Input() match!: any;
  tournamentUrl = "../../assets/misc/logo.webp";
  endRoundEnabled = false;

  tournamentBackgroundUrl = "../../assets/misc/backdrop.webp";

  teamWon = 0;
  ngOnInit(): void {
    this.endRoundEnabled = this.match?.tools?.tournamentInfo?.enabled || false;
    if (!this.endRoundEnabled) return;

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
