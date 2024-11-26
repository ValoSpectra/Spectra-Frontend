import { Component, OnInit } from "@angular/core";
import { Config } from "./shared/config";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "SpectraFrontend";

  constructor(private config: Config) { }

  ngOnInit(): void {
    document.documentElement.style.setProperty(
      "--defender-color",
      this.config.defenderColor,
    );
    document.documentElement.style.setProperty(
      "--defender-color-rgb",
      this.hexToRgb(this.config.defenderColor).join(", "),
    );
    document.documentElement.style.setProperty(
      "--attacker-color",
      this.config.attackerColor,
    );
    document.documentElement.style.setProperty(
      "--attacker-color-rgb",
      this.hexToRgb(this.config.attackerColor).join(", "),
    );
    document.documentElement.style.setProperty(
      "--defender-color-light",
      this.lightenHex(this.config.defenderColor, 30),
    );
    document.documentElement.style.setProperty(
      "--attacker-color-light",
      this.lightenHex(this.config.attackerColor, 30),
    );
  }

  hexToRgb(hex: string): number[] {
    hex = hex.replace(/^#/, "");

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
  }

  lightenHex(hex: string, percent: number): string {
    hex = hex.replace(/^#/, "");

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Calculate the amount to lighten
    r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

    // Convert back to hex and return
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
}
