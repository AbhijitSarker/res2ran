import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import useAuth from './useAuth';
// import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'https://bistro-boss-server-ten-gamma.vercel.app',
});

const useAxiosSecure = () => {
    // const { logOut } = useAuth();
    const navigate = useNavigate();

    const { logout } = useAuth();

    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await logout();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );
    }, [logout, navigate]);

    return [axiosSecure];
};

export default useAxiosSecure;