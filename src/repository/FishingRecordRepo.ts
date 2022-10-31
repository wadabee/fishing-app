import dayjs from "dayjs";
import { child, get, push, update } from "firebase/database";
import { RtdbSchema, Weather } from "../@types/rtdb";
import rtdb from "./rtdb";

const FishingRecordRepo = {
  getAll: (): Promise<RtdbSchema["record"] | undefined> => {
    return new Promise((resolve, reject) => {
      get(child(rtdb, "record"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            resolve(snapshot.val());
          } else {
            resolve(undefined);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
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
  registerEnd: (params: {
    key: string;
    startDatetime: string;
    endDatetime: string;
  }) => {
    const day = dayjs(params.startDatetime).format("YYYYMMDD");

    return update(rtdb, {
      [`record/${day}/${params.key}/endDatetime`]: params.endDatetime,
    });
  },
};

export default FishingRecordRepo;
