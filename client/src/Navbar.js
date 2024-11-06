import React from 'react';
import './Navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div>
                <a href="/" className="logo">
                    BruinDen
                </a>
                <a href="/">
                    Recommendations
                </a>
                <a href="/">
                    Login
                </a>
            </div>
        </nav>
    );
};

export default Navbar;