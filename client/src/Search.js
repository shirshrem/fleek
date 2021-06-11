import React from 'react'
import { useState } from "react";
import OutputList from "./OutputList";
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { TextField } from "@material-ui/core";

import { Typography } from "@material-ui/core";

const API_KEY = "e411d2086029c6a6bb841f8bbfa4fd18";
const url =
  "https://api.themoviedb.org/3/search/movie?api_key=e411d2086029c6a6bb841f8bbfa4fd18&language=en-US&page=1&include_adult=false&query=";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState(null);
  return (
    <div>
      <TextField
        label="Search for a movie:"
        style={{ margin: 8 }}
        placeholder="i.e, The Prestige"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        align="center"
        placeholder="i.e, The Prestige"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          if (searchTerm.length > 1) {
            fetch(url + searchTerm)
              .then((res) => res.json())
              .then((data) => {
                console.log("Data:", data);
                setMovies(data.results);
              })
              .catch((error) => {
                console.log("error", error);
              });
          }
        }}
      ></TextField>
      <OutputList
        movies={movies}
        myList={props.myList}
        setMyList={props.setMyList}
      />
    </div>
  );
};

export default Search;
