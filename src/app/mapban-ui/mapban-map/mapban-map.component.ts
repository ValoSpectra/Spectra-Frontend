import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ISessionTeam, SessionMap, Stage } from "../mapban-ui.component";
import { MapbanBanIconComponent } from "./mapban-ban-icon/mapban-ban-icon.component";

@Component({
  standalone: true,
  imports: [MapbanBanIconComponent],
  selector: "app-mapban-map",
  templateUrl: "./mapban-map.component.html",
  styleUrl: "./mapban-map.component.css",
})
export class MapbanMapComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) map!: SessionMap;
  @Input({ required: true }) availableMapNames!: string[];
  @Input({ required: true }) teams!: ISessionTeam[];
  @Input({ required: true }) actingTeam!: 0 | 1 | undefined;
  @Input({ required: true }) stage!: Stage;
  @Input({ required: true }) showLogo!: boolean;

  isRotating = false;
  rotateName = "";
  rotateMap = 0;
  rotateInterval: any;

  ngAfterViewInit(): void {
    this.rotateName = this.map.name;
    if (this.rotateName === "upcoming") {
      this.isRotating = true;
      this.rotateMapName();
      clearInterval(this.rotateInterval);
      setInterval(() => {
        this.rotateMapName();
      }, 3000);
    } else {
      clearInterval(this.rotateInterval);
      this.isRotating = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["map"] && changes["map"].currentValue) {
      this.rotateName = changes["map"].currentValue.name;
      if (this.rotateName === "upcoming") {
        clearInterval(this.rotateInterval);
        this.isRotating = true;
        this.rotateMapName();
        this.rotateInterval = setInterval(() => {
          this.rotateMapName();
        }, 3000);
      } else {
        clearInterval(this.rotateInterval);
        this.isRotating = false;
      }
    }
  }

  private rotateMapName() {
    this.rotateMap = (this.rotateMap + 1) % this.availableMapNames.length;
    this.rotateName = this.availableMapNames[this.rotateMap];
  }
}
