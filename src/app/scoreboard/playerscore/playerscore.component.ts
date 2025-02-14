import { Component, Input } from "@angular/core";

@Component({
  selector: "app-playerscore",
  templateUrl: "./playerscore.component.html",
  styleUrls: ["./playerscore.component.scss"],
})
export class PlayerscoreComponent {
  public readonly assets: string = "../../../assets";

  @Input() match!: any;
  @Input() player!: any;
  @Input() color!: "attacker" | "defender";
  @Input() side!: "left" | "right";

  numSequence(n: number): number[] {
    return Array(n);
  }
}

@Component({
  selector: "app-playerscore-minimal",
  templateUrl: "./playerscore-minimal.component.html",
  styleUrls: ["./playerscore.component.scss"],
})
export class PlayerscoreMinimalComponent extends PlayerscoreComponent {}