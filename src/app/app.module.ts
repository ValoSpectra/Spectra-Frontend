import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { JsonPipe } from "@angular/common";
import { AutoswitchComponent } from "./autoswitch/autoswitch.component";
import { MapbanUiComponent } from "./overlays/mapban-overlay/mapban-overlay.component";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [AppComponent],
  exports: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JsonPipe,
    AutoswitchComponent,
    MapbanUiComponent,
    TranslateModule.forRoot({
      loader: provideTranslateHttpLoader({ prefix: "./langs/", suffix: ".json" }),
      fallbackLang: "en",
      lang: "en",
    }),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
