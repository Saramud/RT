import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import MapOfLR from "../MapOfLR/MapOfLR";
import getTrack from "../../utils/getTracks";

const RealTrack = () => {
  const [pause, setPause] = useState(true);
  const [data, setData] = useState(null);

  const handleClick = () => {
    setPause(!pause);
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");
    ws.onopen = () => {
      console.log("Websocket client connected");
    };

    ws.onclose = () => {
      console.log("Tracking is blocked");
    };
    if (!pause) {
      ws.onmessage = (message) => {
        const data = JSON.parse(message.data);
        setData(getTrack(data));
      };
    }

    return () => ws.close();
  }, [pause]);

  return <MapOfLR handleClick={handleClick} pause = {pause} data={data} />;
};

export default RealTrack;
