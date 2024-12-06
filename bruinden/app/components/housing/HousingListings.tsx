'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import MapComponent from './MapComponent';
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { FaHeart } from 'react-icons/fa'
import Link from 'next/link';

interface Location {
  lat: number;
  lng: number;
}

interface Listing {
  _id: string;
  title: string;
  address: string;
  price: number;
  imageUrl: string;
  location: Location;
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  distanceToUCLA?: number;
}

interface User {
  id: string;
  email: string;
  token?: string;
}

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const SORT_OPTIONS = [
  { value: 'distance', label: 'Closest to UCLA' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'beds-asc', label: 'Bedrooms: Least to Most' },
  { value: 'beds-desc', label: 'Bedrooms: Most to Least' }
];

const HousingListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('distance');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [favoritedListings, setFavoritedListings] = useState<String[]>([]);

  const fetchFavorites = async () => {
    try {
      // setIsLoading(true);
      console.log('Fetching listings...'); // Add this log
      const userID = fetchUserFromToken()?.id;
      console.log(userID);
      if (!userID) {
        console.log("Need userID to get favorites");
        return;
      }
      console.log(userID);
      const response = await fetch(`/api/favorite_listings?userId=${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response received:', response); // Add this log

      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }
      const data: Listing[] = await response.json();
      console.log('Data received:', data); // Add this log
      
      const listingIds = data.map((listing) => listing._id);
      console.log("Favorited Listing IDs: ", listingIds);
      
      setFavoritedListings(listingIds);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch listings');
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching listings...'); // Add this log
        const response = await fetch('/api/listings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Response received:', response); // Add this log

        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        console.log('Data received:', data); // Add this log
        
        // Add distance calculation
        const listingsWithDistance = data.map((listing: Listing) => ({
          ...listing,
          distanceToUCLA: calculateDistance(
            34.0689,
            -118.4452,
            listing.location.lat,
            listing.location.lng
          )
        }));
        
        setListings(listingsWithDistance);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch listings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
    fetchFavorites();
  }, []);

  const fetchUserFromToken = () => {
    const token = Cookies.get("auth_token");
    console.log("token: ", token);
    if (token) {
      try {
        const decodedToken = jwt.decode(token) as User;
        console.log("decoded token: ", decodedToken);
        setCurrentUser(decodedToken);
        return decodedToken;
      } catch (error) {
        console.log("Failed to decode token", error);
      }
    }
  };

  

  const handleLike = async (listingId: string) => {
    // setIsLoading(true); // Set loading to true when the button is pressed
    console.log(listingId);
    const userId = fetchUserFromToken()?.id;
        console.log(userId);
        if (!userId) {
          console.log("Login before liking posts");
          return;
        }
    try {
      const response = await fetch("/api/auth/addLike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          listingId
        }),
      });
      const result = await response.json(); // Assuming the response is in JSON format
      console.log(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data');
    } finally {
      // setIsLoading(false); // Set loading to false when the request completes
    }
    fetchFavorites();
  };

  const sortedListings = useMemo(() => {
    return [...listings].sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return (a.distanceToUCLA ?? 0) - (b.distanceToUCLA ?? 0);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'beds-asc':
          return a.bedrooms - b.bedrooms;
        case 'beds-desc':
          return b.bedrooms - a.bedrooms;
        default:
          return 0;
      }
    });
  }, [listings, sortBy]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading listings...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <main className="pt-24" style = {{zIndex: "1"}}>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-5rem)]">
        {/* Map Section */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-full lg:sticky lg:top-20">
          <MapComponent 
            listings={sortedListings}
            onMarkerClick={(id) => {
              setSelectedListing(id);
              const element = document.getElementById(`listing-${id}`);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
          />
        </div>

        {/* Listings Section */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-full overflow-y-auto px-4 lg:px-8 pb-8">
          <div className="sticky top-0 py-8 z-10">
          <div className="bg-[#F6AE2D] px-4 py-2 rounded-lg">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#FFFFFF]">PLACES FOR YOU</h2>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#F6AE2D]"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
          </div>

          <div className="h-[525px] border-4 border-[#F6AE2D] rounded-xl bg-white/50 p-2 overflow-y-auto">

          <div className="space-y-4 pb-8">
            {sortedListings.map((listing) => (
              <div
                id={`listing-${listing._id}`}
                key={listing._id}
                className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 ${
                  selectedListing === listing._id ? 'ring-2 ring-[#2F4858]' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-1/3 h-48 sm:h-auto">
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full sm:w-2/3 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                        <Link href={{ pathname: '/individual_listing', query: { id: listing._id } }}>
                          {listing.address}
                        </Link>
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {listing.squareFeet} sq ft | {listing.bedrooms} beds | {listing.bathrooms} baths
                        </p>
                        <p className="text-gray-600 text-sm">
                          {listing.distanceToUCLA?.toFixed(2)} miles from UCLA
                        </p>
                      </div>
                      <button 
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Save to favorites"
                        onClick={() => handleLike(listing._id)}
                      >
                        {favoritedListings.includes(listing._id) ? (
                          <FaHeart className="text-red-500"/>
                        ) : (
                          <FaHeart className="text-gray-500"/>
                        )}
                      </button>
                    </div>
                    <p className="font-semibold mt-2">${listing.price.toLocaleString()}/month</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HousingListings;