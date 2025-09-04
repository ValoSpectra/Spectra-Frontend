import { Component, inject, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { NameoverridePipe } from "../pipes/nameoverride.pipe";

@Component({
  selector: "app-playercams",
  imports: [NameoverridePipe],
  templateUrl: "./playercams.component.html",
  styleUrl: "./playercams.component.scss",
})
export class PlayercamsComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  @Input() match!: any;
  streams = new Map<string, SafeResourceUrl>();

  public getEnabledPlayers(): string[] {
    let toReturn = this.match?.tools?.playercamsInfo?.enabledPlayers;
    if (!toReturn || toReturn.length === 0) {
      toReturn = [];
    }
    return toReturn;
  }

  public getOverrideNames(): Map<string, string> {
    let toReturn = this.match?.tools?.nameOverrides?.overrides;
    if (!toReturn) {
      toReturn = new Map<string, string>();
    }
    return toReturn;
  }

  ngOnInit() {
    for (const player of this.match.tools.playercamsInfo.enabledPlayers) {
      this.streams.set(player, this.getStreamUrl(player.split("#")[0], player.split("#")[1]));
    }
  }

  public getStreamUrl(name: string, tagline: string): SafeResourceUrl {
    name = name.replaceAll(" ", "_");
    const streamVdoUrl = `https://vdo.ninja/?room=${this.match.tools.playercamsInfo.identifier}&view=${name + "_H_" + tagline}&scene=0&cleanoutput&vb=5000&transparent&waitmessage=Loading&disablehotkeys&codec=h265,av1,h264,vp8`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(streamVdoUrl);
  }
}
