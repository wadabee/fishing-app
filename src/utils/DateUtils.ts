import dayjs from "dayjs";

const FORMAT_DATE = "YYYY-MM-DD";
const FORMAT_DATETIME = "YYYY-MM-DD HH:mm:ss";

export const getNowDatetime = (): string => {
  return dayjs().format(FORMAT_DATETIME);
};

export const getDate = (datetime: string): string => {
  return dayjs(datetime).format(FORMAT_DATE);
};

export const getHour = (datetime: string): number => {
  return Number.parseInt(dayjs(datetime).format("H"));
};

export const getMinute = (datetime: string): number => {
  return Number.parseInt(dayjs(datetime).format("m"));
};
