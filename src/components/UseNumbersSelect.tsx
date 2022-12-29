import { FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    switch: {
      marginLeft: 0,
      marginBottom: theme.spacing(1)
    }
  })
);

type Props = {
  checked: boolean;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function UseNumbersSelect({ checked, handler }: Props) {
  const classes = useStyles();

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            name="useNumbers"
            color="primary"
            checked={checked}
            onChange={handler}
          />
        }
        label="Usar números selecionados"
        className={classes.switch}
      />
    </FormGroup>
  );
}
