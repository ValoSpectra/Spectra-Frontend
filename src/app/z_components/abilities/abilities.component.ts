import { Component, Input } from "@angular/core";

@Component({
  selector: "app-abilities-new",
  imports: [],
  templateUrl: "./abilities.component.html",
  styleUrl: "./abilities.component.css",
})
export class AbilitiesComponent {
  @Input() player!: any;

  isAvailable(availablility: number): boolean {
    availablility = this.clamp(availablility, 0, 1);
    return availablility == 1;
  }

  clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
}
