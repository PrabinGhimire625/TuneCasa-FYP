import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../../globals/navbar/Navbar';
import Dashboard from '../dashboard/Dashboard';
const Landing = () => {
  return (
   <>
       <div className="flex h-screen bg-stone-900">
          <Sidebar/>

          <div className="flex flex-col flex-1 overflow-y-auto min-h-screen">

              <div className="p-4">
                <Dashboard/>
              
              
              </div>
          </div>
       </div>
  

       
      
     
  
   </>
  );
};

export default Landing;
