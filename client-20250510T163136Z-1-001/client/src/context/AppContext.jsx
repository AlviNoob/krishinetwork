import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
// import toast from 'react-hot-toast';
// import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [experts, setExperts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [currencySymbol, setCurrencySymbol] = useState('৳'); // Set your desired symbol here
    const serverUrl = 'http://localhost:4000'; // Update as needed for deployment

    const getExpertsData = async () => {
        try {
            const { data } = await axios.get(`${serverUrl}/expert`);
            if (data) {
                setExperts(data);
            }
        } catch (error) {
            console.error('Error fetching experts:', error);
           
        }
    };

    // Auto-refresh expert data on mount
    useEffect(() => {
        getExpertsData();
    }, []);

    // Store token on login
    const updateToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    return (
        <AppContext.Provider
            value={{
                experts,
                currencySymbol,
                serverUrl,
                token,
                getExpertsData,
                updateToken
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
