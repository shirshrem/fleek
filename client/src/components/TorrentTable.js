import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const createData = (title, peers, seeds, size) => {
  return { title, peers, seeds, size };
};

const TorrentTable = ({ torrents }) => {
  const classes = useStyles();
  return torrents.length > 0 ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Peers</TableCell>
            <TableCell align="center">Seeds</TableCell>
            <TableCell align="center">Size</TableCell>
            <TableCell align="center">Magnet Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {torrents
            .filter((torrent) => torrent.link != null)
            .map((torrent) => (
              <TableRow key={torrent?.title}>
                <TableCell component="th" scope="row">
                  {torrent?.title}
                </TableCell>
                <TableCell align="center">{torrent?.peers}</TableCell>
                <TableCell align="center">{torrent?.seeds}</TableCell>
                <TableCell align="center">{torrent?.size}</TableCell>
                {/* <TableCell align="right">{torrent?.link}</TableCell> */}
                <Button
                  align="center"
                  // onClick={() => {
                  //   fetch("getMagnetfromTorrent/" + torrent)
                  //     .then((results) => {
                  //     navigator.clipboard.writeText(results);
                  //     })
                  //     .catch(function (err) {
                  //       console.log(err);
                  //     });
                  // }}
                  onClick={() => {
                    navigator.clipboard.writeText(torrent.magnet);
                  }}
                >
                  Copy Link
                </Button>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <h2>No torrents are available</h2>
  );
};
export default TorrentTable;
