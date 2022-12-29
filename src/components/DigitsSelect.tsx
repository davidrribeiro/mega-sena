import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2)
    }
  })
);

type DigitsSelectProps = {
  digits: number;
  handler: (e: React.ChangeEvent<any>) => void;
};

export function DigitsSelect({ digits, handler }: DigitsSelectProps) {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="digits-label">Número de Dígitos</InputLabel>
      <Select
        id="digits"
        name="digits"
        label="Número de Dígitos"
        labelId="digits-label"
        value={digits}
        onChange={handler}
      >
        {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(val => (
          <MenuItem value={val} key={`d${val}`}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
