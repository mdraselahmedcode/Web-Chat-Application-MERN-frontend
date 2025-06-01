import React, { useState } from 'react';
import OtherUsers from './OtherUsers';
import { FaSearch, FaTimes } from "react-icons/fa";
import LogOutButton from './LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredUser } from '../redux/userSlice';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const [searchUser, setSearchUser] = useState('');
  const { otherUsers } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (searchUser.trim() === '') {
      dispatch(setFilteredUser(otherUsers));
    } else {
      const searchedUser = otherUsers.filter(user =>
        user.fullName.toLowerCase().includes(searchUser.toLowerCase())
      );
      if (searchedUser.length > 0) {
        dispatch(setFilteredUser(searchedUser));
      } else {
        toast.error("User not found!");
        dispatch(setFilteredUser([]));
      }
    }
  };

  const clearSearchHandler = () => {
    dispatch(setFilteredUser(otherUsers));
    setSearchUser('');
  };

  return (
    <div className="flex flex-col flex-grow sm:w-[30%] md:w-[40%] lg:w-[40%] xl:w-[40%] border-4 bg-slate-900 border-gray-600">
      <div className='flex bg-slate-900 flex-col'>
        <div className='flex items-center justify-center shadow-purple-600 shadow-md mt-2'>
          <p className='flex items-center justify-center text-gray-50 font-bold text-center p-2 text-xl text-shadow-sm'>Billu Chat</p>
        </div>
        <div className="flex flex-col mt-2 p-2 shadow-lg mb-1">
          <form
            onSubmit={searchSubmitHandler}
            className="flex flex-row justify-center relative">
            <div className="flex items-center w-full bg-slate-700 rounded-md">
              <input
                type="text"
                value={searchUser}
                className="w-full pl-10 pr-10 py-2 text-gray-300 font-semibold bg-slate-700 rounded-md focus:outline-none"
                placeholder="Search"
                onChange={(e) => setSearchUser(e.target.value)}
              />
              <div className='flex space-x-1'>
              {searchUser && (
                <FaTimes
                  className="mx-2  cursor-pointer text-gray-400"
                  onClick={clearSearchHandler}
                />
              )}
              <button className="flex items-center pr-3">
                <FaSearch type='submit' className="w-4 h-4 text-gray-400" />
              </button>
              </div>
            </div>
          </form>
          <div className="divider px-3 text-xl font-bold">Users</div>
        </div>
      </div>
      <div className="bg-slate-[60%] flex flex-col flex-1">
        <OtherUsers />
      </div>
      <div className='flex flex-col bg-slate-900 py-1 border-t border-gray-600'>
        <LogOutButton />
      </div>
    </div>
  );
};

export default Sidebar;
