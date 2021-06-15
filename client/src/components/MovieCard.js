import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
  
});
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const MovieCard = ({ movie, myList, setMyList }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={
              movie.poster_path
                ? "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                : "https://www.nicepng.com/png/detail/538-5382520_movie-film-clipart-film-canister-and-strip-clip.png"
            }
            title={movie.original_title}
            height={"30px"}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {movie.original_title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              height={"50px"}
            >
              {movie.overview}
            </Typography>
            <Typography variant="body3" color="textSecondary" component="p">
              {movie.release_date ? movie.release_date.slice(0, 4) : null}
            </Typography>
            <Typography variant="body4" color="textPrimary" component="p">
              {movie.vote_average}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            align="center"
            size="small"
            color="primary"
            onClick={() => {
              setMyList([
                ...myList,
                {
                  type: "add",
                  id: movie.id,
                  title: movie.original_title,
                  year: movie.release_date
                    ? movie.release_date.slice(0, 4)
                    : null,
                  rank: movie.vote_average,
                  overview: movie.overview,
                  posterPath: movie.poster_path
                    ? "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                    : null,
                },
              ]);
            }}
          >
            Add To My List
          </Button>

          {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export default MovieCard;
