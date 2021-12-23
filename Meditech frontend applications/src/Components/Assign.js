import React, { useState, useEffect } from 'react'
import logo from "../images/logo.png";
import user from "../images/user.png";
import Sidebar from "./Sidebar";
import logout from "../images/logout.png";
import Swal from 'sweetalert2'
import "./assign.css";

const baseUrl = process.env.REACT_APP_API_URL;

function Assign() {

    // For get assign details
    const [assigns, setAssigns] = useState([]);

    // State for filter
    const [filterAssigns, setFilterAssigns] = useState([]);

    useEffect(async () => {
        const res = await fetch(baseUrl + "/assigns");
        const data = await res.json();
        setAssigns(data.assigns);
        setFilterAssigns(data.assigns);
    }, []);

    // For delete
    async function deleteAssign(invoice_id) {

        Swal.fire({
            title: 'Do you want delete?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Cancel`,
        }).then(async (result) => {
            if (result.isConfirmed) {

                const details = {
                    invoice_id: invoice_id
                };

                const res = await fetch(baseUrl + "/assigns/delete", {
                    method: "POST",
                    headers: {
                        "content-type": "application/JSON"
                    },
                    body: JSON.stringify(details)
                });
                const data = await res.json();

                // Show success and error msg
                if (data.status == 'success') {
                    Swal.fire({
                        icon: data.status,
                        title: data.status.toUpperCase() + '...',
                        text: data.msg,
                    })
                    // Reload page
                    window.location.reload();
                }
                else {
                    Swal.fire({
                        icon: data.status,
                        title: data.status.toUpperCase() + '...',
                        text: data.msg,
                    })
                }

            }
        })

    };

    // For insert to history
    async function insertToHistory(invoice_id, nic, date, porter_id, status) {

        const details = {
            invoice_id: invoice_id,
            nic: nic,
            date: date,
            porter_id: porter_id,
            status: status
        };

        const res = await fetch(baseUrl + "/assigns/insert", {
            method: "POST",
            headers: {
                "content-type": "application/JSON"
            },
            body: JSON.stringify(details)
        });

        const data = await res.json();

        // Show success and error msg
        if (data.status == 'success') {
            Swal.fire({
                icon: data.status,
                title: data.status.toUpperCase() + '...',
                text: data.msg,
            })
            // Reload page
            window.location.reload();
        }
        else {
            Swal.fire({
                icon: data.status,
                title: data.status.toUpperCase() + '...',
                text: data.msg,
            })
        }

    };

    // For search
    function searchValue(event) {
        const val = event.target.value;
        const filteredItems = assigns.filter((value) => {
            return (value.Invoice_ID.includes(val)
                || value.NIC.includes(val)
                || value.Porter_ID.includes(val)
                || value.Status.includes(val))
        });
        setFilterAssigns(filteredItems);
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
                <p id="assigntitle"> Assign </p>

                <div className="topnav">
                    <input onChange={searchValue} type="text" placeholder="Search.." />
                </div>

                <div className="tablecontainer">
                    <table className="assigntable">

                        <thead>
                            <tr>
                                <th>Invoice ID</th>
                                <th>NIC</th>
                                <th>Date</th>
                                <th>Porter ID</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filterAssigns.map((assign, index) => {
                                return (

                                    <tr key={index}>
                                        <td>{assign.Invoice_ID}</td>
                                        <td>{assign.NIC}</td>
                                        <td>{assign.Date}</td>
                                        <td>
                                            <td>{assign.Porter_ID}</td>
                                        </td>
                                        <td>
                                            <td>{assign.Status}</td>
                                        </td>
                                        <td>
                                            <button id="proceed"
                                                onClick={() => insertToHistory(assign.Invoice_ID, assign.NIC, assign.Date, assign.Porter_ID, assign.Status)}>
                                                PROCEED</button>
                                            <button onClick={event => window.location.href = 'update?invoiceID=' + assign.Invoice_ID} id="update">
                                                UPDATE</button>
                                            <button id="delete" onClick={() => deleteAssign(assign.Invoice_ID)}>DELETE</button>
                                        </td>
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

export default Assign