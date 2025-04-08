import React from 'react'
import Footer from '../../../globals/components/footer/Footer'

const Feature = () => {
  return (
    <>
        <div className=" text-white text-white py-16 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center max-w-2xl">
        Over many songs, contact artist for live performances and more at your fingertips
      </h2>

      <div className="mt-12 flex flex-wrap justify-center gap-12">
        {/* Feature 1 - Ad-free listening */}
        <div className="flex flex-col items-center text-center max-w-xs">
          <div className="bg-indigo-900 p-4 rounded-lg flex items-center justify-center w-16 h-16">
            <span className="text-black text-xl font-bold">AD✖</span>
          </div>
          <p className="mt-4 text-lg">
          Enjoy an ad-free experience with unlimited skips and no interruptions
          </p>
        </div>

        {/* Feature 2 - Offline download */}
        <div className="flex flex-col items-center text-center max-w-xs">
          <div className="bg-indigo-900 p-4 rounded-lg flex items-center justify-center w-16 h-16">
            <span className="text-black text-xl font-bold">⬇🎵</span>
          </div>
          <p className="mt-4 text-lg">
          Download your favourite music and enjoy it offline, anywhere, anytime
          </p>
        </div>

        {/* Feature 3 - Book Artist for Concerts & Events */}
        <div className="flex flex-col items-center text-center max-w-xs">
          <div className="bg-blue-900 p-4 rounded-lg flex items-center justify-center w-16 h-16">
            <span className="text-black text-xl font-bold">🎤📅</span>
          </div>
          <p className="mt-4 text-lg">
            Book the artist for concerts, live shows, and other events
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Feature
