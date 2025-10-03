import { inject, Injectable } from "@angular/core";
import { DataModelService } from "./dataModel.service";

@Injectable({
  providedIn: "root",
})
export class DisplayNameService {
  readonly dataModel = inject(DataModelService);
  public getDisplayName(fullName: string, fallback: string): string {
    const map = this.dataModel.match().tools.nameOverrides.overrides as any;
    if (!map || typeof map.get !== "function") {
      //check that map is actually a map (type shenanigans)
      return fallback;
    } else {
      return map.get(fullName) || fallback;
    }
  }
}
