import React from "react";
import Listing from '../individual_listing/page';

const About = () => {
  const mockListing = {
    id: "fakeid",
    title: "sageLA",
    description: "Welcome to sageLA, where contemporary living spaces merge seamlessly with the vibrant energy of the neighborhood for a one-of-a-kind lifestyle oasis. Thoughtfully designed modern residences with floor-to-ceiling windows provide a fresh blank canvas to make your own, while expansive community amenities, both indoors and lush outdoor landscapes, offer the perfect backdrop for connection and entertainment. Live in harmony & relaxation in our brand-new community, sageLA, where unmatched amenities and vibrant city living blend seamlessly together.",
    imageSrc: [
      "https://images1.apartments.com/i2/eP5RD20EnOCxdRmxHgo72XCtCRVzon-lozP1PJWTJA4/116/sagela---brand-new-los-angeles-ca-primary-photo.jpg?p=1",
      "https://images1.apartments.com/i2/OJ6CFzXe9mbpnyTFMPc3Ja_0YAqaAcDAwWUnPWvHGQU/116/sagela---brand-new-los-angeles-ca-building-photo.jpg?p=1",
      "https://images1.apartments.com/i2/UGZabvwj-ztShuFZTuFaT02EQkAuu6YDwtghV-uH5n8/116/sagela---brand-new-los-angeles-ca-building-photo.jpg?p=1",
      "https://images1.apartments.com/i2/b7Hnbb10BvJszI_qUW3kipnRyMYRP5QP0iOyiMMpsmI/116/sagela---brand-new-los-angeles-ca-building-photo.jpg?p=1",
      "https://images1.apartments.com/i2/vcByE6kOoOBgjNaD0he0z6y14aI3dM5YVIG1BnHG7FY/116/sagela---brand-new-los-angeles-ca-building-photo.jpg?p=1",
    ],
    category: "Studio",
    roomCount: 2,
    bathroomCount: 2,
    address: "200 N Vermont Ave, Los Angeles, CA 90004",
    price: 2150,
    createdDate: "2024-11-27",
    amenities: [
      "Fully Furnished",
      "Theater Room",
      "Pool",
      "Fitness Center",
      "Music Studio",
      "In-Unit Laundary",
      "Air Conditioning",
      "Heating",
    ],
    lat: 34.07537194028116,
    long: -118.29152191874691,
    user: {
      name: "Jayden Truong",
      email: "fakeemail@ucla.edu",
      phone: "(111) 111-1111",
      picture: "https://ui-avatars.com/api/?background=random",
    },
  }
  
  return (
    <div style={{ paddingTop: "100px" }}>
      <Listing />
    </div>
    );
};

export default About;