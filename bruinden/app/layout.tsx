import './globals.css'
import {Montserrat} from "next/font/google";
import Navigationbar from './components/navigation_bar/Navigationbar';
import Home from './home_page';
import ListingPage from './individual_listing/page';

export const metadata = {
    title: 'BruinDen',
    description: 'The apartment finding website'

}

const font = Montserrat({
  subsets: ["latin"]
});

export default function RootLayout({children}:{children: React.ReactNode}){
    return (
      <html lang = "eng">
        <body className={font.className}>
          <Navigationbar/>
          <Home />
          {children}
          </body>
      </html>
    )
  }