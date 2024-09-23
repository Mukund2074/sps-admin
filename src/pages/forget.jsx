import { Link } from "react-router-dom";
import loginimg from '../vecteezy_underground-car-parking-area-generative-ai_22084877.jpg'
import  React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiCall from "../ApiCall";

export default function ForgotPass(){

    const navigate = useNavigate(); 
    const [loginData , setLoginData ] = useState ({
        email : ''
       
    })

    const handleChange = (e) => {
        const {name , value} = e.target;

        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e)  => {
        e.preventDefault();
        console.log(loginData)

        try{
            const responce = await ApiCall('POST' , 'admin/forget' , loginData);
            console.log(responce.status);

            if(responce.status === 200)
            {
                toast.success(' Mail Sent ', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  
                    });
                navigate("/");
            }
            else
            {
                toast.warning(' Failed!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  
                    });
            }
        }
        catch(err)
        {
            console.log(err);
            toast.error('failed to connect', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              
                });

            setLoginData({
                email:'',
                
            })
        }
    }

    return(
        <div className="container">

        
        <div className="row justify-content-center">

            <div className="col-xl-10 col-lg-12 col-md-9">

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                      
                        <div className="row">
                            <img className="col-lg-6 d-none d-lg-block" src={loginimg} alt="login" />
                            <div className="col-lg-6">
                                <div className="p-5" >
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    <form className="user" method="post" onSubmit={handleSubmit} >
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user"
                                                id="email" name="email" value={loginData.email} onChange={handleChange} aria-describedby="emailHelp"
                                                placeholder="Enter Email Address..." style={{border:"1px solid gray"}} required/>
                                        </div>
                                      
                                        <button className="btn btn-primary btn-user btn-block"  style={{backgroundColor:"#4b65b3",border:"1px solid gray"}}  >Login</button>
                                   
                                  
                                    </form>
                                    <hr/>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
    );
}