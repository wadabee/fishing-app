import { Card, CardActions, CardContent, TextField } from "@mui/material";
import { NextPage } from "next";
import { useCallback, useMemo, useState } from "react";
import { Weather } from "../../@types/rtdb";
import ButtonRegister from "../../commons/components/ButtonRegister";
import InputFiveLevel from "../../commons/components/InputFiveLevel";
import InputWeather from "../../commons/components/InputWeather";
import PageHeader from "../../commons/components/PageHeader";
import SubHeader from "../../commons/components/SubHeader";
import TideGraph from "../../commons/components/TideGraph";
import FishingRecordRepo from "../../repository/FishingRecordRepo";
import { getNowDatetime } from "../../utils/DateUtils";

const FishingStart: NextPage = () => {
  const [startDatetime, setStartDatetime] = useState(getNowDatetime());
  const [weather, setWeather] = useState<Weather>("sunny");
  const [wind, setWind] = useState<number>(1);
  const [wave, setWave] = useState<number>(1);
  const [turbidity, setTurbidity] = useState<number>(1);

  const now = useMemo(() => {
    return getNowDatetime();
  }, []);

  const onRegister = useCallback(() => {
    FishingRecordRepo.registerStart({
      startDatetime,
      turbidity,
      weather,
      wave,
      wind,
    });
  }, [startDatetime, turbidity, wave, weather, wind]);

  return (
    <>
      <PageHeader>Fishing Start</PageHeader>

      <Card>
        <CardContent>
          <TextField
            label="start-datetime"
            type="datetime-local"
            value={startDatetime}
            onChange={(e) => {
              setStartDatetime(e.target.value);
            }}
          />

          <InputWeather
            value={weather}
            onChange={(newValue) => {
              setWeather(newValue);
            }}
          />

          <InputFiveLevel
            label="wind"
            value={wind}
            onChange={(newValue) => {
              setWind(newValue);
            }}
          />

          <InputFiveLevel
            label="wave"
            value={wave}
            onChange={(newValue) => {
              setWave(newValue);
            }}
          />

          <InputFiveLevel
            label="turbidity"
            value={turbidity}
            onChange={(newValue) => {
              setTurbidity(newValue);
            }}
          />
        </CardContent>
        <CardActions>
          <ButtonRegister onClick={onRegister} />
        </CardActions>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <SubHeader>Today&apos;s Tide Graph</SubHeader>
          <TideGraph datetime={now} />
        </CardContent>
      </Card>
    </>
  );
};

export default FishingStart;
