import { Component, Input } from "@angular/core";
import { Config } from "../../../shared/config";

@Component({
  selector: "app-shield-icon",
  templateUrl: "./shield-icon.component.html",
  styleUrl: "./shield-icon.component.scss",
})
export class ShieldIconComponent {
  @Input({ required: true }) type!: "Heavy" | "Regen" | "Light" | "None";
  @Input({ required: true }) side!: "attacker" | "defender";

  constructor(private config: Config) { }

  get color() {
    return this.side == "attacker"
      ? this.config.attackerColor
      : this.config.defenderColor;
  }
}
