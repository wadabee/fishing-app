import dayjs from "dayjs";
import { NextPage } from "next";
import tideData from "../../feature/tide/data/json/2022_hososhima.json";

import { Line } from "@nivo/line";

const TideGraph: NextPage = () => {
  const today = dayjs().format("YYYY-MM-DD");
  const tideDataForToday = tideData.find(
    (value) => Object.keys(value)[0] === today
  );

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
            id: "fake corp. A",
            data: [
              { x: 0, y: 7 },
              { x: 1, y: 5 },
              { x: 2, y: 11 },
              { x: 3, y: 9 },
              { x: 4, y: 13 },
              { x: 7, y: 16 },
              { x: 9, y: 12 },
            ],
          },
        ]}
        xScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        axisLeft={{
          legend: "linear scale",
          legendOffset: 12,
        }}
        axisBottom={{
          legend: "linear scale",
          legendOffset: -12,
        }}
      />
    </>
  );
};

export default TideGraph;
