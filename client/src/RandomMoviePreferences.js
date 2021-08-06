import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const RandomMoviePreferences = ({ preferences, setPreferences }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setPreferences({
      ...preferences,
      [event.target.name]: event.target.checked,
    });
  };

  const { fromMyList, newMovies, topRated, nowPlaying, lessthan2 } =
    preferences;
  const error =
    [fromMyList, newMovies, topRated, nowPlaying, lessthan2].filter((v) => v)
      .length !== 5;

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend"> </FormLabel>
      <FormGroup>
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={fromMyList}
              onChange={handleChange}
              name="fromMyList"
            />
          }
          label="Movies from My List"
        /> */}
        <FormControlLabel
          control={
            <Checkbox
              checked={newMovies}
              onChange={handleChange}
              name="newMovies"
            />
          }
          label="New Movies Only (2019 +)"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={topRated}
              onChange={handleChange}
              name="topRated"
            />
          }
          label="Top Rated Movies"
        />
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={nowPlaying}
              onChange={handleChange}
              name="nowPlaying"
            />
          }
          label="Now Playing Movies"
        /> */}
        <FormControlLabel
          control={
            <Checkbox
              checked={lessthan2}
              onChange={handleChange}
              name="lessthan2"
            />
          }
          label="Less Than 2 hours (I have to wake up early tommorow...)"
        />
      </FormGroup>
      <FormHelperText> </FormHelperText>
    </FormControl>
  );
};

export default RandomMoviePreferences;
