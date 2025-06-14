import { trigger, transition, style, animate } from "@angular/animations";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SocketService } from "../services/SocketService";
import { Config } from "../shared/config";

@Component({
  selector: "app-mapban-ui",
  templateUrl: "./mapban-ui.component.html",
  styleUrl: "./mapban-ui.component.scss",
  animations: [
    trigger("fade", [
      transition(":enter", [style({ opacity: "0" }), animate("0.5s", style({ opacity: "1" }))]),

      transition(":leave", animate("0.5s", style({ opacity: "0" }))),
    ]),
  ],
})
export class MapbanUiComponent implements OnInit, AfterViewInit {
  sessionCode = "UNKNOWN";
  socketService!: SocketService;

  data!: ISessionData;
  availableMaps: SessionMap[] = [];
  selectedMaps: SessionMap[] = [];
  totalMapAmount = 0;

  constructor(
    private route: ActivatedRoute,
    private config: Config,
  ) {
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
    this.availableMaps = this.data.availableMaps;
    this.selectedMaps = this.data.selectedMaps;
    this.totalMapAmount = this.availableMaps.length + this.selectedMaps.length;
  }

  numSequence(n: number): number[] {
    return Array(n);
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
  actingTeam: string;
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
