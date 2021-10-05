import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapContainer = (props) => {
    const userData = props.userData;
    const defaultCenter = props.defaultCenter;
    const nearbyUsers = props.nearbyUsers;

    const [ selected, setSelected ] = useState({});

    const onSelectHandler = item => {
        setSelected(item);
    }

    const mapStyles = {
        position: "fixed",
        left: "30%",
        height: "100vh",
        width: "70%"
    };

    return(
        <LoadScript googleMapsApiKey="AIzaSyALgbPKF_lTDAQF1YMf0Q9VUAQbs1zjZvc">
            <GoogleMap mapContainerStyle={mapStyles} zoom={12} center={defaultCenter}>
                {
                    nearbyUsers[0].map((item, i) => {
                        console.log("item", item)
                        console.log("item location", item.location)
                        return(
                            <Marker key={i} position={item.location} onClick={() => onSelectHandler(item)}/>
                        )
                    })
                }

                {
                    selected.location &&
                    (
                        <InfoWindow position={userData.location} clickable={true} onCloseClick={() => setSelected({})}>
                            <p>{selected.name}</p>
                        </InfoWindow>
                    )
                }
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;

//Restrict Key later on and remove when uploading to github


// Look into geocode api for lat and lng coordinates
// 