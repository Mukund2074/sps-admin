import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Spinner from 'react-bootstrap/Spinner';
import ApiCall from "../ApiCall";
import { toast } from "react-toastify";

export default function BookingData() {
  const [booking, setBooking] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    ApiCall("GET", 'admin/booking')
      .then((response) => {
        const data = response.data.Sensordata;
        setBooking(data);
        setIsLoaded(true);
        setFilteredItems(data);
      })
      .catch((error) => {
        toast.error('Error fetching booking data:');
        setIsLoaded(true); // Mark as loaded even if there is an error
      });
  }, []);



  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);

    const filteredData = booking.filter(row =>
      (row.Locality && row.Locality.toLowerCase().includes(searchText)) ||
      (row.Name && row.Name.toLowerCase().includes(searchText)) ||
      (row.Zipcode && row.Zipcode.toLowerCase().includes(searchText)) ||
      (row.Reserved && row.Reserved.toLowerCase().includes(searchText)) ||
      (row.Genral && row.Genral.toLowerCase().includes(searchText)) ||
      (typeof row.availableOnlineSlot === 'string' && row.availableOnlineSlot.toLowerCase().includes(searchText)) ||
      (typeof row.availablerfidSlot === 'string' && row.availablerfidSlot.toLowerCase().includes(searchText))
    );

    setFilteredItems(filteredData);

    // If the search text is empty, reset the filtered items to the original dataset
    if (searchText.trim() === '') {
      setFilteredItems(booking);
    }
  };



  const columns1 = [
    {
      name: 'SR NO',
      selector: (row, index) => index + 1,
      sortable: true
    },
    {
      name: "AREA NAME",
      selector: row => row.areaName,
      sortable: true
    },
    {
      name: "USER EMAIL",
      selector: row => row.userEmail,
      sortable: true
    },
    {
      name: "USER CARD NUMBER",
      selector: row => row.cardNumber,
      sortable: true
    },
    {
      name: "ENTRY TIME",
      selector: row => new Date(row.entryTime).toLocaleString(),
      sortable: true
    },
    {
      name: "EXIT TIME",
      selector: row => row.exitTime ? new Date(row.exitTime).toLocaleString() : "Not Exited!",
      // selector: row => row.exitTime,
      sortable: true
    },
  ];

  return (
      <div className="card shadow mb-4 bg-transparent border-1" style={{ border: "1px solid white", backdropFilter: 'blur(3px)' }}>
        <div className="card-header py-3" style={{ border: "1px solid white", backdropFilter: 'blur(3px)' }}>
          <h6 className="m-0 font-weight-bold text-light">RFID BOOKING DATA</h6>
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

          <div className="text-center mb-3">
            {!isLoaded ? (
              <Spinner animation="border" variant="light" />
            ) : (
              <DataTable
                noHeader
                highlightOnHover
                striped
                columns={columns1}
                data={filteredItems}
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
            )}
          </div>
        </div>
        <hr style={{ width: "100%" }} />
      </div>

  );
}
