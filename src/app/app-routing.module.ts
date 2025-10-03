import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RedirectComponent } from "./components/common/redirect/redirect.component";

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
        loadComponent: () =>
          import("./overlays/match-overlay/match-overlay.component").then(
            (m) => m.MatchOverlayComponent,
          ),
      },
      {
        path: "minimal",
        loadComponent: () =>
          import("./overlays/match-overlay/match-overlay.component").then(
            (m) => m.MatchOverlayComponent,
          ),
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
        loadComponent: () =>
          import("./overlays/testing/testing.component").then((m) => m.TestingComponent),
      },
      {
        path: "minimal",
        loadComponent: () =>
          import("./overlays/testing/testing.component").then((m) => m.TestingComponent),
        data: {
          minimal: true,
        },
      },
      {
        path: "agent-select",
        loadComponent: () =>
          import("./overlays/testing-agent-select/testing-agent-select.component").then(
            (m) => m.TestingAgentSelectComponent,
          ),
      },
    ],
  },
  {
    path: "agent-select",
    loadComponent: () =>
      import("./overlays/agent-select-overlay/agent-select-overlay.component").then(
        (m) => m.AgentSelectOverlayComponent,
      ),
  },
  {
    path: "autoswitch",
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./autoswitch/autoswitch.component").then((m) => m.AutoswitchComponent),
      },
      {
        path: "minimal",
        loadComponent: () =>
          import("./autoswitch/autoswitch.component").then((m) => m.AutoswitchComponent),
        data: {
          minimal: true,
        },
      },
    ],
  },
  {
    path: "timeout",
    loadComponent: () =>
      import("./components/common/timeout/timeout.component").then((m) => m.TimeoutComponent),
  },
  {
    path: "mapban",
    loadComponent: () =>
      import("./overlays/mapban-overlay/mapban-overlay.component").then((m) => m.MapbanUiComponent),
  },
  {
    path: "playercams",
    loadComponent: () =>
      import("./components/combat/playercams/playercams.component").then(
        (m) => m.PlayercamsComponent,
      ),
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
