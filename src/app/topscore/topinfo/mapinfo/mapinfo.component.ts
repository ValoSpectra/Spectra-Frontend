import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-mapinfo",
  templateUrl: "./mapinfo.component.html",
  styleUrls: ["./mapinfo.component.scss"],
})
export class MapinfoComponent implements OnChanges {
  @Input() mapinfo!: any;
  type: "past" | "present" | "future" = "present";

  ngOnChanges(): void {
    this.type = this.mapinfo.type;
  }
}
