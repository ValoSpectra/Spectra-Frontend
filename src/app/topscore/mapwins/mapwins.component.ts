import { Component } from '@angular/core';

@Component({
  selector: 'app-mapwins',
  templateUrl: './mapwins.component.html',
  styleUrls: ['./mapwins.component.scss'],
})
export class MapwinComponent {
  mapsNeeded = 3;
  mapsWonLeft = 2;
  mapsWonRight = 1;
  numSequence(n: number): number[] {
    return Array(n);
  }
}
