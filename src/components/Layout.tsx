import { Container, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";

type LayoutProps = {
  header?: JSX.Element;
  left: JSX.Element;
  right: JSX.Element;
  children?: React.ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridFlex: {
      display: "flex",
      flexDirection: "column"
    },
    header: {
      margin: theme.spacing(3, 0, 3)
    }
  })
);

export function Layout({ header, left, right, children }: LayoutProps) {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      {header && <header className={classes.header}>{header}</header>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {left}
        </Grid>
        <Grid item md={4} className={classes.gridFlex}>
          {right}
        </Grid>
        {children && (
          <Grid item md={12}>
            {children}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
