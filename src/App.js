import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UnderDevelopment from './common/Underdev';
import UltrasonicTable from './pages/UltrasonicTable';
import IRTable from './pages/IRTable';
import RfidTable from './pages/RfidTable';
import Manageparkingarea from './pages/manageparkingarea';
import Bookingdata from './pages/Bookingdata';
import Checkreviewrateings from './pages/Checkreview&rateings';
import Addslots from './common/Addslots';
import Admin from './pages/AdminData';
import UpdateArea from './pages/UpdateArea';
import TotaldeviceData from './pages/TotalDevicesData';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RfidCardRequest from './pages/RfidCardRequest';
import UserData from './pages/UserData';
import GetComplaint from './pages/GetComplaint';
import { useEffect, useState } from 'react';
import checkSesiondata from './auth/authServices';
import CardApprove from './pages/CardAprove';
import ForgotPass from './pages/forget';
import axios from 'axios';

function App() {
    const [isAuthanticated, setIsAuthanticated] = useState(false);
    const [loding, setLoding] = useState(false);

    axios.defaults.withCredentials = true;

    // useEffect(() => {
    //     checkSesiondata().then((data) => {
    //         setIsAuthanticated(data);
    //         setLoding(false);
    //     });
    // }, []);

    if (loding) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login setIsAuthanticated={setIsAuthanticated} />} />
                    <Route path="/forget" element={<ForgotPass />} />
                    <Route path="/Dashboard" element={isAuthanticated ? <Dashboard /> : <Navigate to="/" />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path='/irtable' element={isAuthanticated ? <IRTable /> : <Navigate to="/" />} />
                    <Route path='/ultrasonictable' element={isAuthanticated ? <UltrasonicTable /> : <Navigate to="/" />} />
                    <Route path='/rfidtable' element={isAuthanticated ? <RfidTable /> : <Navigate to="/" />} />
                    <Route path='/manageparkingarea' element={isAuthanticated ? <Manageparkingarea /> : <Navigate to="/" />} />
                    <Route path='/bookingdata' element={isAuthanticated ? <Bookingdata /> : <Navigate to="/" />} />
                    <Route path='/reviewrateing' element={isAuthanticated ? <Checkreviewrateings /> : <Navigate to="/" />} />
                    <Route path='/addslots' element={isAuthanticated ? <Addslots /> : <Navigate to="/" />} />
                    <Route path='/updatearea/:id' element={isAuthanticated ? <UpdateArea /> : <Navigate to="/" />} />
                    <Route path='/admindata' element={isAuthanticated ? <Admin /> : <Navigate to="/" />} />
                    <Route path='/*' element={<UnderDevelopment />} />
                    <Route path="/totaldevicedata" element={isAuthanticated ? <TotaldeviceData /> : <Navigate to="/" />} />
                    <Route path='/rfidcardrequest' element={isAuthanticated ? <RfidCardRequest /> : <Navigate to="/" />} />
                    <Route path='/userdata' element={isAuthanticated ? <UserData /> : <Navigate to="/" />} />
                    <Route path='/complains' element={isAuthanticated ? <GetComplaint /> : <Navigate to="/" />} />
                    <Route path='/cardapprove' element={isAuthanticated ? <CardApprove /> : <Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
