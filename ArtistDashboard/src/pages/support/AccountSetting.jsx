import React from "react";

const AccountSetting = () => {
  return (
    <div className="bg-gray-900 text-white  px-4 sm:px-8 xl:px-0 max-w-screen-xl mx-auto">
      <h1 className="border-b border-gray-700 py-6 text-4xl font-semibold">Settings</h1>
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        {/* Mobile Dropdown Menu */}
        <div className="relative my-4 w-56 sm:hidden">
          <input className="peer hidden" type="checkbox" id="select-1" />
          <label htmlFor="select-1" className="flex w-full cursor-pointer select-none rounded-lg border border-gray-700 p-2 px-3 text-sm text-white ring-blue-500 peer-checked:ring">
            Accounts
          </label>
          <svg className="pointer-events-none absolute right-0 top-3 mr-5 h-4 text-white transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <ul className="max-h-0 flex-col overflow-hidden rounded-b-lg bg-gray-800 shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
            {["Accounts", "Team", "Others"].map((item) => (
              <li key={item} className="cursor-pointer px-3 py-2 text-sm hover:bg-blue-700 hover:text-white text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar */}
        <div className="col-span-2 hidden sm:block">
          <ul>
            {[ "Accounts", "Users", "Profile", "Earning", "Notifications", "Integrations"].map((item, index) => (
              <li
                key={item}
                className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${
                  item === "Accounts"
                    ? "border-l-blue-500 text-blue-500"
                    : "border-transparent hover:border-l-blue-500 hover:text-blue-500 text-gray-400"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Settings Panel */}
        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-800 sm:px-8 sm:shadow-md">
          <div className="pt-4">
            <h2 className="py-2 text-2xl font-semibold text-white">Account Settings</h2>
          </div>
          <hr className="mt-4 mb-8 border-gray-700" />

          {/* Email Section */}
          <p className="py-2 text-xl font-semibold">Email Address</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-400">
              Your email address is <strong className="text-white">prabinghimire625@gmail.com</strong>
            </p>
            <button className="inline-flex text-sm font-semibold text-blue-500 hover:underline">Change</button>
          </div>

          <hr className="mt-4 mb-8 border-gray-700" />

          {/* Password Section */}
          <p className="py-2 text-xl font-semibold">Password</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            {["Current Password", "New Password"].map((label, idx) => (
              <div key={idx}>
                <span className="text-sm text-gray-400">{label}</span>
                <div className="relative flex overflow-hidden rounded-md border-2 border-gray-700 focus-within:border-blue-500 transition">
                  <input
                    type="password"
                    className="w-full appearance-none bg-gray-800 py-2 px-4 text-base text-white placeholder-gray-400 focus:outline-none"
                    placeholder="***********"
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-gray-400">
            Can't remember your current password?{" "}
            <a className="text-sm font-semibold text-blue-500 hover:underline" href="#">
              Recover Account
            </a>
          </p>
          <button className="mt-4 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white font-semibold transition">Save Password</button>

          <hr className="mt-6 mb-8 border-gray-700" />

          {/* Delete Account */}
          <div className="mb-10">
            <p className="py-2 text-xl font-semibold text-red-500">Delete Account</p>
            <div className="inline-flex items-center rounded-full bg-red-100 bg-opacity-10 px-4 py-1 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Proceed with caution
            </div>
            <p className="mt-2 text-gray-400">
              Make sure you’ve taken a backup of your account in case you ever need your data. We will permanently wipe your account with no recovery option.
            </p>
            <button className="mt-4 text-sm font-semibold text-red-500 hover:underline">Continue with deletion</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
