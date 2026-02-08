import { Component, computed, inject, Input } from "@angular/core";
import { DataModelService } from "../../../services/dataModel.service";
import { TranslateKeys } from "../../../services/i18nHelper";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-timeout-counter",
  imports: [TranslatePipe],
  templateUrl: "./timeout-counter.html",
  styleUrl: "./timeout-counter.css",
})
export class TimeoutCounter {
  dataModel = inject(DataModelService);
  TranslateKeys = TranslateKeys;

  @Input({ required: true })
  forRight = false;

  maxTimeouts = computed(() => {
    return this.dataModel.timeoutCounter().max;
  });

  timeoutCounterLeft = computed(() => {
    return this.dataModel.timeoutCounter().left;
  });

  timeoutCounterRight = computed(() => {
    return this.dataModel.timeoutCounter().right;
  });

  relevantCounter = computed(() => {
    if (this.forRight) return this.timeoutCounterRight();
    else return this.timeoutCounterLeft();
  });

  relevantTeam = computed(() => {
    if (this.forRight) return this.dataModel.teams()[1];
    else return this.dataModel.teams()[0];
  });

  readonly timeoutTeamBackgroundClass = computed(() => {
    return `gradient-${!this.forRight ? "left" : "right"}-${this.relevantTeam().isAttacking ? "attacker" : "defender"}`;
  });

  numSequence(n: number): number[] {
    return Array(n);
  }
}
