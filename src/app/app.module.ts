import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TestingComponent } from './testing/testing.component';
import { FormsModule } from '@angular/forms';
import { TrackerComponent } from './tracker/tracker.component';
import { TopscoreComponent } from './topscore/topscore.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { CombatComponent } from './combat/combat.component';
import { MapwinComponent } from './topscore/mapwins/mapwins.component';
import { TopinfoComponent } from './topscore/topinfo/topinfo.component';
import { PlayerscoreComponent } from './scoreboard/playerscore/playerscore.component';
import { RoundreasonsComponent } from './scoreboard/roundreasons/roundreasons.component';
import { InhouseTrackerPlayercardComponent } from './combat/playercard/playercard.component';
import { OverlayComponent } from './overlay/overlay.component';
import { PlayerControllerComponent } from './testing/player-controller/player-controller.component';
import { TeamControllerComponent } from './testing/team-controller/team-controller.component';
import { ShieldIconComponent } from './combat/playercard/shield-icon/shield-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    TestingComponent,
    TrackerComponent,
    TopscoreComponent,
    ScoreboardComponent,
    CombatComponent,
    MapwinComponent,
    TopinfoComponent,
    PlayerscoreComponent,
    RoundreasonsComponent,
    InhouseTrackerPlayercardComponent,
    OverlayComponent,
    PlayerControllerComponent,
    TeamControllerComponent,
    ShieldIconComponent
  ],
  exports: [],
  bootstrap: [AppComponent], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ], 
  providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
