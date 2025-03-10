import React from 'react';
import Dashboard from '../dashboard/Dashboard';
const Landing = () => {
  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-auto min-h-screen ">
        <div className="p-4">
          <Dashboard />
        </div>
      </div>
    </>
  );
};

export default Landing;
