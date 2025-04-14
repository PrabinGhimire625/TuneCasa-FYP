import React, { useState } from 'react';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      title: 'Getting Started with TuneCasa',
      description: 'Learn the basics of using TuneCasa to explore music, connect with artists, and enjoy seamless playback.',
      link: '#',
    },
    {
      title: 'Managing Your Account',
      description: 'Update your preferences, handle privacy settings, and control your subscription or free usage.',
      link: '#',
    },
    {
      title: 'Troubleshooting Playback Issues',
      description: 'Having trouble with audio or video playback? Here’s how to fix the most common issues.',
      link: '#',
    },
  ];

  const faqs = [
    {
      question: 'How do I reset my TuneCasa password?',
      answer: 'Click on "Forgot Password" from the login screen and follow the email instructions to reset it.',
    },
    {
      question: 'Can I upgrade to an artist profile later?',
      answer: 'Yes, you can upgrade anytime through the settings under your account dashboard.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">TuneCasa Help Center</h1>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">Contact Support</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 p-4 text-lg border rounded-lg shadow focus:ring-2 focus:ring-white focus:outline-none text-gray-900"
          />
        </div>

        {/* Categories */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories
            .filter((cat) => cat.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((cat, index) => (
              <div key={index} className="bg-gray-800 text-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold mb-2">{cat.title}</h2>
                <p>{cat.description}</p>
                <a href={cat.link} className="text-blue-600 mt-4 inline-block">Learn More →</a>
              </div>
            ))}
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800 text-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HelpCenter;
