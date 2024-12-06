'use client';

import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Search from "./Search";
import Home from "./Home";
import About from "./About";
import Meet_People from './Meet_People';
import { Suspense } from "react";

const Navigationbar = () => {
  return (
    <div className="fixed w-full shadow-xl" style={{ backgroundColor: '#33658A' , zIndex: "1000"}}>
      <div className="py-1 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-4 text-white w-full" style = {{fontSize:"30px", fontWeight: "bold"}}>
            <Logo />
            <Home />
            <About />
            <Meet_People />
            <div className="flex items-center gap-4">
              <Search />
              <UserMenu />
            </div>
          </div>
        </Container>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
      </Suspense>
    </div>
  );
};


export default Navigationbar;
