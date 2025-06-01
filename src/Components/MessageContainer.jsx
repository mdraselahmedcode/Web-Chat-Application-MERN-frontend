



import React from 'react';
import Messages from './Messages';
import SendInput from './SendInput';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';



const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <>
      {
        selectedUser !== null ? (
          <div className='w-full h-full bg-gray-900 border-4 border-gray-600 flex flex-col'>
            <div className='flex-grow flex flex-col'>
              {/* Header Section */}
              <div

                className={`${selectedUser?._id === authUser?._id ? 'text-gray-200 bg-purple-800  ' : 'text-gray-200 bg-purple-800 pl-5 '
                  } flex items-center gap-2  pl-2 font-bold py-1 border-b-2 text-xl border-gray-600   `}>
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                  <div className="w-12 rounded-full">
                    <img src={selectedUser?.profilePhoto} alt="user avatar" />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className="p-4 pl-2 flex cursor-pointer">
                        <p> {selectedUser?.fullName} </p> 
                  </div>
                </div>
              </div>


              {/* Messages Section */}
              <div className='flex flex-col flex-1 bg-slate-900'>
                <Messages />
              </div>
            </div>

            {/* Send Input Section */}
            <div className='bg-slate-900 py-1 border-t border-gray-600'>
              <SendInput />
            </div>
          </div>
        ) : (
          <div className='w-full h-full bg-gray-900 border-4 border-gray-600 flex flex-col items-center justify-center'>
            <div className='flex items-center shadow-md shadow-gray-50 p-2 mb-3'>
              <h1 className='text-4xl text-white text-shadow-sm  font-bold'>Hi...&nbsp; </h1>
              <h1 className='text-4xl  text-purple-600   font-bold'>{authUser?.fullName} </h1>
              <h1 className='text-4xl  text-white  font-bold'> &nbsp;! </h1>
            </div>
              <h1 className='text-2xl text-white'>Let's start conversation</h1>

          </div>
        )
      }
    </>
  );
};

export default MessageContainer;
