import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-endround',
  templateUrl: './endround.component.html',
  styleUrls: ['./endround.component.scss'],
})

export class EndroundComponent {
    @Input() match!: any;
    ngOnChanges(changes: SimpleChanges) {
        if (changes["match"]) {
          const match = changes["match"].currentValue;
        }
    }
}