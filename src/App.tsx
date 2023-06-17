import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
// import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Reference from "./pages/Reference";
import Second from "./pages/Second";
import "./App.scss";
import ResponsiveAppBar from "./components/NavBar/ResponsiveAppBar";
// import MyCounter from "./components/MyCounter/MyCounter";
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: lightBlue[900],
      paper: lightBlue[900],
    },
  },
  components: {},
});

function App() {
  const [width, setWidth] = React.useState(0);
  React.useEffect(() => {
    const updateWindowDimensions = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/Reference" element={<Reference />}></Route> */}
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
