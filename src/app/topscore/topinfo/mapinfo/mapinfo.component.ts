import { Component, Input, OnChanges } from "@angular/core";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-mapinfo",
  templateUrl: "./mapinfo.component.html",
  styleUrls: ["./mapinfo.component.scss"],
  imports: [NgIf],
})
export class MapinfoComponent implements OnChanges {
  @Input() map!: string;
  @Input() mapinfo!: any;
  type: "past" | "present" | "future" = "future" | "disabled";

  ngOnChanges(): void {
    this.type = this.mapinfo.type;
  }
}
