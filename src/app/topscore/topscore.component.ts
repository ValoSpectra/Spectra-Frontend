import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-topscore',
  templateUrl: './topscore.component.html',
  styleUrls: ['./topscore.component.scss'],
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
export class TopscoreComponent {

  @Input() match!: any;

  constructor() {
  }

}
