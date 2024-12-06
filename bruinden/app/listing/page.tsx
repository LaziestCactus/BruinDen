"use client"

import React, { useState, useEffect } from "react";
import { Montserrat } from "next/font/google"
import ImageCarousel from './components/ImageCarousel';
import ContactBox from './components/ContactBox';
import AmenitiesList from './components/AmenitiesList';
import { FaHeart } from 'react-icons/fa'
import MapComponent from './components/MapComponent';

const monserrat = Montserrat({subsets:['latin']})

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

const Listing: React.FC<ListingProps> = ({
  title,
  description,
  imageSrc,
  category,
  roomCount,
  bathroomCount,
  address,
  price,
  createdDate,
  amenities,
  lat,
  long,
  user,
}) => {

  
  const [opacity, setOpacity] = useState<number>(1);
  const [heartFilled, setHeartFilled] = useState(false);
  const placeholderText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  const coordinate = {lat: lat, lng: long};

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

  return (
    <>
      <div>
          <ImageCarousel images={imageSrc} />
      </div>
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
            <h2 style={{ fontSize: "20px", marginBottom: "20px", display: "flex", alignItems: "center", textAlign: "left", paddingLeft: "60px"}}>{address}</h2>
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
                ${price}
              </h2>
            </div>
            <div>
              <h2 style={{ fontSize: "20px", marginBottom: "10px", justifyItems: "center", textAlign: "center", alignItems: "center"}}>
                Room Type
              </h2>
              <h2 style={{ fontSize: "20px", marginBottom: "20px", justifyItems: "center", textAlign: "center", alignItems: "center", fontWeight: "bold"}}>
                {category}
              </h2>
            </div>
            <div>
              <h2 style={{ fontSize: "20px", marginBottom: "10px", justifyItems: "center", textAlign: "center", alignItems: "center"}}>
                Bedrooms
              </h2>
              <h2 style={{ fontSize: "20px", marginBottom: "20px", justifyItems: "center", textAlign: "center", alignItems: "center", fontWeight: "bold"}}>
                {roomCount} bd
              </h2>
            </div>
            <div>
              <h2 style={{ fontSize: "20px", marginBottom: "10px", justifyItems: "center", textAlign: "center", alignItems: "center"}}>
                Bathrooms
              </h2>
              <h2 style={{ fontSize: "20px", marginBottom: "20px", justifyItems: "center", textAlign: "center", alignItems: "center", fontWeight: "bold"}}>
                {bathroomCount} ba
              </h2>
            </div>
          </div>
          <hr className="ml-10 mr-8" style={{ border: "3px solid #FFBC00", marginBottom: "40px", marginTop: "30px"}} />
          <p style={{ paddingLeft: "60px", paddingRight: "60px" }}>{description}</p>
          <hr className="ml-10 mr-8" style={{ border: "3px solid #FFBC00", marginBottom: "40px", marginTop: "30px"}} />
          <div style={{ paddingLeft: "60px", paddingRight: "60px"}}>
            <h2 style ={{fontSize: "20px", marginBottom: "20px"}}>
              Amenities
            </h2>
            <AmenitiesList items={amenities}/>
          </div>
          <hr className="ml-10 mr-8" style={{ border: "3px solid #FFBC00", marginBottom: "40px", marginTop: "30px"}} />
          <div style={{ paddingLeft: "60px", paddingRight: "60px"}}>
            <h2 style ={{fontSize: "20px", marginBottom: "20px"}}>
              Location
            </h2>
              <MapComponent address={address} lat={lat} long={long} />
          </div>
          <hr className="ml-10 mr-8" style={{ border: "3px solid #FFBC00", marginBottom: "40px", marginTop: "30px"}} />
          <p style={{ paddingLeft: "60px", paddingRight: "60px" }}>{placeholderText}</p>
          <hr className="ml-10 mr-8" style={{ border: "3px solid #FFBC00", marginBottom: "40px", marginTop: "30px"}} />
          <p style={{ paddingLeft: "60px", paddingRight: "60px" }}>{placeholderText}</p>
          <hr className="ml-10 mr-8" style={{ border: "3px solid #FFBC00", marginBottom: "40px", marginTop: "30px"}} />
          <p style={{ paddingLeft: "60px", paddingRight: "60px" }}>{placeholderText}</p>
          <hr className="ml-10 mr-8" style={{ border: "3px solid #FFBC00", marginBottom: "40px", marginTop: "30px"}} />
        </div>
        <div className="w-1/3 pt-8 pr-16">
          <ContactBox name={user.name} email={user.email} phone={user.phone} picture={user.picture} />
        </div>
      </div>
    </>
  );
}

export default Listing;
