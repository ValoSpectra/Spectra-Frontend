import { Component, computed, inject } from "@angular/core";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-roundreasons-new",
  imports: [],
  templateUrl: "./roundreasons.component.html",
  styleUrl: "./roundreasons.component.css",
})
export class RoundreasonsComponent {
  dataModel = inject(DataModelService);

  isShown = computed(() => this.dataModel.match().roundPhase === "shopping");

  getBackgroundClass(record: any, team: any): string {
    if (record.type === "lost" || record.type === "upcoming") {
      return "";
    }
    return `bg-roundwin-${record.wasAttack ? "attacker" : "defender"}-${team == this.dataModel.teams()[0] ? "top" : "bottom"}`;
  }
}
