import React, { useState, useEffect } from 'react'
import logo from "../images/logo.png";
import user from "../images/user.png";
import Sidebar from "./Sidebar";
import logout from "../images/logout.png";
import back from "../images/back.png";
import search from "../images/search.png";
import "./History.css";

const baseUrl = process.env.REACT_APP_API_URL;

function History() {

    // For get history details
    const [history, setHistory] = useState([]);

    // State for filter
    const [filterHistory, setFilterHistory] = useState([]);

    useEffect(async () => {
        const res = await fetch(baseUrl + "/history");
        const data = await res.json();
        setHistory(data.history);
        setFilterHistory(data.history);

    }, []);

    // For search
    function searchValue(event) {
        const val = event.target.value;
        const filteredItems = history.filter((value) => {
            return (value.Invoice_ID.includes(val)
                || value.NIC.includes(val)
                || value.Porter_ID.includes(val))
        });
        setFilterHistory(filteredItems);
    }

    return (
        <div className='MainContainer'>
            <div className='containermini'>
                <img src={logo} className='logo' />
                <img src={user} className='user' />
                <Sidebar />
                <img src={logout} className='logout' />
            </div>
            <div className="mainminicontainer">
                <p id="historytitle"> History </p>
                <a href="Orders" ><img src={back} id="back" /></a>


                <div className="historytopnav">
                    <button onClick={event => window.location.href = 'generatereport'} id="reportbtn"> REPORT </button>
                    <input onChange={searchValue} type="text" placeholder="Search.." />
                </div>

                <div className="historytablecontainer">
                    <table className="assigntable">

                        <thead>
                            <tr>
                                <th>Invoice ID</th>
                                <th>NIC</th>
                                <th>Date</th>
                                <th>Porter ID</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filterHistory.map((history_item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{history_item.Invoice_ID}</td>
                                        <td>{history_item.NIC}</td>
                                        <td>{history_item.Date}</td>
                                        <td>{history_item.Porter_ID}</td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default History