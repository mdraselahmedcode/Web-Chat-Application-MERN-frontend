import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '..';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';


const useGetOtherUsers = () => {
    const dispatch = useDispatch();

        useEffect(() => {
            const fetchOtherUsers = async () => {
                try {
                    axios.defaults.withCredentials = true;
                    const res = await axios.get(`${BASE_URL}/api/v1/user`);
                    if(res.data){
                        dispatch(setOtherUsers(res.data));
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            fetchOtherUsers();
        }, []);
}

export default useGetOtherUsers