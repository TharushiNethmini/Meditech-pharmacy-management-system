import React, { useState, useEffect } from 'react'
import logo from "../images/logo.png";
import user from "../images/user.png";
import Sidebar from "./Sidebar";
import logout from "../images/logout.png";
import lady from "../images/lady.png"
import shadow from "../images/shadow.png"
import Calendar from 'react-calendar'
import "./calendar.css";

const baseUrl = process.env.REACT_APP_API_URL;

function Home() {

    // For get pending count
    const [pendingOrders, setPendingOrders] = useState([]);
    useEffect(async () => {
        const res = await fetch(baseUrl + "/orders/pendingCount");
        const data = await res.json();
        setPendingOrders(data.pendingCount[0].pendingCount);
    }, []);

    // For get returned count
    const [returnedOrders, setReturnedOrders] = useState([]);
    useEffect(async () => {
        const res = await fetch(baseUrl + "/orders/returnedCount");
        const data = await res.json();
        setReturnedOrders(data.returnedCount[0].returnedCount);
    }, []);

    return (
        <div className='MainContainer'>
            <div className='containermini'>
                <img src={logo} className='logo' />
                <img src={user} className='user' />
                <Sidebar />
                <img src={logout} className='logout' />
            </div>
            <div className="homebox1">
                <img src={lady} className='homeVector' />
                <img src={shadow} className='shadow' />
                <span className="font-link">
                    <h2 className='welcm-name'> Hello Tharushi !</h2>
                    <p1>May every step you make be filled with happiness.</p1>
                </span>
            </div>
            <div className="homebox2">
                <Calendar>

                </Calendar>
            </div>
            <div className="homebox3">
                <p2>Pending Orders</p2>
                <p5>{pendingOrders}</p5>
            </div>
            <div className="homebox4">
                <p3>Returned Orders</p3>
                <p4>{returnedOrders}</p4>
            </div>
        </div>
    )
}

export default Home