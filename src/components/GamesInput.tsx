import { TextField } from "@material-ui/core";
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

type Props = {
  games: number;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function GamesInput({ games, handler }: Props) {
  const classes = useStyles();

  return (
    <TextField
      id="games"
      name="games"
      type="number"
      label="Número de Jogos"
      variant="outlined"
      inputProps={{ min: 1, max: 10, step: 1 }}
      InputLabelProps={{ shrink: true }}
      className={classes.formControl}
      value={games}
      onChange={handler}
    />
  );
}
