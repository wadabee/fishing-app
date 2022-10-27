import dayjs from "dayjs";
import React, { useMemo } from "react";
import { JmaTide } from "../../@types/tide";

import tideData from "../../feature/tide/data/json/2022_hososhima.json";

import ReactECharts from "echarts-for-react";

type Props = {
  date: string;
};

const TideGraph: React.FC<Props> = ({ date }) => {
  const displayDate = dayjs(date).format("YYYY-MM-DD");
  const tideDataForToday = (tideData as JmaTide)[displayDate];

  const nowHour = Number.parseInt(dayjs().format("H"));
  const nowMinite = Number.parseInt(dayjs().format("m"));

  const symbolNow = useMemo<[number, number]>(() => {
    const diffTide =
      tideDataForToday.tidePerHour[nowHour + 1] -
      tideDataForToday.tidePerHour[nowHour];

    return [
      nowHour + nowMinite / 60,
      tideDataForToday.tidePerHour[nowHour] + diffTide * (nowMinite / 60),
    ];
  }, [nowHour, nowMinite, tideDataForToday.tidePerHour]);

  return (
    <ReactECharts
      style={{
        height: "50vh",
      }}
      option={{
        xAxis: {
          name: "Time",
          type: "value",
          boundaryGap: false,
          min: 0,
          max: 24,
          splitNumber: 8,
          axisLabel: {
            formatter: "{value}:00",
          },
        },
        yAxis: {
          name: "Tide (cm)",
          type: "value",
          min: 0,
          max: 240,
        },
        series: [
          {
            data: tideDataForToday.tidePerHour.map((value, idx) => [
              idx,
              value,
            ]),
            type: "line",
            smooth: true,
            lineStyle: {
              width: 5,
            },
            markPoint: {
              symbol: "path://M0 0 L10 0 L10 10 L7 10 L5 13 L3 10 L0 10 Z",
              data: [
                ...tideDataForToday.highTide
                  .concat(tideDataForToday.lowTide)
                  .map((value) => {
                    const hour = Number.parseInt(value.time.split(":")[0]);
                    const minite = Number.parseInt(value.time.split(":")[1]);
                    const x = hour + minite / 60;

                    return {
                      label: {
                        offset: [0, -5],
                      },
                      value: `${value.time}\n${value.tide}cm`,
                      coord: [x, value.tide],
                      symbolOffset: [0, -28],
                    };
                  }),
                {
                  symbol: "arrow",
                  symbolSize: 20,
                  coord: symbolNow,
                  itemStyle: {
                    color: "#E83015",
                  },
                },
              ],
            },
          },
          {
            markPoint: {
              symbol: "pin",
              data: [
                {
                  coord: [10, 10],
                },
              ],
            },
          },
        ],
      }}
    ></ReactECharts>
  );
};

export default TideGraph;
