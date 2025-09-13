import { Component, computed, effect, inject, signal } from "@angular/core";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-timeout-new",
  imports: [],
  templateUrl: "./timeout.component.html",
  styleUrl: "./timeout.component.css",
})
export class TimeoutComponent {
  dataModel = inject(DataModelService);

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

  timeoutTeam = computed(() => {
    const index = this.timeoutInfo().leftTeam ? 0 : 1;
    return this.dataModel.teams()[index];
  });

  timerWidth = computed(() => {
    return `${(this.dataModel.timeoutState().timeRemaining / (this.dataModel.match().tools.timeoutDuration || 60)) * 100}%`;
  });

  //only needed to have some control over our own update timing so the out-animation goes smoothly
  timeoutInfo = signal(Object.assign({}, this.dataModel.timeoutState()));

  shouldHide = computed(() => {
    return (
      !this.dataModel.timeoutState().techPause &&
      !this.dataModel.timeoutState().leftTeam &&
      !this.dataModel.timeoutState().rightTeam
    );
  });

  hide = true;
  inAnimation = false;
  outAnimation = false;

  hideAnimationEffect = effect(() => {
    if (this.shouldHide()) {
      this.outAnimation = true;
      setTimeout(() => {
        this.outAnimation = false;
        this.hide = true;
      }, 300);
    } else {
      this.hide = false;
      this.inAnimation = true;
      setTimeout(() => {
        this.inAnimation = false;
      }, 300);
    }
  });

  delayEndTimeoutEffect = effect(() => {
    if (this.shouldHide()) {
      setTimeout(() => {
        this.timeoutInfo.set(Object.assign({}, this.dataModel.timeoutState()));
      }, 350);
    } else {
      this.timeoutInfo.set(Object.assign({}, this.dataModel.timeoutState()));
    }
  });
}
