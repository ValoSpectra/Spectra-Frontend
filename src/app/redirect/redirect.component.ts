import { Component, OnInit, inject } from "@angular/core";
import { Config } from "../shared/config";

@Component({
  selector: "app-redirect",
  template: ``,
  standalone: false,
})
export class RedirectComponent implements OnInit {
  private config = inject(Config);

  ngOnInit() {
    window.location.href = this.config.redirectUrl;
  }
}
