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

const updateAlertStatus = async (alertId, status) => {
    const response = await axios.patch(`${API_URL}${alertId}/status`, { status }, getConfig());
    return response.data;
};

const stopMachine = async (alertId) => {
    const response = await axios.post(`${API_URL}${alertId}/stop-machine`, {}, getConfig());
    return response.data;
};

const ignoreAlert = async (alertId) => {
    const response = await axios.post(`${API_URL}${alertId}/ignore`, {}, getConfig());
    return response.data;
};

const clearResolved = async () => {
    const response = await axios.delete(`${API_URL}resolved`, getConfig());
    return response.data;
};

const alertService = {
    getAlerts,
    updateAlertStatus,
    stopMachine,
    ignoreAlert,
    clearResolved,
};

export default alertService;
