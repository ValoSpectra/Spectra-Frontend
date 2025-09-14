import { Component, inject, Input, OnInit, AfterViewInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { NameoverridePipe } from "../pipes/nameoverride.pipe";
import { ActivatedRoute } from "@angular/router";
import { Config } from "../shared/config";
import { SocketService } from "../services/SocketService";

@Component({
  selector: "app-playercams",
  imports: [NameoverridePipe],
  templateUrl: "./playercams.component.html",
  styleUrl: "./playercams.component.scss",
})
export class PlayercamsComponent implements OnInit, AfterViewInit {
  private sanitizer = inject(DomSanitizer);
  @Input() match!: any;
  streams = new Map<string, SafeResourceUrl>();
  private route = inject(ActivatedRoute);
  private config = inject(Config);
  private groupCode: string | undefined = undefined;
  private socketService!: SocketService;
  private roundPhase = "LOBBY";

  constructor() {
    const location = window.location.href.toLowerCase();
    if (location.includes("playercams")) {
      console.log("PlayercamsComponent Standalone initialized");
      this.route.queryParams.subscribe((params) => {
        this.groupCode = params["groupCode"]?.toUpperCase() || undefined;
      });
    }
  }

  ngOnInit() {
    if (this.groupCode != undefined && this.groupCode != "") {
      this.socketService = SocketService.getInstance().connectMatch(
        this.config.serverEndpoint,
        this.groupCode,
      );
      this.socketService.subscribeMatch((data: any) => {
        this.updateMatch(data);
      });
    }
  }

  ngAfterViewInit(): void {
    this.iterateStreamUrls();
  }

  iterateStreamUrls() {
    if (
      !this.match ||
      !this.match.tools ||
      !this.match.tools.playercamsInfo ||
      !this.match.tools.playercamsInfo.enabledPlayers
    ) {
      return;
    }
    for (const player of this.match.tools.playercamsInfo.enabledPlayers) {
      this.streams.set(player, this.getStreamUrl(player.split("#")[0], player.split("#")[1]));
    }
  }

  public updateMatch(data: any) {
    delete data.eventNumber;
    delete data.replayLog;
    this.match = data;

    // Construct map for name overrides if it's a string (from JSON). The server might keep it as JSON to avoid issues.
    const tempOverrides = this.match?.tools?.nameOverrides?.overrides || null;
    if (typeof tempOverrides === "string") {
      this.match.tools.nameOverrides.overrides = this.jsonToMap(tempOverrides);
    }

    if (this.match.roundPhase !== this.roundPhase && this.match.roundPhase === "shopping") {
      this.roundPhase = this.match.roundPhase;
      this.iterateStreamUrls();
    }
  }

  private jsonToMap(json: string): Map<string, string> {
    try {
      const obj = JSON.parse(json);
      if (Array.isArray(obj)) {
        return new Map(obj);
      } else {
        throw new Error("Invalid JSON format for Map");
      }
    } catch (error) {
      console.error("Failed to parse JSON to Map:", error);
      return new Map();
    }
  }

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

  public getStreamUrl(name: string, tagline: string): SafeResourceUrl {
    name = name.replaceAll(" ", "_");
    const streamVdoUrl = `https://vdo.ninja/?room=${this.match.tools.playercamsInfo.identifier}&view=${name + "_H_" + tagline}&scene=0&cleanoutput&vb=5000&transparent&waitmessage=Loading&disablehotkeys&codec=h265,av1,h264,vp8`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(streamVdoUrl);
  }
}
