import React, { useState, useEffect } from 'react'
import logo from "../images/logo.png";
import user from "../images/user.png";
import Sidebar from "./Sidebar";
import logout from "../images/logout.png";
import "./porters.css";

const baseUrl = process.env.REACT_APP_API_URL;

function Porters() {

    // For get porters details
    const [porters, setPorters] = useState([]);

    // State for filter
    const [filterPorters, setFilterPorters] = useState([]);

    useEffect(async () => {
        const res = await fetch(baseUrl + "/porters/details");
        const data = await res.json();
        setPorters(data.porters);
        setFilterPorters(data.porters);

    }, []);

    // For search 
    //poters can be search by ID, first name , last name and the nic
    function searchValue(event) {
        const val = event.target.value;
        const filteredItems = porters.filter((value) => {
            return (value.Porter_ID.includes(val)
                || value.First_Name.includes(val)
                || value.Last_Name.includes(val)
                || value.NIC.includes(val))
        });
        setFilterPorters(filteredItems);
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
                <p id="porterstitle"> Porters </p>

                <div className="porterstopnav">
                    <input onChange={searchValue} type="text" placeholder="Search.." />
                </div>

                <div className="porterstablecontainer">
                    <table className="assigntable">

                        <thead>
                            <tr>
                                <th>Porter ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>NIC</th>
                                <th>Phone</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filterPorters.map((porters_item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{porters_item.Porter_ID}</td>
                                        <td>{porters_item.First_Name}</td>
                                        <td>{porters_item.Last_Name}</td>
                                        <td>{porters_item.NIC}</td>
                                        <td>{porters_item.Phone}</td>
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

export default Porters