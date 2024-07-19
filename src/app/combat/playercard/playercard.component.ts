import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-playercard',
  templateUrl: './playercard.component.html',
  styleUrls: ['./playercard.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ 'opacity': '0' }),
        animate('0.5s', style({ 'opacity': '1' }))
      ]),

      transition(':leave',
        animate('0.5s', style({ 'opacity': '0' }))
      )
    ])
  ]
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
