
// Responsive

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { BASE_URL } from '..';
import {toast} from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
 
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const {  username, password} = user;

    const user_send_login_info = {
      username: user.username,
      password: user.password,
    }

    if (!username || !password) {
      setUser({ 
        ...user, 
        isValidUser: false
       });
       return;
    }


    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user_send_login_info, {
        headers: {
          'Content-Type' : 'application/json'
        },
        withCredentials: true
      });
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/");
        dispatch(setAuthUser(res.data)); // storing the user log in information into the redux store
 
        setUser({
          username: '',
          password: '',
  
          secureTextEntry: true,
          isValidUser: true,
          isValidPassword: true,
        })
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    

    

  }





  const handleUsernameChange = (val) => {
    if (val.trim().length > 0) {
      setUser({
        ...user,
        username: val,
        isValidUser: true,
      });
    } else {
      setUser({
        ...user,
        username: val,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setUser({
        ...user,
        password: val,
        isValidPassword: true,
        isValidUser: true,
      });
    } else {
      setUser({
        ...user,
        password: val,
        isValidPassword: false,
      });
    }
  };


  const updateSecureTextEntry = () => {
    setUser({
      ...user,
      secureTextEntry: !user.secureTextEntry,
    });
  };



  return (
    <div className="flex items-center bg-gray-900 min-h-screen justify-center px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl shadow-purple-600">
        <h2 className="text-shadow-xl mt-4 text-2xl font-bold text-purple-600 text-center">Log In</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4 shadow-xl shadow-purple-50">
         

          <div className="">
            <label className="block text-shadow-sm text-slate-500 text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={(event) => handleUsernameChange(event.target.value)}
              className="w-full font-medium px-3 py-2 shadow-md shadow-gray-400 focus:shadow-purple-500 focus:shadow-lg bg-purple-300 focus:bg-purple-100 text-black rounded-lg mt-1"
            />
          </div>

          <div className="">
            <label className="block text-shadow-sm text-slate-500 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={user.secureTextEntry ? 'password' : 'text'}
                name="password"
                value={user.password}
                onChange={(event) => handlePasswordChange(event.target.value)}
                className="mb-2 w-full font-medium px-3 py-2 shadow-md shadow-gray-400 focus:shadow-purple-500 focus:shadow-lg bg-purple-300 focus:bg-purple-100 text-black rounded-lg mt-1"
              />
              <button
                type="button"
                onClick={updateSecureTextEntry}
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-700"
              >
                {!user.secureTextEntry ? (
                  <FaEyeSlash className="text-gray-700" />
                ) : (
                  <FaEye className="text-gray-700" />
                )}
              </button>
            </div>
            {!user.isValidPassword && (
              <p className="text-red-500 text-sm font-semibold text-shadow-sm transition-opacity duration-900 ease-in opacity-100">
                Password should be at least 8 characters long
              </p>
            )}
          </div>

          {!user.isValidUser && (
              <p className=" pl-1  text-red-500 text-sm font-semibold text-shadow-sm transition-opacity duration-900 ease-in opacity-100">
                any of the input field shouldn't be empty.
              </p>
            )}






          <button
            type="submit"
            className="btn btn-primary btn-md hover:text-shadow-lg hover:text-gray-900 bg-purple-400 hover:shadow-purple-600 hover:bg-purple-400 hover:shadow-lg shadow-md shadow-gray-400 text-lg text-white font-bold w-full"
          >
            Log In
          </button>
        </form>
        <div className="flex justify-between ">
          <Link
            to="/Login"
            className="hover:text-shadow-sm text-shadow-md text-gray-500 font-semibold text-sm hover:text-gray-700 hover:font-bold hover:shadow-xl hover:shadow-purple-300 px-2 hover:rounded-md"
          >
            Forgot password ?
          </Link>
          <Link
            to="/signup"
            className=" text-shadow-md hover:text-shadow-sm text-gray-500 font-bold text-sm hover:text-gray-700 hover:font-bold hover:shadow-xl hover:shadow-purple-300 px-2 hover:rounded-md"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
