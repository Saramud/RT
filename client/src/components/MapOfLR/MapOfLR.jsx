import React, { useRef, useEffect, useCallback } from "react";
import { Map as MapLeaflet } from "react-leaflet";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapOfLR.css";

let heroes = new Map();

const MapOfLR = (props) => {
  const {handleClick, pause, data} = props;
  const mapRef = useRef(null);
  
  useEffect(() => {
    const map = mapRef.current.leafletElement;
  
    if (data) {
      const heroIcon = L.icon({
        iconUrl: data.iconUrl,
        iconSize: data.iconSize,
      });

      if (heroes.has(data.hero)) {
        heroes.get(data.hero).setLatLng(data.coordinate).update();
      } else {
        const marker = L.marker(data.coordinate, { icon: heroIcon }).bindTooltip(
          data.title
        );
        heroes.set(data.hero, marker);
        heroes.get(data.hero).addTo(map);
      }
    }
  }, [data]);


  useEffect(() => {
    const map = mapRef.current.leafletElement;
    const bounds = [
      [-26.5, -25],
      [1021.5, 1023],
    ];
    
    const image = L.imageOverlay("/images/map/map.png", bounds).addTo(map);
    map.fitBounds(image.getBounds());
  
  }, []);

  return (
    <>
      <MapLeaflet
        ref={mapRef}
        minZoom={0}
        crs={CRS.Simple}
        maxBoundsViscosity={1.0}
        boundsOptions={{ padding: [50, 50] }}
        style={{ height: "100vh" }}
      />
      <button className="refreshButton" onClick={handleClick}>
        {pause ? "Start" : "Stop"}
      </button>
    </>
  );
};

export default MapOfLR;
