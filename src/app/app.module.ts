import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { TestingComponent } from "./testing/testing.component";
import { FormsModule } from "@angular/forms";
import { TrackerComponent } from "./tracker/tracker.component";
import { TopscoreComponent } from "./topscore/topscore.component";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";
import { CombatComponent } from "./combat/combat.component";
import { TopinfoComponent } from "./topscore/topinfo/topinfo.component";
import { PlayerscoreComponent, PlayerscoreMinimalComponent } from "./scoreboard/playerscore/playerscore.component";
import { RoundreasonsComponent } from "./scoreboard/roundreasons/roundreasons.component";
import { InhouseTrackerPlayercardComponent, InhouseTrackerPlayercardMinimalComponent } from "./combat/playercard/playercard.component";
import { OverlayComponent } from "./overlay/overlay.component";
import { PlayerControllerComponent } from "./testing/player-controller/player-controller.component";
import { TeamControllerComponent } from "./testing/team-controller/team-controller.component";
import { EndroundComponent } from "./endround/endround.component";
import { ShieldIconComponent } from "./combat/playercard/shield-icon/shield-icon.component";
import { MapinfoComponent } from "./topscore/topinfo/mapinfo/mapinfo.component";
import { JsonPipe } from "@angular/common";
import { AgentSelectComponent } from "./agent-select/agent-select.component";
import { SelectTeamInfoComponent } from "./agent-select/select-team-info/select-team-info.component";
import { SelectPlayerInfoComponent } from "./agent-select/select-player-info/select-player-info.component";
import { AutoswitchComponent } from "./autoswitch/autoswitch.component";
import { RedirectComponent } from "./redirect/redirect.component";
import { AbilitiesComponent } from "./abilities/abilities.component";

@NgModule({
  declarations: [
    AppComponent,
    TestingComponent,
    TrackerComponent,
    TopscoreComponent,
    ScoreboardComponent,
    CombatComponent,
    TopinfoComponent,
    PlayerscoreComponent,
    RoundreasonsComponent,
    InhouseTrackerPlayercardComponent,
    OverlayComponent,
    PlayerControllerComponent,
    TeamControllerComponent,
    EndroundComponent,
    ShieldIconComponent,
    MapinfoComponent,
    AgentSelectComponent,
    SelectTeamInfoComponent,
    SelectPlayerInfoComponent,
    AutoswitchComponent,
    RedirectComponent,
    AbilitiesComponent,
    InhouseTrackerPlayercardMinimalComponent,
    PlayerscoreMinimalComponent
  ],
  exports: [],
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BrowserAnimationsModule, JsonPipe],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
