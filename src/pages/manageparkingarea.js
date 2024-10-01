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

export default function Manageparkingarea() {
  const [area, setArea] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchText, setSearchText] = useState('');

  function GetArea() {
    ApiCall('GET', 'admin/manageareaapi')
      .then((response) => {
        setArea(response.data.Managearea);
        setIsLoaded(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          toast.error("No areas found");
          setIsLoaded(true);
        } else {
          toast.error("Failed to fetch areas");
          setIsLoaded(true);
        }
      });
  };

  const filteredItems = area.filter(
    (item) =>
      item.Name.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
      item.Locality.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
      item.Zipcode.includes(searchText)

  )

  useEffect(() => {
    GetArea();
  }, []);

  const handleDeleteAreaSubmit = async (_id) => {
    try {
      await ApiCall(`DELETE`, `admin/deletearea/${_id}`);
      GetArea();
      toast.success(' Deleted Successfully ', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",

      });
    } catch (error) {
      toast.error('Failed to delete Area');
    }
  };

  const columns = [
    {
      name: 'SR NO',
      selector: (row, index) => index + 1,
      sortable: true
    },
    {
      name: 'AREA NAME',
      selector: row => row.Name,
      sortable: true
    },
    {
      name: 'AREA LOCALITY',
      selector: row => row.Locality,
      sortable: true
    },
    {
      name: 'AREA ZIPCODE',
      selector: row => row.Zipcode,
      sortable: true
    },
    {
      name: 'ONLINE SLOTS',
      selector: row => row.Online,
      sortable: true
    },
    {
      name: 'RFID SLOTS',
      selector: row => row.Rfid,
      sortable: true
    },
    {
      name: 'AVAILABLE ONLINE',
      selector: row => row.availableOnlineSlot,
      sortable: true
    },
    {
      name: 'AVAILABLE RFID',
      selector: row => row.availablerfidSlot,
      sortable: true
    },
    {
      name: 'EDIT',
      cell: (row) => (
        <>

          <Link to={`/updatearea/${row._id}`} state={{ value: row }} className="btn bg-success text-white"  >Edit</Link>

        </>
      ),
    },
    {
      name: "DELETE",
      cell: (row) => (
        <>
          <button onClick={() => handleDeleteAreaSubmit(row._id)} className="btn bg-danger text-white" style={{ margin: '3px' }}>Delete</button>
        </>
      ),
    }

  ];



  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

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
                    <h6 className="m-0 font-weight-bold text-light" style={{}}>MANAGE PARKING AREA</h6>
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
                        <Link to="/addslots" className="btn btn-success btn-user btn-block col-md-3">
                          <i className="fa-solid fa-plus">&nbsp;</i>
                          ADD PARKING AREA
                        </Link>

                        {/* Use filteredItems instead of area */}
                        <DataTable
                          className='mt-3'
                          columns={columns}
                          data={filteredItems} // Use filteredItems here
                          pagination
                          highlightOnHover
                          striped
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
              </div>
            </Container>

          </div>
          <Footer />
        </div>
      </div>
    </>
  );

}
