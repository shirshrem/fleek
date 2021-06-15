import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;
const InputWrapper = styled("div")`
  width: 300px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: #40a9ff;
  }

  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    font-size: 14px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

const Tag = styled(({ label, onDelete, ...props }) => (
  <div {...props}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled("ul")`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected="true"] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus="true"] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

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
          label="Less Than 2 hours (I have to wake up early tommorow)"
        />
      </FormGroup>
      <FormHelperText> Select at least one </FormHelperText>
    </FormControl>
  );
};

export default RandomMoviePreferences;
