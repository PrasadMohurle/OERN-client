import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img
                        className="HPCL-logo"
                        src="./images/HPCL_Logo.png"
                        alt="HPCL Logo"
                    />
                </div>
                <div className="navbar-link-list">
                    <a className='navbar-link' href="/">Home</a>
                    <a className='navbar-link' href="/login">Login</a>
                    <img
                        className="User-img"
                        src="./images/person2.jpg"
                        alt="HPCL Logo"
                    />
                </div>
            </div>
        </>
    );
};

export default Navbar;
