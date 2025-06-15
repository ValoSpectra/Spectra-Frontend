import { Component, inject, Input } from "@angular/core";
import { Config } from "../shared/config";
import { trigger, transition, style, animate } from "@angular/animations";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-abilities",
  templateUrl: "./abilities.component.html",
  styleUrl: "./abilities.component.scss",
  animations: [
    trigger("deathAnimation", [
      transition("true => false, true => void", [
        style({ filter: "grayscale(50%)" }),
        animate("100ms ease-in", style({ width: "0", opacity: 0.5, filter: "grayscale(100%)" })),
      ]),
      transition("false => true, void => true", [
        style({ filter: "grayscale(50%)", width: "0", opacity: 0.5 }),
        animate("250ms ease-out", style({ width: "*", opacity: 1, filter: "grayscale(0%)" })),
      ]),
    ]),
    trigger("availableWhileDead", [
      transition("false => true, void => true", [
        style({ opacity: "0" }),
        animate("200ms linear", style({ opacity: 1 })),
      ]),
    ]),
  ],
  imports: [NgIf],
})
export class AbilitiesComponent {
  private config = inject(Config);

  public readonly assets: string = "../../../assets";
  @Input({ required: true }) player!: any;
  @Input({ required: true }) side!: "left" | "right";
  @Input({ required: false }) phase: "combat" | "shopping" = "combat";
  @Input() hideAuxiliary = false;

  getAvailability(availablility: number): string {
    availablility = this.clamp(availablility, 0, 1);
    return availablility == 1 ? "available" : "unavailable";
  }

  clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
}
