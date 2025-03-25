import { Marker, Popup } from "react-leaflet";
import { useState, useRef, useMemo } from "react";
import { Marker as M } from "leaflet";

type Position = {
  lat: number;
  lng: number;
};

interface ChildComponentProps {
  sendDataToParent: (position: Position) => void;
}

const MapPointer: React.FC<ChildComponentProps> = ({ sendDataToParent }) => {
  const [center, setCenter] = useState<Position>({
    lat: 51.505,
    lng: -0.09,
  });

  const [position, setPosition] = useState<Position>(center);

  const markerRef = useRef<M | null>(null);

  const onDragEnd = () => {
    const marker = markerRef.current;
    if (marker) {
      let currentpos = marker.getLatLng();
      setPosition(currentpos);
      setCenter(currentpos);
      console.log(currentpos);
      sendDataToParent(currentpos);
      console.log(position);
    }
  };

  return (
    <Marker
      draggable={true}
      eventHandlers={{ dragend: onDragEnd }}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90} />
    </Marker>
  );
};

export default MapPointer;
