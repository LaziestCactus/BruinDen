import Image from "next/image";
import { Oswald } from "next/font/google"
import { Montserrat } from "next/font/google"
import styles from './page.module.css'

const monserrat = Montserrat({subsets:['latin']})

export default function Home() {
  return (
   <div>
    Hello, BruinDen development is in progress! Updates loading...
   </div>
  );
}
