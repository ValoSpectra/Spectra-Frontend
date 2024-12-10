import { Component, Input } from "@angular/core";

@Component({
  selector: "app-playerscore",
  templateUrl: "./playerscore.component.html",
  styleUrls: ["./playerscore.component.scss"],
})
export class PlayerscoreComponent {
  public readonly assets: String = "../../../assets";

  @Input() match!: any;
  @Input() player!: any;
  @Input() color!: "attacker" | "defender";
  @Input() side!: "left" | "right";

  constructor() { }

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
