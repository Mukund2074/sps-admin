import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import UnderDevelopment from './common/Underdev';
import UltrasonicTable from './pages/UltrasonicTable';
import IRTable from './pages/IRTable';
import RfidTable from './pages/RfidTable';
import ManageParkingArea from './pages/manageparkingarea';
import BookingData from './pages/Bookingdata';
import CheckReviewRatings from './pages/Checkreview&rateings';
import AddSlots from './common/Addslots';
import Admin from './pages/AdminData';
import UpdateArea from './pages/UpdateArea';
import TotalDeviceData from './pages/TotalDevicesData';
import RfidCardRequest from './pages/RfidCardRequest';
import UserData from './pages/UserData';
import GetComplaint from './pages/GetComplaint';
import ForgotPass from './pages/forget';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RfidStore from './pages/RfidStore';

// Centralized loading spinner component
const LoadingSpinner = () => (
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
);

const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN');
    const adminData = Cookies.get('adminData');

    if (token && adminData) {
      setIsAuthenticated(true);
    } else {
      toast.error('Authentication failed, please login again');
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/forget" element={<ForgotPass />} />
          <Route path="/Dashboard" element={<ProtectedRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} />
          <Route path="/irtable" element={<ProtectedRoute element={<IRTable />} isAuthenticated={isAuthenticated} />} />
          <Route path="/ultrasonictable" element={<ProtectedRoute element={<UltrasonicTable />} isAuthenticated={isAuthenticated} />} />
          <Route path="/rfidtable" element={<ProtectedRoute element={<RfidTable />} isAuthenticated={isAuthenticated} />} />
          <Route path="/manageparkingarea" element={<ProtectedRoute element={<ManageParkingArea />} isAuthenticated={isAuthenticated} />} />
          <Route path="/bookingdata" element={<ProtectedRoute element={<BookingData />} isAuthenticated={isAuthenticated} />} />
          <Route path="/reviewrateing" element={<ProtectedRoute element={<CheckReviewRatings />} isAuthenticated={isAuthenticated} />} />
          <Route path="/addslots" element={<ProtectedRoute element={<AddSlots />} isAuthenticated={isAuthenticated} />} />
          <Route path="/updatearea/:id" element={<ProtectedRoute element={<UpdateArea />} isAuthenticated={isAuthenticated} />} />
          <Route path="/admindata" element={<ProtectedRoute element={<Admin />} isAuthenticated={isAuthenticated} />} />
          <Route path="/totaldevicedata" element={<ProtectedRoute element={<TotalDeviceData />} isAuthenticated={isAuthenticated} />} />
          <Route path="/rfidcardrequest" element={<ProtectedRoute element={<RfidCardRequest />} isAuthenticated={isAuthenticated} />} />
          <Route path="/userdata" element={<ProtectedRoute element={<UserData />} isAuthenticated={isAuthenticated} />} />
          <Route path="/complains" element={<ProtectedRoute element={<GetComplaint />} isAuthenticated={isAuthenticated} />} />
          <Route path="/rfidstore" element={<ProtectedRoute element={<RfidStore />} isAuthenticated={isAuthenticated} />} />
          <Route path="/*" element={<UnderDevelopment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
