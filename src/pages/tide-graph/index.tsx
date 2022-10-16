import dayjs from "dayjs";
import { NextPage } from "next";
import tideData from "../../feature/tide/data/json/2022_hososhima.json";

import { JmaTide } from "../../@types/tide";

import ReactECharts from "echarts-for-react";

const TideGraph: NextPage = () => {
  const today = dayjs().format("YYYY-MM-DD");
  const tideDataForToday = (tideData as JmaTide)[today];

  const nowHour = Number.parseInt(dayjs().format("H"));
  const nowMinite = Number.parseInt(dayjs().format("m"));

  return (
    <>
      Tide Graph
      {JSON.stringify(tideDataForToday)}
      <ReactECharts
        style={{
          height: "50vh",
        }}
        option={{
          xAxis: {
            name: "Time",
            type: "value",
            // data: _.range(25).map((value) => `${value}:00`),
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
                    coord: [
                      nowHour + nowMinite / 60,
                      tideDataForToday.tidePerHour[nowHour],
                    ],
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
    </>
  );
};

export default TideGraph;
