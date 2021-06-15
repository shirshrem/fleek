import React from "react";
import { useState } from "react";
import PrintMyList from "./PrintMyList";

import TorrentTable from "./components/TorrentTable";

const MyList = ({ myList, setMyList, torrents, setTorrents }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <PrintMyList
        myList={myList}
        setMyList={setMyList}
        torrents={torrents}
        setTorrents={setTorrents}
        loading={loading}
        setLoading={setLoading}
      />
      <TorrentTable torrents={torrents} loading={loading}></TorrentTable>
    </>
  );
};

export default MyList;
