import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { fetchDoctor } from '../../features/doctor/doctorSlice';
import { createreviews } from '../../features/doctor/reviewSlice';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import ReviewComponent from '../../components/reviews/ReviewComponent';

const SingleDoctor = () => {
  const dispatch = useDispatch();
  const { loggeduser } = useSelector((state) => state.userDetails);
  const userToken = loggeduser.token;
  const { doctorId } = useParams();
  const { doctor, isLoading, isError, error } = useSelector((state) => state.doctor.doctor);

  const [activeTab, setActiveTab] = useState('about');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(fetchDoctor(doctorId));
  }, [dispatch, doctorId]);

  const reviewSubmitHandler = () => {
    if (!comment || rating === 0) return;
    const data = ({ rating, comment, doctorId: doctor._id });
    if (userToken) {
      dispatch(createreviews({ data, userToken }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center pt-20">
          <div className="flex flex-col items-center gap-4">
            <Icon icon="svg-spinners:ring-resize" className="text-4xl text-primary-500" />
            <p className="text-slate-500 font-medium">Loading Doctor Profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="solar:danger-triangle-bold" className="text-3xl text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Something Went Wrong</h2>
            <p className="text-slate-500">{error || "Could not load doctor details."}</p>
            <Link to="/" className="mt-6 inline-block bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition">
              Go Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Doctor Profile Header */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
            {/* Cover Banner */}
            <div className="h-48 bg-gradient-to-r from-primary-500 to-primary-700 relative">
              <div className="absolute inset-0 opacity-20 pattern-dots-sm text-white"></div>
            </div>

            <div className="px-8 pb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6 -mt-16">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl border-4 border-white shadow-lg overflow-hidden bg-white">
                    <img
                      src={doctor?.avatar?.url || 'https://placehold.co/400'}
                      alt={doctor?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {doctor?.isActive && (
                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full" title="Online"></div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-primary-50 text-primary-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                          {doctor?.type || 'Specialist'}
                        </span>
                        <div className="flex text-yellow-400 text-sm">
                          <Icon icon="solar:star-bold" />
                          <span className="text-slate-700 font-semibold ml-1">4.9</span>
                          <span className="text-slate-400 ml-1">(120+ Reviews)</span>
                        </div>
                      </div>
                      <h1 className="text-3xl font-bold text-slate-900 mb-1">
                        {doctor?.title} {doctor?.name}
                      </h1>
                      <p className="text-slate-500 text-lg flex items-center gap-2">
                        {doctor?.degree} - <span className="text-primary-600 font-medium">{doctor?.expert}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link to="/onsite/appointment">
                        <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-slate-200 transition-all transform active:scale-95">
                          <Icon icon="solar:hospital-bold" className="text-xl" />
                          <span>Book Appointment</span>
                        </button>
                      </Link>
                      {/* <button className="flex items-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-700 px-6 py-3 rounded-xl font-semibold border border-primary-200 transition-all active:scale-95">
                                      <Icon icon="solar:videocamera-record-bold" className="text-xl" />
                                      <span>Video Consult</span>
                                  </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Details */}
            <div className="lg:col-span-8 space-y-8">
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Experience', value: `${doctor?.experience}+ Years`, icon: 'solar:medal-ribbons-star-bold', color: 'text-orange-500', bg: 'bg-orange-50' },
                  { label: 'Patients', value: '5000+', icon: 'solar:users-group-rounded-bold', color: 'text-blue-500', bg: 'bg-blue-50' },
                  { label: 'Reviews', value: '250+', icon: 'solar:chat-round-line-bold', color: 'text-purple-500', bg: 'bg-purple-50' },
                  { label: 'Consult Fee', value: `${doctor?.fees} BDT`, icon: 'solar:wallet-money-bold', color: 'text-green-500', bg: 'bg-green-50' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all">
                    <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-full flex items-center justify-center mb-3`}>
                      <Icon icon={stat.icon} className="text-xl" />
                    </div>
                    <span className="text-sm text-slate-400 font-medium">{stat.label}</span>
                    <span className="text-lg font-bold text-slate-800">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* About Section */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Icon icon="solar:user-id-bold" className="text-primary-500" />
                  About Doctor
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {doctor?.description || "Dr. " + doctor?.name + " is a highly skilled specialist with years of exprience in " + doctor?.expert + ". Dedicated to providing top-quality patient care and staying updated with the latest medical advancements."}
                </p>

                <div className="mt-8">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <Icon icon="solar:buildings-bold" className="text-slate-400" />
                    Current Workplace
                  </h4>
                  <p className="text-slate-600 bg-slate-50 inline-block px-4 py-2 rounded-lg border border-slate-100">
                    {doctor?.work || 'Not specified'}
                  </p>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Icon icon="solar:stars-bold" className="text-yellow-500" />
                  Patient Reviews
                </h3>
                <ReviewComponent />

                {/* Add Review */}
                {loggeduser?.user && (
                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-4">Write a Review</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className={`text-2xl transition-colors ${rating >= star ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-200'}`}
                          >
                            <Icon icon="solar:star-bold" />
                          </button>
                        ))}
                      </div>
                      <textarea
                        placeholder="Share your experience..."
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      <button
                        onClick={reviewSubmitHandler}
                        disabled={!comment || rating === 0}
                        className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Information/Ads */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-primary-50 p-6 rounded-3xl border border-primary-100">
                <h3 className="font-bold text-primary-800 mb-2">Need Help?</h3>
                <p className="text-primary-600 text-sm mb-4">
                  Call our support center for immediate assistance with booking.
                </p>
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                    <Icon icon="solar:phone-bold" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">Hotline</p>
                    <p className="text-lg font-bold text-slate-800">16263</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SingleDoctor;
