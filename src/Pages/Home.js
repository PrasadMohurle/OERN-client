import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Home = () => {
    // const navigate = useNavigate();
    // const toLogin = () => {
    //     navigate('/login');
    // };

 
    return (
        <>
            <Navbar/>
            <div className="home-container">
                <h1>Welcome !</h1>
                <p>You are on Home Page.</p>

                {/* <button className="login-btn" onClick={toLogin}>
                    Login
                </button> */}
            </div>
        </>
    );
};

export default Home;
