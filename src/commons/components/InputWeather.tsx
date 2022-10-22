import React, { useMemo } from "react";
import { Weather } from "../../@types/rtdb";
import InputButtonGroup from "./InputButtonGroup";

type Props = {
  value: Weather;
  onChange: (newValue: Weather) => void;
};

const InputWeather: React.FC<Props> = ({ value, onChange }) => {
  const options = useMemo<Weather[]>(() => {
    return ["sunny", "cloudy", "rainy"];
  }, []);

  return (
    <InputButtonGroup
      label="weather"
      options={options}
      value={value}
      onChange={(newValue) => {
        onChange(newValue);
      }}
    />
  );
};

export default InputWeather;
