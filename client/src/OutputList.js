import React from 'react'
import { useState } from "react";
import MovieCard from "./components/MovieCard";
import { Grid } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Paper } from "@material-ui/core";

const OutputList = ({ movies, myList, setMyList }) => {
  return movies ? (
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
  ) : null;
};

export default OutputList;
