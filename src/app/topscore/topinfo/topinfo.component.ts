import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-topinfo',
  templateUrl: './topinfo.component.html',
  styleUrls: ['./topinfo.component.scss'],
})
export class TopinfoComponent {

  @Input() match!: any;

  map1 = "";
  map2 = "";
  map3 = "";

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["match"]) {
      const match = changes["match"].currentValue;
      if (match.seletedMap && match.seletedMap.length > 0) {
        this.map1 = match.seletedMap[0] ?? "";
        this.map2 = match.seletedMap[1] ?? "";
        this.map3 = match.seletedMap[2] ?? "";
      }
    }
  }
}
