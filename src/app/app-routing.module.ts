import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TestingComponent } from "./testing/testing.component";
import { OverlayComponent } from "./overlay/overlay.component";
import { AgentSelectComponent } from "./agent-select/agent-select.component";
import { AutoswitchComponent } from "./autoswitch/autoswitch.component";
import { RedirectComponent } from "./redirect/redirect.component";

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
        component: OverlayComponent,
      },
      {
        path: "minimal",
        component: OverlayComponent,
        data: {
          minimal: true
        }
      }
    ]
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
          minimal: true
        }
      }
    ]
  },
  {
    path: "agent-select",
    component: AgentSelectComponent,
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
          minimal: true
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
