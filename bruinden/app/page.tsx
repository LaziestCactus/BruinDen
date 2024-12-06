'use client';

import Image from "next/image";
import { Oswald } from "next/font/google";
import { Montserrat } from "next/font/google";
import React, { useState } from "react";
import HousingListings from "./components/housing/HousingListings";

const monserrat = Montserrat({ subsets: ['latin'] });

export default function Home() {
  const [opacity, setOpacity] = useState<number>(1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        paddingTop: "5px",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "400px",
          overflow: "hidden",
          background:
            "linear-gradient(to bottom, #4A7B9D, #86bbd8, rgba(134, 187, 216, 0.8), rgba(134, 187, 216, 0))",
          opacity: opacity,
          transition: "opacity 0.1s ease-out",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              color: "#FFFFFF",
            }}
          >
            Find Your Next Home
          </h1>
          <p
            style={{
              fontSize: "1.5rem",
              marginTop: "20px",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              color: "#FFFFFF",
            }}
          >
            Start Your Apartment Search With Confidence
          </p>
        </div>
      </div>
      <main
        style={{
          width: "100%",
          marginTop: "-160px",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <HousingListings />
        </div>
      </main>
    </div>
  );
}
