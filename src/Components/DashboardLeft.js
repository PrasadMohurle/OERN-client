import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Dashboard_LR.css';

const DashboardLeft = ({ setAuth, onLinkClick }) => {
    const navigate = useNavigate();
    const [listData, setListData] = useState([]);
    const [activeButton, setActiveButton] = useState(null);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setAuth(false);
        navigate('/login');
    };

    const formatData = (data) => {
        return data.map((item) => {
            return item
                .split('_')
                .map(
                    (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                )
                .join(' ');
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const role = localStorage.getItem('role');
                // console.log(role);
                const response = await fetch(
                    `http://localhost:5000/dashboard/role/${role}`,
                    {
                        method: 'GET',
                        mode: 'cors',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                const parseRes = await response.json();
                const formattedData = formatData(parseRes);
                setListData(formattedData);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard-left">
            <img
                className="HPCL-logo"
                src="./images/HPCL_Logo.png"
                alt="HPCL Logo"
            />
            <div className="menu-list">
                {listData.map((item, index) => (
                    <div
                        key={index}
                        className={`dashboard-list ${ activeButton === item ? 'active' : '' }`}
                        onClick={() => { onLinkClick(item); setActiveButton(item); }}
                    >
                        {item}
                    </div>
                ))}
            </div>

            <button
                className="btn btn-danger btn-block logout-btn"
                onClick={(e) => {
                    logout(e);
                }}
            >
                LOGOUT
            </button>
        </div>
    );
};

export default DashboardLeft;
