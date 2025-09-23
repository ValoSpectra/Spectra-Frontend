import { Component, computed, inject, input, Input, OnChanges, SimpleChanges } from "@angular/core";
import { UltimateTrackerComponent } from "../../common/ultimate-tracker/ultimate-tracker.component";
import { AbilitiesComponent } from "../../common/abilities/abilities.component";
import { DataModelService } from "../../../services/dataModel.service";
import { AgentNameService } from "../../../services/agentName.service";
import { DisplayNameService } from "../../../services/displayName.service";
import { ShieldIconComponent } from "../../common/shield-icon/shield-icon.component";

@Component({
  selector: "app-player-combat-card",
  imports: [UltimateTrackerComponent, AbilitiesComponent, ShieldIconComponent],
  templateUrl: "./player-combat-card.component.html",
  styleUrl: "./player-combat-card.component.css",
})
export class PlayerCombatCardComponent implements OnChanges {
  dataModel = inject(DataModelService);
  getDisplayName = inject(DisplayNameService).getDisplayName;

  @Input() player!: any;
  @Input() playerHealth!: number; //only needed so change detection can give us an event for health change

  readonly isObserved = input<boolean>(); //only needed so change detection can correctly trigger the color switch
  readonly isAlive = input<boolean>();

  right = input<boolean>(false);
  readonly color = input<string>();
  // @Input() color: "attacker" | "defender" = "defender";

  readonly playerinfoBackgroundClass = computed(() => {
    return `bg-playerinfo-${this.isAlive() == false ? "dead" : this.isObserved() ? "observed" : this.color()}-${this.right() ? "right" : "left"}`;
  });
  readonly weaponInfoBackgroundClass = computed(() => {
    return `bg-weaponinfo-${this.color()}-${this.right() ? "right" : "left"}`;
  });
  readonly textColor = computed(() =>
    this.color() == "attacker" ? "text-attacker-shield/80" : "text-defender-shield/80",
  );
  readonly backgroundColor = computed(() =>
    this.color() == "attacker" ? "bg-attacker-shield" : "bg-defender-shield",
  );
  readonly creditsIcon = computed(() =>
    this.color() == "attacker"
      ? "assets/misc/ValorantCreditsRed.svg"
      : "assets/misc/ValorantCreditsGreen.svg",
  );
  readonly getLeftPad = computed(() => (this.right() ? "pl-2" : "pl-8"));
  readonly getRightPad = computed(() => (this.right() ? "pr-8" : "pr-2"));

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

  getAgentName(agent: string) {
    return AgentNameService.getAgentName(agent);
  }
}

@Component({
  selector: "app-player-combat-card-minimal",
  imports: [],
  templateUrl: "./player-combat-card-minimal.component.html",
  styleUrl: "./player-combat-card.component.css",
})
export class PlayerCombatCardMinimalComponent extends PlayerCombatCardComponent {}
