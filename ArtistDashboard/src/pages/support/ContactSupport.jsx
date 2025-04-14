import React from 'react';

const ContactSupport = () => {
  return (
    <div className="bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-white mb-8">TuneCasa Terms of Service</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-400">
            By accessing and using TuneCasa, you accept and agree to be bound by these terms and conditions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">2. Use License</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <ul className="space-y-4 text-gray-300">
              <li className="flex gap-3">
                <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>You are allowed to listen to music and use features for personal and non-commercial purposes only.</span>
              </li>
              <li className="flex gap-3">
                <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>This does not grant ownership of any content or media on TuneCasa.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">3. Disclaimer</h2>
          <div className="bg-yellow-900 border-l-4 border-yellow-600 p-4">
            <p className="text-yellow-300">
              TuneCasa is provided "as is". We do not guarantee uninterrupted access or error-free functionality and disclaim all warranties to the fullest extent permitted by law.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">4. Limitations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-medium text-white mb-2">Time Limitations</h3>
              <p className="text-gray-400">Any issues must be reported within 30 days.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-medium text-white mb-2">Liability</h3>
              <p className="text-gray-400">TuneCasa is not responsible for data loss or damages.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">5. Revisions</h2>
          <p className="text-gray-400">
            These terms may change at any time. Continued use of TuneCasa means you agree to the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">6. Contact</h2>
          <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-between">
            <p className="text-gray-400">Have questions about these terms?</p>
            <a
              href="prabinghimire625@gmail.com"
              className="inline-flex items-center text-blue-400 hover:text-blue-300"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactSupport;
