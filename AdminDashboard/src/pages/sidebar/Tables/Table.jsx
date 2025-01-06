import React from "react";
import Users from "./users/Users";
import Sidebar from "../Sidebar";



const Tables = () => {
  return (
    <>
        <div className="flex h-screen bg-stone-900">
          <Sidebar/>

          <div className="flex flex-col flex-1 overflow-y-auto min-h-screen">
              <div className="p-4">
                <Users/>
       
              </div>
          </div>
       </div>
    </>
  );
};

export default Tables;
