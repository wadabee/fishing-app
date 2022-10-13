import dayjs from "dayjs";
import { JmaTide, TideInfo } from "../../../@types/tide";
import _, { add } from "lodash";
import { readFile, writeFile } from "fs/promises";

const formatTime = (hour: string, minite: string): TideInfo["time"] => {
  return `${hour.replace(" ", "0")}:${minite.replace(" ", "0")}`;
};

const getTideData = (tideText: string, startIndex: number): TideInfo[] => {
  return _.range(4)
    .map((idx) => {
      const addtionalDigit = 7 * idx;
      return {
        time: formatTime(
          tideText.substring(
            startIndex + addtionalDigit,
            startIndex + 2 + addtionalDigit
          ),
          tideText.substring(
            startIndex + 2 + addtionalDigit,
            startIndex + 4 + addtionalDigit
          )
        ),
        tide: Number.parseInt(
          tideText.substring(
            startIndex + 4 + addtionalDigit,
            startIndex + 7 + addtionalDigit
          )
        ),
      };
    })
    .filter(({ time }) => {
      return time !== "99:99";
    });
};

const textToJson = (text: string): JmaTide => {
  const tideTexts = text.split("\n");

  const ret: JmaTide = {};

  tideTexts.forEach((tideText) => {
    const date = dayjs(
      new Date(
        2000 + Number.parseInt(tideText.substring(72, 74)),
        Number.parseInt(tideText.substring(74, 76)) - 1,
        Number.parseInt(tideText.substring(76, 78))
      )
    );

    const tidePerHour: number[] = _.range(24).map((hour) => {
      return Number.parseInt(tideText.substring(hour * 3, (hour + 1) * 3));
    });

    const highTide = getTideData(tideText, 80);
    const lowTide = getTideData(tideText, 108);

    ret[date.format("YYYY-MM-DD")] = {
      tidePerHour,
      highTide,
      lowTide,
    };
  });

  return ret;
};

const TideGenerator = {
  textToJson,
  generateAll: () => {
    console.log("START : Tide Generator");

    console.log();
    readFile(`${__dirname}/txt/2022_hososhima.txt`).then((value) => {
      const json = textToJson(value.toString());

      writeFile(`${__dirname}/json/2022_hososhima.json`, JSON.stringify(json));
    });

    console.log("END : Tide Generator");
  },
};

export default TideGenerator;
