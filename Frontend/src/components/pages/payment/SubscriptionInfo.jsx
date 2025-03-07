import React from 'react'
import {Link} from "react-router-dom"

const SubscriptionInfo = () => {
  return (
    <>
    <div className="flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-purple-700 text-white py-12">
        <div className="text-center">
        
            <h2 className="text-5xl font-bold text-center max-w-6xl">
            Get TuneCasa Premium to enjoy ad-free music, download tracks, unlimited skips
            </h2>
            <Link to=""> <p className="mt-4 text-md">
            1-month for <span className="font-bold">US$ 2.99 </span> • Then <span className="font-bold">US$2.99/month</span> • Cancel at any time
            </p></Link>
            <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg font-semibold transition">
            Try 1 month for US$ 2.99
            </button>
            <p className="mt-4">
            Or save money with a <span className="text-blue-400 cursor-pointer hover:underline">family</span> or <span className="text-blue-400 cursor-pointer hover:underline">student plan</span>
            </p>
            <p className="mt-2 text-sm text-gray-400">
            You'll be reminded 7 days before your trial ends.
            </p>
        </div>
    </div>
    </>
  )
}

export default SubscriptionInfo
