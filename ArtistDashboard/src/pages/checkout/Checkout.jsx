import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateArtistMonthlyEarning, fetchArtistSongAnalytics } from '../../store/analyticSlice';
import { DollarSign, Info, CheckCircle2 } from 'lucide-react';
import { artistCheckout } from '../../../../AdminDashboard/src/store/analyticSlice';
import { Link, useNavigate } from 'react-router-dom';
import { artistProfile } from '../../store/authSlice';
import { artistCheckoutHistory } from '../../store/checkoutSlice';
import { FaCheckCircle, FaThumbsUp } from 'react-icons/fa';  // Font Awesome



const Checkout = () => {
    const { artistSongAnalytics, artistMonthlyEarning } = useSelector((state) => state.analytics);
    const { checkoutData } = useSelector((state) => state.checkout);
    const dispatch = useDispatch();
    const [checkoutDone, setCheckoutDone] = useState(false);

    const navigate = useNavigate();
    const { profile, status } = useSelector((state) => state.auth);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(artistProfile()); // Fetch user profile only if the token exists
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchArtistSongAnalytics());
        dispatch(calculateArtistMonthlyEarning());
        dispatch(artistCheckoutHistory());
    }, [dispatch]);

    const handleCheckout = () => {
        dispatch(artistCheckout());
        setCheckoutDone(true);
        alert('Checkout successful! Earnings will be processed shortly.');
    };

    const downloadCheckoutDetails = () => {
        if (!artistSongAnalytics || artistSongAnalytics.length === 0) return;

        const summary = `
=== TuneCasa Artist Checkout Receipt ===

Artist: ${profile?.username}
Total Earnings: NPR ${artistMonthlyEarning?.totalEarnings?.toFixed(2) || '0.00'}
Date: ${new Date().toLocaleString()}

Breakdown by Songs:
${artistSongAnalytics.map(song => (
            `- ${song.songName}
  Views: ${song.totalViews}
  Watch Time: ${song.totalWatchTime} sec
  Earnings: NPR ${song.totalEarning?.toFixed(2) || '0.00'}`
        )).join('\n\n')}

----------------------------
Thank you for using TuneCasa!
`;

        const blob = new Blob([summary], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `TuneCasa-Checkout-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 md:px-10 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Earnings Checkout</h2>

            {/* Earnings Summary */}
            <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 transition-all duration-300">
                <div className="flex items-center space-x-4">
                    <DollarSign className="w-10 h-10 text-yellow-300" />
                    <div>
                        <h3 className="text-xl font-semibold">Earn from the song</h3>
                        <p className="text-4xl font-bold text-white">
                            NPR {artistMonthlyEarning?.totalEarnings?.toFixed(2) || '0.00'}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    {artistMonthlyEarning?.totalEarnings >= 1000 && !checkoutDone && (
                        <button
                            onClick={handleCheckout}
                            className="bg-white text-green-700 hover:bg-green-100 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg"
                        >
                            Confirm Checkout
                        </button>
                    )}

                    {checkoutDone && (
                        <button
                            onClick={downloadCheckoutDetails}
                            className="bg-gray-100 text-gray-800 hover:bg-white font-medium px-5 py-2 rounded-xl transition-all duration-300 shadow-md"
                        >
                            Download Details
                        </button>
                    )}
                </div>
            </div>

            {/* Songs Breakdown */}
            {artistMonthlyEarning?.songs?.length > 0 && (
                <div className="mb-10">
                    <h4 className="text-2xl font-semibold mb-4">Earnings Breakdown by Song</h4>
                    <div className="grid gap-4">
                        {artistMonthlyEarning.songs.map((song) => (
                            <div
                                key={song._id}
                                className="bg-gray-800 rounded-lg p-4 flex justify-between items-center shadow-md hover:bg-gray-700 transition"
                            >
                                <div>
                                    <h5 className="text-lg font-bold">{song.songName}</h5>
                                    <p className="text-sm text-gray-400">Views: {song.totalViews}</p>
                                    <p className="text-sm text-gray-400">Watch Time: {song.totalWatchTime} sec</p>
                                </div>
                                <div className="text-green-400 font-bold text-lg">
                                    NPR {song.earning?.toFixed(2) || '0.00'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Checkout History */}
            {checkoutData?.length > 0 && (
                <div className="bg-gray-800 p-6 rounded-2xl shadow-md mb-6">
                    <h4 className="text-2xl font-semibold mb-4">Checkout History</h4>
                    <div className="space-y-4">
                        {checkoutData.map((checkout) => (
                            <Link to={`/${checkout._id}`} key={checkout._id}>
                                <div className="bg-gray-700 rounded-lg p-4 flex justify-between items-center shadow-md mb-4"> {/* Added mb-4 for margin bottom */}
                                    <div>
                                        <h5 className="text-lg font-bold text-white">Amount: NPR {checkout.amount.toFixed(2)}</h5>
                                        <p className="text-sm text-gray-400">Date: {new Date(checkout.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-green-400 font-bold text-lg">
                                        <FaCheckCircle className="w-6 h-6 text-green-400" /> Done
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}


            {/* Notes and Info */}
            <div className="bg-gray-800 p-6 rounded-2xl shadow-md mb-6 flex items-start space-x-4">
                <Info className="text-yellow-400 w-6 h-6 mt-1" />
                <div>
                    <h4 className="text-lg font-semibold mb-2">Important Notes:</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-300 space-y-1">
                        <li>The minimum earnings required for checkout on TuneCasa is NPR 1000.</li>
                        <li>Your checkout request will be processed within 3–5 business days after submission.</li>
                        <li>Ensure your payment details are up-to-date for smooth transactions.</li>
                        <li>You will receive a notification once your earnings are processed and the transaction is initiated.</li>
                    </ul>

                </div>
            </div>

            {/* Status Badge */}
            {artistMonthlyEarning?.totalEarnings >= 1000 ? (
                <div className="flex items-center justify-center mt-8">
                    <div className="bg-green-600 px-6 py-3 rounded-full text-white flex items-center gap-2 font-semibold shadow-lg">
                        <CheckCircle2 className="w-5 h-5" />
                        Eligible for Checkout
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center mt-8">
                    <div className="bg-red-600 px-6 py-3 rounded-full text-white flex items-center gap-2 font-semibold shadow-lg">
                        <Info className="w-5 h-5" />
                        You do not have enough earnings for checkout.
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
