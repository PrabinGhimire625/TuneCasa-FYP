import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="bg-stone-800 min-h-screen">
     

      <div className="flex flex-row pt-24 px-10 pb-4">
     

        <div className="w-10/12">
          <div className="flex flex-row">
            <div className="bg-red-200 border border-red-300 rounded-xl w-7/12 mr-2 p-6">
              <p className="text-5xl text-indigo-900">
                Key <br />
                <strong>Performance matrix</strong>
              </p>
              <span className="bg-red-300 text-xl text-white inline-block rounded-full mt-12 px-8 py-2">
                <strong>See more</strong>
              </span>
            </div>

            <div className="bg-orange-200 border border-orange-300 rounded-xl w-5/12 ml-2 p-6">
              <p className="text-5xl text-indigo-900">
                Event <br />
                <strong>23</strong>
              </p>
              <Link
                to="/messages"
                className="bg-stone-900 text-xl text-white underline hover:no-underline inline-block rounded-full mt-12 px-8 py-2"
              >
                <strong>See more</strong>
              </Link>
            </div>
          </div>
          <div className="flex flex-row h-64 mt-6 text-white">
            <div className="bg-stone-900  rounded-xl shadow-lg px-6 py-4 w-4/12">Discover</div>
            <div className="bg-stone-900 rounded-xl shadow-lg mx-6 px-6 py-4 w-4/12">playlist add</div>
            <div className="bg-stone-900 rounded-xl shadow-lg px-6 py-4 w-4/12">Listeners</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;