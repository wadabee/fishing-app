import dayjs from "dayjs";
import { child, push, update } from "firebase/database";
import { RtdbSchema, Weather } from "../@types/rtdb";
import rtdb from "./rtdb";

const FishingRecordRepo = {
  registerStart: (params: {
    startDatetime: string;
    weather: Weather;
    wind: number;
    wave: number;
    turbidity: number;
  }) => {
    const day = dayjs(params.startDatetime).format("YYYYMMDD");

    const data: RtdbSchema["record"][string][number] = {
      startDatetime: params.startDatetime,
      endDatetime: "",
      weather: params.weather,
      wave: params.wave,
      wind: params.wind,
      turbidity: params.turbidity,
      catch: [],
      hit: [],
    };

    const key = push(child(rtdb, `record/${day}`)).key ?? "";

    return update(rtdb, {
      [`record/${day}/${key}`]: data,
    });
  },
};

export default FishingRecordRepo;