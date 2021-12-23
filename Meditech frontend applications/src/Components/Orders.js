import React, { useState, useEffect } from 'react'
import logo from "../images/logo.png";
import user from "../images/user.png";
import Sidebar from "./Sidebar";
import logout from "../images/logout.png";
import next from "../images/next.png";
import "./Orders.css";

const baseUrl = process.env.REACT_APP_API_URL;

function Orders() {

    // For get history count
    const [historyCount, setHistoryCount] = useState([]);
    useEffect(async () => {
        const res = await fetch(baseUrl + "/orders/historyCount");
        const data = await res.json();
        setHistoryCount(data.historyCount[0].historyCount);
    }, []);

    // For get pending count
    const [pendingCount, setPendingCount] = useState([]);
    useEffect(async () => {
        const res = await fetch(baseUrl + "/orders/pendingCount");
        const data = await res.json();
        setPendingCount(data.pendingCount[0].pendingCount);
    }, []);

    // For get assigned count
    const [assignedCount, setAssignedCount] = useState([]);
    useEffect(async () => {
        const res = await fetch(baseUrl + "/orders/assignedCount");
        const data = await res.json();
        setAssignedCount(data.assignedCount[0].assignedCount);
    }, []);

    // For get delivered count
    const [deliveredCount, setDeliveredCount] = useState([]);
    useEffect(async () => {
        const res = await fetch(baseUrl + "/orders/deliveredCount");
        const data = await res.json();
        setDeliveredCount(data.deliveredCount[0].deliveredCount);
    }, []);

    // For get returned count
    const [returnedCount, setReturnedCount] = useState([]);
    useEffect(async () => {
        const res = await fetch(baseUrl + "/orders/returnedCount");
        const data = await res.json();
        setReturnedCount(data.returnedCount[0].returnedCount);
    }, []);

    return (
        <div className='MainContainer'>
            <div className='containermini'>
                <img src={logo} className='logo' />
                <img src={user} className='user' />
                <Sidebar />
                <img src={logout} className='logout' />
            </div>
            <div className="mainminicontainer">
                <p id="ordertitle">Orders</p>

                <div className="history">
                    <p6>History</p6>
                    <p7>{historyCount}</p7>
                    <a href="History"> <img src={next} id="next" /></a>
                </div>

                <div className="pending">
                    <p8>Pending</p8>
                    <p9>{pendingCount}</p9>
                </div>

                <div className="assigned">
                    <p10>Assigned</p10>
                    <p11>{assignedCount}</p11>
                </div>

                <div className="delivered">
                    <p12>Delivered</p12>
                    <p13>{deliveredCount}</p13>
                </div>

                <div className="returned">
                    <p14>Returned</p14>
                    <p15>{returnedCount}</p15>
                </div>
            </div>
        </div>
    )
}

export default Orders
