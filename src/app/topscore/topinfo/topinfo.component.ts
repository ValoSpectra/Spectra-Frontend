import { Component } from "@angular/core";
import { Config } from "../../shared/config";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-topinfo",
  templateUrl: "./topinfo.component.html",
  styleUrls: ["./topinfo.component.scss"],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("1s", style({ opacity: 1 })),
      ]),
      transition(":leave", [animate("1s", style({ opacity: 0 }))]),
    ]),
  ],
})
export class TopinfoComponent {
  sponsorsAvailable = false;
  sponsorImages: string[] = [];
  currentSponsorIndex = 0;

  constructor(private config: Config) {}

  ngOnInit() {
    this.sponsorsAvailable = this.config.sponsorImageUrls.length > 0;
    if (this.sponsorsAvailable) {
      this.sponsorImages = this.config.sponsorImageUrls;
      this.currentSponsorIndex = 0;
      setInterval(
        () => this.nextSponsor(),
        this.config.sponsorImageRotateSpeed,
      );
    }
  }

  nextSponsor() {
    this.currentSponsorIndex =
      (this.currentSponsorIndex + 1) % this.config.sponsorImageUrls.length;
  }
}
