import React, { Component } from "react";
import Button from "react";
import Fade from "react-reveal";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";

import mapStyles from "../mapStyles";
import {getDatabase,ref,set,get,child,update,query,orderByChild} from "firebase/database";


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

const dbRef = ref(getDatabase());
export default function MarkedMap(iconcolor) {
  const iconColor = iconcolor.iconColor;
  const {isLoaded, loadError} = useLoadScript ({
    googleMapsApiKey: 'AIzaSyAkcw8dYDscABi4bfF7GTVIEu9E9wOD3zY',
    //process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);

  //SET MARKERS ONCE 

  const onMapClick = React.useCallback((event) => {
    setMarkers(current => [
        ...current, {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
        color: iconColor,
        },
    ]); 

    const key= "/Locations/" + String(new Date());
    update(child(dbRef,key),{lat:event.latLng.lat(), lng:event.latLng.lng(),color:String(iconColor)}); 
    console.log(dbRef);

    //   const savedLocations = query(ref(dbRef,'/Locations'),orderByChild('lat'));
    //   console.log(savedLocations);
},[]);


  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  function loadPrevLoc(){
    alert ("map updated!");
    
      get(child(dbRef,"/Locations")).then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach(snap=> {
            const curSnap = snap.val()
            setMarkers(current => [...current, {
              lat: curSnap.lat,
              lng: curSnap.lng,
              color: curSnap.color,
              time: new Date()
              }])
          });
         
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
  }
  
  return <div class = "mapContainer">
    HI
    <button variant="primary" onClick={loadPrevLoc}>Refresh Map</button>{' '}
    
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={4.5}center = {center} options = {options} 
    onClick={onMapClick}>

         {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{

                url:'http://www.googlemapsmarkers.com/v1/' + String(marker.color),
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
