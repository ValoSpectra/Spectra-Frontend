import { Component, computed, inject, OnInit } from "@angular/core";
import { SafeResourceUrl } from "@angular/platform-browser";
import { DataModelService } from "../../../services/dataModel.service";
import { PlayerCombatCardComponent } from "../player-combat-card/player-combat-card.component";
import { DisplayNameService } from "../../../services/displayName.service";
import { PlayercamStreamService } from "../../../services/playercamStream.service";
import { OneVersusOneService } from "../../../services/1v1.service";

@Component({
  selector: "app-1v1",
  imports: [PlayerCombatCardComponent],
  templateUrl: "./1v1.component.html",
  styleUrls: ["./1v1.component.css"],
})
export class OneVersusOneComponent implements OnInit {
  dataModel = inject(DataModelService);
  getDisplayName = inject(DisplayNameService).getDisplayName;
  readonly streamService = inject(PlayercamStreamService);
  readonly oneVsOneService = inject(OneVersusOneService);

  isOneVersusOne = computed(() => this.oneVsOneService.isOneVersusOne());
  leftPlayer = computed(() => this.oneVsOneService.leftPlayer());
  rightPlayer = computed(() => this.oneVsOneService.rightPlayer());

  // Get animation class based on player position
  leftPlayerAnimationClass = computed(() => {
    const index = this.oneVsOneService.leftPlayerIndex();
    if (index === 0) {
      return "animate-1v1-stay";
    }
    return `animate-1v1-from-slot-${index}`;
  });

  rightPlayerAnimationClass = computed(() => {
    const index = this.oneVsOneService.rightPlayerIndex();
    if (index === 0) {
      return "animate-1v1-stay";
    }
    return `animate-1v1-from-slot-${index}`;
  });

  leftTeam = computed(() => this.dataModel.teams()[0]);
  rightTeam = computed(() => this.dataModel.teams()[1]);

  leftTeamDeadPlayers = computed(() => {
    const team = this.leftTeam();
    if (!team) return [];
    const oneVsOnePlayer = this.leftPlayer();
    return team.players.filter((p: any) => !p.isAlive && p.fullName !== oneVsOnePlayer?.fullName);
  });

  rightTeamDeadPlayers = computed(() => {
    const team = this.rightTeam();
    if (!team) return [];
    const oneVsOnePlayer = this.rightPlayer();
    return team.players.filter((p: any) => !p.isAlive && p.fullName !== oneVsOnePlayer?.fullName);
  });

  // Check if playercams should be shown for both players in the 1v1
  shouldShowPlayercams = computed(() => {
    const playercamsInfo = this.dataModel.playercamsInfo();
    if (!playercamsInfo.enable) return false;

    const enabledPlayers = playercamsInfo.enabledPlayers ?? [];
    const leftPlayer = this.leftPlayer();
    const rightPlayer = this.rightPlayer();

    if (!leftPlayer || !rightPlayer) return false;

    return (
      enabledPlayers.includes(leftPlayer.fullName) && enabledPlayers.includes(rightPlayer.fullName)
    );
  });

  ngOnInit() {
    this.streamService.initializeFromTeams();
  }

  getStream(playerFullName: string): SafeResourceUrl | undefined {
    return this.streamService.getStream(playerFullName);
  }
}
