
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { BASE_URL } from '.';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';

function App() {
  const { authUser } = useSelector(store => store.user);
  const { socket } = useSelector(store => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    let socketio;

    if (authUser) {
      socketio = io(`${BASE_URL}`, {
        query: {
          userId: authUser._id,
        }
      });
      dispatch(setSocket(socketio));

      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
    }

    return () => {
      if (socketio) {
        socketio.close();
      }
      dispatch(setSocket(null));
    };
  }, [authUser, dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


