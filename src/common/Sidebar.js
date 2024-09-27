import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [adminData, setAdminData] = useState({});

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; 
  }

  useEffect(() => {
    const adminDataCookie = getCookie('adminData');

    if (adminDataCookie) {
      try {
        const parsedData = JSON.parse(adminDataCookie);
        setAdminData(parsedData); 
      } catch (error) {
        setAdminData(null);
      }
    } else {
      setAdminData(null);
    }
  }, []); 

  return (
    <>
      <ul
        className="navbar-nav bg-transparent sidebar sidebar-dark accordion"
        style={{ borderRight: "1px solid white", backdropFilter: "blur(4px)" }}
        id="accordionSidebar"
      >
        <span className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon">
            <i className="fa-solid fa-user-tie text-gray-400"></i>
          </div>
          <div className="text-gray-500 mx-3 overflow-x-visible" style={{ fontSize: '80%' }}>
            Welcome<br />
            {adminData?.fname}<br />
            {adminData?.lname}
          </div>
        </span>
        <hr style={{ border: "2px solid white" }} />

        <li className="nav-item bbttnn">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <hr style={{ border: "2px solid white" }} />

        <div className="sidebar-heading">SENSOR DATA</div>

        <li className="nav-item bbttnn">
          <Link className="nav-link" to="/irtable">
            <i className="fas fa-fw fa-cog"></i>
            <span>IR SENSOR</span>
          </Link>
        </li>

        <li className="nav-item bbttnn">
          <Link className="nav-link" to="/rfidtable">
            <i className="fas fa-solid fa-qrcode"></i>
            <span>RFID SENSOR</span>
          </Link>
        </li>
        <li className="nav-item bbttnn">
          <Link className="nav-link collapsed" to="/ultrasonictable">
            <i className="fas fa-solid fa-gears"></i>
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

        <div className="sidebar-heading">Responses To Check</div>

        <li className="nav-item bbttnn">
          <Link className="nav-link collapsed" to="/reviewrateing">
            <i className="fa-regular fa-star"></i>
            <span>Check Review & Ratings</span>
          </Link>
        </li>

        <li className="nav-item bbttnn">
          <Link className="nav-link collapsed" to="/complains">
            <i className="fa-regular fa-star"></i>
            <span>Check Complaints</span>
          </Link>
        </li>

        <hr style={{ border: "2px solid white" }} />
      </ul>
    </>
  );
}
