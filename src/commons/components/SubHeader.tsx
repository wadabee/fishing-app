import { Typography } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const SubHeader: React.FC<Props> = ({ children }) => {
  return (
    <Typography variant="h5" component="div">
      {children}
    </Typography>
  );
};

export default SubHeader;
