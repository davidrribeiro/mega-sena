import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { render } from "react-dom";
import "typeface-roboto";
import App from "./App";

const theme = createMuiTheme({
  palette: { primary: { main: "rgba(64, 255, 192, 0.9)" }, type: "dark" }
});

const rootElement = document.getElementById("root");
render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  rootElement
);
