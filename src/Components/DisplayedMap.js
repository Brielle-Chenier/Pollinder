import React, { Component } from "react";
import Button from "react";
import Fade from "react-reveal";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";

import mapStyles from "../mapStyles";
import {getDatabase,ref,set,get,child,update,query,orderByChild} from "firebase/database";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

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

export default function MarkedMap(iconcolor, zipcode) {
  var iconColor = iconcolor
  
  const zip = zipcode.zip;
  const {isLoaded, loadError} = useLoadScript ({
    googleMapsApiKey:  'AIzaSyAgcMGaMxnGwNAgX0WiH3QUxaWH0sMIzSk',
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);

  const onMapClick = React.useCallback((event) => {
    get(child(dbRef, `tempColor/val`)).then((snapshot) => {
      if (snapshot.exists()) {
        iconColor = snapshot.val();
        console.log("ICON" + iconColor);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
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

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);
  
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  function loadPrevLoc(){
    //alert ("map updated!");
    
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
    
    <div class="refreshButton">
    <h1 class="resume">SEE WHAT CANADA THINKS</h1>
    <button variant="primary" onClick={loadPrevLoc} style={{float: 'right'}}>Refresh Map</button>

    </div>
    
    
    <Search panTo={panTo} />
    
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={4.5}center = {center} options = {options} 
    onClick={onMapClick} id="map" onLoad={onMapLoad}>

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

function Search({ panTo }){
  const {ready, value, suggestions: { status, data},
  setValue,
  clearSuggestions} = usePlacesAutocomplete({
    requestOptions:{
      location: {lat: () => 43.65, lng: () => -79.38},
      radius: 200*1000,
    },
  });


  return(
    <div >
      <Combobox onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions();
        try{
          const results = await getGeocode({ address });
          console.log(results);
          const { lat, lng } = await getLatLng(results[0]);
          panTo({ lat, lng });
        }catch(error){
          console.log(error);
        }
      console.log(address);
    }}
    >
      <ComboboxInput value={value} onChange={(e)=> {
        setValue(e.target.value)
      }} 
      disabled={!ready}
      placeholder="Enter an address"

      />
      
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" && data.map(({id, description}) => 
          <ComboboxOption key={id} value={description}/>)}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>

    </div>


  )
  
}

class DisplayedMap extends Component {
  render() {
      return (
          <div>DISPLAY</div>


      );
  }
}

//export default DisplayedMap;
