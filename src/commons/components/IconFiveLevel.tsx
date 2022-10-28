import {
  Looks3,
  Looks4,
  Looks5,
  LooksOne,
  LooksTwo,
} from "@mui/icons-material";
import React from "react";

type Props = {
  level: number;
};

const IconFiveLevel: React.FC<Props> = ({ level }) => {
  return (
    <>
      {level === 1 ? (
        <LooksOne style={{ color: "#0874A9" }} />
      ) : level === 2 ? (
        <LooksTwo style={{ color: "#089EA9" }} />
      ) : level === 3 ? (
        <Looks3 style={{ color: "#4BA908" }} />
      ) : level === 4 ? (
        <Looks4 style={{ color: "#A96B08" }} />
      ) : level === 5 ? (
        <Looks5 style={{ color: "#A90808" }} />
      ) : null}
    </>
  );
};

export default IconFiveLevel;
