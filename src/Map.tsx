import "./App.css";
import DrawerElement from "./DrawerElement";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Marker as M } from "leaflet";

const center: Position = {
  lat: 51.505,
  lng: -0.09,
};

type Position = {
  lat: number;
  lng: number;
};

interface MapProps {
  childData: Position;
  setChildData: (position: Position) => void;
}

const Map: React.FC<MapProps> = ({ childData, setChildData }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log(childData);
    navigate("/Birds", { state: [childData, backData, distData] });
  };

  //test

  const [position, setPosition] = useState<Position>(center);

  const markerRef = useRef<M | null>(null);

  const onDragEnd = () => {
    const marker = markerRef.current;
    if (marker) {
      let currentpos = marker.getLatLng();
      setPosition(currentpos);
      setChildData(currentpos);
      console.log(currentpos);
      console.log(childData);
    }
  };

  //test
  const [backData, setBackData] = useState(15);

  const [distData, setDistData] = useState(25);

  const handleDataFromChild = (data: Position) => {
    setChildData(data);
  };

  const handleDataFromSlide = (back: number, dist: number) => {
    setBackData(back);
    setDistData(dist);
  };

  return (
    <MapContainer
      className="leaflet-container"
      center={childData}
      zoom={13}
      scrollWheelZoom={true}
    >
      <button className="button" onClick={handleClick}>
        Find Birds
      </button>
      <Marker
        draggable={true}
        eventHandlers={{ dragend: onDragEnd }}
        position={childData}
        ref={markerRef}
      >
        <Popup minWidth={90} />
      </Marker>
      <DrawerElement sendSlideDataToParent={handleDataFromSlide} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
