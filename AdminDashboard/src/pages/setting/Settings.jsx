import React from 'react';
import { Lock, Bell, User, Palette } from 'lucide-react';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 flex items-center gap-3">
          <div className="w-7 h-7 text-green-400" />
          Admin Settings
        </h1>

        {/* Settings Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <div className="flex items-center gap-4 mb-4">
              <User className="text-green-400 w-6 h-6" />
              <h2 className="text-xl font-semibold">Profile Settings</h2>
            </div>
            <p className="text-gray-300 text-sm">
              Update your name, avatar, and contact information.
            </p>
            <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-sm rounded-md transition">
              Manage Profile
            </button>
          </div>

          {/* Password & Security */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <div className="flex items-center gap-4 mb-4">
              <Lock className="text-green-400 w-6 h-6" />
              <h2 className="text-xl font-semibold">Security</h2>
            </div>
            <p className="text-gray-300 text-sm">
              Change your password and enable 2FA for more protection.
            </p>
            <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-sm rounded-md transition">
              Update Security
            </button>
          </div>

          {/* Notifications */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <div className="flex items-center gap-4 mb-4">
              <Bell className="text-green-400 w-6 h-6" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
            <p className="text-gray-300 text-sm">
              Customize your notification preferences and email alerts.
            </p>
            <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-sm rounded-md transition">
              Notification Settings
            </button>
          </div>

          {/* Theme Customization */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <div className="flex items-center gap-4 mb-4">
              <Palette className="text-green-400 w-6 h-6" />
              <h2 className="text-xl font-semibold">Theme</h2>
            </div>
            <p className="text-gray-300 text-sm">
              Switch between light, dark, or custom black & white themes.
            </p>
            <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-sm rounded-md transition">
              Customize Theme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
