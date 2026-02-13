import axios from 'axios';

const API_URL = 'http://localhost:5000/api/detections/';

// Get user from local storage to send token
const getAuthDetails = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        console.log('Sending Token:', user.token.substring(0, 10) + '...');
        return { headers: { Authorization: `Bearer ${user.token}` } };
    }
    console.warn('No token found in localStorage');
    return {};
};

// Get stats
const getStats = async () => {
    const config = getAuthDetails();
    const response = await axios.get(API_URL + 'stats', config);
    return response.data;
};

// Get all detections
const getDetections = async () => {
    const config = getAuthDetails();
    const response = await axios.get(API_URL, config);
    return response.data;
};

const detectionService = {
    getStats,
    getDetections
};

export default detectionService;
