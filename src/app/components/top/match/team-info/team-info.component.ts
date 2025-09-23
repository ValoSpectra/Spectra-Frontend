import { Component, inject } from "@angular/core";
import { DataModelService } from "../../../../services/dataModel.service";

@Component({
  selector: "app-topscore-new",
  imports: [],
  templateUrl: "./team-info.component.html",
  styleUrl: "./team-info.component.css",
})
export class TopTeamInfoComponent {
  dataModel = inject(DataModelService);
}
