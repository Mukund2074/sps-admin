import React from 'react'
import { useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Topbar from '../common/Topbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiCall from '../ApiCall';

export default function UpdateArea() {

  const location = useLocation();
  console.log(location.state);
  const navigate = useNavigate();

   const [update , setUpdate] = useState({
    _id : location.state.value._id,
    Name : location.state.value.Name,
     Locality : location.state.value.Locality,
     Zipcode : location.state.value.Zipcode,
     Reserved : location.state.value.Reserved,
     Genral : location.state.value.Genral
     
   });

   const handleChange = (e) => {
    const{name,value} = e.target;

    setUpdate((prevData) => ({
        ...prevData,
        [name]: value ,
    }));
}


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      const response = await ApiCall('PUT', 'admin/updatearea', update); // Pass the update state here

      if (response.data.success) {
          console.log("Success");
          toast.success('UPDATE Successfully', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
          });
          navigate("/manageparkingarea");
      } else {
          toast.error('Something Went Wrong', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
          });
          console.log("not done yet");
      }
  } catch (err) {
      console.log(err);
  }
}



  return (
    <>
      <div id='wrapper' style={{backgroundImage: 'url("https://t3.ftcdn.net/jpg/05/69/26/10/360_F_569261029_71L0qkdQoIAhyiVt6z9yJoFP3CFhmlvX.jpg")', backgroundSize:'cover',backgroundAttachment:'fixed'}}>
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column bg-transparent">
          <div id="content">
            <Topbar />
            <div className='container-fluid'>
              <div className="card border-1 shadow-lg bg-transparent" style={{border:"1px solid white", marginLeft: "10%", marginRight: '10%', marginTop: "5%" }}>
                <div className="col-sm">
                  <div className="p-3">
                  <div className="card-header py-3" style={{ border: "1px solid white" , backdropFilter:'blur(3px)' }}>
                  <h6 className="m-0 font-weight-bold text-light">UPDATE PARKING AREA</h6>
                </div>
                <br/>
                    <form className="user" method='post' onSubmit={handleSubmit}>
                      <div className='form-group row'>
                        <div className='col-sm-6 mb-3 mb-sm-0'>
                          <input type="text" className="form-control form-control-user" id="Locality" name="Locality"
                          value={update.Locality}  onChange={handleChange}
                            placeholder="Area Locality"/>
                        </div>
                        <div class="col-sm-6 ">
                          <input type="text" className="form-control form-control-user" id="Name"  name="Name"
                          value={update.Name} onChange={handleChange} placeholder="Area Name"/>
                        </div>

                        
                      </div>
                      <div  className='form-group'>
                          <input type="number" className="form-control form-control-user" id="Zipcode"name="Zipcode"
                            placeholder="Zipcode" onChange={handleChange} 
                            value={update.Zipcode} />
                        </div>
                      <div className='form-group row' >
                        <div className='col-sm-6  mb-3 mb-sm-0'>
                          <input type="text" className="form-control form-control-user" id="Reserved_slot" name="Reserved"
                            placeholder="Add Reserved Slot" onChange={handleChange}
                            value={update.Reserved}/>
                        </div>
                        <div class="col-sm-6">
                          <input type="text" className="form-control form-control-user" id="Genral_slot" name="Genral"
                            placeholder="Add Genral Slot" onChange={handleChange}   value={update.Genral} />
                           
                        </div>

                      </div>
                      <hr />
                      <input type="submit" value="Save Changes" className="btn btn-primary btn-user btn-block" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
