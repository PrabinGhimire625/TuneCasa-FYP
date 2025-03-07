import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-white text-indigo-600 flex items-center justify-center text-xl font-bold">N</div>
            <span className="ml-3 text-xl font-bold">NOVA</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="#" className="hover:text-indigo-300 transition-colors duration-200">About</Link>
            <Link to="#" className="hover:text-indigo-300 transition-colors duration-200">Features</Link>
            <Link to="#" className="hover:text-indigo-300 transition-colors duration-200">Contact</Link>
          </nav>
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Amazing</span> is Coming Soon
              </h1>
              <p className="text-lg md:text-xl text-indigo-200 mb-8 max-w-lg mx-auto md:mx-0">
                We're working hard to bring you our new platform. Sign up to be the first to know when we launch and get exclusive early access.
              </p>

              {/* Countdown Timer */}
              <div className="grid grid-cols-4 gap-4 max-w-md mx-auto md:mx-0 mb-10">
                {["15 Days", "08 Hours", "23 Minutes", "42 Seconds"].map((time, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl md:text-4xl font-bold">{time.split(" ")[0]}</div>
                    <div className="text-indigo-300 text-sm">{time.split(" ")[1]}</div>
                  </div>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="max-w-md mx-auto md:mx-0">
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/10 backdrop-blur-sm border border-white/20"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-lg font-medium transition-all duration-200 whitespace-nowrap"
                  >
                    Notify Me
                  </button>
                </form>
                <p className="text-xs text-indigo-300 mt-3">We respect your privacy. No spam, ever. Unsubscribe anytime.</p>
              </div>

              {/* Social Media */}
              <div className="mt-10 flex justify-center md:justify-start space-x-6">
                {["twitter", "instagram", "facebook", "linkedin-in"].map((icon, index) => (
                  <a key={index} href="#" className="text-indigo-300 hover:text-white transition-colors duration-200">
                    <i className={`fab fa-${icon} text-xl`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Illustration */}
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
              <img
                src="https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png"
                alt="Illustration"
                className="relative z-10 mx-auto animate-float"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-indigo-300">&copy; 2025 Nova. All rights reserved.</div>
          <nav className="flex space-x-6 text-sm text-indigo-300 mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Contact Us"].map((item, index) => (
              <Link key={index} to="#" className="hover:text-white transition-colors duration-200">{item}</Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
