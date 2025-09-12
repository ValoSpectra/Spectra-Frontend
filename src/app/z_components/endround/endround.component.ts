import { Component, effect, inject } from "@angular/core";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-endround-new",
  imports: [],
  templateUrl: "./endround.component.html",
  styleUrl: "./endround.component.css",
})
export class EndroundComponent {
  dataModel = inject(DataModelService);

  tournamentBackgroundUrl = "assets/misc/backdrop.webp";
  tournamentUrl = "assets/misc/logo.webp";
  teamWon = 0;

  runAnimation = false;
  hide = true;
  animateOut = false;
  preload = true;

  ref = effect(() => {
    const roundPhase = this.dataModel.match().roundPhase;
    if (roundPhase === "end") {
      this.runAnimation = true;
      this.hide = false;
      this.animateOut = false;
      setTimeout(() => {
        this.runAnimation = false;
      }, 2600);
    } else if (roundPhase === "shopping") {
      this.runAnimation = false;
      this.animateOut = true;
      setTimeout(() => {
        this.hide = true;
        this.animateOut = false;
      }, 300);
    }

    //update backdrop if changed
    const newBackdrop = this.dataModel.tournamentInfo().backdropUrl;
    if (newBackdrop && newBackdrop !== "") {
      this.tournamentBackgroundUrl = newBackdrop;
    }

    //update logo if changed
    const newLogo = this.dataModel.tournamentInfo().logoUrl;
    if (newLogo && newLogo !== "") {
      this.tournamentUrl = newLogo;
    }

    //update team won
    if (this.dataModel.match().attackersWon) {
      this.teamWon = this.dataModel.teams()[0].isAttacking ? 0 : 1;
    } else {
      this.teamWon = this.dataModel.teams()[0].isAttacking ? 1 : 0;
    }
  });
}
