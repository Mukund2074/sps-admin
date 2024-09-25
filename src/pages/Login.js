import { Link, useNavigate } from "react-router-dom";
import loginimg from '../vecteezy_underground-car-parking-area-generative-ai_22084877.jpg'
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiCall from "../ApiCall";

export default function Login({ setIsAuthanticated }) {

    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();


        try {

            console.log("payload: ", loginData);
            const response = await ApiCall("POST", "admin/adminlogin", loginData, { withCredentials: true });
            console.log("response after login: ", response);


            const data = response.data;
            if (data.success === true) {

                setIsAuthanticated(true);
                document.cookie = `ADMIN_SESSION=${data.sessionID}; path=/;`;
                navigate("/dashboard");
                toast.success("Login Successful", {
                    autoClose: 1500
                });

            }

        } catch (error) {
            console.log("Login Err: ", error);
            if (error.response && error.response.status === 401) {
                toast.error(error.response.data.message, {
                    autoClose: 1500,
                })
            } else {
                toast.error("An error occurred. Please try again.", {
                    autoClose: 1500,
                })
            }
        }
    }

    return (
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
                                                    placeholder="Enter Email Address..." style={{ border: "1px solid gray" }} required />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user"
                                                    id="password" name="password" value={loginData.password} onChange={handleChange} placeholder="Password" style={{ border: "1px solid gray" }} />
                                            </div>
                                            <div className="form-group">


                                            </div>
                                            <button className="btn btn-primary btn-user btn-block" style={{ backgroundColor: "#4b65b3", border: "1px solid gray" }}  >Login</button>


                                        </form>
                                        <hr />
                                        <div className="text-center">

                                            <Link to="/Signup" >Create an Account!</Link>  <Link to="/forget" >Forget password?!</Link>
                                        </div>
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