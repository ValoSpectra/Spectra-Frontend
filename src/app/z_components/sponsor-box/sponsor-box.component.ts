import { Component, OnInit, signal } from "@angular/core";

@Component({
  selector: "app-sponsor-box",
  imports: [],
  templateUrl: "./sponsor-box.component.html",
  styleUrl: "./sponsor-box.component.css",
})
export class SponsorBoxComponent implements OnInit {
  isShown = signal(false);
  ngOnInit(): void {
    setInterval(() => {
      this.isShown.update((isShown) => !isShown);
    }, 3000);
  }
}
