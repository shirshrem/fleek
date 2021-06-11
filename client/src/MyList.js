import React from 'react'
import { useState } from "react";
import PrintMyList from "./PrintMyList";

import TorrentTable from "./components/TorrentTable";

const MyList = ({ myList, setMyList, torrents, setTorrents }) => {
  return (
    <div>
      {" "}
      <PrintMyList
        myList={myList}
        setMyList={setMyList}
        torrents={torrents}
        setTorrents={setTorrents}
      />
      <TorrentTable torrents={torrents}></TorrentTable>
    </div>
  );
};

export default MyList;
