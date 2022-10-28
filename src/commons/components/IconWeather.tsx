import { Thunderstorm, WbCloudy, WbSunny } from "@mui/icons-material";
import React from "react";
import { Weather } from "../../@types/rtdb";

type Props = {
  weather: Weather;
};

const IconWeather: React.FC<Props> = ({ weather }) => {
  return (
    <>
      {weather === "sunny" ? (
        <WbSunny style={{ color: "orange" }} />
      ) : weather === "cloudy" ? (
        <WbCloudy style={{ color: "grey" }} />
      ) : (
        <Thunderstorm style={{ color: "blue" }} />
      )}
    </>
  );
};

export default IconWeather;
