import { Component, inject } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { TranslateKeys } from "../../../../services/i18nHelper";
import { DataModelService } from "../../../../services/dataModel.service";

@Component({
  selector: "app-mapinfo-new",
  imports: [TranslatePipe],
  templateUrl: "./series-maps.component.html",
  styleUrl: "./series-maps.component.css",
})
export class SeriesMapsComponent {
  dataModel = inject(DataModelService);
  TranslateKeys = TranslateKeys;
}
