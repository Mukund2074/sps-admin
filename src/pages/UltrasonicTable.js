import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import DataTable from "react-data-table-component";
import { Container } from "react-bootstrap";
import ApiCall from "../ApiCall";
import { toast } from "react-toastify";


export default function UltrasonicTable() {
  const [ultrasonicData, setUltrasonicData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await ApiCall('GET', 'admin/totaldevice');
      const data = response.data.Sensordata;
      setUltrasonicData(data);
      setIsLoaded(true);
      setFilteredItems(data); // Set filteredItems to the original dataset initially
    } catch (error) {
      toast.error('Failed to fetch ultrasonic data.');
    }
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);
    const filteredData = ultrasonicData.filter((item) => {
      const inches = item.inches ? item.inches.toLowerCase() : '';
      const entryTime = item.entryTime ? item.entryTime.toLowerCase() : '';
      return inches.includes(searchText) || entryTime.includes(searchText);
    });
    setFilteredItems(filteredData);
  };

  const columns = [
    {
      name: 'SR NO',
      selector: (row, index) => index + 1,
      sortable: true
    },
    {
      name: "Distance",
      selector: row => row.inches,
      sortable: true
    },
    {
      name: "Timestamp",
      selector: row => new Date(row.entryTime).toLocaleString(),
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
                    <h6 className="m-0 font-weight-bold text-light">ULTRASONIC DATA</h6>
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
                    )}
                  </div>
                </div>
              </div>
              <hr style={{ width: "100%" }} />

            </Container>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
