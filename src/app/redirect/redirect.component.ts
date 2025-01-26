import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-redirect",
  template: ``,
})
export class RedirectComponent implements OnInit {
  ngOnInit() {
    window.location.href = "https://valospectra.com";
  }
}
