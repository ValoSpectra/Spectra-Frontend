import { Component, inject } from "@angular/core";
import { DataModelService } from "../../../../services/dataModel.service";
import { SeriesWinPipComponent } from "./series-win-pip/series-win-pip.component";

@Component({
  selector: "app-mapwins",
  imports: [SeriesWinPipComponent],
  templateUrl: "./series-wins.component.html",
  styleUrl: "./series-wins.component.css",
})
export class SeriesWinsComponent {
  dataModel = inject(DataModelService);
  numSequence(n: number): number[] {
    return Array(n);
  }
}
