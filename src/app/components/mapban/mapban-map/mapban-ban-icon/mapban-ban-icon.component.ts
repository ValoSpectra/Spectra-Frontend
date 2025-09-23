import { AfterViewInit, Component, Input } from "@angular/core";
import { animate, svg, eases } from "animejs";

@Component({
  selector: "app-mapban-ban-icon",
  standalone: true,
  imports: [],
  templateUrl: "./mapban-ban-icon.component.html",
  styleUrl: "./mapban-ban-icon.component.css",
})
export class MapbanBanIconComponent implements AfterViewInit {
  @Input({ required: true }) index!: number;

  ngAfterViewInit(): void {
    //#region Ban SVG
    animate(svg.createDrawable("#banIcon-" + this.index), {
      draw: ["0 0", "0 1"],
      ease: eases.inOutQuad,
      duration: 1500,
      delay: 500,
      autoplay: true,
      loop: false,
    });
    //#endregion
  }
}
