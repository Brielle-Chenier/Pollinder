import React, { Component } from "react";
import Fade from "react-reveal";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";

import mapStyles from "../mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
    width: '80%',
    height: '80vh'
};
const center = {
    lat:60,
    lng:-95,
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,

}
export default function MarkedMap() {
  const {isLoaded, loadError} = useLoadScript ({
    googleMapsApiKey: 'AIzaSyAkcw8dYDscABi4bfF7GTVIEu9E9wOD3zY',
    //process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);

  const onMapClick = React.useCallback((event) => {
    setMarkers(current => [
        ...current, {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
        },
    ]); 
 },[]);


  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  return <div class = "mapContainer">
    HI
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={4.5}center = {center} options = {options} 
    onClick={onMapClick}>

         {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
                url:'http://www.googlemapsmarkers.com/v1/009900/',
                scaledSize: new window.google.maps.Size(20,35),
                // origin: new window.google.maps.Size(0,0),
                // anchor: new window.google.maps.Point(10,17),
            }}
            

          />
        ))}
        
    </GoogleMap>

  </div>;

}

class DisplayedMap extends Component {
  render() {
      return (
          <div>DISPLAY</div>

      );
  }
}

//export default DisplayedMap;
