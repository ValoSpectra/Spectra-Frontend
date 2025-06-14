import { AfterViewInit, Component, Input } from "@angular/core";
import { SessionMap } from "../mapban-ui.component";

@Component({
  selector: "app-mapban-map",
  templateUrl: "./mapban-map.component.html",
  styleUrl: "./mapban-map.component.scss",
})
export class MapbanMapComponent implements AfterViewInit {
  @Input({ required: true }) map!: SessionMap;
  @Input({ required: true }) availableMapNames!: string[];

  mapName = "";
  rotateMap = 0;

  ngAfterViewInit(): void {
    this.mapName = this.map.name;
    if (this.mapName === "upcoming") {
      this.rotateMapName();
      setInterval(() => {
        this.rotateMapName();
      }, 3000);
    }
  }

  private rotateMapName() {
    this.rotateMap = (this.rotateMap + 1) % this.availableMapNames.length;
    this.mapName = this.availableMapNames[this.rotateMap];
  }
}
