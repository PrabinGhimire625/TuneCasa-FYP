import React from 'react';
import { LogOut, Mail, Lock, CreditCard, Calendar, Moon, Globe } from 'lucide-react';
import Footer from '../../../globals/components/footer/Footer';

const Settings = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      {/* Main Content */}
      <div className="flex-grow px-4 sm:px-6 md:px-10 lg:px-20 py-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 border-b border-gray-800 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide">Settings</h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">Manage your account, preferences, and subscription</p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Account Settings */}
          <SettingCard title="Account">
            <SettingItem icon={<Mail size={18} />} label="Email" value="prabin@gmail.com" />
            <SettingItem icon={<Lock size={18} />} label="Change Password" />
          </SettingCard>

          {/* Subscription */}
          <SettingCard title="Subscription">
            <SettingItem icon={<CreditCard size={18} />} label="Plan" value="Premium Monthly" />
            <SettingItem icon={<Calendar size={18} />} label="Next Billing" value="May 15, 2025" />
          </SettingCard>

          {/* Preferences */}
          <SettingCard title="Preferences">
            <SettingItem icon={<Moon size={18} />} label="Theme" value="Dark Mode" />
            <SettingItem icon={<Globe size={18} />} label="Language" value="English" />
          </SettingCard>

          {/* Logout */}
          <SettingCard title="Session">
            <button className="flex items-center gap-2 text-red-500 hover:text-red-400 font-medium">
              <LogOut size={18} />
              Logout
            </button>
          </SettingCard>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Card Wrapper
const SettingCard = ({ title, children }) => (
  <div className="bg-[#111] rounded-xl p-5 sm:p-6 shadow-lg border border-gray-800">
    <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-200">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

// Individual Setting Row
const SettingItem = ({ icon, label, value }) => (
  <div className="flex items-center justify-between group hover:bg-[#1a1a1a] p-3 rounded-lg transition duration-200">
    <div className="flex items-center gap-3 text-gray-300 group-hover:text-white">
      {icon}
      <span className="text-sm sm:text-base">{label}</span>
    </div>
    {value && <span className="text-xs sm:text-sm text-gray-500">{value}</span>}
  </div>
);

export default Settings;
