import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";
import { assets } from "../../../assets/frontend-assets/assets";

const Footer = () => {
  return (
    <footer className=" text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div className="flex flex-col gap-4">
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden border border-gray-600">
            <img
              src={assets.tunecasaLogo}
              alt="TuneCasa Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            TuneCasa — Where music and moments connect. Discover and book artists effortlessly.
          </p>
        </div>

        {/* Site Links */}
        <div>
          <h3 className="text-gray-200 uppercase text-sm mb-4 font-bold tracking-wide">
            Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/about" className="hover:text-white hover:underline hover:decoration-white transition">About Us</a></li>
            <li><a href="/artists" className="hover:text-white hover:underline hover:decoration-white transition">Find Artists</a></li>
            <li><a href="/events" className="hover:text-white hover:underline hover:decoration-white transition">Events</a></li>
            <li><a href="/contact" className="hover:text-white hover:underline hover:decoration-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Artist Section */}
        <div>
          <h3 className="text-gray-200 uppercase text-sm mb-4 font-bold tracking-wide">
            For Artists
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/artist/register" className="hover:text-white hover:underline hover:decoration-white transition">Join as Artist</a></li>
            <li><a href="/artist/dashboard" className="hover:text-white hover:underline hover:decoration-white transition">Artist Dashboard</a></li>
            <li><a href="/bookings" className="hover:text-white hover:underline hover:decoration-white transition">Manage Bookings</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="flex flex-col gap-4">
          <h3 className="text-gray-200 uppercase text-sm font-bold tracking-wide">Stay Connected</h3>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <FaEnvelope className="text-white" />
            <a href="mailto:support@tunecasa.com" className="hover:underline">tunecasa625@gmail.com</a>
          </div>
          <div className="flex gap-3 mt-2">
            <a
              href="https://www.instagram.com/prabinghimire07?igsh=MTl4aHB4MXdyMWUzcw=="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/prabin.ghimire.90281"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} TuneCasa. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
