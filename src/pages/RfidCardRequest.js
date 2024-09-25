import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import ApiCall from "../ApiCall";

function RfidCardRequest() {

  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [datas, setDatas] = useState({
    cardNumber: null,
    balance: null
  });

  const fetchCardRequests = () => {
    ApiCall('GET', 'admin/getPendingCardRequest')
    .then((response) => {
      setData(response.data.cardRequests);
     
      setIsLoaded(true);
    });
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleApprove = async (id, status) => {
    try {
      await ApiCall("POST", "admin/approveCardRequest", { requestId: id, status: status, cardNumber: datas.cardNumber, balance: datas.balance }).then((response) => {
        if (response.data.success) {
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
          fetchCardRequests(); // Call the fetchCardRequests function to fetch updated data
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const response = await ApiCall('DELETE', 'admin/deleterfidrequest', { _id });
      const { message } = response.data.DeleteData;
      console.log(message);
      fetchCardRequests();
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

  useEffect(() => {
    fetchCardRequests();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatas((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formattedData = data.map((requestData) => ({
    id: requestData._id,
    name: requestData.name,
    email: requestData.email,
    phoneNo: requestData.phoneNo,
    address: requestData.address,
    vehicleNo: requestData.vehicleNo,
    aadhaarNo: requestData.aadhaarNo,
    status: requestData.status,
    timestamp: new Date(requestData.timestamp).toLocaleString(),
    action: (
      <>
        <button className="btn btn-primary" onClick={() => handleApprove(requestData._id)} style={{ margin: '2px' }}>Approve</button> <br/>
        <button className="btn btn-danger" onClick={() => handleDelete(requestData._id)} style={{ margin: '2px' }}>Delete</button>
      </>
    ),
    input: (
      <input
        type="text"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        placeholder="Enter card number"
        style={{ marginBottom: '5px' }}
      />
    ),
  }));

  const columns = [
    {
      name: 'SR NO',
      selector: (row, index) => index + 1,
      sortable: true
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true
    },
    {
      name: "AADHAAR NO",
      selector: row => row.aadhaarNo,
      sortable: true
    },
    {
      name: "CITY",
      selector: row => row.address,
      sortable: true
    },
    {
      name: "VEHICLE NO",
      selector: row => row.vehicleNo,
      sortable: true
    },
    {
      name: "PHONE NO",
      selector: row => row.phoneNo,
      sortable: true
    },
    {
      name: "STATUS",
      selector: row => row.status,
      sortable: true
    },
    {
      name: "ADD CARD NO",
      selector: row => <input type="text" onChange={handleChange} name="cardNumber" className="bg-transparent" style={{ color: "white" }} />,
      sortable: true
    },
    {
      name: "BALANCE",
      selector: row => <input type="number" onChange={handleChange} name="balance" className="bg-transparent" style={{ color: "white" }} />,
      sortable: true
    },
    {
      name: "ACTION",
      selector: row => row.action,
      sortable: true
    }
  ];

  return (
    <>
      <div id="wrapper" style={{ backgroundImage: 'url("https://t3.ftcdn.net/jpg/05/69/26/10/360_F_569261029_71L0qkdQoIAhyiVt6z9yJoFP3CFhmlvX.jpg")', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column bg-transparent">
          <div id="content">
            <Topbar />
            <div className="container-fluid">
              <div className="card shadow mb-4 bg-transparent border-1" style={{ border: "1px solid white", backdropFilter: 'blur(1px)' }}>
                <div className="card-header py-3" style={{ border: "1px solid white", backdropFilter: 'blur(1px)' }}>
                  <h6 className="m-0 font-weight-bold text-light">RFID CARD REQUESTS</h6>
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
                  {!isLoaded ? (
                    <div>Loading...</div>
                  ) : (
                    <>
                      <DataTable
                        highlightOnHover
                        striped
                        columns={columns}
                        data={formattedData}
                        pagination
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
            <hr style={{ width: "100%" }} />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default RfidCardRequest;
