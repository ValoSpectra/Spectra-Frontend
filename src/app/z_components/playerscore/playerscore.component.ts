import { Component, computed, inject, input, Input } from "@angular/core";
import { UltimateTrackerComponent } from "../ultimate-tracker/ultimate-tracker.component";
import { AbilitiesComponent } from "../abilities/abilities.component";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-playerscore-new",
  imports: [UltimateTrackerComponent, AbilitiesComponent],
  templateUrl: "./playerscore.component.html",
  styleUrl: "./playerscore.component.css",
})
export class PlayerscoreComponent {
  dataModel = inject(DataModelService);

  @Input() player!: any;

  @Input() right = false;
  // @Input() color: "attacker" | "defender" = "defender";
  color = input<string>();

  readonly backgroundClass = computed(() => {
    return `bg-fade-${this.color()}-${this.right ? "right" : "left"}`;
  });
}
