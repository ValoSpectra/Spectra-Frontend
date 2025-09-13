import { Component, Input, inject, input } from "@angular/core";
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
  readonly side = input<string>();

  get color() {
    return this.side() == "attacker"
      ? this.config.attackerColorShieldCurrency
      : this.config.defenderColorShieldCurrency;
  }
}
