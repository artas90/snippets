import { render } from "solid-js/web";
import { ThemeProvider, useTheme } from "./utils/theme";
import { App } from "./components/App";

render(
  () => (
    <ThemeProvider color="#335d92" title="Context Example">
      <App />
    </ThemeProvider>
  ),
  document.getElementById("app")!
);
