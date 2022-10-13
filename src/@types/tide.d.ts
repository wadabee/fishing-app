export type TideInfo = {
  time: `${string}:${string}`;
  tide: number;
};

export type JmaTide = {
  [date: string]: {
    tidePerHour: number[];
    highTide: TideInfo[];
    lowTide: TideInfo[];
  };
};
