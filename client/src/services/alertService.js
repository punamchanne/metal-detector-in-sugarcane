import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/alerts/';

// Get user token
const getConfig = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
        headers: {
            Authorization: `Bearer ${user?.token}`,
        },
    };
};

const getAlerts = async () => {
    const response = await axios.get(API_URL, getConfig());
    return response.data;
};

const alertService = {
    getAlerts,
};

export default alertService;
