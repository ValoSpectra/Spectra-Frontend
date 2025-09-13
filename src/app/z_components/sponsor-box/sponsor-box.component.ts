import { Component, inject, OnInit, signal } from "@angular/core";
import { DataModelService } from "../../services/dataModel.service";

@Component({
  selector: "app-sponsor-box",
  imports: [],
  templateUrl: "./sponsor-box.component.html",
  styleUrl: "./sponsor-box.component.css",
})
export class SponsorBoxComponent implements OnInit {
  dataModel = inject(DataModelService);

  currentIndex = signal(0);

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex.update((i) => {
        let ret = i + 1;
        ret %= this.dataModel.sponsorInfo().sponsors.length;
        return ret;
      });
    }, this.dataModel.sponsorInfo().duration);
  }
}
