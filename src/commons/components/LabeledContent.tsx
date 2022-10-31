import { Box } from "@mui/material";
import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};

const LabeledContent: React.FC<Props> = ({ label, children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      {label}:{children}
    </Box>
  );
};

export default LabeledContent;
