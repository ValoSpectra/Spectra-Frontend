import { Component, computed, Input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { TranslateKeys } from "../../../services/i18nHelper";

@Component({
  selector: "app-mapinfo-content",
  imports: [TranslatePipe],
  templateUrl: "./mapinfo-content.component.html",
  styleUrl: "./mapinfo-content.component.css",
})
export class MapinfoContentComponent {
  @Input() currentMap!: string;
  @Input() mapinfo!: any;
  TranslateKeys = TranslateKeys;
  readonly type = computed(() => this.mapinfo.type);
}
