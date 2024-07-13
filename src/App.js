import "assets/scss/style.scss";
import { Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "utils/darkmode/theme";
import { GlobalStyles } from "utils/darkmode/global";
import { useDarkMode } from "utils/useDarkMode";
import GoogleAnalytics from "utils/GoogleAnalytics";
import routes from "./routes";

function App(props) {
  const [theme, toggleTheme] = useDarkMode();

  props = { theme, toggleTheme };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <div className="App">
        <GlobalStyles />
        <GoogleAnalytics />
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            component={() => <route.component {...props} />}
            exact={route.exact}
          />
        ))}
      </div>
    </ThemeProvider>
  );
}

export default App;
