import { Component, computed, Input } from "@angular/core";
import { UltimateTrackerComponent } from "../ultimate-tracker/ultimate-tracker.component";
import { AbilitiesComponent } from "../abilities/abilities.component";
import { ShieldIconComponent } from "../../combat/playercard/shield-icon/shield-icon.component";

@Component({
  selector: "app-player-combat-card",
  imports: [UltimateTrackerComponent, AbilitiesComponent, ShieldIconComponent],
  templateUrl: "./player-combat-card.component.html",
  styleUrl: "./player-combat-card.component.css",
})
export class PlayerCombatCardComponent {
  @Input() player!: any;

  @Input() right = false;
  @Input() color: "attacker" | "defender" = "defender";

  readonly backgroundClassSuffix = computed(() => {
    return `${this.player.isObserved ? "observed" : this.color}-${this.right ? "right" : "left"}`;
  });

  readonly textColor = computed(() =>
    this.color == "attacker" ? "text-attacker-shield/80" : "text-defender-shield/80",
  );
  readonly backgroundColor = computed(() =>
    this.color == "attacker" ? "bg-attacker-shield" : "bg-defender-shield",
  );

  clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }
}
