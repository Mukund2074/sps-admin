import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
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
import CardApprove from './pages/CardAprove';
import ForgotPass from './pages/forget';
import axios from 'axios';

function App() {

  axios.defaults.withCredentials = true;
  const [loading, setLoading] = useState(true); // New loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem('AUTH_TOKEN');
      if (token) {
        setIsAuthenticated(true);
      }
      setLoading(false);

    } catch (error) {

    }
  }, [isAuthenticated]);

  if (loading) {
    return null
  }

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

          <Route path="/forget" element={<ForgotPass />} />
          <Route path="/Dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route path='/irtable' element={isAuthenticated ? <IRTable /> : <Navigate to="/" />} />
          <Route path='/ultrasonictable' element={isAuthenticated ? <UltrasonicTable /> : <Navigate to="/" />} />
          <Route path='/rfidtable' element={isAuthenticated ? <RfidTable /> : <Navigate to="/" />} />
          <Route path='/manageparkingarea' element={isAuthenticated ? <Manageparkingarea /> : <Navigate to="/" />} />
          <Route path='/bookingdata' element={isAuthenticated ? <Bookingdata /> : <Navigate to="/" />} />
          <Route path='/reviewrateing' element={isAuthenticated ? <Checkreviewrateings /> : <Navigate to="/" />} />
          <Route path='/addslots' element={isAuthenticated ? <Addslots /> : <Navigate to="/" />} />
          <Route path='/updatearea/:id' element={isAuthenticated ? <UpdateArea /> : <Navigate to="/" />} />
          <Route path='/admindata' element={isAuthenticated ? <Admin /> : <Navigate to="/" />} />
          <Route path='/*' element={<UnderDevelopment />} />
          <Route path="/totaldevicedata" element={isAuthenticated ? <TotaldeviceData /> : <Navigate to="/" />} />
          <Route path='/rfidcardrequest' element={isAuthenticated ? <RfidCardRequest /> : <Navigate to="/" />} />
          <Route path='/userdata' element={isAuthenticated ? <UserData /> : <Navigate to="/" />} />
          <Route path='/complains' element={isAuthenticated ? <GetComplaint /> : <Navigate to="/" />} />
          <Route path='/cardapprove' element={isAuthenticated ? <CardApprove /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
