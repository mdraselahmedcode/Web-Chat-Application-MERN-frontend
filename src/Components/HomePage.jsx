import React from 'react';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';

const HomePage = () => {
  return (
      <div className="flex w-full  md:h-[100vh] sm:h-[100vh] h-[100vh]   border-3">
        <Sidebar />
        <MessageContainer />
      </div>
  );
};

export default HomePage;
