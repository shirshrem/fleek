import { useState } from "react";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
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

const PrintMyList = ({ myList, setMyList, torrents, setTorrents }) => {
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
              ></ListCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  ) : (
    <h2>Your list is empty</h2>
  );
};

export default PrintMyList;
