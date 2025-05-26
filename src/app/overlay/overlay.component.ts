import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { TrackerComponent } from "../tracker/tracker.component";
import { ActivatedRoute } from "@angular/router";
import { SocketService } from "../services/SocketService";
import { Config } from "../shared/config";

@Component({
  selector: "app-overlay",
  templateUrl: "./overlay.component.html",
  styleUrls: ["./overlay.component.scss"],
})
export class OverlayComponent implements OnInit, AfterViewInit {
  @ViewChild(TrackerComponent) trackerComponent!: TrackerComponent;
  groupCode = "UNKNOWN";
  socketService!: SocketService;

  hideAuxiliary = false;

  constructor(
    private route: ActivatedRoute,
    private config: Config,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.groupCode = params["groupCode"]?.toUpperCase() || "UNKNOWN";

      this.hideAuxiliary = params["hideAuxiliary"] != undefined;
    });
  }

  ngOnInit(): void {
    this.socketService = SocketService.getInstance(this.config.serverEndpoint, this.groupCode);
  }

  ngAfterViewInit(): void {
    this.socketService.subscribe((data: any) => {
      this.trackerComponent.updateMatch(data);
    });
  }
}
