import React from "react";
import "./index.css";
import Navbar from "./Navbar";
import Home from "./Home";
import Search from "./Search";
import About from "./About";
import MyList from "./MyList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import RandomMovieGenerator from "./RandomMovieGenerator";
import RandomMoviePreferences from "./RandomMoviePreferences";
import Logo from "./MainLogo.png";

const theme = createMuiTheme({
  pallete: {
    primary: {
      main: "#028476",
    },
    secondary: { main: "#028476" },
  },
});

function App() {
  const [myList, setMyList] = useState([]);
  const [torrents, setTorrents] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar />
          <img className="Logo" src={Logo} alt="" />

          <div className="content"></div>
          {/* Shir:  stops at the first mach! */}

          <Switch>
            <Route exact path="/Home">
              <Home />
            </Route>
            <Route exact path="/About">
              <About />
            </Route>
            <Route exact path="/Search">
              <Search myList={myList} setMyList={setMyList} />
            </Route>
            <Route exact path="/MyList">
              <MyList
                myList={myList}
                setMyList={setMyList}
                torrents={torrents}
                setTorrents={setTorrents}
              />
            </Route>

            <Route exact path="/RandomMoviePreferences">
              <RandomMoviePreferences />
            </Route>
            <Route exact path="/RandomMovieGenerator">
              <RandomMovieGenerator myList={myList} setMyList={setMyList} />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
