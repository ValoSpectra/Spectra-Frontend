import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-playercard',
  templateUrl: './playercard.component.html',
  styleUrls: ['./playercard.component.scss'],
  animations: [
    trigger('deathAnimation', [
      transition(':leave',
        [style({ 'filter': 'grayscale(50%)' }),
        animate(100, style({ 'width': '0', 'opacity': 0 }))]
      )
    ])
  ]
})
export class InhouseTrackerPlayercardComponent {

  public readonly assets: String = "../../../assets";

  @Input() match!: any;
  @Input() color!: "red" | "green";
  @Input() side!: "left" | "right";

  private _player: any;

  constructor() {
  }

  @Input()
  set player(player: any) {
    this._player = player;
  }

  get player() {
    return this._player;
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  capitalizeColor(s: string) {
    return s[0].toUpperCase() + s.substring(1);
  }

}
