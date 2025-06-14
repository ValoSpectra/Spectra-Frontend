import { Component, Input } from "@angular/core";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-select-team-info",
  templateUrl: "./select-team-info.component.html",
  styleUrl: "./select-team-info.component.scss",
  imports: [NgIf],
  standalone: false,
})
export class SelectTeamInfoComponent {
  @Input() team: any;
  @Input() isAttack = false;
}
