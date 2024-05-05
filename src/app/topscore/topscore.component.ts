import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-topscore',
  templateUrl: './topscore.component.html',
  styleUrls: ['./topscore.component.scss'],
})
export class TopscoreComponent {

  @Input() match!: any;

  constructor() {
  }

}
