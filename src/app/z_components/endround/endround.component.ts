import { Component, computed, effect, inject } from "@angular/core";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-endround-new",
  imports: [],
  templateUrl: "./endround.component.html",
  styleUrl: "./endround.component.css",
})
export class EndroundComponent {
  dataModel = inject(DataModelService);

  runAnimation = false;
  hide = true;
  animateOut = false;
  preload = true;

  tournamentBackgroundUrl = computed(() => {
    const backdrop = this.dataModel.tournamentInfo().backdropUrl;
    if (backdrop && backdrop !== "") return backdrop;
    else return "assets/misc/backdrop.webp";
  });

  tournamentIconUrl = computed(() => {
    const logo = this.dataModel.tournamentInfo().logoUrl;
    if (logo && logo !== "") return logo;
    else return "assets/misc/logo.webp";
  });

  teamWon = computed(() => {
    if (this.dataModel.match().attackersWon) {
      return this.dataModel.teams()[0].isAttacking ? 0 : 1;
    } else {
      return this.dataModel.teams()[0].isAttacking ? 1 : 0;
    }
  });

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
  });
}
