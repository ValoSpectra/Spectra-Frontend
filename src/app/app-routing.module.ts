import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TestingComponent } from "./z_overlays/testing/testing.component";
import { AutoswitchComponent } from "./autoswitch/autoswitch.component";
import { RedirectComponent } from "./redirect/redirect.component";
import { TimeoutComponent } from "./timeout/timeout.component";
import { MapbanUiComponent } from "./mapban-ui/mapban-ui.component";
import { MatchOverlayComponent } from "./z_overlays/match-overlay/match-overlay.component";
import { AgentSelectOverlayComponent } from "./z_overlays/agent-select-overlay/agent-select-overlay.component";
import { TestingAgentSelectComponent } from "./z_overlays/testing-agent-select/testing-agent-select.component";

const routes: Routes = [
  {
    path: "",
    component: RedirectComponent,
  },
  {
    path: "overlay",
    children: [
      {
        path: "",
        component: MatchOverlayComponent,
      },
      {
        path: "minimal",
        component: MatchOverlayComponent,
        data: {
          minimal: true,
        },
      },
    ],
  },
  {
    path: "testing",
    children: [
      {
        path: "",
        component: TestingComponent,
      },
      {
        path: "minimal",
        component: TestingComponent,
        data: {
          minimal: true,
        },
      },
      {
        path: "agent-select",
        component: TestingAgentSelectComponent,
      },
    ],
  },
  {
    path: "agent-select",
    component: AgentSelectOverlayComponent,
  },
  {
    path: "autoswitch",
    children: [
      {
        path: "",
        component: AutoswitchComponent,
      },
      {
        path: "minimal",
        component: AutoswitchComponent,
        data: {
          minimal: true,
        },
      },
    ],
  },
  {
    path: "timeout",
    component: TimeoutComponent,
  },
  {
    path: "mapban",
    component: MapbanUiComponent,
  },
  {
    path: "playercams",
    component: PlayercamsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
