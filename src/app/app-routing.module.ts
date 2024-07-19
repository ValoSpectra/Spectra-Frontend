import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestingComponent } from './testing/testing.component';
import { OverlayComponent } from './overlay/overlay.component';

const routes: Routes = [
    {
        path: "overlay",
        component: OverlayComponent
    },
    {
        path: "testing",
        component: TestingComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
