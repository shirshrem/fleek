import { useState } from "react";
import OutputList from "./OutputList";
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { TextField } from "@material-ui/core";

import { Typography } from "@material-ui/core";
import RandomMoviePreferences from "./RandomMoviePreferences";
import ChooseGeners from "./ChooseGenres";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const API_KEY = "e411d2086029c6a6bb841f8bbfa4fd18";
const url =
  "https://api.themoviedb.org/3/search/movie?api_key=e411d2086029c6a6bb841f8bbfa4fd18&language=en-US&page=1&include_adult=false&query=";

const RandomMovieGenerator = ({ myList, setMyList }) => {
  const [movies, setMovies] = useState(null); // random movies list
  const [genres, setGenres] = useState([]); // list of prefered genets

  const [preferences, setPreferences] = useState({
    fromMyList: false,
    newMovies: false,
    topRated: false,
    nowPlaying: false,
  });

  const genresStr = genres.map((genre) => genre.name).join("%20%7C%20");
  const [searchByPreferences, setSearchByPreferences] = useState();

  return (
    <div>
      <RandomMoviePreferences
        preferences={preferences}
        setPreferences={setPreferences}
      />
      <ChooseGeners genres={genres} setGenres={setGenres} />

      <Button
        onClick={() => {
          console.log(genres);
          setSearchByPreferences(
            "https://api.themoviedb.org/3/discover/movie?api_key=" +
              API_KEY +
              "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1with_genres=" +
              genresStr
          );
          if (preferences.newMovies)
            setSearchByPreferences(
              searchByPreferences,
              ..."&release_date.gte=2019"
            );
          if (preferences.topRated)
            setSearchByPreferences(
              searchByPreferences,
              ..."&vote_average.gte=90"
            );
          if (preferences.lessthan2)
            setSearchByPreferences(
              searchByPreferences,
              ..."&with_runtime.lte=120"
            );
          console.log(searchByPreferences);
          fetch(searchByPreferences)
            .then((res) => res.json())
            .then((data) => {
              console.log("Data:", data);
              setMovies(data.results);
            })
            .catch((error) => {
              console.log("error", error);
            });
        }}
      >
        Generate!
      </Button>
      <OutputList movies={movies} myList={myList} setMyList={setMyList} />
    </div>
  );
};

export default RandomMovieGenerator;
