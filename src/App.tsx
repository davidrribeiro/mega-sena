import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import * as React from "react";
import { DigitsSelect } from "./components/DigitsSelect";
import { GamesInput } from "./components/GamesInput";
import { Layout } from "./components/Layout";
import { Card, CardStatus, NumberGrid } from "./components/NumberGrid";
import { UseNumbersSelect } from "./components/UseNumbersSelect";
import { useStateLocal } from "./useStateLocal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1, 0, 2)
    },
    results: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
      "&:hover": {
        backgroundColor: fade(theme.palette.primary.dark, 0.3)
      }
    },
    number: {
      "&:not(:last-of-type)": {
        "&::after": {
          content: '" • "',
          color: "#333"
        }
      }
    }
  })
);

export default function App() {
  const classes = useStyles();

  const [submitting, setSubmitting] = React.useState(false);
  const [results, setResults] = React.useState<number[][]>([]);
  const [games, setGames] = useStateLocal("games", 1);
  const [digits, setDigits] = useStateLocal("digits", 6);
  const [useNumbers, setUseNumbers] = useStateLocal("useNumbers", true);
  const [cardNumbers, setCardNumbers] = useStateLocal<Card>(
    "numbers",
    Object.fromEntries(
      Array.from({ length: 60 }, (_, i) => [i + 1, CardStatus.Unchecked])
    )
  );

  const toggleNumber = (num: keyof Card) => {
    setCardNumbers(prev => ({
      ...prev,
      [num]:
        prev[num] === CardStatus.Unchecked
          ? CardStatus.Checked
          : CardStatus.Unchecked
    }));
  };

  const doStuff = () => {
    setSubmitting(true);
    if (!useNumbers) return; // TODO

    const numbers = Object.entries(cardNumbers)
      .filter(([_, status]) => status === CardStatus.Checked)
      .map<number>(([n, _]) => Number(n));

    fetch(
      "https://us-central1-mega-sena-277723.cloudfunctions.net/draw-games",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numbers, games, digits })
      }
    )
      .then(response => response.json())
      .then(result => setResults(result.data))
      .catch(error => console.error(error))
      .finally(() => setSubmitting(false));
  };

  const clearNumbers = () => {
    const zoink = Object.entries(cardNumbers)
      .filter(([_, status]) => status === CardStatus.Checked)
      .reduce((obj, [num, _]) => {
        return { ...obj, [num]: CardStatus.Unchecked };
      }, {});

    setCardNumbers(prev => ({
      ...prev,
      ...zoink
    }));
  };

  return (
    <Layout
      header={
        <>
          <Typography variant="h4">Mega-Sena</Typography>
          <Typography variant="subtitle2" gutterBottom>
            Escolha os números, quantidade de dezenas e número de jogos!
          </Typography>
        </>
      }
      left={<NumberGrid numbers={cardNumbers} handler={toggleNumber} />}
      right={
        <>
          <DigitsSelect
            digits={digits}
            handler={e => setDigits(e.target.value)}
          />
          <GamesInput
            games={games}
            handler={e => setGames(Number(e.target.value))}
          />
          <UseNumbersSelect
            checked={useNumbers}
            handler={e => setUseNumbers(e.target.checked)}
          />
          <Button
            variant="outlined"
            className={classes.button}
            onClick={clearNumbers}
          >
            Limpar Números
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={doStuff}
          >
            Gerar Jogos
          </Button>
        </>
      }
    >
      {submitting ? (
        <Box style={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        results.map((res, idx) => (
          <Paper
            key={`game${idx}`}
            className={classes.results}
            variant="outlined"
          >
            <Typography color="textSecondary" variant="subtitle2" gutterBottom>
              Jogo {idx + 1}
            </Typography>
            <Typography variant="h5" component="h2" className={classes.number}>
              {res.map(e => (
                <span className={classes.number} key={`g${idx}-${e}`}>
                  {" "}
                  {e.toString().padStart(2, "0")}
                </span>
              ))}
            </Typography>
          </Paper>
        ))
      )}
    </Layout>
  );
}
