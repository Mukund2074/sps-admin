import axios from 'axios';

const ApiCall = async (method, endPointUrl, data = null, withCredentials = false) => {
    const localhost = 'http://localhost:8000';
    // const baseURL = "https://sps-backend.vercel.app"; // Consider using this if needed
    const url = `${localhost}/${endPointUrl}`; // Use baseURL if you're deploying

    try {
        let response;
        const config = { withCredentials };

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
                response = await axios.delete(url, { data, ...config });
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
