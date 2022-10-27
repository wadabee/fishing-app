import {
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
} from "@mui/material";
import React, { useCallback } from "react";

type Props<T = any> = {
  label: string;
  options: T[];
  value: T;
  helpText?: string;
  helpTextEnd?: string;
  onChange: (newValue: T) => void;
};

const InputButtonGroup: React.FC<Props> = ({
  label,
  options,
  value,
  helpText,
  helpTextEnd,
  onChange,
}) => {
  const onClick = useCallback(
    (newValue: string) => {
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <ButtonGroup variant="outlined">
        {options.map((option, idx) => {
          const variant = "";
          return (
            <Button
              key={idx}
              variant={option === value ? "contained" : "outlined"}
              onClick={() => {
                onClick(option);
              }}
            >
              {option}
            </Button>
          );
        })}
      </ButtonGroup>

      {helpText || helpTextEnd ? (
        <FormHelperText component="div">
          <Grid container justifyContent="space-between" component="div">
            <Grid item component="div">
              {helpText}
            </Grid>
            <Grid item component="div">
              {helpTextEnd}
            </Grid>
          </Grid>
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default InputButtonGroup;
