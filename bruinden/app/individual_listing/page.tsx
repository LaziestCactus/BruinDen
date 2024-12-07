"use client"

import React, { useState, useEffect } from "react";
import { FaHeart } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation';
import ImageCarousel from './components/ImageCarousel';
import ContactBox from './components/ContactBox';
import AmenitiesList from './components/AmenitiesList';
import MapComponent from './components/MapComponent';


const ListingPage: React.FC = () => {
  const [opacity, setOpacity] = useState<number>(1);
  const [heartFilled, setHeartFilled] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [squareFeet, setSquareFeet] = useState<number>(0);
  const [amenities, setAmenities] = useState<string[]>(["No listings provided"]);
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
      if (!id) return; 

      try {
        const response = await fetch(`/api/individual_listing?listingId=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Response received:', response); 
  
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        console.log('Data received:', data);
        setAddress(data[0].address);
        setAmenities(data[0].amenities);
        setBathrooms(data[0].bathrooms);
        setBedrooms(data[0].bedrooms);
        setDescription(data[0].description);
        setPrice(data[0].price);
        setSquareFeet(data[0].squareFeet);
        setTitle(data[0].title);
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

  console.log("amenities", amenities);

  return (
    <>
      <div className="flex gap-6">
        <div className="flex-1">
          <div>
            <div className="flex items-center justify-between">
              <h1 style={{ fontSize: "50px", marginTop: "20px", marginBottom: "20px", display: "flex", alignItems: "center", fontWeight: "bold", textAlign: "left", paddingLeft: "60px"
                }}>
                {title}
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
            <h2 style={{ fontSize: "50px", marginBottom: "20px", display: "flex", alignItems: "center", textAlign: "left", paddingLeft: "60px"}}>{address}</h2>
          </div>
          <hr className="ml-10 mr-8" style={{ border: "3px solid #FFBC00", marginBottom: "40px", marginTop: "40px"}} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
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
                ${price} / month
              </h2>
            </div>
            <div>
              <h2 style={{ fontSize: "20px", marginBottom: "10px", justifyItems: "center", textAlign: "center", alignItems: "center"}}>
                Bedrooms
              </h2>
              <h2 style={{ fontSize: "20px", marginBottom: "20px", justifyItems: "center", textAlign: "center", alignItems: "center", fontWeight: "bold"}}>
                {bedrooms} bd
              </h2>
            </div>
            <div>
              <h2 style={{ fontSize: "20px", marginBottom: "10px", justifyItems: "center", textAlign: "center", alignItems: "center"}}>
                Bathrooms
              </h2>
              <h2 style={{ fontSize: "20px", marginBottom: "20px", justifyItems: "center", textAlign: "center", alignItems: "center", fontWeight: "bold"}}>
                {bathrooms} ba
              </h2>
            </div>
          </div>
          <hr className="ml-10 mr-8" style={{ border: "3px solid #FFBC00", marginBottom: "40px", marginTop: "30px"}} />
          <p style={{ paddingLeft: "60px", paddingRight: "60px" }}>{description}</p>
          <hr className="ml-10 mr-8" style={{ border: "3px solid #FFBC00", marginBottom: "40px", marginTop: "30px"}} />
          </div>
      </div>
    </>
  );
}

export default ListingPage;
