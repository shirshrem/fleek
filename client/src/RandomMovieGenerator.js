import { useState } from "react";
import OutputList from "./OutputList";
import { Button } from "@material-ui/core";
import RandomMoviePreferences from "./RandomMoviePreferences";
import ChooseGeners from "./ChooseGenres";
import React from "react";

const API_KEY = "e411d2086029c6a6bb841f8bbfa4fd18";
const currentPreferencesToSearch = (genres, preferences) => {
  let searchTerm =
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
    API_KEY +
    "&with_genres=" +
    genres.map((genre) => genre.id).join(",");

  //api.themoviedb.org/3/discover/movie?api_key=e411d2086029c6a6bb841f8bbfa4fd18&with_genres=35,12

  if (preferences.newMovies) searchTerm.concat("&release_date.gte=2019");
  if (preferences.topRated) searchTerm.concat("&vote_average.gte=9");
  if (preferences.lessthan2) searchTerm.concat("&with_runtime.lte=120");
  console.log(searchTerm);

  return searchTerm;
};

const RandomMovieGenerator = ({ myList, setMyList }) => {
  const [movies, setMovies] = useState(null); // random movies list
  const [genres, setGenres] = useState([]); // list of chosen geners

  const [preferences, setPreferences] = useState({
    fromMyList: false,
    newMovies: false,
    topRated: false,
    nowPlaying: false,
  });

  const [loading, setLoading] = useState(false);

  return (
    <div>
      <RandomMoviePreferences
        preferences={preferences}
        setPreferences={setPreferences}
      />
      <ChooseGeners genres={genres} setGenres={setGenres} />

      <Button
        disabled={loading}
        onClick={() => {
          setLoading(true);
          fetch(currentPreferencesToSearch(genres, preferences))
            .then((results) => results.json())
            .then((data) => {
              setMovies(data.results);
              setLoading(false);
            })
            .catch(function (err) {
              console.log(err);
              setLoading(false);
            });
          console.log(movies);
        }}
      >
        Generate!
      </Button>
      <OutputList movies={movies} myList={myList} setMyList={setMyList} />
    </div>
  );
};

export default RandomMovieGenerator;
