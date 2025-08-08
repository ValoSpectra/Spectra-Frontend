import { Component, Input } from "@angular/core";

@Component({
  selector: "app-ultimate-tracker",
  imports: [],
  templateUrl: "./ultimate-tracker.component.html",
  styleUrl: "./ultimate-tracker.component.css",
})
export class UltimateTrackerComponent {
  @Input() max!: number;
  @Input() full!: number;
  @Input() image!: string;

  numSequence(n: number): number[] {
    return Array(n);
  }
}
