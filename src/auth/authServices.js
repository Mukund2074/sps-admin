import ApiCall from '../ApiCall';

const checkSession = async () => {
    try {
        const response = await ApiCall('GET', 'admin/adminsession' , {} ,{
            withCredentials: true,
        });
        console.log("response from check session", response);
        return { isAuth: true }; // Session is valid

    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return { isAuth: false }; // Unauthorized
            }
            console.log('Error response from check session:', error.response);
        } else {
            console.log('Network or other error from check session:', error.message);
        }
        return { isAuth: false }; // Default to unauthenticated
    }
};


export default checkSession;
