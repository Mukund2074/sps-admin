import React, { useState, useEffect } from "react";
import Footer from "../common/Footer";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify"; 
import ApiCall from "../ApiCall";

function UserData() {
  const [userdata, setUserData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
   fetchUserData();
  }, []);

  const fetchUserData = () => {
    ApiCall("GET", "admin/userdata")
    .then((response) => {
      const data = response.data.userdataS;
    
      setUserData(data);
      setIsLoaded(true);
      
      if (response.data.status === 404) {
        console.log("nothing here")
      }
    })
    .catch((error) => {
      console.error("Error fetching user data: ", error);
    });
  }
  const filteredItems = userdata.filter((item) => {
    return (
        (item.name && item.name.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.phoneNo && item.phoneNo.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.role && item.role.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.password && item.password.toLowerCase().includes(searchText.toLowerCase()))
    );
});


  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  
  const UserDelete = async (_id) => {
    try {
      const response = await ApiCall('DELETE', 'admin/deleteuser', { _id });
      const { message } = response.data.DeleteData;
      console.log(message);
      fetchUserData();
      toast.error(' Deleted Successfully ', {
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
      console.log(error);
    }
  };


  const columns = [
    {
      name: 'SR NO',
      selector: (row, index) => index + 1,
      sortable: true
    },
    {
      name: "MOBILE NO",
      selector: row => row.phoneNo,
      sortable: true
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true
    },
    {
      name: "Password",
      selector: row => row.password,
      sortable: true
    },
    {
      name: "Delete",
      cell: (row) => (
        <>
          <button onClick={() => UserDelete(row._id)} className="btn bg-danger text-white" style={{ margin: '3px' }}>Delete</button>
        </>
      ),
      button: true
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
                    <h6 className="m-0 font-weight-bold text-light">USERS</h6>
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
                          style={{ width: '30%' ,color:'wheat' }} />

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
            </Container>

          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default UserData;
