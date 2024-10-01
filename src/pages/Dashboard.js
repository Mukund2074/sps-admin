import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../common/Footer";
import { Container } from "react-bootstrap";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import Bookingdata from "./Bookingdata";

export default function Dashboard() {
  return (
    <>
      <div
        id="wrapper"
        style={{
          backgroundImage:
            'url("https://t3.ftcdn.net/jpg/05/69/26/10/360_F_569261029_71L0qkdQoIAhyiVt6z9yJoFP3CFhmlvX.jpg")',
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column bg-transparent">
          <div id="content">
            <Topbar />
            <div className="container-fluid">
              <Container style={{ marginTop: "2%" }}>
                <div className="custom-ccard bg-transparent">
                  <h3
                    className="text-light"
                    style={{ animation: "powerCut 1s infinite", fontSize: "1.5rem" }} // Fixed font size
                  >
                    Dashboard
                  </h3>
                </div>
                <hr style={{ color: 'white' }} />

                <div className="row">
                  {/* Card for IR Sensor Data */}
                  <div className="col-6 col-md-3 mb-4">
                    <Link to="/irtable" className="nav-link" style={{ textDecoration: "none", backdropFilter: "blur(3px)" }}>
                      <div className=" cardd rounded-lg shadow-lg bg-transparent border-bottom-info border-left-info" style={{ borderTop: "2px solid #54B4D3", borderRight: "2px solid #54B4D3" }}>
                        <div className="card-body text-center">
                          <p className="text-info mb-3 font-weight-bold" >IR Sensor Data</p> {/* Fixed font size */}
                          <p className="text-info mb-0" >Explore real-time insights</p> {/* Fixed font size */}
                        </div>

                          <i className="fas fa-cog fa-2x text-info"></i>
                      </div>
                    </Link>
                  </div>

                  {/* Card for RFID Sensor Data */}
                  <div className="col-6 col-md-3 mb-4">
                    <Link to="/rfidtable" className="nav-link" style={{ textDecoration: "none", backdropFilter: "blur(3px)" }}>
                      <div className=" cardd rounded-lg shadow-lg bg-transparent border-bottom-success border-left-success" style={{ borderTop: "2px solid #14A44D", borderRight: "2px solid #14A44D" }}>
                        <div className="card-body text-center">
                          <p className="text-success mb-3 font-weight-bold" >Rfid Sensor Data</p> {/* Fixed font size */}
                          <p className="text-success mb-0" >Contactless payments</p> {/* Fixed font size */}
                        </div>

                          <i className="fa-solid fa-qrcode fa-2x text-success"></i>
                      </div>
                    </Link>
                  </div>

                  {/* Card for Ultrasonic Data */}
                  <div className="col-6 col-md-3 mb-4">
                    <Link to="/ultrasonictable" className="nav-link" style={{ textDecoration: "none", backdropFilter: "blur(3px)" }}>
                      <div className=" cardd rounded-lg shadow-lg bg-transparent border-bottom-danger border-left-danger" style={{ borderTop: "2px solid #DC4C64", borderRight: "2px solid #DC4C64" }}>
                        <div className="card-body text-center">
                          <p className="text-danger mb-3 font-weight-bold" >Ultrasonic Data</p> {/* Fixed font size */}
                          <p className="text-danger mb-0" >Real-time distance</p> {/* Fixed font size */}
                        </div>
                          <i className="fa-solid fa-gears fa-2x text-danger"></i>
                      </div>
                    </Link>
                  </div>

                  {/* Card for Total Device Data */}
                  <div className="col-6 col-md-3 mb-4">
                    <Link to="/totaldevicedata" className="nav-link" style={{ textDecoration: "none", backdropFilter: "blur(3px)" }}>
                      <div className=" cardd rounded-lg shadow-lg bg-transparent border-bottom-warning border-left-warning" style={{ borderTop: "2px solid #E4A11B", borderRight: "2px solid #E4A11B" }}>
                        <div className="card-body text-center">
                          <p className="text-warning mb-3 font-weight-bold" >Total Device Data</p> {/* Fixed font size */}
                          <p className="text-warning mb-0" >All gathered info</p> {/* Fixed font size */}
                        </div>
                          <i className="fa-solid fa-radiation fa-2x text-warning"></i>
                      </div>
                    </Link>
                  </div>
                </div>
                <Bookingdata />
              </Container>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
