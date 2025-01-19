import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TestingComponent } from "./testing/testing.component";
import { OverlayComponent } from "./overlay/overlay.component";
import { AgentSelectComponent } from "./agent-select/agent-select.component";
import { AutoswitchComponent } from "./autoswitch/autoswitch.component";
import { RedirectComponent } from "./redirect/redirect.component";
import { TimeoutComponent } from "./timeout/timeout.component";

const routes: Routes = [
  {
    path: "",
    component: RedirectComponent,
  },
  {
    path: "overlay",
    component: OverlayComponent,
  },
  {
    path: "testing",
    component: TestingComponent,
  },
  {
    path: "agent-select",
    component: AgentSelectComponent,
  },
  {
    path: "autoswitch",
    component: AutoswitchComponent,
  },
  {
    path: "timeout",
    component: TimeoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
