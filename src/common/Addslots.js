import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiCall from '../ApiCall';

export default function Addslots() {
  const navigate = useNavigate();

  const [Area, setArea] = useState({
    Locality: '',
    Name: '',
    Zipcode: '',
    Online: '',
    Rfid: '',
 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setArea((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const responce = await ApiCall('POST', 'admin/Addslot', Area)

      if (responce.data.success) {
        toast.success("Area Added Successfully");

      }
      else {


        toast.success(' Area Added Successfully ', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",

        });
        navigate("/manageparkingarea");
      }
    }
    catch (err) {
      toast.error(err);
    }
  }


  return (
    <>
      <div id="wrapper" style={{ backgroundImage: 'url("https://t3.ftcdn.net/jpg/05/69/26/10/360_F_569261029_71L0qkdQoIAhyiVt6z9yJoFP3CFhmlvX.jpg")', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column bg-transparent" >
          <div id="content">
            <Topbar />

            <div className="container-fluid">
              <div className="card shadow mb-4 bg-transparent border-1" style={{ border: "1px solid white", backdropFilter: 'blur(3px)' }}>
                <div className="card-header py-3" style={{ border: "1px solid white", backdropFilter: 'blur(3px)' }}>
                  <h6 className="m-0 font-weight-bold text-light">ADD AREA </h6>
                </div>
                <div className="card-body bg-transparent">


                  <form className="user" method='post'  onSubmit={handleSubmit}>
                    <div className='form-group row'>
                      <div className='col-sm-6 mb-3 mb-sm-0'>
                        <input type="text" className="form-control form-control-user" id="Locality" name="Locality"
                          placeholder="Area Locality" value={Area.Locality} onChange={handleChange} required />
                      </div>
                      <div className="col-sm-6 ">
                        <input type="text" className="form-control form-control-user" id="Name" name="Name"
                          placeholder="Area Name" value={Area.Name} onChange={handleChange} required />
                      </div>


                    </div>
                    <div className='form-group'>
                      <input type="number" className="form-control form-control-user" id="Zipcode" name="Zipcode"
                        placeholder="Zipcode" value={Area.Zipcode} onChange={handleChange} required />
                    </div>
                    <div className='form-group row' >
                      <div className='col-sm-6  mb-3 mb-sm-0'>
                        <input type="text" className="form-control form-control-user"  name="Online"
                          placeholder="Add Online Slot" value={Area.Online} onChange={handleChange} required />
                      </div>
                      <div className="col-sm-6">
                        <input type="text" className="form-control form-control-user" name="Rfid"
                          placeholder="Add Rfid Slot" value={Area.Rfid} onChange={handleChange} required />
                      </div>

                    </div>
                    <hr />
                    <input type="submit" value="Save Changes" className="btn btn-primary bg-transparent btn-user btn-block" />
                  </form>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
      )
}
