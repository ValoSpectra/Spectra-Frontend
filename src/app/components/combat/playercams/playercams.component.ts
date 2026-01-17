import { Component, computed, effect, inject, OnInit, signal } from "@angular/core";
import { SafeResourceUrl } from "@angular/platform-browser";
import { DataModelService } from "../../../services/dataModel.service";
import { DisplayNameService } from "../../../services/displayName.service";
import { PlayercamStreamService } from "../../../services/playercamStream.service";

@Component({
  selector: "app-playercams",
  imports: [],
  templateUrl: "./playercams.component.html",
  styleUrl: "./playercams.component.css",
})
export class PlayercamsComponent implements OnInit {
  readonly dataModel = inject(DataModelService);
  readonly streamService = inject(PlayercamStreamService);
  getDisplayName = inject(DisplayNameService).getDisplayName;

  private lastRoundNumber = signal<number>(-1);
  private oneVersusOneTriggered = signal<boolean>(false);

  constructor() {
    // track round changes and 1v1 state
    effect(() => {
      const currentRound = this.dataModel.match().roundNumber;
      const previousRound = this.lastRoundNumber();

      if (currentRound !== previousRound) {
        this.oneVersusOneTriggered.set(false);
        this.lastRoundNumber.set(currentRound);
      }

      // check if 1v1
      const teams = this.dataModel.teams();
      const aliveLeft = teams[0].players.filter((p: any) => p.isAlive).length;
      const aliveRight = teams[1].players.filter((p: any) => p.isAlive).length;

      if (aliveLeft === 1 && aliveRight === 1) {
        this.oneVersusOneTriggered.set(true);
      }
    });
  }

  isOneVersusOne = computed(() => this.oneVersusOneTriggered());

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
