import { Component, inject } from "@angular/core";
import { MapinfoContentComponent } from "./mapinfo-content/mapinfo-content.component";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-mapinfo-new",
  imports: [MapinfoContentComponent],
  templateUrl: "./mapinfo.component.html",
  styleUrl: "./mapinfo.component.css",
})
export class MapinfoComponent {
  dataModel = inject(DataModelService);
}
