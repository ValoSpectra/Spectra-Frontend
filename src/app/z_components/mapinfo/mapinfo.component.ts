import { Component, Input } from "@angular/core";
import { MapinfoContentComponent } from "./mapinfo-content/mapinfo-content.component";

@Component({
  selector: "app-mapinfo-new",
  imports: [MapinfoContentComponent],
  templateUrl: "./mapinfo.component.html",
  styleUrl: "./mapinfo.component.css",
})
export class MapinfoComponent {
  @Input() tools!: any;
  @Input() map!: any;
}
