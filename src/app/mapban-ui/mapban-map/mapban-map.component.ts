import { Component, Input } from "@angular/core";
import { SessionMap } from "../mapban-ui.component";

@Component({
  selector: "app-mapban-map",
  templateUrl: "./mapban-map.component.html",
  styleUrl: "./mapban-map.component.scss",
})
export class MapbanMapComponent {
  @Input({ required: true }) map!: SessionMap;
}
