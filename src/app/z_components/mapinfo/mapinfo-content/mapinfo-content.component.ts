import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-mapinfo-content",
  imports: [],
  templateUrl: "./mapinfo-content.component.html",
  styleUrl: "./mapinfo-content.component.css",
})
export class MapinfoContentComponent implements OnChanges {
  @Input() map!: string;
  @Input() mapinfo!: any;
  type: "past" | "present" | "future" = "future";

  ngOnChanges(): void {
    this.type = this.mapinfo.type;
  }
}
