import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 shadow-inner border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* About TuneCasa */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">TuneCasa Artist</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            The ultimate dashboard for artists to manage music, bookings, earnings, and connect with fans — all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/dashboard" className="hover:text-white hover:underline transition">Dashboard</Link></li>
            <li><Link to="/upcomingEvents" className="hover:text-white hover:underline transition">My Events</Link></li>
            <li><Link to="/allSong" className="hover:text-white  hover:underline transition">My songs</Link></li>
            <li><Link to="/songAnalytics" className="hover:text-white  hover:underline transition">Earnings</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/accountSetting" className="hover:text-white transition">Account Settings</Link></li>
            <li><Link to="/helpCenter" className="hover:text-white transition">Help Center</Link></li>
            <li><a href="contactSupport" className="hover:text-white transition">Terms and Conditions</a></li>
          </ul>
        </div>

        {/* Social + Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Stay Connected</h3>
          <div className="flex gap-6 mb-4 text-2xl">
            <SocialMediaLink href="https://github.com/PrabinGhimire625" icon={<FiGithub />} />
            <SocialMediaLink href="https://twitter.com" icon={<FiTwitter />} />
            <SocialMediaLink href="https://linkedin.com" icon={<FiLinkedin />} />
          </div>

          <div className="text-sm text-gray-400">
            <p>support@tunecasa.com</p>
            <p>App Version: 1.0.0</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 pb-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TuneCasa. All rights reserved.
      </div>
    </footer>
  );
};

// Reusable Social Media Link Component
const SocialMediaLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-white transition-colors"
  >
    {icon}
  </a>
);

export default Footer;
