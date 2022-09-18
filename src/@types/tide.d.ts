export type JmaTide = {
  [date: string]: {
    tidePerHour: number[];
    highTide: {
      time: number;
      tide: number;
    }[];
    lowTide: {
      time: number;
      tide: number;
    }[];
  };
};
