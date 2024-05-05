import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss'],
})
export class CombatComponent {

  @Input() match!: any;

  constructor() {
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
