// Geolocation.jsx
import React, { useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { useDispatch } from 'react-redux';
import { setLocation } from "../app/counter/slice";
import Weather from "./Weather";
import Loader from "./Loader";

const Geolocation = () => {
    const dispatch = useDispatch();
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 10000,
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
    return !isGeolocationAvailable ? (
        <Loader title="Your browser does not support Geolocation"/>
    ) : !isGeolocationEnabled ? (
        <Loader title="Geolocation is not enabled"/>
    ) : coords ? (
        <Weather/>
    ) : (
        <Loader title="Detecting your location &hellip; "/>
    );
};

export default Geolocation;
