import { Component, Input, inject } from "@angular/core";
import { Config } from "../../../shared/config";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-shield-icon",
  templateUrl: "./shield-icon.component.html",
  styleUrl: "./shield-icon.component.scss",
  imports: [NgIf],
})
export class ShieldIconComponent {
  private config = inject(Config);

  @Input({ required: true }) type!: "Heavy" | "Regen" | "Light" | "None";
  @Input({ required: true }) side!: "attacker" | "defender";

  get color() {
    return this.side == "attacker"
      ? this.config.attackerColorShieldCurrency
      : this.config.defenderColorShieldCurrency;
  }
}
