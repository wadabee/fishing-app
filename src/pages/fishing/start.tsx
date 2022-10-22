import { Card, CardActions, CardContent, TextField } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import { Weather } from "../../@types/rtdb";
import ButtonRegister from "../../commons/components/ButtonRegister";
import InputFiveLevel from "../../commons/components/InputFiveLevel";
import InputWeather from "../../commons/components/InputWeather";
import PageHeader from "../../commons/components/PageHeader";

const FishingStart: NextPage = () => {
  const [weather, setWeather] = useState<Weather>("sunny");
  const [wind, setWind] = useState<number>(1);
  const [wave, setWave] = useState<number>(1);
  const [turbidity, setTurbidity] = useState<number>(1);

  return (
    <>
      <PageHeader>Fishing Start</PageHeader>

      <Card>
        <CardContent>
          <TextField label="start-datetime" type="datetime-local" />

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
          <ButtonRegister onClick={() => {}} />
        </CardActions>
      </Card>
    </>
  );
};

export default FishingStart;
