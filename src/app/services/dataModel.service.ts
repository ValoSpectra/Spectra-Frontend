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

  public readonly match = signal({} as any);
  public readonly teams = computed(() => this.match().teams);
  public readonly timeoutState = computed(() => this.match().timeoutState);
  public readonly spikeState = computed(() => this.match().spikeState);
  public readonly seriesInfo = computed(() => this.match().tools.seriesInfo);
}
