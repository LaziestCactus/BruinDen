import Image from "next/image";
import { Oswald } from "next/font/google"
import { Montserrat } from "next/font/google"
import styles from './page.module.css'
import FavoriteListings from "../components/housing/FavoriteListings";

const monserrat = Montserrat({subsets:['latin']})

export default function Home() {
  return (
   <main>
    <FavoriteListings />
   </main>
  );
}
