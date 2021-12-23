import React, { useState, useEffect } from 'react'
import logo from "../images/logo.png";
import user from "../images/user.png";
import Sidebar from "./Sidebar";
import logout from "../images/logout.png";
import back from "../images/back.png";
import Swal from 'sweetalert2'
import "./update.css";

const baseUrl = process.env.REACT_APP_API_URL;

function Update() {

    // Get url params
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let invoice_id = params.get('invoiceID');

    // For get porters
    const [porters, setPorters] = useState([]);
    useEffect(async () => {
        const res = await fetch(baseUrl + "/porters");
        const data = await res.json();
        setPorters(data.porters);
    }, []);

    const [selectedPorter, setSelectedPorters] = useState("");
    // Set selected porter option
    function porter_id_change(e) {
        setSelectedPorters(e.target.value);
    };

    const [selectedStatus, setSelectedStatus] = useState("");
    // Set selected status option
    function status_change(e) {
        setSelectedStatus(e.target.value);
    };

    // For get invoice details
    const [invoiceDetails, setInvoiceDetails] = useState([]);
    useEffect(async () => {
        const details = {
            invoice_id: invoice_id
        };

        const res = await fetch(baseUrl + "/assigns/invoiceDetails", {
            method: "POST",
            headers: {
                "content-type": "application/JSON"
            },
            body: JSON.stringify(details)
        });

        const data = await res.json();
        setInvoiceDetails(data.invoice_details[0]);
        setSelectedPorters(data.invoice_details[0].Porter_ID);
        setSelectedStatus(data.invoice_details[0].Status);
    }, []);

    // For update
    async function updateAssign(invoice_id) {

        const details = {
            invoice_id: invoice_id,
            porter_id: selectedPorter,
            status: selectedStatus
        };

        const res = await fetch(baseUrl + "/assigns/update", {
            method: "POST",
            headers: {
                "content-type": "application/JSON"
            },
            body: JSON.stringify(details)
        });

        const data = await res.json();

        Swal.fire({
            icon: data.status,
            title: data.status.toUpperCase() + '...',
            text: data.msg,
        })

    };

    return (
        <div className='MainContainer'>
            <div className='containermini'>
                <img src={logo} className='logo' />
                <img src={user} className='user' />
                <Sidebar />
                <img src={logout} className='logout' />
            </div>
            <div className="mainminicontainer">
                <p id="updatetitle"> Update</p>
                <a href="assign" ><img src={back} id="updateback" /></a>
                

                <div className="updatetablecontainer">
                    <table className="updatetable">
                        <tr>
                            <td> Invoice ID </td>
                            <td id="upd1">: {invoiceDetails.Invoice_ID}</td>
                        </tr>

                        <tr>
                            <td> NIC </td>
                            <td id="upd2">: {invoiceDetails.NIC}</td>
                        </tr>

                        <tr>
                            <td> Date </td>
                            <td id="upd3">: {invoiceDetails.Date}</td>
                        </tr>

                        <tr>
                            <td> Porter ID </td>
                            <td id="upd4">:
                                <select className="updrop" onChange={porter_id_change} value={selectedPorter}>
                    
                                    <option value="">Select Porter</option>
                                    {porters.map((porter, ind) => {
                                        return <option key={ind}>{porter.Porter_ID}</option>
                                    })}
                                </select>    
                            </td>
                        </tr>

                        <tr>
                            <td> Status </td>
                            <td id="upd5">:
                                <select className="statdrop" onChange={status_change} value={selectedStatus}>
                                    <option value="">Select Status</option>
                                    <option value="pending">pending</option>
                                    <option value="assigned">assigned</option>
                                    <option value="returned">returned</option>
                                    <option value="delivered">delivered</option>
                                </select>
                            </td>
                        </tr>

                    </table>

                    <button id="updatechanges"
                        onClick={() =>
                            updateAssign(invoiceDetails.Invoice_ID)}
                    > UPDATE CHANGES</button>
                </div>
            </div>
        </div>
    )
}

export default Update