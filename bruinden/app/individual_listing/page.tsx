"use client"

import React, { useState, useEffect } from "react";
import { FaHeart } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation';
import ImageCarousel from './components/ImageCarousel';
import ContactBox from './components/ContactBox';
import AmenitiesList from './components/AmenitiesList';
import MapComponent from '../components/housing/MapComponent';


/*
Current individual listing page needs the following information based on the props.
I believe other pages currently use different versions 
*/
interface ListingProps {
  id: string;
  title: string;
  description: string;
  imageSrc: string[];
  createdDate: string;
  category: string;
  roomCount: number;
  bathroomCount: number;
  address: string;
  amenities: string[];
  price: number;
  lat: number;
  long: number;
  user: {
    name: string,
    email: string,
    phone: string,
    picture: string,
  };
}



const ListingPage: React.FC = () => {
  const [opacity, setOpacity] = useState<number>(1);
  const [heartFilled, setHeartFilled] = useState(false);
  const [listing, setListing] = useState<ListingProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams()

  const id = searchParams.get('id');

  const handleHeartClick = () => {
    setHeartFilled(!heartFilled);
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const fadeRate = 0.003;
      const newOpacity = Math.max(0, 1 - scrollPosition * fadeRate);
      setOpacity(newOpacity);
    };
    
    window.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return; // ID is not available yet

      try {
        const response = await fetch(`/api/individual_listing?listingId=${id}`, {
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
        setListing(data);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch listing");
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading listing...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }
  
  if (!listing) {
    return <div className="flex items-center justify-center h-screen">Listing not found...</div>;
  }

  return (
    <>
      <div>
          <ImageCarousel images={listing.imageSrc} />
      </div>
      <div className="flex gap-6">
        <div className="flex-1">
          <div>
            <div className="flex items-center justify-between">
              <h1 style={{ fontSize: "50px", marginTop: "20px", marginBottom: "20px", display: "flex", alignItems: "center", fontWeight: "bold", textAlign: "left", paddingLeft: "60px"
                }}>
                {listing.title}
              </h1>
              <button
                className="ml-4 text-red-500 text-2xl focus:outline-none pr-10"
                onClick={handleHeartClick}
              >
                { heartFilled ? (
                  <FaHeart className="text-red-500"/>
                ) : (
                  <FaHeart className="text-gray-500"/>
                )}
              </button>
            </div>
            <h2 style={{ fontSize: "20px", marginBottom: "20px", display: "flex", alignItems: "center", textAlign: "left", paddingLeft: "60px"}}>{listing.address}</h2>
          </div>
          <hr className="ml-10 mr-8" style={{ border: "3px solid #FFBC00", marginBottom: "40px", marginTop: "40px"}} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px", 
              textAlign: "center",
              marginLeft: "16px",
              marginRight: "16px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "20px", marginBottom: "10px", justifyItems: "center", textAlign: "center", alignItems: "center"}}>
                Monthly Rent
              </h2>
              <h2 style={{ fontSize: "20px", marginBottom: "20px", justifyItems: "center", textAlign: "center", alignItems: "center", fontWeight: "bold"}}>
                ${listing.price} / month
              </h2>
            </div>
            <div>
              <h2 style={{ fontSize: "20px", marginBottom: "10px", justifyItems: "center", textAlign: "center", alignItems: "center"}}>
                Room Type
              </h2>
              <h2 style={{ fontSize: "20px", marginBottom: "20px", justifyItems: "center", textAlign: "center", alignItems: "center", fontWeight: "bold"}}>
                {listing.category}
              </h2>
            </div>
            <div>
              <h2 style={{ fontSize: "20px", marginBottom: "10px", justifyItems: "center", textAlign: "center", alignItems: "center"}}>
                Bedrooms
              </h2>
              <h2 style={{ fontSize: "20px", marginBottom: "20px", justifyItems: "center", textAlign: "center", alignItems: "center", fontWeight: "bold"}}>
                {listing.roomCount} bd
              </h2>
            </div>
            <div>
              <h2 style={{ fontSize: "20px", marginBottom: "10px", justifyItems: "center", textAlign: "center", alignItems: "center"}}>
                Bathrooms
              </h2>
              <h2 style={{ fontSize: "20px", marginBottom: "20px", justifyItems: "center", textAlign: "center", alignItems: "center", fontWeight: "bold"}}>
                {listing.bathroomCount} ba
              </h2>
            </div>
          </div>
          <hr className="ml-10 mr-8" style={{ border: "3px solid #FFBC00", marginBottom: "40px", marginTop: "30px"}} />
          <p style={{ paddingLeft: "60px", paddingRight: "60px" }}>{listing.description}</p>
          <hr className="ml-10 mr-8" style={{ border: "3px solid #FFBC00", marginBottom: "40px", marginTop: "30px"}} />
          <div style={{ paddingLeft: "60px", paddingRight: "60px"}}>
            <h2 style ={{fontSize: "20px", marginBottom: "20px"}}>
              Amenities
            </h2>
            <AmenitiesList items={listing.amenities}/>
          </div>
          <hr className="ml-10 mr-8" style={{ border: "3px solid #FFBC00", marginBottom: "40px", marginTop: "30px"}} />
          <div style={{ paddingLeft: "60px", paddingRight: "60px"}}>
            <h2 style ={{fontSize: "20px", marginBottom: "20px"}}>
              Location
            </h2>
              <MapComponent address={listing.address} lat={listing.lat} long={listing.long} />
          </div>
        </div>
        <div className="w-1/3 pt-8 pr-16">
          <ContactBox name={listing.user.name} email={listing.user.email} phone={listing.user.phone} picture={listing.user.picture} />
        </div>
      </div>
    </>
  );
}

export default ListingPage;
