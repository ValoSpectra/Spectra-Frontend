import { Component, computed, Input } from "@angular/core";
import { UltimateTrackerComponent } from "../ultimate-tracker/ultimate-tracker.component";
import { AbilitiesComponent } from "../abilities/abilities.component";

@Component({
  selector: "app-playerscore-new",
  imports: [UltimateTrackerComponent, AbilitiesComponent],
  templateUrl: "./playerscore.component.html",
  styleUrl: "./playerscore.component.css",
})
export class PlayerscoreComponent {
  @Input() player!: any;

  @Input() right = false;
  @Input() color: "attacker" | "defender" = "defender";

  backgroundClass = computed(() => {
    return `bg-fade-${this.color}-${this.right ? "right" : "left"}`;
  });
}
