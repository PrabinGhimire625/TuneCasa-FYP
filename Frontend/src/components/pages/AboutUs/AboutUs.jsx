import React from 'react';
import {
  Music,
  Users,
  Rocket,
  Mail,
  HeartHandshake,
  HelpCircle,
  Globe,
} from 'lucide-react';
import Footer from '../../../globals/components/footer/Footer';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white font-sans">
      {/* Content Section */}
      <div className="flex-grow px-4 md:px-8 py-12 mb-10">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide mb-4">
            Welcome to <span className="text-white">TuneCasa</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            A next-gen music platform where artists and listeners connect, collaborate, and vibe together—without the noise.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          <FeatureCard
            Icon={Music}
            title="Ad-Free Music"
            desc="Enjoy your favorite tracks without interruptions. No subscriptions, no limits."
          />
          <FeatureCard
            Icon={Users}
            title="Book Artist"
            desc="User can book the artist for event, party or concert directly through TuneCasa’s booking system."
          />
          <FeatureCard
            Icon={Rocket}
            title="Innovative Experience"
            desc="Offline listening, video music, and a smooth UI to keep you in the zone."
          />
        </div>

        {/* Our Story */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            We started TuneCasa with a simple idea: bring music back to its purest form. No paywalls, no endless ads—just authentic connection between creators and fans. 
            We’re music lovers, developers, dreamers—and we built TuneCasa for people like you.
          </p>
        </div>

        {/* Unique Features */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          <FeatureCard
            Icon={HeartHandshake}
            title="Community Driven"
            desc="We listen to your feedback and evolve the platform with you in mind."
          />
          <FeatureCard
            Icon={HelpCircle}
            title="Customer Support"
            desc="Got an issue or idea? Our support team is here for you 24/7."
          />
          <FeatureCard
            Icon={Globe}
            title="Global Reach"
            desc="Artists and fans from all corners of the world. Music knows no boundaries."
          />
        </div>

        {/* Our Mission */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            TuneCasa is more than just a music platform—it's a creative hub where artists thrive and listeners discover pure, uninterrupted sound. 
            We aim to give power back to the creators and joy back to the listeners. No ads. No gatekeeping. Just music.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-black/20 mt-8 border border-white/10 rounded-xl py-10 px-6 text-center max-w-3xl mx-auto">
          <Mail className="mx-auto text-white mb-4" size={32} />
          <h3 className="text-xl sm:text-2xl font-semibold">Let’s Connect</h3>
          <p className="text-gray-400 mt-2 mb-4">
            Want to collaborate or have questions? Drop us a message anytime.
          </p>
          <a
            href="mailto:support@tunecasa.com"
            className="inline-block mt-3 px-5 py-2.5 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
};

const FeatureCard = ({ Icon, title, desc }) => (
  <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-lg shadow-white/5 hover:shadow-white/10 transition duration-300 text-center">
    <Icon className="mx-auto mb-4 text-white" size={40} />
    <h3 className="font-semibold text-xl mb-2">{title}</h3>
    <p className="text-sm text-gray-400">{desc}</p>
  </div>
);

export default AboutUs;
