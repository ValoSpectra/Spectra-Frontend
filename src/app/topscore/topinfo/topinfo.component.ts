import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Config } from "../../shared/config";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-topinfo",
  templateUrl: "./topinfo.component.html",
  styleUrls: ["./topinfo.component.scss"],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [style({ opacity: 0 }), animate("1s", style({ opacity: 1 }))]),
      transition(":leave", [animate("1s", style({ opacity: 0 }))]),
    ]),
  ],
  standalone: false,
})
export class TopinfoComponent implements OnInit, OnChanges {
  @Input() tools!: any;
  @Input() map!: any;

  sponsorsAvailable = false;
  sponsorImages: string[] = [];
  currentSponsorIndex = 0;

  sponsorInterval: any;

  constructor(private config: Config) {}

  ngOnInit() {
    this.sponsorsAvailable = this.config.sponsorImageUrls.length > 0;
    if (this.sponsorsAvailable) {
      this.sponsorImages = this.config.sponsorImageUrls;
      this.currentSponsorIndex = 0;
      if (this.config.sponsorImageUrls.length > 1) {
        this.sponsorInterval = setInterval(
          () => this.nextSponsor(),
          this.config.sponsorImageRotateSpeed,
        );
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const newSponsors = changes["tools"]["currentValue"]["sponsorInfo"] as SponsorInfo;
    if (newSponsors) {
      if (newSponsors.enabled != this.sponsorsAvailable) {
        this.sponsorsAvailable = newSponsors.enabled;
      }
      if (newSponsors.sponsors != this.sponsorImages) {
        this.sponsorImages = newSponsors.sponsors;
        this.currentSponsorIndex = 0; // Reset to first sponsor in case we might be out of bounds
        if (this.sponsorInterval) {
          clearInterval(this.sponsorInterval);
        }
        if (this.sponsorImages.length > 1) {
          this.sponsorInterval = setInterval(() => this.nextSponsor(), newSponsors.duration);
        }
      }
    }
  }

  nextSponsor() {
    this.currentSponsorIndex = (this.currentSponsorIndex + 1) % this.sponsorImages.length;
  }
}

interface SponsorInfo {
  enabled: boolean;
  duration: number;
  sponsors: string[];
}
