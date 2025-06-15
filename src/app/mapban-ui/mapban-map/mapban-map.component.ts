import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ISessionTeam, SessionMap, Stage } from "../mapban-ui.component";
import { MapbanBanIconComponent } from "./mapban-ban-icon/mapban-ban-icon.component";
import { createTimeline, eases, JSAnimation } from "animejs";

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
  rotateNameCurrent = "";
  rotateMap = 0;

  roateMapNames = ["", ""];
  currentMapNameIndex = 0;

  ngAfterViewInit(): void {
    this.setupAnimations();
    this.rotateNameCurrent = this.map.name;
    if (this.rotateNameCurrent === "upcoming") {
      this.isRotating = true;
      this.rotateMapName(0);
      this.rotateMapName(1);
    } else {
      this.isRotating = false;
    }
  }

  slideRotateAnimation!: JSAnimation;

  private setupAnimations() {
    //#region Map Rotate Animation
    const timeline = createTimeline({
      defaults: {
        duration: 400,
        ease: "outCubic",
      },
      autoplay: true,
      loop: true,
      loopDelay: 0,
    });

    const img1 = "#rotateImage1";
    const img2 = "#rotateImage2";
    const timelineDelay = "+=3000";

    timeline.set(img1, { x: 0 });
    timeline.set(img2, { zIndex: -1, x: "-100%" });

    //slide 1
    timeline.set(img2, { zIndex: 1 }, timelineDelay);
    timeline.add(
      img2,
      {
        x: 0,
        zIndex: 1,
      },
      "<",
    );
    timeline.add(
      img1,
      {
        x: "+100%",
      },
      "<<",
    );
    timeline.set(
      img1,
      {
        x: "-100%",
      },
      "+=50",
    );
    timeline.call(() => {
      this.rotateMapName(0);
      this.currentMapNameIndex = 0;
    }, "<<");

    //slide 2
    timeline.set(img2, { zIndex: 1 }, timelineDelay);
    timeline.add(
      img1,
      {
        x: 0,
        zIndex: 1,
      },
      "<",
    );
    timeline.add(
      img2,
      {
        x: "+100%",
      },
      "<<",
    );
    timeline.set(
      img2,
      {
        x: "-100%",
      },
      "+=50",
    );
    timeline.call(() => {
      this.rotateMapName(1);
      this.currentMapNameIndex = 1;
    }, "<<");
    //#endregion
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["map"] && changes["map"].currentValue) {
      this.rotateNameCurrent = changes["map"].currentValue.name;
      if (this.rotateNameCurrent === "upcoming") {
        this.isRotating = true;
      } else {
        this.isRotating = false;
      }
    }
  }

  private rotateMapName(index: 0 | 1) {
    this.rotateMap = (this.rotateMap + 1) % this.availableMapNames.length;
    this.roateMapNames[index] = this.availableMapNames[this.rotateMap];
    this.rotateNameCurrent = this.roateMapNames[(index + 1) % 2];
  }
}
