import React, { useState, useEffect } from "react";
import Footer from "../common/Footer";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Container } from "react-bootstrap";
import ApiCall from "../ApiCall";

export default function RfidTable() {
  const [rfiddata, setRfidData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    ApiCall('GET', 'admin/totaldevice').then((response) => {
      const data = response.data.Sensordata;
      setRfidData(data);

      setIsLoaded(true);
    });
  }, []);

  const filteredItems = rfiddata.filter((item) =>
    (item.cardNumber && item.cardNumber.toString().toLowerCase().includes(searchText.toLowerCase())) ||
    (item.userEmail && item.userEmail.toString().toLowerCase().includes(searchText.toLowerCase()))
  );


  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };


  const columns = [

    {
      name: 'SR NO',
      selector: (row, index) => index + 1,
      sortable: true
    },

    {
      name: "CARD NUMBER",
      selector: row => row.cardNumber,
      sortable: true
    },
    {
      name: "EMAIL",
      selector: row => row.userEmail,
      sortable: true
    },
    {
      name: "ENTRY TIME",
      selector: row => new Date(row.entryTime).toLocaleString(),
      sortable: true
    },
    {
      name: "EXIT TIME",
      cell: (row) => (
        <>
          {row.exitTime ? new Date(row.exitTime).toLocaleString() : "No exit time"}
        </>
      ),
      sortable: true
    }

  ];

  return (
    <>
      <div id="wrapper" style={{ backgroundImage: 'url("https://t3.ftcdn.net/jpg/05/69/26/10/360_F_569261029_71L0qkdQoIAhyiVt6z9yJoFP3CFhmlvX.jpg")', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column bg-transparent" >
          <div id="content">
            <Topbar />

            <Container>


              <div className="container-fluid">



                <div className="card shadow mb-4 bg-transparent border-1" style={{ border: "1px solid white", backdropFilter: 'blur(3px)' }}>

                  <div className="card-header py-3" style={{ border: "1px solid white", backdropFilter: 'blur(3px)' }}>
                    <h6 className="m-0 font-weight-bold text-light">RFID SENSOR DATA</h6>
                  </div>
                  <div className="card-body bg-transparent">

                    <div className="row">
                      <div className="col-lg-2 d-flex align-content-center justify-content-end text-light">
                        Search here
                      </div>
                      <div className="col-lg-10">
                        <input
                          type="text"
                          className="form-control bg-transparent"
                          placeholder="Search..."
                          value={searchText}
                          onChange={handleSearch}
                          style={{ width: '30%' }} />

                      </div>

                    </div>
                    <br />
                    {!isLoaded ? (
                      <div>Loading...</div>
                    ) : (
                      <>
                        <DataTable
                          highlightOnHover
                          striped
                          columns={columns}
                          data={filteredItems}
                          pagination
                          theme="dark"
                          customStyles={{
                            headRow: {
                              style: {
                                backgroundColor: 'transparent', // Set header row background color
                              },
                            },
                            rows: {
                              style: {
                                backgroundColor: 'transparent', // Set rows background color
                              },
                            },
                            headCells: {
                              style: {
                                color: 'white', // Set header cell text color
                              },
                            },
                            pagination: {
                              style: {
                                backgroundColor: 'transparent', // Set pagination background color
                              },
                            },
                          }}
                        />
                      </>
                    )}
                  </div>


                </div>
                <hr style={{ width: "100%" }} />
              </div>
              <Footer />
            </Container>
          </div>

        </div>


      </div>
    </>
  );
}