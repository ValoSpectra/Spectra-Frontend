import { Component, computed, inject } from "@angular/core";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-round-number",
  imports: [],
  templateUrl: "./round-number.component.html",
  styleUrl: "./round-number.component.css",
})
export class RoundNumberComponent {
  dataModel = inject(DataModelService);

  otNumber = computed(() => {
    const adjustedRound = this.dataModel.match().roundNumber - this.dataModel.match().firstOtRound;
    const otNumber = Math.floor(adjustedRound / 2 + 1);
    return otNumber;
  });
}
