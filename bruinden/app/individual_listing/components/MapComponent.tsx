import React from 'react';
import {AdvancedMarker, APIProvider, Map, MapCameraChangedEvent, Pin} from '@vis.gl/react-google-maps';

interface MapProps {
    address: string;
    lat:  number;
    long: number;
}

type POI = {key: string, location: google.maps.LatLngLiteral}
type pinType = {background: string, glyphColor: string, borderColor: string}

// Potentially add as a feature to determine closeness to buildings based on major
const campusLocations: POI[] = [
    {key: "BoelterHall", location: {lat: 34.06945230609133, lng: -118.44305684727077}},
    {key: "YoungHall", location: {lat: 34.06883013708254, lng: -118.44153335271912}},
    {key: "BuncheHall", location: {lat: 34.075002453103345, lng: -118.4398594922634}},
    {key: "JohnWoodenCenter", location: {lat: 34.07136886732302, lng: -118.44566073007785}},
    {key: "AckermanUnion", location: {lat: 34.07047731115277, lng: -118.444201511962}},
    {key: "RoyceHall", location: {lat: 34.073138203770185, lng: -118.44226269966735}},
];

const poiPin: pinType = {background: "#2774AE", glyphColor: "#FFD100", borderColor: "#2774AE"};
const apartmentPin: pinType = {background: "#ff0a0a", glyphColor: "#9c2222", borderColor: "ff0a0a"};

const POIMarkers = (props: {pois: POI[], pinStyle: pinType}) => {
    return (
        <>
            {props.pois.map((poi: POI) => (
                <AdvancedMarker
                    key={poi.key}
                    position={poi.location}
                >
                    <Pin background={props.pinStyle.background} glyphColor={props.pinStyle.glyphColor} borderColor={props.pinStyle.borderColor}/>
                </AdvancedMarker>
            ))}
        </>
    );
};

const MapComponent: React.FC<MapProps> = ({address, lat, long}) => {
    return (
    <APIProvider apiKey={"INSERT_KEY_HERE"} onLoad={() => console.log("Maps API has loaded...")}>
        <Map
            style={{width: '60vw', height: '70vh'}}
            defaultZoom={15}
            defaultCenter={{lat: lat, lng: long}}
            mapId='INSERT_MAP_ID_HERE'
            onCameraChanged={ (ev: MapCameraChangedEvent) =>
                console.log("Camera changed:", ev.detail.center, 'zoom:', ev.detail.zoom)
            }
        >
            <POIMarkers pois={campusLocations} pinStyle={poiPin}/>
            <POIMarkers pois={[{key: address, location: {lat: lat, lng: long}}]} pinStyle={apartmentPin} />
        </Map>
    </APIProvider>);
}

export default MapComponent;