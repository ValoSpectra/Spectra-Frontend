import { Component, inject, OnInit, signal } from "@angular/core";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-watermark",
  imports: [],
  templateUrl: "./watermark.component.html",
  styleUrl: "./watermark.component.css",
})
export class WatermarkComponent implements OnInit {
  dataModel = inject(DataModelService);

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
