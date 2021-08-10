import React from "react";
import MovieCard from "./components/MovieCard";
import { Grid } from "@material-ui/core";
import { Container } from "@material-ui/core";

const API_KEY = "e411d2086029c6a6bb841f8bbfa4fd18";
const sample_k_items_from_array = (array, k) => {
  return array
    .map((x) => ({ sort: Math.random(), value: x }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .slice(0, k);
};

const OutputList = ({ movies, myList, setMyList, random, moviesToShow }) => {
  return movies && !random ? (
    <Container>
      <Grid container>
        {movies.map((movie) => (
          <Grid item key={movie.id} md={3} xs={12} sm={6}>
            <MovieCard
              movie={movie}
              myList={myList}
              setMyList={setMyList}
            ></MovieCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  ) : movies ? (
    <Container>
      <Grid container>
        {sample_k_items_from_array(movies, moviesToShow).map((movie) => (
          <Grid item key={movie.id} md={3} xs={12} sm={6}>
            <MovieCard
              movie={movie}
              myList={myList}
              setMyList={setMyList}
            ></MovieCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  ) : null;
};

export default OutputList;
