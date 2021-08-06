import React from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import ListCard from "./components/ListCard";

const reducer = (currentList, currentValue) => {
  if (
    currentValue.type == "add" &&
    !currentList.some((movie) => movie.id == currentValue.id)
  )
    return [...currentList, ...[currentValue]];
  if (currentValue.type == "delete") {
    return currentList.filter((movie) => movie.id != currentValue.id);
  }
  return currentList;
};

const PrintMyList = ({
  myList,
  setMyList,
  torrents,
  setTorrents,
  loading,
  setLoading,
}) => {
  return myList.length > 0 ? (
    <div>
      <Container>
        <Grid container>
          {myList.reduce(reducer, []).map((movie) => (
            <Grid item key={movie.id} md={3} xs={12} sm={6} spacing={6}>
              <ListCard
                movie={movie}
                myList={myList}
                setMyList={setMyList}
                torrents={torrents}
                setTorrents={setTorrents}
                loading={loading}
                setLoading={setLoading}
              ></ListCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  ) : (
    <h2>Your list is empty ...</h2>
  );
};

export default PrintMyList;
