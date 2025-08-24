import { Component, inject } from "@angular/core";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-topscore-new",
  imports: [],
  templateUrl: "./topscore.component.html",
  styleUrl: "./topscore.component.css",
})
export class TopscoreComponent {
  dataModel = inject(DataModelService);
}
