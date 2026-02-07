import { Component, computed, inject } from "@angular/core";
import { DataModelService } from "../../../services/dataModel.service";
import { Config } from "../../../shared/config";

import { NgxEchartsDirective, provideEchartsCore } from "ngx-echarts";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { ECBasicOption } from "echarts/types/dist/shared";
echarts.use([LineChart, GridComponent, CanvasRenderer]);

@Component({
  selector: "app-economy-graph",
  imports: [NgxEchartsDirective],
  templateUrl: "./economy-graph.component.html",
  styleUrl: "./economy-graph.component.css",
  providers: [provideEchartsCore({ echarts })],
})
export class EconomyGraphComponent {
  private config = inject(Config);
  dataModel = inject(DataModelService);

  isShown = computed(
    () =>
      this.dataModel.match().roundPhase === "shopping" &&
      ![1, 2, 13, 14].includes(this.dataModel.match().roundNumber) &&
      this.dataModel.match().roundNumber < this.dataModel.match().firstOtRound,
  );

  chartOptions = computed<ECBasicOption>(() => {
    if (!this.isShown()) {
      return {};
    }

    const elementColor = this.hexToRgb("#ffffff");
    const attackerColor = this.hexToRgb(this.config.attackerColorPrimary);
    const defenderColor = this.hexToRgb(this.config.defenderColorPrimary);

    const attackerIndex = this.dataModel.match().teams.findIndex((t) => t.isAttacking);
    const defenderIndex = attackerIndex === 0 ? 1 : 0;
    const attackerMoneyRecord = this.dataModel.match().teams[attackerIndex].moneyRecord ?? [];
    const defenderMoneyRecord = this.dataModel.match().teams[defenderIndex].moneyRecord ?? [];

    const roundsStart =
      this.dataModel.match().roundNumber > this.dataModel.match().switchRound
        ? this.dataModel.match().switchRound
        : 1;

    const rounds: string[] = [];
    for (let i = roundsStart; i <= this.dataModel.match().roundNumber; i++) {
      rounds.push(i.toString());
    }

    const attackerMoney = [];
    for (let i = roundsStart; i < this.dataModel.match().roundNumber + 1; i++) {
      const item = attackerMoneyRecord.find((m) => m.round === i);
      if (item) {
        attackerMoney.push(item.start);
      }
    }

    const defenderMoney = [];
    for (let i = roundsStart; i < this.dataModel.match().roundNumber + 1; i++) {
      const item = defenderMoneyRecord.find((m) => m.round === i);
      if (item) {
        defenderMoney.push(item.start);
      }
    }

    const toReturn: ECBasicOption = {
      backgroundColor: "transparent",
      color: [`rgba(${elementColor[0]}, ${elementColor[1]}, ${elementColor[2]}, 0.8)`],
      textStyle: {
        color: `rgba(${elementColor[0]}, ${elementColor[1]}, ${elementColor[2]}, 0.8)`,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: rounds,
        axisLine: {
          lineStyle: {
            color: `rgba(${elementColor[0]}, ${elementColor[1]}, ${elementColor[2]}, 0.8)`,
          },
        },
        axisLabel: {
          color: `rgba(${elementColor[0]}, ${elementColor[1]}, ${elementColor[2]}, 0.8)`,
        },
      },
      yAxis: {
        type: "value",
        max: (value: { max: number }) => (value.max > 40000 ? 45000 : value.max),
        axisLine: {
          lineStyle: {
            color: `rgba(${elementColor[0]}, ${elementColor[1]}, ${elementColor[2]}, 0.8)`,
          },
        },
        axisLabel: {
          color: `rgba(${elementColor[0]}, ${elementColor[1]}, ${elementColor[2]}, 0.8)`,
        },
        splitLine: {
          lineStyle: {
            color: `rgba(${elementColor[0]}, ${elementColor[1]}, ${elementColor[2]}, 0.2)`,
          },
        },
      },
      series: [
        {
          name: "Money Had Attack",
          type: "line",
          stack: "Attack",
          data: attackerMoney,
          smooth: 0.1,
          lineStyle: {
            width: 3,
            color: `rgba(${attackerColor[0]}, ${attackerColor[1]}, ${attackerColor[2]}, 0.8)`,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: `rgba(${attackerColor[0]}, ${attackerColor[1]}, ${attackerColor[2]}, 0.4)`,
              },
              {
                offset: 0.8,
                color: `rgba(${attackerColor[0]}, ${attackerColor[1]}, ${attackerColor[2]}, 0)`,
              },
            ]),
          },
          symbol: "circle",
          itemStyle: {
            color: `rgba(${attackerColor[0]}, ${attackerColor[1]}, ${attackerColor[2]}, 0.8)`,
          },
          symbolSize: 8,
          animationDelay: function (idx: number) {
            return idx * 50;
          },
        },
        {
          name: "Money Had Defense",
          type: "line",
          stack: "Defense",
          data: defenderMoney,
          smooth: 0.1,
          lineStyle: {
            width: 3,
            color: `rgba(${defenderColor[0]}, ${defenderColor[1]}, ${defenderColor[2]}, 0.8)`,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: `rgba(${defenderColor[0]}, ${defenderColor[1]}, ${defenderColor[2]}, 0.4)`,
              },
              {
                offset: 0.8,
                color: `rgba(${defenderColor[0]}, ${defenderColor[1]}, ${defenderColor[2]}, 0)`,
              },
            ]),
          },
          symbol: "circle",
          itemStyle: {
            color: `rgba(${defenderColor[0]}, ${defenderColor[1]}, ${defenderColor[2]}, 0.8)`,
          },
          symbolSize: 8,
          animationDelay: function (idx: number) {
            return idx * 50;
          },
        },
      ],
      grid: {
        left: "0",
        right: "0",
        bottom: "0",
        top: "5%",
      },
    };

    return toReturn;
  });

  hexToRgb(hex: string): number[] {
    hex = hex.replace(/^#/, "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
  }
}
