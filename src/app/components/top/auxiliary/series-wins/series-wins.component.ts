import { Component, inject } from "@angular/core";
import { DataModelService } from "../../../../services/dataModel.service";

@Component({
  selector: "app-mapwins",
  imports: [],
  templateUrl: "./series-wins.component.html",
  styleUrl: "./series-wins.component.css",
})
export class SeriesWinsComponent {
  dataModel = inject(DataModelService);
  numSequence(n: number): number[] {
    return Array(n);
  }
}
