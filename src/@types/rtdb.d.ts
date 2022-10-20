export type TackleType =
  | "method"
  | "rod"
  | "reel"
  | "line"
  | "leader"
  | "weight"
  | "needle"
  | "float"
  | "lure";

export type RtdbSchema = {
  tackle: {
    [key in TackleType]: {
      [id in string]: string;
    }[];
  };
};
