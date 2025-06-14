import { AfterViewInit, Component, OnInit, ViewChild, inject } from "@angular/core";
import { TrackerComponent } from "../tracker/tracker.component";
import { ActivatedRoute } from "@angular/router";
import { SocketService } from "../services/SocketService";
import { Config } from "../shared/config";
import { TimeoutComponent } from "../timeout/timeout.component";
import { TranslateService } from "@ngx-translate/core";
import { LanguageAliasService } from "../services/languageAlias.service";

@Component({
  selector: "app-overlay",
  templateUrl: "./overlay.component.html",
  styleUrls: ["./overlay.component.scss"],
  imports: [TrackerComponent, TimeoutComponent],
  standalone: false,
})
export class OverlayComponent implements OnInit, AfterViewInit {
  private route = inject(ActivatedRoute);
  private config = inject(Config);
  private translate = inject(TranslateService);

  @ViewChild(TrackerComponent) trackerComponent!: TrackerComponent;
  groupCode = "UNKNOWN";
  lang = "en";
  socketService!: SocketService;

  hideAuxiliary = false;

  constructor() {
    this.route.queryParams.subscribe((params) => {
      this.groupCode = params["groupCode"]?.toUpperCase() || "UNKNOWN";
      const paramLang = params["lang"]?.toLowerCase() || "en";
      this.lang = LanguageAliasService.resolveLanguageAlias(paramLang);

      this.hideAuxiliary = params["hideAuxiliary"] != undefined;
    });
  }

  ngOnInit(): void {
    this.socketService = SocketService.getInstance().connectMatch(
      this.config.serverEndpoint,
      this.groupCode,
    );

    this.translate.use(this.lang);
  }

  ngAfterViewInit(): void {
    this.socketService.subscribeMatch((data: any) => {
      this.trackerComponent.updateMatch(data);
    });
  }
}
