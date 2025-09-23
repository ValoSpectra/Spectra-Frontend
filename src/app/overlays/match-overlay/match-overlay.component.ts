import { Component, inject } from "@angular/core";
import { TimerRounderComponent } from "../../components/top/match/timer-rounder/timer-rounder.component";
import { ScoreboardComponent } from "../../components/shopping/scoreboard/scoreboard.component";
import { DataModelService } from "../../services/dataModel.service";
import { SeriesMapsComponent } from "../../components/top/auxiliary/series-maps/series-maps.component";
import { RoundNumberComponent } from "../../components/top/match/round-number/round-number.component";
import { TopTeamInfoComponent } from "../../components/top/match/team-info/team-info.component";
import { SpikePlantedComponent } from "../../components/top/match/spike-planted/spike-planted.component";
import { SeriesWinsComponent } from "../../components/top/auxiliary/series-wins/series-wins.component";
import { SponsorBoxComponent } from "../../components/top/auxiliary/sponsor-box/sponsor-box.component";
import { WatermarkComponent } from "../../components/top/auxiliary/watermark/watermark.component";
import { RoundreasonsComponent } from "../../components/shopping/roundreasons/roundreasons.component";
import { CombatPlayerListComponent } from "../../components/combat/player-list/player-list.component";
import { PlayercamsComponent } from "../../components/combat/playercams/playercams.component";
import { EndroundBannerComponent } from "../../components/combat/endround-banner/endround-banner.component";
import { TimeoutComponent } from "../../components/common/timeout/timeout.component";

@Component({
  selector: "app-match-overlay",
  imports: [
    TimerRounderComponent,
    ScoreboardComponent,
    SeriesMapsComponent,
    RoundNumberComponent,
    TopTeamInfoComponent,
    SpikePlantedComponent,
    SeriesWinsComponent,
    SponsorBoxComponent,
    WatermarkComponent,
    RoundreasonsComponent,
    CombatPlayerListComponent,
    PlayercamsComponent,
    EndroundBannerComponent,
    TimeoutComponent,
  ],
  templateUrl: "./match-overlay.component.html",
  styleUrl: "./match-overlay.component.css",
})
export class MatchOverlayComponent {
  dataModel = inject(DataModelService);
}
