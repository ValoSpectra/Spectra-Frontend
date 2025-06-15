import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ISessionTeam, SessionMap, Stage } from "../mapban-ui.component";
import { MapbanBanIconComponent } from "./mapban-ban-icon/mapban-ban-icon.component";
import { createTimeline, Timeline } from "animejs";

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
  @Input({ required: true }) index!: number;
  @Input({ required: true }) logoIndex!: number;

  isRotating = false;
  rotateNameCurrent = "";
  rotateMap = 0;

  roateMapNames = ["", ""];
  currentMapNameIndex = 0;
  rotateMapTimeline!: Timeline;

  showLogo = this.index === this.logoIndex;

  isPicked = false;
  isBanned = false;
  isInSidePick = false;
  sideIsPicked = false;
  isDecider = false;

  isInitialized = false;

  ngAfterViewInit(): void {
    this.isInitialized = true;
    if (this.isRotating) {
      this.startedRotating();
    }
  }

  private setupRotateAnimation() {
    //#region Map Rotate Animation
    this.rotateMapTimeline = createTimeline({
      defaults: {
        duration: 400,
        ease: "outCubic",
      },
      autoplay: false,
      loop: true,
      loopDelay: 0,
    });

    const timeline = this.rotateMapTimeline;
    const img1 = "#rotateImage1Index" + this.index;
    const img2 = "#rotateImage2Index" + this.index;
    const timelineDelay = "+=1000";

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
      const newMap: SessionMap = changes["map"] && changes["map"].currentValue;
      this.showLogo = this.index === this.logoIndex;

      if (newMap.name === "upcoming") {
        if (this.isRotating == false) this.startedRotating();
        this.isRotating = true;
      }

      if (newMap.pickedBy !== undefined) {
        if (this.isPicked == false) this.gotPicked();
        this.isPicked = true;
      } else {
        this.isPicked = false;
      }

      if (newMap.bannedBy !== undefined) {
        if (this.isBanned == false) this.gotBanned();
        this.isBanned = true;
      } else {
        this.isBanned = false;
      }

      if (newMap.sidePickedBy !== undefined && newMap.pickedAttack === undefined) {
        if (this.isInSidePick == false) this.enteredSidePick();
        this.isInSidePick = true;
      } else {
        this.isInSidePick = false;
      }

      if (newMap.pickedAttack !== undefined) {
        if (this.sideIsPicked == false) this.gotSidePicked();
        this.sideIsPicked = true;
      } else {
        this.sideIsPicked = false;
      }

      if (!this.isBanned && !this.isPicked && (this.isInSidePick || this.sideIsPicked)) {
        if (this.isDecider == false) this.gotMadeDecider();
        this.isDecider = true;
      } else {
        this.isDecider = false;
      }
    }
  }

  private startedRotating() {
    this.startRotateAnimation();
  }

  private gotPicked() {
    this.stopRotateAnimation();
  }

  private gotBanned() {
    this.stopRotateAnimation();
  }

  private enteredSidePick() {
    //
  }

  private gotSidePicked() {
    //
  }

  private gotMadeDecider() {
    //
  }

  private rotateMapName(index: 0 | 1) {
    this.rotateMap = (this.rotateMap + 1) % this.availableMapNames.length;
    this.roateMapNames[index] = this.availableMapNames[this.rotateMap];
    this.rotateNameCurrent = this.roateMapNames[(index + 1) % 2];
  }

  private startRotateAnimation() {
    if (!this.isInitialized) return;
    this.rotateMapName(0);
    this.rotateMapName(1);
    if (!this.rotateMapTimeline) {
      this.setupRotateAnimation();
    }
    this.rotateMapTimeline.play();
  }

  private stopRotateAnimation() {
    this.isRotating = false;
    this.rotateMap = 0;
    this.roateMapNames = ["", ""];
    if (this.rotateMapTimeline) {
      this.rotateMapTimeline.revert();
    }
  }
}
