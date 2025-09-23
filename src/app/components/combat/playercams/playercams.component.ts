import { Component, computed, effect, inject, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DataModelService } from "../../../services/dataModel.service";
import { DisplayNameService } from "../../../services/displayName.service";

@Component({
  selector: "app-playercams-new",
  imports: [],
  templateUrl: "./playercams.component.html",
  styleUrl: "./playercams.component.css",
})
export class PlayercamsComponent implements OnInit {
  readonly dataModel = inject(DataModelService);
  private sanitizer = inject(DomSanitizer);
  getDisplayName = inject(DisplayNameService).getDisplayName;

  streams = new Map<string, SafeResourceUrl>();

  enabledPlayers = computed(() => {
    let toReturn = this.dataModel.playercamsInfo().enabledPlayers;
    if (!toReturn || toReturn.length === 0) {
      toReturn = [];
    }
    return toReturn;
  });

  ngOnInit() {
    for (const player of this.enabledPlayers()) {
      this.streams.set(player, this.getStreamUrl(player.split("#")[0], player.split("#")[1]));
    }
  }

  effectRef = effect(() => {
    const teams = this.dataModel.teams();
    for (const team of teams) {
      for (const player of team.players) {
        if (!this.streams.has(player.fullName)) {
          this.streams.set(
            player.fullName,
            this.getStreamUrl(player.fullName.split("#")[0], player.fullName.split("#")[1]),
          );
        }
      }
    }
    if (this.streams.size >= 10) {
      this.effectRef.destroy();
    }
  });

  public getStreamUrl(name: string, tagline: string): SafeResourceUrl {
    const identifier = this.dataModel.playercamsInfo().identifier;
    if (!identifier) return this.sanitizer.bypassSecurityTrustResourceUrl("");
    name = name.replaceAll(" ", "_");
    const streamVdoUrl = `https://vdo.ninja/?room=${identifier}&view=${name + "_H_" + tagline}&scene=0&cleanoutput&vb=5000&transparent&waitmessage=Loading&disablehotkeys&codec=h265,av1,h264,vp8`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(streamVdoUrl);
  }
}
