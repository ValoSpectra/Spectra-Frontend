import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-playercard',
  templateUrl: './playercard.component.html',
  styleUrls: ['./playercard.component.scss']
})
export class InhouseTrackerPlayercardComponent {

  public readonly assets: String = "../../../assets";

  @Input() match!: any;
  @Input() player!: any;
  @Input() color!: "red" | "green";
  @Input() side!: "left" | "right";

  constructor() {
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  capitalizeColor(s: string) {
    return s[0].toUpperCase() + s.substring(1);
  }

}
