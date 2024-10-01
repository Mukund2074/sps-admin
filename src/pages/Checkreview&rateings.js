import React, { useEffect } from "react";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import ApiCall from "../ApiCall";
import { toast } from "react-toastify";

export default function Checkreviewrateings() {
  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    ApiCall("GET", "admin/getfeedback")
      .then((response) => {
        setData(response.data.feedbacks); // Update data with response.data.feedbacks
        setIsLoaded(true);

      })
      .catch((error) => {
        toast.error('Error fetching feedback:', error);
        setIsLoaded(true); // Set isLoaded to true even in case of error
      });
  }, []);


  const columns = [
    {
      name: 'SR NO',
      selector: (row, index) => index + 1,
      sortable: true
    },
    {
      name: " Name",
      selector: row => row.name,
      sortable: true
    },
    {
      name: "Subject",
      selector: row => row.subject,
      sortable: true
    },
    {
      name: "Message",
      selector: row => row.message,
      sortable: true
    },
    {
      name: "Time",
      selector: row => row.timestamp,
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
                    <h6 className="m-0 font-weight-bold text-light">FEEDBACK</h6>
                  </div>
                  <div className="card-body bg-transparent">
                   
                    <br />
                    {!isLoaded ? (
                      <div>Loading...</div>
                    ) : (
                      <>
                        <DataTable
                          highlightOnHover
                          striped
                          columns={columns}
                          data={data}
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
                </div></div>
            </Container>
          </div>
        </div>
      </div>

    </>
  );
}
