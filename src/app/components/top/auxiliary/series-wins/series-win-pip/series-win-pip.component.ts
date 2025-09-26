import { Component, Input } from "@angular/core";

@Component({
  selector: "app-series-win-pip",
  imports: [],
  templateUrl: "./series-win-pip.component.html",
  styleUrl: "./series-win-pip.component.css",
})
export class SeriesWinPipComponent {
  @Input() full = false;
  @Input() right = false;
}
