import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001') + '/api/detections/';

// Get user token
const getConfig = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
        headers: {
            Authorization: `Bearer ${user?.token}`,
        },
    };
};

// Run AI Detection (Upload Image)
const detectImage = async (formData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'multipart/form-data'
        },
    };

    const response = await axios.post(API_URL + 'detect', formData, config);
    return response.data;
};

// Get Detection History
const getHistory = async () => {
    const response = await axios.get(API_URL + 'history', getConfig());
    return response.data;
};

// Get Analytics Overview
const getStats = async () => {
    const response = await axios.get(API_URL + 'analytics/overview', getConfig());
    return response.data;
};

const detectionService = {
    detectImage,
    getHistory,
    getStats,
};

export default detectionService;
