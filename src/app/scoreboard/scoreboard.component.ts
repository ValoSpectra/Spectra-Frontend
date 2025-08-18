import { Component, Input, Pipe, PipeTransform, forwardRef, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgIf, NgFor } from "@angular/common";
import { RoundreasonsComponent } from "./roundreasons/roundreasons.component";
import {
  PlayerscoreComponent,
  PlayerscoreMinimalComponent,
} from "./playerscore/playerscore.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-scoreboard",
  templateUrl: "./scoreboard.component.html",
  styleUrls: ["./scoreboard.component.scss"],
  imports: [
    TranslateModule,
    NgIf,
    RoundreasonsComponent,
    NgFor,
    PlayerscoreComponent,
    PlayerscoreMinimalComponent,
    forwardRef(() => ScoreboardOrderPipe),
  ],
})
export class ScoreboardComponent {
  private route = inject(ActivatedRoute);

  @Input() match!: any;
  @Input() hideAuxiliary = false;

  isMinimal(): boolean {
    if (this.route.snapshot.data["minimal"]) {
      return this.route.snapshot.data["minimal"];
    } else {
      return false;
    }
  }

  trackByPlayerId(index: number, player: any) {
    return player.playerId;
  }

  numSequence(n: number): number[] {
    return Array(n);
  }
}

@Pipe({ name: "scoreboardOrder" })
export class ScoreboardOrderPipe implements PipeTransform {
  transform(players: any): MinPlayer[] {
    if (!Array.isArray(players)) return [];

    players.sort((a: any, b: any) => {
      if (a.kills < b.kills) return 1;
      if (a.kills > b.kills) return -1;
      return 0;
    });
    return players;
  }
}

export interface MinPlayer {
  playerId: string;
  kills: number;
}
