import { Component, inject } from "@angular/core";
import { MapinfoComponent } from "../../z_components/mapinfo/mapinfo.component";
import { TimerRounderComponent } from "../../z_components/timer-rounder/timer-rounder.component";
import { TopscoreComponent } from "../../z_components/topscore/topscore.component";
import { RoundNumberComponent } from "../../z_components/round-number/round-number.component";
import { MapwinsComponent } from "../../z_components/mapwins/mapwins.component";
import { WatermarkComponent } from "../../z_components/watermark/watermark.component";
import { SponsorBoxComponent } from "../../z_components/sponsor-box/sponsor-box.component";
import { RoundreasonsComponent } from "../../z_components/roundreasons/roundreasons.component";
import { ScoreboardComponent } from "../../z_components/scoreboard/scoreboard.component";
import { DataModelService } from "../../services/dataModel.service";
import { CombatTrackerComponent } from "../../z_components/combat-tracker/combat-tracker.component";
import { SpikeIconComponent } from "../../z_components/spike-icon/spike-icon.component";
import { EndroundComponent } from "../../z_components/endround/endround.component";
import { TimeoutComponent } from "../../z_components/timeout/timeout.component";

@Component({
  selector: "app-match-overlay",
  imports: [
    MapinfoComponent,
    TimerRounderComponent,
    TopscoreComponent,
    RoundNumberComponent,
    MapwinsComponent,
    WatermarkComponent,
    SponsorBoxComponent,
    RoundreasonsComponent,
    ScoreboardComponent,
    CombatTrackerComponent,
    SpikeIconComponent,
    EndroundComponent,
    TimeoutComponent,
  ],
  templateUrl: "./match-overlay.component.html",
  styleUrl: "./match-overlay.component.css",
})
export class MatchOverlayComponent {
  dataModel = inject(DataModelService);
}
