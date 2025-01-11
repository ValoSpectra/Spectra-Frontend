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
    document.documentElement.style.setProperty(
      "--defender-color",
      this.config.defenderColorPrimary,
    );
    document.documentElement.style.setProperty(
      "--defender-color-rgb",
      this.hexToRgb(this.config.defenderColorPrimary).join(", "),
    );
    document.documentElement.style.setProperty(
      "--attacker-color",
      this.config.attackerColorPrimary,
    );
    document.documentElement.style.setProperty(
      "--attacker-color-rgb",
      this.hexToRgb(this.config.attackerColorPrimary).join(", "),
    );
    document.documentElement.style.setProperty(
      "--defender-color-secondary",
      this.config.defenderColorSecondary,
    );
    document.documentElement.style.setProperty(
      "--defender-color-secondary-rgb",
      this.hexToRgb(this.config.defenderColorSecondary).join(", "),
    );
    document.documentElement.style.setProperty(
      "--attacker-color-secondary",
      this.config.attackerColorSecondary,
    );
    document.documentElement.style.setProperty(
      "--attacker-color-secondary-rgb",
      this.hexToRgb(this.config.attackerColorSecondary).join(", "),
    );
    document.documentElement.style.setProperty(
      "--defender-color-shield-currency",
      this.config.defenderColorShieldCurrency,
    );
    document.documentElement.style.setProperty(
      "--defender-color-shield-currency-rgb",
      this.hexToRgb(this.config.defenderColorShieldCurrency).join(", "),
    );
    document.documentElement.style.setProperty(
      "--attacker-color-shield-currency",
      this.config.attackerColorShieldCurrency,
    );
    document.documentElement.style.setProperty(
      "--attacker-color-shield-currency-rgb",
      this.hexToRgb(this.config.attackerColorShieldCurrency).join(", "),
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
