import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudDownloadRoundedIcon from "@material-ui/icons/CloudDownloadRounded";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    width: 350,
    height: 350,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));
const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
  root: {
    padding: "111110px",
  },
});
const ListCard = ({
  movie,
  myList,
  setMyList,
  torrents,
  setTorrents,
  loading,
  setLoading,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={movie.title}
          subheader={movie.year}
        />
        <CardMedia
          className={classes.media}
          image={
            movie.posterPath
              ? movie.posterPath
              : "https://www.pikpng.com/pngl/m/101-1012818_filmstrip-clipart-movie-themed-movie-film-clipart-png.png"
          }
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {movie.rank}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="download"
            disabled={loading}
            onClick={() => {
              setLoading(true);
              fetch("searchTerm/" + movie.title)
                .then((results) => results.json())
                .then((torrents) => {
                  setTorrents(torrents);
                  setLoading(false);
                })
                .catch(function (err) {
                  console.log(err);
                  setLoading(false);
                });
            }}
          >
            <CloudDownloadRoundedIcon />
          </IconButton>
          <IconButton
            aria-label="Delete"
            edge="end"
            onClick={() => {
              setMyList([
                ...myList,
                {
                  type: "delete",
                  id: movie.id,
                },
              ]);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Overview:</Typography>
            <Typography paragraph>{movie.overview}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </ThemeProvider>
  );
};

export default ListCard;
