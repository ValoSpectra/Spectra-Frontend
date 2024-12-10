import { trigger, transition, style, animate } from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Config } from "../../shared/config";

@Component({
  selector: "app-playercard",
  templateUrl: "./playercard.component.html",
  styleUrls: ["./playercard.component.scss"],
  animations: [
    trigger("deathAnimation", [
      transition("true => false, true => void", [
        style({ filter: "grayscale(50%)" }),
        animate(
          "100ms ease-in",
          style({ width: "0", opacity: 0.5, filter: "grayscale(100%)" }),
        ),
      ]),
      transition("false => true, void => true", [
        style({ filter: "grayscale(50%)", width: "0", opacity: 0.5 }),
        animate(
          "250ms ease-out",
          style({ width: "*", opacity: 1, filter: "grayscale(0%)" }),
        ),
      ]),
    ]),
    trigger("ultPipAnimation", [
      transition(":leave", [
        style({ opacity: 1 }),
        animate("150ms", style({ opacity: 0, transform: "scale(0, 1.5)" })),
      ]),
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0, 1.5)" }),
        animate("150ms", style({ opacity: 1, transform: "scale(1, 1)" })),
      ]),
    ]),
    trigger("ultImageAnimation", [
      transition(":enter", [
        style({ opacity: 0, position: "absolute" }),
        animate("150ms", style({ opacity: 1 })),
      ]),
      transition(":leave", [
        style({ opacity: 1, position: "absolute" }),
        animate("150ms", style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class InhouseTrackerPlayercardComponent {
  public readonly assets: String = "../../../assets";

  @Input() match!: any;
  @Input() color!: "attacker" | "defender";
  @Input() side!: "left" | "right";

  private _player: any;

  constructor(private config: Config) {}

  @Input()
  set player(player: any) {
    this._player = player;
  }

  get player() {
    return this._player;
  }

  get colorHex() {
    return this.color == "attacker"
      ? this.config.attackerColor
      : this.config.defenderColor;
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  capitalizeColor(s: string) {
    return s[0].toUpperCase() + s.substring(1);
  }
}

