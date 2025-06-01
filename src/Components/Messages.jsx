import React from 'react';
import Message from './Message';
import { useSelector } from 'react-redux';
import useGetMessages from '../hooks/useGetMessages';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();

  const { messages } = useSelector(store => store.message);
  const { selectedUser } = useSelector(store => store.user);

  return (
    <div className=' flex flex-col flex-grow  pl-2 overflow-auto h-[5vh] bg-slate-900 p-4'>
      {
        messages && messages.length > 0 ? (
          messages.map((message) => (
            <Message key={message._id} message={message} />
          ))
        ) : (
            <div className='flex flex-col justify-center items-center h-full  text-center'>
              <p className='text-gray-300 text-lg'>
                No messages yet with 
                <span className='text-white font-semibold'> {selectedUser?.fullName}</span>.
              </p>
              <p className='text-gray-400 text-md mt-2'>
                Start the conversation and make a connection!
              </p>
            </div>
        )
      }
    </div>
  );
}

export default Messages;
