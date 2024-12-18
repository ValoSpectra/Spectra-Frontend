import { Component, OnInit } from "@angular/core";
import { Config } from "./shared/config";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "SpectraFrontend";

  constructor(private config: Config) {}

  ngOnInit(): void {
    document.documentElement.style.setProperty("--defender-color", this.config.defenderColor);
    document.documentElement.style.setProperty(
      "--defender-color-rgb",
      this.hexToRgb(this.config.defenderColor).join(", "),
    );
    document.documentElement.style.setProperty("--attacker-color", this.config.attackerColor);
    document.documentElement.style.setProperty(
      "--attacker-color-rgb",
      this.hexToRgb(this.config.attackerColor).join(", "),
    );
    document.documentElement.style.setProperty(
      "--defender-color-light",
      this.config.defenderColorLight,
    );
    document.documentElement.style.setProperty(
      "--attacker-color-light",
      this.config.attackerColorLight,
    );
  }

  hexToRgb(hex: string): number[] {
    hex = hex.replace(/^#/, "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
  }
}
