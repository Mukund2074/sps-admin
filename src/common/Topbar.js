import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ApiCall from '../ApiCall';



export default function Topbar() {

    const navigate = useNavigate();



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    async function logout() {

        try {
            const responce = await ApiCall('POST', 'admin/adminlogout');
            if (responce.data) {
                toast.success("Logout Successfull");
                navigate('/');
            }
        }
        catch (error) {
            console.error("Error Fetching Data", error)
            toast.error(error.response.data.message);
            navigate('/');
        }
    }

    const [email, setEmail] = useState([]);
    const [fname, setFname] = useState([]);
    const [lname, setLname] = useState([]);


        const fetchSessionData = async () => {
            try {
                const responce = await ApiCall('GET', 'admin/adminsession');

                if (responce.data) {
                    setEmail(responce.data.sessionData.session.email);
                    setFname(responce.data.sessionData.session.fname);
                    setLname(responce.data.sessionData.session.lname);
                }
            }
            catch (error) {
                console.error("Error Fetching Data", error)
            }
        };
        fetchSessionData();

    function handleSidebar(e) {
        const sidebar = document.getElementById('accordionSidebar');
        sidebar.classList.toggle('toggled');
    }

    return (


        <>


            <Modal show={show} onHide={handleClose} className="custom-modal" aria-labelledby="contained-modal-title-vcenter"
                centered>
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



            <nav className="navbar navbar-expand navbar-light bg-z topbar mb-4 static-top" style={{  borderBottom:"1px solid white" }}>

                <button id="sidebarToggleTop" onClick={handleSidebar} className="btn btn-link d-md-none rounded-circle mr-3" >
                    <i className="fa fa-bars" />
                </button>
                <div className='Nnavbar' >
                    <div className='Nnavbar Nnavbar-brand'><h1>
                        <span>D</span>rive<span>S</span>ync<span>P</span>ark<span>X </span></h1>
                    </div>
                </div>
                <ul className="navbar-nav ml-auto" >
                    <div className="topbar-divider d-none d-sm-block"></div>
                    <li className="nav-item dropdown no-arrow" >
                        <Link className="nav-link dropdown-toggle" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{fname} {lname} </span>
                            <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt='NOTING TO DISPLAY' />
                        </Link>

                        <div className="dropdown-menu dropdown-menu-right shadow-lg animated--grow-in"
    aria-labelledby="userDropdown"
    style={{
        width: '280px',
        borderRadius: '1.5rem',
        backgroundColor: '#2c3e50',
        border: 'none',
        borderTop: '2px solid #3498db', // Add top border here
        animation: 'fade-in 0.3s ease'
    }}>
    <div style={{
        textAlign: "center",
        alignContent: 'center',
        position: 'relative',
        borderTopLeftRadius: '20px', // Adjusted border radius
        borderTopRightRadius: '20px', // Adjusted border radius
        overflow: 'hidden', // Hide overflow to ensure image div covers the entire width
        margin: '-7px auto'
    }}>
        <div style={{
            height: "180px",
            width: '100%', // Set width to 100% to cover entire width of parent div
            background: 'linear-gradient(135deg, #3498db, #9b59b6)',
            borderBottom: '2px solid #3498db', // Add bottom border here
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            borderTopLeftRadius: '20px', // Adjusted border radius
            borderTopRightRadius: '20px', // Adjusted border radius
        }}>
            <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt='NOTHING TO DISPLAY' style={{ height: '120px', width: '120px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.3)', borderRadius: '10%', border: '5px solid #fff', animation: 'pulse 1.5s infinite alternate' }} />
            <span style={{ color: '#ecf0f1', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '10px', textShadow: '2px 2px 4px #000', animation: 'fade-in 0.5s ease' }}>{fname}'s Profile</span>
        </div>
        <br />
        <h6 style={{ color: '#ecf0f1', margin: '0.5rem 0', animation: 'fade-in-up 0.5s ease' }}>
            <i className="fas fa-user-tie fa-sm fa-fw mr-2" style={{ color: '#f1c40f' }}></i>
            {fname} {lname}
        </h6>
        <h6 style={{ color: '#ecf0f1', margin: '0.5rem 0', animation: 'fade-in-up 0.5s ease' }}>
            <i className="fas fa-envelope fa-sm fa-fw mr-2" style={{ color: '#e74c3c' }}></i>
            {email}
        </h6>
        <div className="dropdown-divider" />
        <button className="btn btn-primary btn-block" onClick={handleShow} style={{ color: '#ecf0f1', borderRadius: '1.5rem', backgroundColor: '#3498db', border: 'none', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', animation: 'fade-in-up 0.5s ease' , width:'50%' , margin:'0.5 rem', marginBottom:'0.7rem' }} >
            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2"></i>
            Logout
        </button>
    </div>
</div>


                    </li>

                </ul>

            </nav>




        </>
    )
}
