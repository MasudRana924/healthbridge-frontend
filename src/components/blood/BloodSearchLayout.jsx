import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';

const BloodGroupCard = ({ bloodGroup, isEmergency = false }) => {
  const dispatch = useDispatch();
  // const { selectedBloodGroups } = useSelector(state => state.bloodFilter);
  // const isSelected = selectedBloodGroups.includes(bloodGroup);
  let isSelected = false; // Placeholder logic until reducer is connected fully

  const handleSelect = () => {
    // Dispatch logic here
    if (isSelected) {
      // dispatch({ type: 'REMOVE_BLOOD_GROUP', payload: bloodGroup });
    } else {
      // dispatch({ type: 'ADD_BLOOD_GROUP', payload: bloodGroup });
    }
  };

  return (
    <div className="col-span-6 sm:col-span-3">
      <button
        onClick={handleSelect}
        className={`
          relative w-full h-full min-h-[140px]
          flex flex-col items-center justify-center p-4 rounded-2xl
          transition-all duration-300 ease-out
          border
          ${isSelected
            ? 'bg-red-50 border-red-500 shadow-lg shadow-red-100 ring-2 ring-red-200'
            : 'bg-white border-slate-100 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1'
          }
          group
        `}
      >
        <div className={`
          w-16 h-16 mb-3 rounded-full 
          flex items-center justify-center
          transition-all duration-300
          ${isSelected ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-500/30'}
        `}>
          <div className="text-2xl font-bold">{bloodGroup}</div>
        </div>

        <span className={`
          font-medium text-sm
          transition-colors duration-200
          ${isSelected ? 'text-red-700' : 'text-slate-500 group-hover:text-red-600'}
        `}>
          Blood Group
        </span>

        {isEmergency && (
          <div className="absolute top-2 right-2 animate-pulse" title="High Demand">
            <Icon icon="solar:danger-circle-bold" className="text-red-500 text-lg" />
          </div>
        )}
      </button>
    </div>
  );
};

const BloodGroupSelector = () => {
  const bloodGroups = [
    { group: 'A+', emergency: true },
    { group: 'A-', emergency: false },
    { group: 'B+', emergency: true },
    { group: 'B-', emergency: false },
    { group: 'O+', emergency: true },
    { group: 'O-', emergency: false },
    { group: 'AB+', emergency: false },
    { group: 'AB-', emergency: true },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200 border border-slate-100 p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
          <Icon icon="solar:dropper-bold" className="text-red-500 text-3xl" />
          Select Blood Group
        </h2>
        <p className="text-slate-500 mt-2">Find donors matching the required blood group</p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {bloodGroups.map((blood) => (
          <BloodGroupCard
            key={blood.group}
            bloodGroup={blood.group}
            isEmergency={blood.emergency}
          />
        ))}
      </div>
    </div>
  );
};

BloodGroupCard.propTypes = {
  bloodGroup: PropTypes.string.isRequired,
  isEmergency: PropTypes.bool
};

export default BloodGroupSelector;