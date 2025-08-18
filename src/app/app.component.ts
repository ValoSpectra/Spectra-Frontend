import { Component, OnInit, inject } from "@angular/core";
import { Config } from "./shared/config";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
})
export class AppComponent implements OnInit {
  private config = inject(Config);

  title = "SpectraFrontend";

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
      "--attacker-color-tertiary",
      this.config.attackerColorTertiary,
    );
    document.documentElement.style.setProperty(
      "--attacker-color-tertiary-rgb",
      this.hexToRgb(this.config.attackerColorTertiary).join(", "),
    );
    document.documentElement.style.setProperty(
      "--defender-color-tertiary",
      this.config.defenderColorTertiary,
    );
    document.documentElement.style.setProperty(
      "--defender-color-tertiary-rgb",
      this.hexToRgb(this.config.defenderColorTertiary).join(", "),
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
    console.log("SpectraFrontend initialized, version 0.2.41");
  }

  hexToRgb(hex: string): number[] {
    hex = hex.replace(/^#/, "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
  }
}
