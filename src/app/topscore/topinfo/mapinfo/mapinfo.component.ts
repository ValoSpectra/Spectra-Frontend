import { Component, Input, OnChanges } from "@angular/core";
import { NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-mapinfo",
  templateUrl: "./mapinfo.component.html",
  styleUrls: ["./mapinfo.component.scss"],
  imports: [TranslateModule, NgIf],
})
export class MapinfoComponent implements OnChanges {
  @Input() map!: string;
  @Input() mapinfo!: any;
  type: "past" | "present" | "future" = "future";

  ngOnChanges(): void {
    this.type = this.mapinfo.type;
  }
}
