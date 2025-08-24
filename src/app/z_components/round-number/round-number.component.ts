import { Component, inject } from "@angular/core";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-round-number",
  imports: [],
  templateUrl: "./round-number.component.html",
  styleUrl: "./round-number.component.css",
})
export class RoundNumberComponent {
  dataModel = inject(DataModelService);
}
