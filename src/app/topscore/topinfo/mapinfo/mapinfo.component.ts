import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-mapinfo",
  templateUrl: "./mapinfo.component.html",
  styleUrls: ["./mapinfo.component.scss"],
})
export class MapinfoComponent implements OnChanges {
  @Input() map!: string;
  @Input() mapinfo!: any;
  type: "past" | "present" | "future" = "future";

  ngOnChanges(): void {
    this.type = this.mapinfo.type;
  }
}
