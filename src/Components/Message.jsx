



import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
    const { authUser, selectedUser } = useSelector(store => store.user);
    const scroll = useRef();

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior: "smooth"});
    },[message]);

    return (
        <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start' } px-4  `}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="" src={message?.senderId === authUser?._id ? authUser?.profilePhoto  : selectedUser?.profilePhoto } />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-white">12:45</time>
            </div>
            <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-slate-700 text-gray-100' : 'bg-blue-700 text-gray-100'} flex items-center justify-center `}>{message?.message}</div>
        </div>
    )
}

export default Message