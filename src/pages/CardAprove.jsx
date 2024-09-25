import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {  useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Topbar from '../common/Topbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiCall from '../ApiCall';

export default function CardApprove() {

  const location = useLocation();
  console.log(location.state);
  const navigate = useNavigate();

   const [approve , setApprove] = useState({});

   const handleChange = (e) => {
    const{name,value} = e.target;

    setApprove((prevData) => ({
        ...prevData,
        [name]: value ,
    }));
}


const handleSubmit = async (e) => {
    e.preventDefault();
   

    try{
       
        const responce = await ApiCall("POST",'admin/approveCardRequest' , approve)
       

        if(responce.data.success)
        {
          console.log("Success");
          toast.success(' UPDATE Successfully ', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          
            });
          navigate("/cardrequest");
        }
        else
        {
          toast.error(' Something Went Wrong ', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          
            });
        console.log("not done yet")

        }
    }
    catch(err){
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
                  <h6 className="m-0 font-weight-bold text-light">APPROVE CARD REQUEST</h6>
                </div>
                <br/>
                    <form className="user" method='post' onSubmit={handleSubmit}>
                      <div className='form-group row'>
                        <div className='col-sm-6 mb-3 mb-sm-0'>
                          <input type="text" className="form-control form-control-user"  name="Name"
                          value={approve.Name}  onChange={handleChange}
                            placeholder="Name"/>
                        </div>
                        <div className="col-sm-6 ">
                          <input type="text" className="form-control form-control-user"  name="id"
                          value={approve.id} onChange={handleChange} placeholder="id"/>
                        </div>

                        
                      </div>
                      <div  className='form-group'>
                          <input type="number" className="form-control form-control-user" name="email"
                            placeholder="email" onChange={handleChange} 
                            value={approve.email} />
                        </div>
                        <div className='form-group row' >
                        <div className='col-sm-12 mb-3 mb-sm-0'>
                          <input type="text" className="form-control form-control-user" name="Address"
                            placeholder="Address" onChange={handleChange}
                            value={approve.Address}/>
                        </div>
                      </div>
                      <div className='form-group row' >
                        <div className='col-sm-6  mb-3 mb-sm-0'>
                          <input type="text" className="form-control form-control-user" name="Phone"
                            placeholder="Phone No" onChange={handleChange}
                            value={approve.Phone}/>
                        </div>
                        <div className="col-sm-6">
                          <input type="text" className="form-control form-control-user" name="CardNo"
                            placeholder="Card Number" onChange={handleChange}   value={approve.CardNo} />
                           
                        </div>
                        

                      </div>
                    
                      <div className='form-group row' >
                      <div className='col-sm-6  mb-3 mb-sm-0'>
                          <input type="number" className="form-control form-control-user" name="balance "
                            placeholder="1000" onChange={handleChange}
                            value={approve.balance}/>
                        </div>
                        <div className='col-sm-6 mb-3 mb-sm-0' >
                          <select className="form-control "  name="status"
                             onChange={handleChange}
                            value={approve.status} style={{height:'100%' ,borderRadius:"25px" , color:'gray' }}>Status
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                       
                      </div>
                 
                       
                      
                      <hr />
                      <input type="submit" value="Approve Card" className="btn btn-primary btn-user btn-block" />
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
