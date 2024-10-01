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
  const [inputValues, setInputValues] = useState('');
  const [rfid, setRfid] = useState([]);

  useEffect(() => {
    fetchCardRequests();
    Getrfid();
  }, []);


  function Getrfid() {
    ApiCall('GET', 'admin/rfidstore')
      .then((response) => {
        const availableRfids = response.data.RFID.filter(card => card.alloted === false);
        setRfid(availableRfids);
        setIsLoaded(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          toast.error("No RFIDs found");
          setIsLoaded(true);
        } else {
          toast.error("Failed to fetch RFIDs");
          setIsLoaded(true);
        }
      });
  }


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

  const handleChange = (e, id, field) => {
    const { value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };



  const handleApprove = async (id) => {

    const { cardNumber, balance } = inputValues[id] || {};
    const payload = { requestId: id, cardNumber, balance };
    try {
      await ApiCall("POST", "admin/approveCardRequest", { ...payload }).then((response) => {
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
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await ApiCall('DELETE', `admin/deleterfidrequest/${_id}`);
      fetchCardRequests();
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
      toast.error(error.response.data.message);
    }
  };


  const formattedData = data.map((requestData) => ({
    id: requestData._id,
    name: requestData.name,
    email: requestData.email,
    phoneNo: requestData.phoneNo,
    address: requestData.address,
    status: requestData.status,
    action: (
      <>
        <button className="btn btn-primary m-1" onClick={() => handleApprove(requestData._id)}>Approve</button><br/>
        <button className="btn btn-danger m-1" onClick={() => handleDelete(requestData._id)}>Delete</button>
      </>
    ),
    cardInput: (
      <select
        className="p-2 mx-2 w-100"
        onChange={(e) => handleChange(e, requestData._id, 'cardNumber')}
      >
        <option value="">Select card number</option>
        {rfid.map((item) => (
          <option key={item._id} value={item.id}>{item.id}</option>
        ))}
      </select>
    ),
    balanceInput: (
      <input
        type="number"
        onChange={(e) => handleChange(e, requestData._id, 'balance')}
        className="bg-transparent mx-2 p-2 w-100"
        style={{ color : 'white'}}
        placeholder="Enter balance"
      />
    ),
  }));

  const columns = [
    { name: 'SR NO', selector: (row, index) => index + 1, sortable: true },
    { name: "Email", selector: row => row.email, sortable: true },
    { name: "CITY", selector: row => row.address, sortable: true },
    { name: "PHONE NO", selector: row => row.phoneNo, sortable: true },
    { name: "STATUS", selector: row => row.status, sortable: true },
    { name: "ADD CARD NO", cell: row => row.cardInput, sortable: true },
    { name: "BALANCE", cell: row => row.balanceInput, sortable: true },
    { name: "ACTION", selector: row => row.action, sortable: true },
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

                  {!isLoaded ? (
                    <div>Loading...</div>
                  ) : (
                    <>
                      <DataTable
                        highlightOnHover
                        striped
                        columns={columns}
                        data={formattedData.filter(row => row.name.includes(searchText) || row.email.includes(searchText))}
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
