import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Container } from "@material-ui/core";
import ListCard from "./components/ListCard";

const theme = createMuiTheme({
  pallete: {
    primary: {
      main: "#028476",
    },
    secondary: { main: "#028476" },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  btn: {},
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(0, 4, 2),
    textAlign: "center",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const reducer = (currentList, currentValue) => {
  if (
    currentValue.type == "add" &&
    !currentList.some((movie) => movie.id == currentValue.id)
  )
    return [...currentList, ...[currentValue]];
  if (currentValue.type == "delete") {
    return currentList.filter((movie) => movie.id != currentValue.id);
  }
  return currentList;
};

const PrintMyList = ({
  myList,
  setMyList,
  torrents,
  setTorrents,
  loading,
  setLoading,
}) => {
  return myList.length > 0 ? (
    <div>
      <Container>
        <Grid container>
          {myList.reduce(reducer, []).map((movie) => (
            <Grid item key={movie.id} md={3} xs={12} sm={6} spacing={6}>
              <ListCard
                movie={movie}
                myList={myList}
                setMyList={setMyList}
                torrents={torrents}
                setTorrents={setTorrents}
                loading={loading}
                setLoading={setLoading}
              ></ListCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  ) : (
    <h2>Your list is empty ...</h2>
  );
};

export default PrintMyList;
