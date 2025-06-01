


import React from 'react';
import axios from 'axios';
import { BASE_URL } from '..';
import { useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setMessages } from '../redux/messageSlice';


const LogOutButton = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
                // deleting the all the information from the redux store when he logged out
                dispatch(setAuthUser(null)); 
                dispatch(setOtherUsers(null));
                dispatch(setSelectedUser(null));
                dispatch(setMessages(null));
            }
        } catch (error) {
            console.log(error.res.data.message);
            console.log(error);
        }
        
    };

    return (
        <form onSubmit={handleLogOut} className=' px-4 my-3'>
            <div className='  '>
                <button type="submit" className='border font-bold hover:text-md  text-sm rounded-lg block w-full p-3 border-zinc-500 bg-purple-600 text-white  shadow-md hover:bg-purple-500 hover:shadow-sm hover:border-gray-100 hover:shadow-blue-100 hover:text-md'>
                    Log Out
                </button>
            </div>
        </form>
    );
};

export default LogOutButton;
