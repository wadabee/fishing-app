import { Button } from "@mui/material";
import React from "react";

type Props = {
  onClick: () => void;
};

const ButtonRegister: React.FC<Props> = ({ onClick }) => {
  return (
    <Button variant="contained" color="success" onClick={onClick}>
      REGISTER
    </Button>
  );
};

export default ButtonRegister;
