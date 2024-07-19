import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TrackerComponent } from '../tracker/tracker.component';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/SocketService';


@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, AfterViewInit {

  @ViewChild(TrackerComponent) trackerComponent!: TrackerComponent;
  groupCode: string = "UNKNOWN";
  socketService!: SocketService;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.groupCode = params['groupCode'].toUpperCase();
      console.log(`Requested group code is ${this.groupCode}`);
    });
  }

  ngOnInit(): void {
    const siteUrl = window.location.hostname;
    this.socketService = new SocketService(`http://${siteUrl}:5200`, this.groupCode);
  }

  ngAfterViewInit(): void {
    this.socketService.subscribe((data: any) => {this.trackerComponent.updateMatch(data)});
  }

}
