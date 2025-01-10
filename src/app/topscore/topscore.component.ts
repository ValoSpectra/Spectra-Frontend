import { animate, style, transition, trigger } from "@angular/animations";
import { Component, Input, SimpleChanges, OnChanges, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-topscore",
  templateUrl: "./topscore.component.html",
  styleUrls: ["./topscore.component.scss"],
  animations: [
    trigger("fade", [
      transition(":enter", [style({ opacity: "0" }), animate("0.5s", style({ opacity: "1" }))]),

      transition(":leave", animate("0.5s", style({ opacity: "0" }))),
    ]),
  ],
})
export class TopscoreComponent implements OnInit, OnChanges {
  @Input() match!: any;

  spikePlanted = false;
  blinkState = false;

  detonationTime = 0;
  lastActedTime = 9999;
  blinkInterval: any = undefined;

  mapsNeeded = 1;
  mapsWonLeft = 0;
  mapsWonRight = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["mapsNeeded"]) {
        this.mapsNeeded = parseInt(params["mapsNeeded"]);
      }
      if (params["mapsWonLeft"]) {
        this.mapsWonLeft = parseInt(params["mapsWonLeft"]);
      }
      if (params["mapsWonRight"]) {
        this.mapsWonRight = parseInt(params["mapsWonRight"]);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["match"]) {
      const match = changes["match"].currentValue;
      if (match["spikeState"]["planted"] != this.spikePlanted) {
        this.spikePlanted = match["spikeState"]["planted"];

        if (this.spikePlanted) {
          this.detonationTime = match["spikeDetonationTime"];
          this.blinkState = false;
          this.lastActedTime = 9999;
          this.initSpikeBlink();
        } else {
          clearInterval(this.blinkInterval);
          this.blinkState = false;
        }
      }
    }
  }

  initSpikeBlink() {
    this.blinkInterval = setInterval(() => {
      const timeLeft = (this.detonationTime - Date.now()) / 1000;
      if (timeLeft > 20) {
        if (this.lastActedTime >= timeLeft + 0.95) {
          this.blinkState = !this.blinkState;
          this.lastActedTime = timeLeft;
        }
      } else if (timeLeft > 10) {
        if (this.lastActedTime >= timeLeft + 0.45) {
          this.blinkState = !this.blinkState;
          this.lastActedTime = timeLeft;
        }
      } else if (timeLeft > 5) {
        if (this.lastActedTime >= timeLeft + 0.275) {
          this.blinkState = !this.blinkState;
          this.lastActedTime = timeLeft;
        }
      } else if (timeLeft > 0) {
        if (this.lastActedTime >= timeLeft + 0.125) {
          this.blinkState = !this.blinkState;
          this.lastActedTime = timeLeft;
        }
      } else {
        clearInterval(this.blinkInterval);
        this.blinkState = true;
      }
    }, 25);
  }

  numSequence(n: number): number[] {
    return Array(n);
  }
}
