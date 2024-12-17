import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-endround',
  templateUrl: './endround.component.html',
  styleUrls: ['./endround.component.scss'],
})

export class EndroundComponent {
  @Input() match!: any;
  teamWon = 0;
  ngOnChanges(changes: SimpleChanges) {
      if (changes["match"]) {
        const match = changes["match"].currentValue;
        if(match.attackersWon == true && match.teams[0].isAttacking == true) { this.teamWon = 0; }
        else { this.teamWon = 1; }
      }
  }
}