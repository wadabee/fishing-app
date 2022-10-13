import { JmaTide } from "../../../../@types/tide";
import TideGenerator from "../TideGenerator";

describe("TideGenerator", () => {
  describe("textToJson", () => {
    // NOTE: Text spec is following URL
    // https://www.data.jma.go.jp/kaiyou/db/tide/suisan/readme.html

    test("set date in key, char 73-78", () => {
      const DATA =
        "  1  2  3  4  5  6  7  8  9 101111121131141151161171181191202212222232242212 3Z610101001020200103030010 4 14 2 1  11212 1212303001240400";

      const actual = TideGenerator.textToJson(DATA);
      expect(Object.keys(actual[0])[0]).toBe("2022-12-03");
    });

    test("set tide per hour, char 1-72", () => {
      const DATA =
        "  1  2  3  4  5  6  7  8  9 101111121131141151161171181191202212222232242212 3Z610101001020200103030010 4 14 2 1  11212 1212303001240400";

      const expected = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 111, 112, 113, 114, 115, 116, 117, 118,
        119, 120, 221, 222, 223, 224,
      ];

      const actual = TideGenerator.textToJson(DATA);
      expect(Object.values(actual[0])[0].tidePerHour).toEqual(expected);
    });

    test("set highTide, time is padding zero, char 81-108", () => {
      const DATA =
        "  1  2  3  4  5  6  7  8  9 101111121131141151161171181191202212222232242212 3Z6 2101001020200103030010 4 14 2 1  11212 1212303001240400";
      const expected = [
        {
          time: "02:10",
          tide: 100,
        },
        {
          time: "10:20",
          tide: 200,
        },
        {
          time: "10:30",
          tide: 300,
        },
        {
          time: "10:04",
          tide: 14,
        },
      ];

      const actual = TideGenerator.textToJson(DATA);
      expect(Object.values(actual[0])[0].highTide).toEqual(expected);
    });

    test("all 9 items not be set in highTide", () => {
      const DATA =
        "  1  2  3  4  5  6  7  8  9 101111121131141151161171181191202212222232242212 3Z6 210100102020010303009999999 2 1  11212 1212303001240400";
      const expected = [
        {
          time: "02:10",
          tide: 100,
        },
        {
          time: "10:20",
          tide: 200,
        },
        {
          time: "10:30",
          tide: 300,
        },
      ];

      const actual = TideGenerator.textToJson(DATA);
      expect(Object.values(actual[0])[0].highTide).toEqual(expected);
    });

    test("set lowTide, same spec as highTide, char 109-136", () => {
      const DATA =
        "  1  2  3  4  5  6  7  8  9 101111121131141151161171181191202212222232242212 3Z6 2101001020200103030010 4 14 2 1  11212 1212303001240400";
      const expected = [
        {
          time: "02:01",
          tide: 1,
        },
        {
          time: "12:12",
          tide: 12,
        },
        {
          time: "12:30",
          tide: 300,
        },
        {
          time: "12:40",
          tide: 400,
        },
      ];

      const actual = TideGenerator.textToJson(DATA);
      expect(Object.values(actual[0])[0].lowTide).toEqual(expected);
    });

    test("set all item", () => {
      const DATA =
        "  1  2  3  4  5  6  7  8  9 101111121131141151161171181191202212222232242212 3Z610101001020200103030010 4 14 2 1  11212 1212303001240400";
      const expected: JmaTide[] = [
        {
          "2022-12-03": {
            tidePerHour: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 111, 112, 113, 114, 115, 116, 117,
              118, 119, 120, 221, 222, 223, 224,
            ],
            highTide: [
              {
                time: "10:10",
                tide: 100,
              },
              {
                time: "10:20",
                tide: 200,
              },
              {
                time: "10:30",
                tide: 300,
              },
              {
                time: "10:04",
                tide: 14,
              },
            ],
            lowTide: [
              {
                time: "02:01",
                tide: 1,
              },
              {
                time: "12:12",
                tide: 12,
              },
              {
                time: "12:30",
                tide: 300,
              },
              {
                time: "12:40",
                tide: 400,
              },
            ],
          },
        },
      ];

      const actual = TideGenerator.textToJson(DATA);
      expect(actual).toEqual(expected);
    });
  });
});
