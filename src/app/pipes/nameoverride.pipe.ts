import { Pipe, type PipeTransform } from "@angular/core";

@Pipe({
  name: "nameOverride",
})
export class NameoverridePipe implements PipeTransform {
  transform(value: string, fallback: string, overrideMap: Map<string, string>): string {
    if (!overrideMap || typeof overrideMap.get !== "function") {
      return fallback;
    }
    return overrideMap.get(value) || fallback;
  }
}
