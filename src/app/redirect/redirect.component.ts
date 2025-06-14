import { Component, OnInit } from "@angular/core";
import { Config } from "../shared/config";

@Component({
  selector: "app-redirect",
  template: ``,
  standalone: false,
})
export class RedirectComponent implements OnInit {
  constructor(private config: Config) {}

  ngOnInit() {
    window.location.href = this.config.redirectUrl;
  }
}
