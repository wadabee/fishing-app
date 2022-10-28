export type TackleType =
  | "method"
  | "rod"
  | "reel"
  | "line"
  | "leader"
  | "weight"
  | "needle"
  | "float"
  | "lure"
  | "bait";

export type Weather = "sunny" | "cloudy" | "rainy";

export type FishingRecord = {
  startDatetime: string;
  endDatetime: string;
  weather: Weather;
  wind: number;
  wave: number;
  turbidity: number;
  tackle?: {
    [key in TackleType]: {
      [id in string]: string;
    }[];
  };
  catch: {
    datetime: string;
    tackle: {
      [key in TackleType]: {
        [id in string]: string;
      }[];
    };
    fish: {
      name: string;
      size: number;
      quantity: number;
    };
  }[];
  hit: {
    datetime: string;
    tackle: {
      [key in TackleType]: {
        [id in string]: string;
      }[];
    };
    fish?: {
      name: string;
      quantity: number;
    };
  }[];
};

export type RtdbSchema = {
  tackle: {
    [key in TackleType]: {
      [id in string]: string;
    }[];
  };
  record: {
    [date in string]: {
      [key in string]: FishingRecord;
    };
  };
};
