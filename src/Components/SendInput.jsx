




import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '..';
import { setMessages } from '../redux/messageSlice';

const SendInput = () => {
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store => store.user);
    const {messages} = useSelector(store => store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        // Handle send message logic
        try {

            const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, {message},{
                headers: {
                    'Content-Type' : 'application/json'
                },
                withCredentials: true
            } )
           
                dispatch(setMessages([...messages, res?.data?.newMessage]))
        } catch (error) {
            console.log(error);
        }

        setMessage("");
    };

    return (
        <form onSubmit={onSubmitHandler} className='px-4 my-3'>
            <div className='w-full relative '>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder='Send a message...'
                    className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
                />
                <button type="submit" className=' absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-4 md:pr-5 lg:pr-6 xl:pr-5 text-gray-200 text-xl'>
                    <IoSend />
                </button>
            </div>
        </form>
    );
};

export default SendInput;



