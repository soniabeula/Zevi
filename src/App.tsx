import Main from "./pages/Main";
import { ThemeProvider,createTheme } from "@mui/material/styles";

const theme=createTheme()

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
      <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
