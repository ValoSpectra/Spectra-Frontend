import { Component, Input } from "@angular/core";

@Component({
  selector: "app-select-team-info",
  templateUrl: "./select-team-info.component.html",
  styleUrl: "./select-team-info.component.scss",
})
export class SelectTeamInfoComponent {
  @Input() team: any;
  @Input() isAttack = false;
}
