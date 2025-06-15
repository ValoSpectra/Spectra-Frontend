import { trigger, transition, style, animate } from "@angular/animations";
import { AfterViewInit, Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SocketService } from "../services/SocketService";
import { Config } from "../shared/config";
import { MapbanMapComponent } from "./mapban-map/mapban-map.component";

@Component({
  standalone: true,
  imports: [MapbanMapComponent],
  selector: "app-mapban-ui",
  templateUrl: "./mapban-ui.component.html",
  styleUrl: "./mapban-ui.component.css",
  animations: [
    trigger("fade", [
      transition(":enter", [style({ opacity: "0" }), animate("0.5s", style({ opacity: "1" }))]),

      transition(":leave", animate("0.5s", style({ opacity: "0" }))),
    ]),
  ],
})
export class MapbanUiComponent implements OnInit, AfterViewInit {
  private route = inject(ActivatedRoute);
  private config = inject(Config);

  sessionCode = "UNKNOWN";
  socketService!: SocketService;

  data!: ISessionData;
  availableMapNames: string[] = [];
  selectedMaps: SessionMap[] = [];
  logoIndex = 1;

  constructor() {
    const params = this.route.snapshot.queryParams;
    this.sessionCode = params["sessionId"] || "UNKNOWN";
  }

  ngOnInit(): void {
    this.socketService = SocketService.getInstance();
    this.socketService.subscribeMapban((data: any) => {
      this.updateMapbanData(data);
    });
    this.socketService.connectMapban(this.config.mapbanEndpoint, {
      sessionId: this.sessionCode,
    });
  }

  ngAfterViewInit(): void {
    this.socketService.subscribeMatch((data: any) => {
      this.updateMapbanData(data);
    });
  }

  public updateMapbanData(data: { data: ISessionData }) {
    this.data = data.data;
    this.availableMapNames = this.data.availableMaps.map((map) => map.name);
    this.selectedMaps = this.data.selectedMaps;
    this.logoIndex = this.selectedMaps.length > 0 ? this.selectedMaps.length + 1 : 1;
    console.log(this.availableMapNames);
    console.log(this.selectedMaps);
    for (let i = 0; i < this.availableMapNames.length; i++) {
      if (i == 0) {
        this.selectedMaps.push(new SessionMap("upcoming"));
      } else {
        this.selectedMaps.push(new SessionMap(""));
      }
    }
  }
}

export interface ISessionData {
  sessionIdentifier: string;
  organizationName: string;
  teams: ISessionTeam[];
  format: "bo1" | "bo3" | "bo5" | undefined;
  availableMaps: SessionMap[];
  selectedMaps: SessionMap[];
  stage: Stage;
  actingTeamCode: string;
  actingTeam: 0 | 1;
}

export interface ISessionTeam {
  name: string;
  tricode: string;
  url: string;
}

export class SessionMap {
  name: string;
  bannedBy?: 0 | 1 = undefined; // 0 = left team, 1 = right team
  pickedBy?: 0 | 1 = undefined;
  sidePickedBy?: 0 | 1 = undefined;
  pickedAttack: boolean | undefined = undefined;

  constructor(name: string) {
    this.name = name;
  }
}

export type Stage = "ban" | "pick" | "side" | "decider";
