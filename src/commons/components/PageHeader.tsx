import { Typography } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const PageHeader: React.FC<Props> = ({ children }) => {
  return <Typography variant="h4">{children}</Typography>;
};

export default PageHeader;
