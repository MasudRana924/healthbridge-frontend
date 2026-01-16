import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import imgAvatar from '../../assets/avatar.png';

const DoctorsLists = ({ doctor }) => {
  const { name, work, expert, degree, fees, avatar, isActive, experience, ratings, _id } = doctor;

  return (
    <Link to={`/doctor/${_id}`} className="group block h-full">
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:border-primary-200 hover:-translate-y-1 h-full flex flex-col relative overflow-hidden">

        {/* Status Badge */}
        {isActive && (
          <div className="absolute top-4 right-4 z-10">
            <span className="flex items-center gap-1.5 bg-green-500/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              Online
            </span>
          </div>
        )}

        <div className="flex gap-4">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100 group-hover:border-primary-200 transition-colors">
            <img
              src={avatar?.url || imgAvatar}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              alt={name || "Doctor"}
            />
          </div>

          {/* Basic Info */}
          <div className="flex-1 min-w-0 py-1">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block bg-primary-50 text-primary-600 text-[10px] font-bold px-2 py-0.5 rounded mb-1.5 uppercase tracking-wide">
                  {expert || "Specialist"}
                </span>
                <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-primary-600 transition-colors truncate">
                  {name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 truncate">{degree || "MBBS"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="mt-4 pt-4 border-t border-slate-50 flex-grow flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm bg-slate-50 p-2 rounded-lg">
            <Icon icon="solar:hospital-bold" className="text-primary-500 text-lg flex-shrink-0" />
            <p className="truncate font-medium">{work || "General Hospital"}</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center bg-orange-50/50 p-2 rounded-xl group-hover:bg-orange-50 transition-colors">
              <Icon icon="solar:medal-ribbons-star-bold" className="text-orange-500 mb-1" />
              <span className="text-[10px] text-slate-400 font-bold uppercase">Exp</span>
              <span className="text-sm font-bold text-slate-700">{experience || 0}+</span>
            </div>
            <div className="flex flex-col items-center bg-blue-50/50 p-2 rounded-xl group-hover:bg-blue-50 transition-colors">
              <Icon icon="solar:star-bold" className="text-blue-500 mb-1" />
              <span className="text-[10px] text-slate-400 font-bold uppercase">Rating</span>
              <span className="text-sm font-bold text-slate-700">{ratings || 0}</span>
            </div>
            <div className="flex flex-col items-center bg-green-50/50 p-2 rounded-xl group-hover:bg-green-50 transition-colors">
              <Icon icon="solar:wallet-money-bold" className="text-green-500 mb-1" />
              <span className="text-[10px] text-slate-400 font-bold uppercase">Fee</span>
              <span className="text-sm font-bold text-slate-700">{fees || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

DoctorsLists.propTypes = {
  doctor: PropTypes.object.isRequired
};

export default DoctorsLists;