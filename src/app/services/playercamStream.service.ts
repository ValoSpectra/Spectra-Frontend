import { effect, inject, Injectable } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DataModelService } from "./dataModel.service";

@Injectable({
  providedIn: "root",
})
export class PlayercamStreamService {
  private dataModel = inject(DataModelService);
  private sanitizer = inject(DomSanitizer);

  private streams = new Map<string, SafeResourceUrl>();
  private initialized = false;

  constructor() {
    // watch for team changes and add streams
    effect(() => {
      const teams = this.dataModel.teams();
      for (const team of teams) {
        for (const player of team.players) {
          if (!this.streams.has(player.fullName)) {
            this.streams.set(
              player.fullName,
              this.createStreamUrl(player.fullName.split("#")[0], player.fullName.split("#")[1]),
            );
          }
        }
      }
    });
  }

  getStream(playerFullName: string): SafeResourceUrl | undefined {
    return this.streams.get(playerFullName);
  }

  hasStream(playerFullName: string): boolean {
    return this.streams.has(playerFullName);
  }

  initializeFromEnabledPlayers(enabledPlayers: string[]): void {
    for (const player of enabledPlayers) {
      if (!this.streams.has(player)) {
        this.streams.set(
          player,
          this.createStreamUrl(player.split("#")[0], player.split("#")[1]),
        );
      }
    }
  }


  // initialize streams
  initializeFromTeams(): void {
    const teams = this.dataModel.teams();
    for (const team of teams) {
      for (const player of team.players) {
        if (!this.streams.has(player.fullName)) {
          this.streams.set(
            player.fullName,
            this.createStreamUrl(player.fullName.split("#")[0], player.fullName.split("#")[1]),
          );
        }
      }
    }
  }

  private createStreamUrl(name: string, tagline: string): SafeResourceUrl {
    const identifier = this.dataModel.playercamsInfo().identifier;
    if (!identifier) return this.sanitizer.bypassSecurityTrustResourceUrl("");
    name = name.replaceAll(" ", "_");
    const streamVdoUrl = `https://vdo.ninja/?room=${identifier}&view=${name + "_H_" + tagline}&scene=0&cleanoutput&vb=5000&transparent&waitmessage=Loading&disablehotkeys&codec=h265,av1,h264,vp8`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(streamVdoUrl);
  }
}
