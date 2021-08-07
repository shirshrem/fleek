import { useState } from "react";
import OutputList from "./OutputList";
import { Button } from "@material-ui/core";
import RandomMoviePreferences from "./RandomMoviePreferences";
import ChooseGeners from "./ChooseGenres";
import React from "react";

const API_KEY = "e411d2086029c6a6bb841f8bbfa4fd18";

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

  return searchTerm;
};
const RandomMovieGenerator = ({ myList, setMyList }) => {
  const [movies, setMovies] = useState(null); // random movies list
  const [genres, setGenres] = useState([]); // list of chosen geners
  const [random, setRandom] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);

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
  const setMoviesAccordingToPreferences = () => {
    getXFirstPages(5)
      .then((data) => Promise.all(data.map((x) => x.json())))
      .then((data) => data.map((x) => x.results))
      .then((arrayOfArrays) => [].concat.apply([], arrayOfArrays))
      .then((data) => {
        setMovies(data);
      })
      .catch(function (err) {
        console.log(err);
        setLoading(false);
      });
    console.log(movies);
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
          setMoviesAccordingToPreferences();
          setMoviesToShow(100);
          setRandom(false);
        }}
      >
        Generate List!
      </Button>
      <Button
        disabled={loading}
        onClick={() => {
          setMoviesAccordingToPreferences();
          setMoviesToShow(5);
          setRandom(true);
        }}
      >
        Generate 5!
      </Button>
      <Button
        disabled={loading}
        onClick={() => {
          setMoviesAccordingToPreferences();
          setMoviesToShow(1);
          setRandom(true);
        }}
      >
        i'm feeling lucky :)
      </Button>
      <OutputList
        movies={movies}
        myList={myList}
        setMyList={setMyList}
        random={random}
        moviesToShow={moviesToShow}
      />
    </div>
  );
};

export default RandomMovieGenerator;
