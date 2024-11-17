import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Search from "./Search";
import Home from "./Home";
import About from "./About";
import Meet_People from './Meet_People';

const Navigationbar = () => {
  return (
    <div className="fixed w-full z-10 shadow-xl" style={{ backgroundColor: '#33658A' }}>
      <div className="py-1 border-b-[1px]">
        {/* Contents are passed as children to Container */}
        <Container>
          <div className="flex items-center justify-between gap-4 text-white w-full" style = {{fontSize:"30px"}}>
            {/* Logo */}
            <Logo />
            <Home />
            <About />
            <Meet_People />

            {/* Right-aligned Search bar and User Menu */}
            <div className="flex items-center gap-4">
              <Search />
              <UserMenu />
            </div>
          </div>
        </Container>
      </div>
      
    </div>
  );
};

export default Navigationbar;
