import { useState } from "react";
import OutputList from "./OutputList";
import { Button } from "@material-ui/core";
import RandomMoviePreferences from "./RandomMoviePreferences";
import ChooseGeners from "./ChooseGenres";
import React from "react";

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

  const [searchByPreferences, setSearchByPreferences] = useState();
  const [loading, setLoading] = useState(false);

  const currentPreferencesToSearch = () => {
    let genresStr = genres.map((genre) => genre.name).join("%20%7C%20");
    let searchTerm =
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
      API_KEY +
      "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1with_genres=" +
      genresStr;
    if (preferences.newMovies) searchTerm.concat("&release_date.gte=2019");
    if (preferences.topRated) searchTerm.concat("&vote_average.gte=9");
    if (preferences.lessthan2) searchTerm.concat("&with_runtime.lte=120");
    return searchTerm;
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
          setLoading(true);
          setSearchByPreferences(currentPreferencesToSearch());
          console.log("searchByPreferences: " + searchByPreferences);

          fetch(searchByPreferences)
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
