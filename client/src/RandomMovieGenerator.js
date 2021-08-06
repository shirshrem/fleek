import { useState } from "react";
import OutputList from "./OutputList";
import { Button } from "@material-ui/core";
import RandomMoviePreferences from "./RandomMoviePreferences";
import ChooseGeners from "./ChooseGenres";
import React from "react";
import Math from "Math";

const API_KEY = "e411d2086029c6a6bb841f8bbfa4fd18";
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};
const currentPreferencesToSearch = (genres, preferences, page) => {
  let searchTerm =
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
    API_KEY +
    "&language=en-US" +
    "&sort_by=vote_count.desc" +
    "&with_genres=" +
    genres.map((genre) => genre.id).join(",");

  if (preferences.newMovies)
    searchTerm += "&primary_release_date.gte=2019-01-01";
  if (preferences.topRated) searchTerm += "&vote_average.gte=8.5";
  if (preferences.lessthan2) searchTerm += "&with_runtime.lte=120";
  searchTerm += "&page=" + page;
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

  const getXFirstPages = async (x) => {
    return Promise.all(
      Array(x)
        .fill(1)
        .map((_, y) => y + 1)
        .map(getPage)
        .map((url) => fetch(url))
    );
  };

  const getPage = (page) => {
    return currentPreferencesToSearch(genres, preferences, page);
  };
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
          getXFirstPages(5)
            .then((data) => Promise.all(data.map((x) => x.json())))
            .then((data) => data.map((x) => x.results))
            .then((arrayOfArrays) => [].concat.apply([], arrayOfArrays))
            .then((data) => {
              setMovies(data);
              console.log(data);
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
