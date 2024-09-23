import { Link , useNavigate} from "react-router-dom";
import signupimg from '../vecteezy_underground-car-parking-area-generative-ai_22084873.jpg'
import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiCall from "../ApiCall";



export default function Signup() {

    const navigate =  useNavigate();

    const [registrationData , setRegistrationData] = useState({
        fname:'',
        lname:'',
        email:'',
        mobile:'',
        password:''
    });

    const handleChange = (e) => {
        const{name,value} = e.target;

        setRegistrationData((prevData) => ({
            ...prevData,
            [name]: value ,
        }));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(registrationData);

        try{
             // const data = new FormData();

            // for(const key in registrationData)
            // {
            //     data.append(key,registrationData[key]);
            // }
           
            const responce = await ApiCall('POST' , 'admin/adminsignup' , registrationData)
          

            if(responce.data.success)
            {
                console.log("Success");
               
            }
            else
            {
                toast.success(' Registerd Successfully ', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  
                    });
                navigate('/dashboard');
            
            }
        }
        catch(err){
            console.log(err);
            toast.error(' User Does Not Exist!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              
                });
        }
    }

    return (

        <>
 
            <div className="container">

                <div className="card o-hidden border-1 shadow-lg my-4">

                    <div className="row">
                        <img className="col-lg-5 d-none d-lg-block "src={signupimg} alt="signup" />
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                <form className="user" method="post" onSubmit={handleSubmit}>
                                    <div className="form-group row" >
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" className="form-control form-control-user" 
                                                name="fname" 
                                                placeholder="First Name" 
                                                value={registrationData.fname} 
                                                onChange={handleChange}  style={{border:"1px solid gray"}} />
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user"name='lname'
                                             value={registrationData.lname} onChange={handleChange}
                                                placeholder="Last Name"  style={{border:"1px solid gray"}} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-user" name='email' 
                                             value={registrationData.email} onChange={handleChange}
                                            placeholder="Email Address"  style={{border:"1px solid gray"}} />
                                    </div>
                                    <div className="form-group">
                                        <input type="celluler" className="form-control form-control-user" name='mobile' 
                                             value={registrationData.mobile} onChange={handleChange}
                                            placeholder="Mobile Number"  style={{border:"1px solid gray"}} />
                                    </div>
                                    <div className="form-group">
                                            <input type="password" className="form-control form-control-user" name='password' 
                                             value={registrationData.password} onChange={handleChange}
                                               placeholder="Password" style={{border:"1px solid gray"}} />
                                    </div>

                                 
                                    <input  className="btn btn-primary btn-user btn-block" type="submit" name="submit" value="Register" style={{backgroundColor:"#4b65b3"}}  />

                                </form>
                                <hr />
                              
                                
                                <hr />
                                
                                <div className="text-center">
                                   
                                    <Link to="/" >Already have an account? Login!</Link>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    

        </>
    );
}