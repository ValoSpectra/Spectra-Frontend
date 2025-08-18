import { animate, style, transition, trigger } from "@angular/animations";
import { Component, Input, SimpleChanges, OnChanges } from "@angular/core";
import { NgIf, NgFor } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-topscore",
  templateUrl: "./topscore.component.html",
  styleUrls: ["./topscore.component.scss"],
  animations: [
    trigger("spike", [
      transition(":enter", [
        style({ transform: "translateY(-150%)" }),
        animate("0.3s ease-out", style({ transform: "translateY(0%)" })),
      ]),
      transition(":leave", animate("0.3s", style({ transform: "translateY(-150%)" }))),
    ]),
  ],
  imports: [TranslateModule, NgIf, NgFor],
})
export class TopscoreComponent implements OnChanges {
  @Input() match!: any;
  @Input() color!: "attacker" | "defender";
  @Input() side!: "left" | "right";

  spikePlanted = false;
  blinkState = false;

  detonationTime = 0;
  lastActedTime = 9999;
  blinkInterval: any = undefined;

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
