import { Component, computed, inject, input, Input, OnChanges, SimpleChanges } from "@angular/core";
import { DataModelService } from "../../../services/dataModel.service";
import { AbilitiesComponent } from "../../common/abilities/abilities.component";
import { UltimateTrackerComponent } from "../../common/ultimate-tracker/ultimate-tracker.component";
import { ShieldIconComponent } from "../../common/shield-icon/shield-icon.component";
import { AgentNameService } from "../../../services/agentName.service";
import { DisplayNameService } from "../../../services/displayName.service";

@Component({
  selector: "app-player-combat-card",
  imports: [AbilitiesComponent, UltimateTrackerComponent, ShieldIconComponent],
  templateUrl: "./player-combat-card.component.html",
  styleUrl: "./player-combat-card.component.css",
})
export class PlayerCombatCardComponent implements OnChanges {
  dataModel = inject(DataModelService);

  @Input() player!: any;
  @Input() playerHealth!: number; //only needed so change detection can give us an event for health change

  readonly isObserved = input<boolean>(); //only needed so change detection can correctly trigger the color switch
  readonly isAlive = input<boolean>();

  getDisplayName = inject(DisplayNameService).getDisplayName;

  right = input<boolean>(false);
  readonly color = input<"attacker" | "defender">();
  // @Input() color: "attacker" | "defender" = "defender";

  readonly playerinfoBackgroundClass = computed(() => {
    return `bg-playerinfo-${this.isAlive() == false ? "dead" : this.isObserved() ? "observed" : this.color()}-${this.right() ? "right" : "left"}`;
  });
  readonly weaponInfoBackgroundClass = computed(() => {
    return `bg-weaponinfo-${this.isObserved() ? "observed" : this.color()}-${this.right() ? "right" : "left"}`;
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

  clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.player.auxiliaryAvailable);

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

@Component({
  selector: "app-player-combat-card-minimal",
  imports: [],
  templateUrl: "./player-combat-card-minimal.component.html",
  styleUrl: "./player-combat-card.component.css",
})
export class PlayerCombatCardMinimalComponent extends PlayerCombatCardComponent {
  getAgentName(agent: string) {
    return AgentNameService.getAgentName(agent);
  }
}
