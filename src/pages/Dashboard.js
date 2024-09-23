import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../common/Footer";
import { Container } from "react-bootstrap";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import Bookingdata from "./Bookingdata";
import axios from "axios";
import ApiCall from "../ApiCall";

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
                <div
                  className="custom-ccard bg-transparent"

                >

                  <h3
                    className="text-light"
                    style={{ animation: "powerCut 1s infinite" }}
                  >
                    Dashboard
                  </h3>
                </div>
                <hr style={{ color: 'white' }} />

                <div className="row">
                  <div className="col-xl-3 col-md-6 mb-4">
                    <Link
                      to="/irtable"
                      className="nav-link"
                      style={{
                        textDecoration: "none",
                        backdropFilter: "blur(3px)",
                      }}
                    >
                      <div
                        className=" card cardd rounded-lg shadow-lg h-100 bg-transparent border-bottom-info border-left-info"
                        style={{
                          borderTop: "2px solid #54B4D3",
                          borderRight: "2px solid #54B4D3",
                        }}
                      >
                        <div className="card-body text-center">
                          <h5 className="text-info mb-3 font-weight-bold">
                            IR Sensor Data
                          </h5>
                          <p className="text-info mb-0">
                            Explore real-time insights
                          </p>
                        </div>
                        <div className="card-footer bg-transparent border-0 text-center">
                          <i className="fas fa-cog fa-2x text-info"></i>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div
                    className="col-xl-3 col-md-6 mb-4"
                    style={{
                      textDecoration: "none",
                      backdropFilter: "blur(3px)",
                    }}
                  >
                    <Link to="/rfidtable" className="nav-link">
                      <div
                        className="card cardd rounded-lg shadow-lg h-100 bg-transparent border-bottom-success border-left-success"
                        style={{
                          borderTop: "2px solid #14A44D",
                          borderRight: "2px solid #14A44D",
                        }}
                      >
                        <div className="card-body text-center">
                          <h5 className="text-success mb-3 font-weight-bold">
                            Rfid Sensor Data
                          </h5>
                          <p className="text-success mb-0">
                            Contactless payments
                          </p>
                        </div>
                        <div className="card-footer bg-transparent border-0 text-center">
                          <i className="fa-solid fa-qrcode fa-2x text-success"></i>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div
                    className="col-xl-3 col-md-6 mb-4"
                    style={{
                      textDecoration: "none",
                      backdropFilter: "blur(3px)",
                    }}
                  >
                    <Link to="/ultrasonictable" className="nav-link">
                      <div
                        className="card cardd rounded-lg shadow-lg h-100 bg-transparent border-bottom-danger border-left-danger"
                        style={{
                          borderTop: "2px solid #DC4C64",
                          borderRight: "2px solid #DC4C64",
                        }}
                      >
                        <div className="card-body text-center">
                          <h5 className="text-danger mb-3 font-weight-bold">
                            Ultrasonic Data
                          </h5>
                          <p className="text-danger mb-0">
                            {" "}
                            real-time distence
                          </p>
                        </div>
                        <div className="card-footer bg-transparent border-0 text-center">
                          <i className="fa-solid fa-gears fa-2x text-danger"></i>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div
                    className="col-xl-3 col-md-6 mb-4"
                    style={{
                      textDecoration: "none",
                      backdropFilter: "blur(3px)",
                    }}
                  >
                    <Link to="/totaldevicedata" className="nav-link">
                      <div
                        className="card cardd rounded-lg shadow-lg h-100 bg-transparent border-bottom-warning border-left-warning"
                        style={{
                          borderTop: "2px solid #E4A11B",
                          borderRight: "2px solid #E4A11B",
                        }}
                      >
                        <div className="card-body text-center">
                          <h5 className="text-warning mb-3 font-weight-bold">
                            Total Device Data
                          </h5>
                          <p className="text-warning mb-0">All getherd info</p>
                        </div>
                        <div className="card-footer bg-transparent border-0 text-center">
                          <i className="fa-solid fa-radiation fa-2x text-warning"></i>
                        </div>
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
