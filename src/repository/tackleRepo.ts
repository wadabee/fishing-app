import { child, get, push, update } from "firebase/database";
import { RtdbSchema, TackleType } from "../@types/rtdb";
import rtdb from "./rtdb";

const TackleRepo = {
  getAll: (): Promise<RtdbSchema["tackle"] | undefined> => {
    return new Promise((resolve, reject) => {
      get(child(rtdb, "tackle"))
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
  getKey: (type: TackleType) => {
    return push(child(rtdb, `tackle/${type}`)).key ?? "";
  },
  register: (type: TackleType, value: RtdbSchema["tackle"][TackleType]) => {
    return update(rtdb, {
      [`tackle/${type}`]: value,
    });
  },
};

export default TackleRepo;
