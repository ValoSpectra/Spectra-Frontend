import { Component, computed, Input } from "@angular/core";

@Component({
  selector: "app-mapinfo-content",
  imports: [],
  templateUrl: "./mapinfo-content.component.html",
  styleUrl: "./mapinfo-content.component.css",
})
export class MapinfoContentComponent {
  @Input() currentMap!: string;
  @Input() mapinfo!: any;
  readonly type = computed(() => this.mapinfo.type);
}
