import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-mapwins',
    templateUrl: './mapwins.component.html',
    styleUrls: ['./mapwins.component.scss'],
})
export class MapwinComponent {

    mapsNeeded: number = 3;
    mapsWonLeft: number = 2;
    mapsWonRight: number = 1;

    constructor() {
    }

    numSequence(n: number): Array<number> {
        return Array(n);
    }

}
