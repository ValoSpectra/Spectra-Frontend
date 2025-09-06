import { Component, inject } from "@angular/core";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-mapwins",
  imports: [],
  templateUrl: "./mapwins.component.html",
  styleUrl: "./mapwins.component.css",
})
export class MapwinsComponent {
  dataModel = inject(DataModelService);
  numSequence(n: number): number[] {
    return Array(n);
  }
}
