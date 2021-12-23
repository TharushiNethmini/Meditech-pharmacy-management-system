import React, { useState, useEffect } from 'react'
import logo from "../images/logo.png";
import user from "../images/user.png";
import Sidebar from "./Sidebar";
import logout from "../images/logout.png";
import back from "../images/back.png";
import "./generatereport.css";
import Swal from 'sweetalert2'

const baseUrl = process.env.REACT_APP_API_URL;

function GenerateReport() {

    const [date, setDate] = useState("");
    function date_selected(e) {
        setDate(e.target.value);
    };

    async function getReportDetails() {

        if (date != '') {

            var strSplitDate = String(date).split('-');
            var dateSelected = strSplitDate[1] + "/" + strSplitDate[2] + "/" + strSplitDate[0];
            window.open(baseUrl + "/report?date=" + dateSelected);

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'WARNING...',
                text: "Please select date!",
            })
        }

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
                <p id="generatereportitle"> Delivery Report</p>
                <a href="History" ><img src={back} id="back" /></a>

                <div className="from">
                    <p16>Date</p16>
                    <input type="date" id="datechange" onChange={date_selected} />
                </div>

                <div className="genreport">
                    <button id="genreport" onClick={() => getReportDetails()}> 
                        GENERATE REPORT 
                    </button>
                </div>

            </div>

        </div>
    )
}

export default GenerateReport