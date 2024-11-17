'use client';

import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface HousingListing {
  _id: string;
  title: string;
  address: string;
  price: number;
  imageUrl: string;
  distance: string;
  rating?: number;
}

const HousingListings = () => {
  const [listings, setListings] = useState<HousingListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings');
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        setListings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch listings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading listings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Available Housing Near UCLA</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <div key={listing._id} className="group bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={listing.imageUrl || '/api/placeholder/800/600'}
                alt={listing.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <button 
                className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                aria-label="Save to favorites"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
                {listing.rating && (
                  <span className="flex items-center text-sm">
                    ★ {listing.rating}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm line-clamp-1">{listing.address}</p>
              <p className="text-gray-600 text-sm">{listing.distance}</p>
            </div>
            
            <div className="px-4 pb-4 pt-1">
              <p className="font-semibold">${listing.price}/month</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HousingListings;