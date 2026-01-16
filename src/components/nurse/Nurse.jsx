import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Nurse = ({ nurse }) => {
    const { name, fees, images, location, description } = nurse;

    return (
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary-100 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
            <div className="relative h-60 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <Link to={`/nurse/${nurse._id}`} className="block w-full h-full">
                    <img
                        src={images?.[0]?.url || 'https://placehold.co/400x500'}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        alt={name}
                    />
                </Link>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/20 shadow-sm flex items-center gap-1">
                        <Icon icon="solar:verified-check-bold" className="text-sm" />
                        Verified
                    </span>
                </div>

                <button className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 p-2 rounded-full transition-all active:scale-95">
                    <Icon icon="solar:heart-bold" />
                </button>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5 text-xs font-medium mb-1 opacity-90">
                        <Icon icon="solar:map-point-bold" />
                        {location || "Dhaka, Bangladesh"}
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <Link to={`/nurse/${nurse._id}`} className="block">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors mb-1 line-clamp-1">
                        {name}
                    </h3>
                </Link>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {description || "Dedicated professional nurse providing compassionate care services."}
                </p>

                <div className="mt-auto space-y-4">
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-primary-50 rounded-xl p-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white text-primary-600 flex items-center justify-center shadow-sm">
                                <Icon icon="solar:wallet-money-bold" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-bold">Fee</p>
                                <p className="font-bold text-slate-900 text-sm">{fees} Tk</p>
                            </div>
                        </div>
                        <div className="bg-green-50 rounded-xl p-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white text-green-600 flex items-center justify-center shadow-sm">
                                <Icon icon="solar:star-bold" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-bold">Rating</p>
                                <p className="font-bold text-slate-900 text-sm">4.9/5</p>
                            </div>
                        </div>
                    </div>

                    <Link to={`/nurse/${nurse._id}`}>
                        <button className="w-full bg-slate-900 hover:bg-primary-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-200 transition-all flex items-center justify-center gap-2 group-hover:shadow-primary-500/30">
                            Book Nurse
                            <Icon icon="solar:arrow-right-bold" className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

Nurse.propTypes = {
    nurse: PropTypes.object.isRequired
};

export default Nurse;