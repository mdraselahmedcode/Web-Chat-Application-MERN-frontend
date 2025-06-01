import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = React.memo(({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    // console.log(selectedUser?._id);

    const isOnline = onlineUsers?.includes(user._id);

    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
        // console.log(user);
    };

    return (

        <div 
            onClick={() => selectedUserHandler(user)}
            className={`${selectedUser?._id === user?._id ? 'bg-gray-300 text-gray-900 font-bold   ' : 'text-white hover:font-semibold  hover:bg-gray-300 hover:text-gray-900'
                } flex items-center gap-2  rounded-l-md pl-3 `}>
            <div className={`avatar ${isOnline ? ('online') : ('')}  `}>
                <div className="w-10 rounded-full">
                    <img src={user?.profilePhoto} alt="user avatar" />
                </div>
            </div>
            <div className='flex flex-col'>
                <div className="p-4 pl-2 flex cursor-pointer">
                    <p> {user?.fullName} </p>
                </div>
            </div>
        </div>
    );
});

export default OtherUser;
