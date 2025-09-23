import { Component, inject, OnInit, signal } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { DataModelService } from "../../../../services/dataModel.service";
import { TranslateKeys } from "../../../../services/i18nHelper";

@Component({
  selector: "app-watermark",
  imports: [TranslatePipe],
  templateUrl: "./watermark.component.html",
  styleUrl: "./watermark.component.css",
})
export class WatermarkComponent implements OnInit {
  dataModel = inject(DataModelService);
  TranslateKeys = TranslateKeys;

  currentRotationIndex = signal(0);

  ngOnInit(): void {
    setInterval(() => {
      this.currentRotationIndex.update((i) => {
        let ret = i + 1;
        ret %= 2;
        return ret;
      });
    }, 30 * 1000);
  }
}
