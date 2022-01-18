import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { process_params } from 'express/lib/router';
import  usePlacesAutoComplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "combobox";
import { Link } from 'react-router-dom';

const MapContainer = (props) => {
    const userData = props.userData;
    const defaultCenter = props.defaultCenter;
    const nearbyUsers = props.nearbyUsers;

    const [ selected, setSelected ] = useState({});

    const onSelectHandler = item => {
        setSelected(item);
        console.log("selected:", selected)
    }

    const mapStyles = {
        position: "fixed",
        left: "30%",
        height: "100vh",
        width: "70%",
    };

    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    }

    return(
        <div>
            <LoadScript googleMapsApiKey="AIzaSyALgbPKF_lTDAQF1YMf0Q9VUAQbs1zjZvc">
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    options={options}
                    zoom={12}
                    center={defaultCenter}>
                    {
                        nearbyUsers[0].map((item, i) => {
                            return(
                                <Marker
                                    key={i}
                                    position={item.location}
                                    onClick={() => onSelectHandler(item)}
                                    />
                            )
                        })
                    }

                    {
                        selected.location &&
                        (
                            <InfoWindow 
                                position={selected.location}
                                clickable={true}
                                onCloseClick={() => setSelected({})}>
                                <div>
                                    <Link>{selected.firstName} {selected.lastName}</Link>
                                    <ul>
                                        {selected.instruments.map((item, i) => {
                                            return(
                                                <li>{item.instrument}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </InfoWindow>
                        )
                    }
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default MapContainer;

//Restrict Key later on and remove when uploading to github