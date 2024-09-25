import React, {  useState } from "react";

import { Link } from "react-router-dom";
import ApiCall from "../ApiCall";

export default function Sidebar() {
  const [fname, setFname] = useState([]);
  const [lname, setLname] = useState([]);


    const fetchSessionData = async () => {
      try {
        const responce = await ApiCall("GET", "admin/admininfo");

        if (responce.data) {
          setFname(responce.data.user.fname);
          setLname(responce.data.user.lname);
        }
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    }; 
    fetchSessionData();

  return (
    <>
      <ul
        className="navbar-nav bg-transperent sidebar sidebar-dark accordion"
        style={{ borderRight: "1px solid white", backdropFilter: "blur(4px)" }}
        id="accordionSidebar"
      >
        <span className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon">
            <i className="fa-solid fa-user-tie text-gray-400"></i>
          </div>
          <div className="text-gray-500 mx-3 overflow-x-visible" style={{fontSize:'80%'}}>
            Welcome<br/>
            {fname}<br/>
            {lname}
            
          </div>
        </span>
        <hr style={{ border: "2px solid white" }} />

        <li className="nav-item bbttnn ">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <hr style={{ border: "2px solid white" }} />

        <div className="sidebar-heading">SENSOR DATA</div>

        <li className="nav-item bbttnn ">
          <Link className="nav-link" to="/irtable">
            <i className="fas fa-fw fa-cog"></i>
            <span>IR SENSOR</span>
          </Link>
        </li>

        <li className="nav-item bbttnn ">
          <Link className="nav-link" to="/rfidtable">
            <i className="fa solid fa-qrcode"></i>
            <span>RFID SENSOR</span>
          </Link>
        </li>
        <li className="nav-item bbttnn">
          <Link className="nav-link collapsed" to="/ultrasonictable">
            <i className="fa solid fa-gears"></i>
            <span>ULTRASONIC SENSOR</span>
          </Link>
        </li>

        <hr style={{ border: "2px solid white" }} />

        <div className="sidebar-heading">ADDITIONAL DATA</div>

        <li className="nav-item bbttnn">
          <Link className="nav-link" to="/manageparkingarea">
            <i className="fa-solid fa-list-check"></i>
            <span>MANAGE PARKING AREA</span>
          </Link>
        </li>

        <hr style={{ border: "2px solid white" }} />

        <div className="sidebar-heading">Need To Check</div>

        <li className="nav-item bbttnn">
          <Link className="nav-link" to="/admindata">
            <i className="fa-solid fa-person-circle-check"></i>
            <span>CHECK ADMIN DATA</span>
          </Link>
        </li>

        <li className="nav-item bbttnn">
          <Link className="nav-link" to="/userdata">
            <i className="fa-solid fa-person-circle-check"></i>
            <span>CHECK USER DATA</span>
          </Link>
        </li>

        <li className="nav-item bbttnn">
          <Link className="nav-link" to="/rfidcardrequest">
            <i className="fa-solid fa-person-circle-check"></i>
            <span>CHECK RFID CARD REQUEST</span>
          </Link>
        </li>

        <hr style={{ border: "2px solid white" }} />

        <div className="sidebar-heading">Responces To Check</div>

        <li className="nav-item bbttnn">
          <Link className="nav-link collapsed" to="/reviewrateing">
            <i className="fa-regular fa-star"></i>
            <span>Check Review & Rateings</span>
          </Link>
        </li>

        <li className="nav-item bbttnn">
          <Link className="nav-link collapsed" to="/complains">
            <i className="fa-regular fa-star"></i>
            <span>Check Complains</span>
          </Link>
        </li>

        <hr style={{ border: "2px solid white" }} />
      </ul>
    </>
  );
}
