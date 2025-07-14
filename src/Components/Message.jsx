



// import React, { useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';

// const Message = ({ message }) => {
//     const { authUser, selectedUser } = useSelector(store => store.user);
//     const scroll = useRef();

//     useEffect(()=>{
//         scroll.current?.scrollIntoView({behavior: "smooth"});
//     },[message]);

//     return (
//         <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start' } px-4  `}>
//             <div className="chat-image avatar">
//                 <div className="w-10 rounded-full">
//                     <img alt="" src={message?.senderId === authUser?._id ? authUser?.profilePhoto  : selectedUser?.profilePhoto } />
//                 </div>
//             </div>
//             <div className="chat-header">
//                 <time className="text-xs opacity-50 text-white">
//                     {new Date(message?.createdAt).toLocaleTimeString([], {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                     })}
//                 </time>
//             </div>

//             <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-slate-700 text-gray-100' : 'bg-blue-700 text-gray-100'} flex items-center justify-center `}>{message?.message}</div>
//         </div>
//     )
// }

// export default Message








import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const Message = ({ message }) => {
    const { authUser, selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);
    const dispatch = useDispatch();
    const scroll = useRef();

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${BASE_URL}/api/v1/message/${message._id}`, {
                withCredentials: true
            });

            const updatedMessages = messages.filter(m => m._id !== message._id);
            dispatch(setMessages(updatedMessages));
        } catch (err) {
            console.error("Error deleting message:", err);
        }
    };

    return (
        <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'} px-4 relative`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt=""
                        src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto}
                    />
                </div>
            </div>

            <div className="chat-header flex items-center justify-between">
                <time className="text-xs opacity-50 text-white">
                    {new Date(message?.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </time>

                {/* Show 3-dot menu only for own messages */}
                {message?.senderId === authUser?._id && (
                    <div className="relative ml-2">
                        <button onClick={() => setShowMenu(prev => !prev)}>
                            <BsThreeDotsVertical className="text-white text-sm" />
                        </button>
                        {showMenu && (
                            <div className="absolute right-0 mt-1 bg-white rounded shadow-md z-50 w-24">
                                <button
                                    onClick={handleDelete}
                                    className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div
                className={`chat-bubble ${message?.senderId !== authUser?._id
                    ? 'bg-slate-700 text-gray-100'
                    : 'bg-blue-700 text-gray-100'} flex items-center justify-center`}
            >
                {message?.message}
            </div>
        </div>
    );
};


export default Message