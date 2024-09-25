import ApiCall from '../ApiCall';
import { toast } from 'react-toastify';

const checkSession = async () => {
    const ID = localStorage.getItem('adminToken');
    try {
      
        console.log("response from check session", ID);
        return { isAuth: true }; // Session is valid

    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return { isAuth: false }; // Unauthorized
            }
            
            toast.error('session expired or something went wrong');
            console.log('Error response from check session:', error.response);
        } else {
            console.log('Network or other error from check session:', error.message);
        }
        return { isAuth: false }; // Default to unauthenticated
    }
};


export default checkSession;
