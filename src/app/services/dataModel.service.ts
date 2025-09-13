import { computed, Injectable, signal } from "@angular/core";
import { SocketService } from "./SocketService";

@Injectable({
  providedIn: "root",
})
export class DataModelService {
  constructor() {
    SocketService.getInstance().subscribeMatch(this.onMatchUpdate);
  }

  private onMatchUpdate(data: any) {
    this.match.set(data);
  }

  public readonly match = signal({} as any, { equal: () => false });
  public readonly teams = computed(() => this.match().teams);
  public readonly timeoutState = computed(() => this.match().timeoutState, { equal: () => false });
  public readonly spikeState = computed(() => this.match().spikeState);
  public readonly seriesInfo = computed(() => this.match().tools.seriesInfo);
  public readonly seedingInfo = computed(() => this.match().tools.seedingInfo);
  public readonly sponsorInfo = computed(() => this.match().tools.sponsorInfo);
  public readonly watermarkInfo = computed(() => this.match().tools.watermarkInfo);
  public readonly tournamentInfo = computed(() => this.match().tools.tournamentInfo);
}
