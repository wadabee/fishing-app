import dayjs from "dayjs";
import { NextPage } from "next";
import tideData from "../../feature/tide/data/json/2022_hososhima.json";

import { Line } from "@nivo/line";
import { JmaTide } from "../../@types/tide";

const TideGraph: NextPage = () => {
  const today = dayjs().format("YYYY-MM-DD");
  const tideDataForToday = (tideData as JmaTide)[today];

  const commonProperties = {
    width: 900,
    height: 400,
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
    // 26    data,
    animate: true,
    // enableSlices: "x",
  };

  return (
    <>
      Tide Graph
      {JSON.stringify(tideDataForToday)}
      <Line
        {...commonProperties}
        curve="monotoneX"
        data={[
          {
            id: "tide",
            data: tideDataForToday.tidePerHour.map((value, index) => ({
              x: index,
              y: value,
            })),
          },
        ]}
        xScale={{
          type: "linear",
          min: 0,
          max: 23,
          nice: true,
        }}
        yScale={{
          type: "linear",
          min: 0,
          max: 240,
        }}
        axisLeft={{
          legend: "Tide(cm)",
          legendOffset: 12,
        }}
        axisBottom={{
          legend: "Time",
          legendOffset: -12,
        }}
        lineWidth={4}
        enableArea={true}
        enablePoints={false}
        gridXValues={[0, 3, 6, 9, 12, 15, 18, 21, 24]}
        colors={{ scheme: "blues" }}
      />
    </>
  );
};

export default TideGraph;
