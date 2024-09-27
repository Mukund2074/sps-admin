import axios from 'axios';

const ApiCall = async (method, endPointUrl, data = null) => { 
    // const localhost = 'http://localhost:8000'; // Base URL for your API
    const BASEURL = "https://sps-backend.vercel.app"
    const url = `${BASEURL}/${endPointUrl}`;
    
    try {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('AUTH_TOKEN') ? `Bearer ${localStorage.getItem('AUTH_TOKEN')}` : '',
                'Content-Type': 'application/json',
            },
        };
        
        let response;
        switch (method.toLowerCase()) {
            case 'get':
                response = await axios.get(url, config);
                break;
            case 'post':
                response = await axios.post(url, data, config);
                break;
            case 'put':
                response = await axios.put(url, data, config);
                break;
            case 'delete':
                response = await axios.delete(url, config);
                break;
            default:
                throw new Error('Invalid method');
        }
        
        return response; // Return response data instead of full response
    } catch (error) {
        throw error; // Rethrow the error to handle it where ApiCall is used
    }
};

export default ApiCall;
