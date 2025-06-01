

import React from 'react';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import OtherUser from './OtherUser';
import { useSelector } from 'react-redux';

const OtherUsers = () => {
  const { otherUsers, filteredUser } = useSelector(store => store.user);
  
  useGetOtherUsers();

  if (!otherUsers) return null; // early return

  return (
    <div className='flex flex-col flex-grow pl-2 overflow-auto h-[10vh]'>
      <ul>
        {(filteredUser.length > 0 ? filteredUser : otherUsers).map((user) => (
          <OtherUser key={user._id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default OtherUsers;
