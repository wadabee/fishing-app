import dayjs from "dayjs";
import { NextPage } from "next";
import tideData from "../../feature/tide/data/json/2022_hososhima.json";

import { JmaTide } from "../../@types/tide";

import ReactECharts from "echarts-for-react";
import _ from "lodash";

const TideGraph: NextPage = () => {
  const today = dayjs().format("YYYY-MM-DD");
  const tideDataForToday = (tideData as JmaTide)[today];

  return (
    <>
      Tide Graph
      {JSON.stringify(tideDataForToday)}
      <ReactECharts
        option={{
          xAxis: {
            name: "Time",
            type: "category",
            data: _.range(25).map((value) => `${value}:00`),
            boundaryGap: false,
          },
          yAxis: {
            name: "Tide (cm)",
            type: "value",
            min: 0,
            max: 240,
          },
          series: [
            {
              data: tideDataForToday.tidePerHour,
              type: "line",
              smooth: true,
              lineStyle: {
                width: 5,
              },
              // markPoint: {
              //   symbol: "roundRect",
              //   data: [
              //     {
              //       value: "aaa",
              //       name: "highTide",
              //       coord: [1, 100],
              //     },
              //   ],
              // },
            },
          ],
        }}
      ></ReactECharts>
    </>
  );
};

export default TideGraph;
