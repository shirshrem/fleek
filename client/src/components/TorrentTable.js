import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  createMuiTheme,
  ThemeProvider,
  MuiThemeProvider,
} from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
  palette: {
    primary: {
      main: "#c7745e",
    },
    secondary: {
      main: "#c7745e",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        maxWidth: "80%",
        minHeight: "5vh",
        display: "flex",
        alignItems: "center",
        size: "small",
        margin: "5px",
        padding: "1px",
      },
    },
  },
});
// const createData = (title, peers, seeds, size) => {
//   return { title, peers, seeds, size };
// };

const TorrentTable = ({ torrents, loading }) => {
  const classes = useStyles();

  console.log(torrents);
  return loading ? (
    <ThemeProvider theme={theme}>
      <div> </div>
      <div className={classes.root}>
        <LinearProgress color={classes.palette} />
      </div>
    </ThemeProvider>
  ) : torrents.length > 0 ? (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Peers</StyledTableCell>
              <StyledTableCell align="center">Seeds</StyledTableCell>
              <StyledTableCell align="center">Size</StyledTableCell>
              <StyledTableCell align="center">Magnet Link</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {torrents
              .filter((torrent) => torrent.link != null)
              .map((torrent) => (
                <StyledTableRow key={torrent?.title}>
                  <StyledTableCell component="th" scope="row">
                    {torrent?.title}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {torrent?.peers}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {torrent?.seeds}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {torrent?.size}
                  </StyledTableCell>
                  {/* <TableCell align="right">{torrent?.link}</TableCell> */}
                  <MuiThemeProvider theme={theme}>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(torrent.magnet);
                      }}
                    >
                      Copy Link
                    </Button>
                  </MuiThemeProvider>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  ) : null;
};
export default TorrentTable;
