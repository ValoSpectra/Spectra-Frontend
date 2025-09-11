import { Component, computed, input, Input, OnChanges, SimpleChanges } from "@angular/core";
import { UltimateTrackerComponent } from "../ultimate-tracker/ultimate-tracker.component";
import { AbilitiesComponent } from "../abilities/abilities.component";
import { ShieldIconComponent } from "../../combat/playercard/shield-icon/shield-icon.component";

@Component({
  selector: "app-player-combat-card",
  imports: [UltimateTrackerComponent, AbilitiesComponent, ShieldIconComponent],
  templateUrl: "./player-combat-card.component.html",
  styleUrl: "./player-combat-card.component.css",
})
export class PlayerCombatCardComponent implements OnChanges {
  @Input() player!: any;
  @Input() playerHealth!: number; //only needed so change detection can give us an event for health change

  readonly isObserved = input<boolean>(); //only needed so change detection can correctly trigger the color switch

  @Input() right = false;
  readonly color = input<string>();
  // @Input() color: "attacker" | "defender" = "defender";

  readonly playerinfoBackgroundClass = computed(() => {
    return `bg-playerinfo-${this.isObserved() ? "observed" : this.color()}-${this.right ? "right" : "left"}`;
  });
  readonly weaponInfoBackgroundClass = computed(() => {
    return `bg-weaponinfo-${this.color()}-${this.right ? "right" : "left"}`;
  });
  readonly textColor = computed(() =>
    this.color() == "attacker" ? "text-attacker-shield/80" : "text-defender-shield/80",
  );
  readonly backgroundColor = computed(() =>
    this.color() == "attacker" ? "bg-attacker-shield" : "bg-defender-shield",
  );

  clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const healthChanges = changes["playerHealth"];
    if (
      healthChanges &&
      healthChanges.previousValue !== undefined &&
      healthChanges.previousValue !== 0
    ) {
      this.onPlayerHealthChanged();
    }
  }

  protected healthAnimationRunning = false;
  onPlayerHealthChanged() {
    this.healthAnimationRunning = true;
    setTimeout(() => {
      this.healthAnimationRunning = false;
    }, 200);
  }
}
