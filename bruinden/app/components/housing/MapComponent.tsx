'use client';

import React from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

interface Location {
  lat: number;
  lng: number;
}

interface Listing {
  _id: string;
  location: Location;
  address: string;
}

interface MapComponentProps {
  listings: Listing[];
  onMarkerClick: (id: string) => void;
}


const MapComponent = ({ listings, onMarkerClick }: MapComponentProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    version: "weekly"
  });

  const defaultCenter = {
    lat: 34.0689,
    lng: -118.4452
  };

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    minHeight: '600px',
    borderRadius: '1rem'
  };

  if (loadError) {
    return <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-2xl border-2 border-[#2F4858]/20">
      Error loading maps
    </div>;
  }

  if (!isLoaded) {
    return <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-2xl border-2 border-[#2F4858]/20">
      Loading maps...
    </div>;
  }

  return (
    <div className="mt-8 w-full h-[600px] rounded-2xl overflow-hidden shadow-lg p-2 bg-gradient-to-r from-[#F6AE2D] to-[#F6AE2D]"> 
      <div className="w-full h-full rounded-xl overflow-hidden border border-[#F6AE2D]/40"> 
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={14}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {listings.map((listing) => (
            <MarkerF
              key={listing._id}
              position={listing.location}
              onClick={() => onMarkerClick(listing._id)}
              icon={{
                path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                fillColor: '#2F4858',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
                scale: 2,
                anchor: new google.maps.Point(12, 24),
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapComponent;