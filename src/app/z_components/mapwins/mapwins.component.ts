import { Component } from "@angular/core";

@Component({
  selector: "app-mapwins",
  imports: [],
  templateUrl: "./mapwins.component.html",
  styleUrl: "./mapwins.component.css",
})
export class MapwinsComponent {
  numSequence(n: number): number[] {
    return Array(n);
  }
}
