import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapContainer = (props) => {
    const userData = props.userData;
    const defaultCenter = props.defaultCenter;
    const nearbyUsers = props.nearbyUsers;

    useEffect(() => {
        console.log("Ayyyyyyyy, it's the nearby users!", nearbyUsers);
        console.log("Ayyyyyyyy, it's defaultCenter!", defaultCenter)
    }, [])

    const [ selected, setSelected ] = useState({});

    const onSelectHandler = item => {
        setSelected(item);
    }

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    return(
        <LoadScript googleMapsApiKey="AIzaSyC791ll_yJ4VXqJT_EYcUifbH0hbzKE8Y8">
            <GoogleMap mapContainerStyle={mapStyles} zoom={11} center={defaultCenter}>
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