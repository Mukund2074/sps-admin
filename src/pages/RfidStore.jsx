import React, { useState, useEffect } from 'react';
import Sidebar from '../common/Sidebar';
import Topbar from '../common/Topbar';
import Footer from '../common/Footer';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';
import { Container } from 'react-bootstrap';
import ApiCall from '../ApiCall';


const CardDetails = ({ details, onClose }) => {
    return (
        <div className="card-details-overlay" onClick={onClose}>
            <div className="card-details-container" onClick={(e) => e.stopPropagation()}>
                <h2 className="card-title">Card User Details</h2>
                <p><strong>RFID ID:</strong> {details.id}</p>
                <p><strong>Name :</strong> {details.name}</p>
                <p><strong>Validity:</strong> {details.validity}</p>
                <p><strong>Balance:</strong> ${details.balance}</p>
                <p><strong>Email:</strong> {details.email}</p>
                <p><strong>Phone No:</strong> {details.phoneNo}</p>
                <p><strong>Assigned At:</strong> {new Date(details.assignedAt).toLocaleString()}</p>
                <button className="cbtn cbtn-light" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default function RfidStore() {
    const [rfid, setRfid] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);

    function Getrfid() {
        ApiCall('GET', 'admin/rfidstore')
            .then((response) => {
                setRfid(response.data.RFID);
                setIsLoaded(true);
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    toast.error("No rfids found");
                    setIsLoaded(true);
                } else {
                    toast.error("Failed to fetch rfids");
                    setIsLoaded(true);
                }
            });
    };

    useEffect(() => {
        Getrfid();
    }, []);

    const filteredItems = rfid.filter(
        (item) =>
            item.id.toLowerCase().includes(searchText.toLowerCase())
    );

    const showDetails = async (_id) => {
        try {
            const response = await ApiCall('GET', `admin/getcardDetails/${_id}`);
            setSelectedCard(response.data.cardDetails);
        } catch (error) {
            toast.error("Failed to fetch card details");
        }
    };

    const columns = [
        { name: "SR NO", selector: (row, index) => index + 1, sortable: true },
        { name: "RFID CARD ID", selector: (row) => row.id, sortable: true },
        { name: "RFID CARD NAME", selector: (row) => row.name, sortable: true },
        { name: "RFID CARD VALIDITY", selector: (row) => row.validity, sortable: true },
        {
            name: "RFID CARD ALLOTED",
            cell: (row) =>
                row.alloted ? (
                    <button
                        className="btn btn-success mr-auto w-75"
                        onClick={() => showDetails(row._id)}
                    >
                        Show Details
                    </button>
                ) : (
                    <button className="btn relative mr-auto w-75 btn-danger">
                        Not Alloted
                    </button>
                ),
            sortable: true,
        },
    ];

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const closePopup = () => {
        setSelectedCard(null);
    };

    return (
        <>
            <div id="wrapper" style={{ backgroundImage: 'url("https://t3.ftcdn.net/jpg/05/69/26/10/360_F_569261029_71L0qkdQoIAhyiVt6z9yJoFP3CFhmlvX.jpg")', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column bg-transparent">
                    <div id="content">
                        <Topbar />
                        <Container>
                            <div className="container-fluid">
                                <div className="card shadow mb-4 bg-transparent border-1" style={{ border: "1px solid white", backdropFilter: 'blur(3px)' }}>
                                    <div className="card-header py-3" style={{ border: "1px solid white", backdropFilter: 'blur(3px)' }}>
                                        <h6 className="m-0 font-weight-bold text-light">RFID STORE</h6>
                                    </div>
                                    <div className="card-body bg-transparent">
                                        <div className="row align-items-center mb-3">
                                            <div className="col-12 col-md-2 text-light text-md-end">
                                                Search here
                                            </div>
                                            <div className="col-12 col-md-10">
                                                <input
                                                    type="text"
                                                    className="form-control bg-transparent"
                                                    placeholder="Search..."
                                                    value={searchText}
                                                    onChange={handleSearch}
                                                    style={{ color: 'white' }}
                                                />
                                            </div>
                                        </div>
                                        <br />
                                        {!isLoaded ? (
                                            <div>Loading...</div>
                                        ) : (
                                            <>
                                                <Link to="/rfidcardrequest" className="btn btn-success btn-user btn-block col-md-3">
                                                    <i className="fa-solid fa-plus">&nbsp;</i>
                                                    ALLOT RFID
                                                </Link>

                                                <DataTable
                                                    className='mt-3'
                                                    columns={columns}
                                                    data={filteredItems}
                                                    pagination
                                                    highlightOnHover
                                                    striped
                                                    theme="dark"
                                                    customStyles={{
                                                        headRow: {
                                                            style: {
                                                                backgroundColor: 'transparent',
                                                            },
                                                        },
                                                        rows: {
                                                            style: {
                                                                backgroundColor: 'transparent',
                                                            },
                                                        },
                                                        headCells: {
                                                            style: {
                                                                color: 'white',
                                                            },
                                                        },
                                                        pagination: {
                                                            style: {
                                                                backgroundColor: 'transparent',
                                                            },
                                                        },
                                                    }}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>

                    <Footer />
                </div>
            </div>

            {/* Popup for showing card details */}
            {selectedCard && (
                <CardDetails details={selectedCard} onClose={closePopup} />
            )}
          
        </>
    );
}
