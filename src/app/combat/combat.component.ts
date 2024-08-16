import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss'],
})
export class CombatComponent {

  @Input() match!: any;

  trackByPlayerId(index: number, player: any) {
    return player.playerId;
  }

  constructor() {
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
