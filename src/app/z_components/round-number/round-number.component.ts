import { Component, computed, inject } from "@angular/core";
import { DataModelService } from "../../services/dataModel.service";
import { TranslatePipe } from "@ngx-translate/core";
import { TranslateKeys } from "../../services/i18nHelper";

@Component({
  selector: "app-round-number",
  imports: [TranslatePipe],
  templateUrl: "./round-number.component.html",
  styleUrl: "./round-number.component.css",
})
export class RoundNumberComponent {
  dataModel = inject(DataModelService);
  TranslateKeys = TranslateKeys;

  otNumber = computed(() => {
    const adjustedRound = this.dataModel.match().roundNumber - this.dataModel.match().firstOtRound;
    const otNumber = Math.floor(adjustedRound / 2 + 1);
    return otNumber;
  });
}
