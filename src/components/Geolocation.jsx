// Geolocation.jsx
import React, { useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { useDispatch } from 'react-redux';
import { setLocation } from "../app/counter/slice";
import Weather from "./Weather";

const Geolocation = () => {
    const dispatch = useDispatch();
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });


        // Dispatch the location data to Redux when coords are available
        useEffect(() => {
            if (coords) {
                dispatch(setLocation({
                    lat: coords.latitude, 
                    lon: coords.longitude 
                }));
            }
        }, [coords, dispatch]);
        console.log(coords);
    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
        <Weather/>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
};

export default Geolocation;
