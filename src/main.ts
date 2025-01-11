import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { Config } from "./app/shared/config";

fetch("/assets/config/config.json").then(async (res) => {
  const configuration: Config = new Config(await res.json());

  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic([{ provide: Config, useValue: configuration }])
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});
