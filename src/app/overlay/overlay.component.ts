import { AfterViewInit, Component, OnInit, ViewChild, inject } from "@angular/core";
import { TrackerComponent } from "../tracker/tracker.component";
import { ActivatedRoute } from "@angular/router";
import { SocketService } from "../services/SocketService";
import { Config } from "../shared/config";
import { TimeoutComponent } from "../timeout/timeout.component";

@Component({
  selector: "app-overlay",
  templateUrl: "./overlay.component.html",
  styleUrls: ["./overlay.component.scss"],
  imports: [TrackerComponent, TimeoutComponent],
})
export class OverlayComponent implements OnInit, AfterViewInit {
  private route = inject(ActivatedRoute);
  private config = inject(Config);

  @ViewChild(TrackerComponent) trackerComponent!: TrackerComponent;
  groupCode = "UNKNOWN";
  socketService!: SocketService;

  hideAuxiliary = false;

  constructor() {
    this.route.queryParams.subscribe((params) => {
      this.groupCode = params["groupCode"]?.toUpperCase() || "UNKNOWN";

      this.hideAuxiliary = params["hideAuxiliary"] != undefined;
    });
  }

  ngOnInit(): void {
    this.socketService = SocketService.getInstance().connectMatch(
      this.config.serverEndpoint,
      this.groupCode,
    );
  }

  ngAfterViewInit(): void {
    this.socketService.subscribeMatch((data: any) => {
      this.trackerComponent.updateMatch(data);
    });
  }
}
