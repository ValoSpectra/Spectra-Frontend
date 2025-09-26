import { Component, computed, inject } from "@angular/core";
import { DataModelService } from "../../../../services/dataModel.service";

@Component({
  selector: "app-top-background",
  imports: [],
  templateUrl: "./background.component.html",
  styleUrl: "./background.component.css",
})
export class TopBackgroundComponent {
  dataModel = inject(DataModelService);
  leftAttacker = computed(() => this.dataModel.teams()[0].isAttacking);
}
