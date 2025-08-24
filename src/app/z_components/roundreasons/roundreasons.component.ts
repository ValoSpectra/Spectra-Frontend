import { Component, inject } from "@angular/core";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-roundreasons-new",
  imports: [],
  templateUrl: "./roundreasons.component.html",
  styleUrl: "./roundreasons.component.css",
})
export class RoundreasonsComponent {
  dataModel = inject(DataModelService);

  getBackgroundClass(record: any, team: any): string {
    if (record.type == "lost") {
      return "";
    }
    return `bg-roundwin-${record.wasAttack ? "attacker" : "defender"}-${team == this.dataModel.teams()[0] ? "top" : "bottom"}`;
  }
}
