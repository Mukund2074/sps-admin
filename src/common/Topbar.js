import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Topbar() {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [data, setData] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function logout() {
        try {
            localStorage.clear();
            document.cookie = "adminData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            toast.success("Logout Successful");
            navigate('/');
        } catch (error) {
            toast.error("Error Fetching Data", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Logout failed");
            }
            navigate('/');
        }
    }
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
            setData(parsedData); 
          } catch (error) {
            setData(null);
          }
        } else {
          setData(null);
        }
      }, []); 
      
    

    function handleSidebar() {
        const sidebar = document.getElementById('accordionSidebar');
        sidebar.classList.toggle('toggled');
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} className="custom-modal" centered>
                <Modal.Header closeButton className="custom-modal-header">
                    <Modal.Title className="custom-modal-title">Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body className="custom-modal-body">Are you sure you want to logout?</Modal.Body>
                <Modal.Footer className="custom-modal-footer">
                    <Button variant="secondary" onClick={handleClose} className="custom-button">
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={logout} className="custom-button">
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>

            <nav className="navbar navbar-expand navbar-light bg-z topbar mb-4 static-top" style={{ borderBottom: "1px solid white" }}>
                <button id="sidebarToggleTop" onClick={handleSidebar} className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars" />
                </button>
                    <p className='Nnavbar Nnavbar-brand'>
                        <span>D</span>rive<span>S</span>ync<span>P</span>ark<span>X</span>
                </p>
                <ul className="navbar-nav ml-auto">
                    <div className="topbar-divider d-none d-sm-block"></div>
                    <li className="nav-item dropdown no-arrow">
                        <Link className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{data?.fname} {data?.lname}</span>
                            <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt='NOTHING TO DISPLAY' />
                        </Link>

                        <div className="dropdown-menu dropdown-menu-right shadow-lg animated--grow-in" aria-labelledby="userDropdown" style={{ width: '280px', borderRadius: '1.5rem', backgroundColor: '#2c3e50', border: 'none', borderTop: '2px solid #3498db' }}>
                            <div style={{ textAlign: "center", position: 'relative', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', overflow: 'hidden', margin: '-7px auto' }}>
                                <div style={{ height: "180px", width: '100%', background: 'linear-gradient(135deg, #3498db, #9b59b6)', borderBottom: '2px solid #3498db', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
                                    <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt='NOTHING TO DISPLAY' style={{ height: '120px', width: '120px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.3)', borderRadius: '10%', border: '5px solid #fff', animation: 'pulse 1.5s infinite alternate' }} />
                                    <span style={{ color: '#ecf0f1', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '10px', textShadow: '2px 2px 4px #000', animation: 'fade-in 0.5s ease' }}>{data?.fname}'s Profile</span>
                                </div>
                                <br />
                                <h6 style={{ color: '#ecf0f1', margin: '0.5rem 0', animation: 'fade-in-up 0.5s ease' }}>
                                    <i className="fas fa-user-tie fa-sm fa-fw mr-2" style={{ color: '#f1c40f' }}></i>
                                    {data?.fname} {data?.lname}
                                </h6>
                                <h6 style={{ color: '#ecf0f1', margin: '0.5rem 0', animation: 'fade-in-up 0.5s ease' }}>
                                    <i className="fas fa-envelope fa-sm fa-fw mr-2" style={{ color: '#e74c3c' }}></i>
                                    {data?.email}
                                </h6>
                                <div className="dropdown-divider" />
                                <button className="btn btn-primary btn-block" onClick={handleShow} style={{ color: '#ecf0f1', borderRadius: '1.5rem', backgroundColor: '#3498db', border: 'none', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', width: '50%', margin: '0.5rem', marginBottom: '0.7rem' }} >
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2"></i>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>

        </>
    );
}
