import { Component, computed, inject, OnInit } from "@angular/core";
import { SafeResourceUrl } from "@angular/platform-browser";
import { DataModelService } from "../../../services/dataModel.service";
import { DisplayNameService } from "../../../services/displayName.service";
import { PlayercamStreamService } from "../../../services/playercamStream.service";
import { OneVersusOneService } from "../../../services/1v1.service";

@Component({
  selector: "app-playercams",
  imports: [],
  templateUrl: "./playercams.component.html",
  styleUrl: "./playercams.component.css",
})
export class PlayercamsComponent implements OnInit {
  readonly dataModel = inject(DataModelService);
  readonly streamService = inject(PlayercamStreamService);
  readonly oneVsOneService = inject(OneVersusOneService);
  getDisplayName = inject(DisplayNameService).getDisplayName;

  isOneVersusOne = computed(() => this.oneVsOneService.isOneVersusOne());

  enabledPlayers = computed(() => {
    let toReturn = this.dataModel.playercamsInfo().enabledPlayers;
    if (!toReturn || toReturn.length === 0) {
      toReturn = [];
    }
    return toReturn;
  });

  ngOnInit() {
    this.streamService.initializeFromEnabledPlayers(this.enabledPlayers());
  }

  getStream(playerFullName: string): SafeResourceUrl | undefined {
    return this.streamService.getStream(playerFullName);
  }
}
