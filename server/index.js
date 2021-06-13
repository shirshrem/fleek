// server/index.js

const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

const TorrentSearchApi = require("torrent-search-api");

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.get("/searchTerm/:searchTerm", async (req, res) => {
  res.send(await searchTorrent(req.params.searchTerm));
});

const enrichTorrentWithMagnet = async (torrent) => ({
  ...torrent,
  magnet: await TorrentSearchApi.getMagnet(torrent),
});

TorrentSearchApi.enablePublicProviders();

const searchTorrent = async (searchterm) => {
  try {
    return Promise.all(
      (await TorrentSearchApi.search(searchterm, "Movies", 20)).map(
        enrichTorrentWithMagnet
      )
    );
  } catch (err) {
    return err;
  }
};
