import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { expertRemoved, expertSelected } from '../../features/filter/filterReducer';
import { Icon } from '@iconify/react';

const Consultations = ({ title, image }) => {
  const dispatch = useDispatch();
  const { experts } = useSelector(state => state.filter);

  const isSelected = experts.includes(title);

  const handleSelect = () => {
    if (isSelected) {
      dispatch(expertRemoved(title));
    } else {
      dispatch(expertSelected(title));
    }
  };

  return (
    <div className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
      <button
        onClick={handleSelect}
        className={`
                    relative w-full h-full min-h-[140px]
                    flex flex-col items-center justify-center p-4 rounded-2xl
                    transition-all duration-300 ease-out
                    border
                    ${isSelected
            ? 'bg-primary-50 border-primary-500 shadow-lg shadow-primary-100 ring-2 ring-primary-200'
            : 'bg-white border-slate-100 hover:border-primary-200 hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-1'
          }
                    group
                `}
      >
        <div className={`
                    w-16 h-16 mb-3 rounded-full overflow-hidden 
                    flex items-center justify-center
                    transition-transform duration-300
                    ${isSelected ? 'bg-white' : 'bg-slate-50'}
                    group-hover:scale-110
                `}>
          <img
            src={image?.url || 'https://placehold.co/100x100?text=Icon'}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <span className={`
                    font-medium text-sm text-center line-clamp-2
                    transition-colors duration-200
                    ${isSelected ? 'text-primary-700 font-semibold' : 'text-slate-600 group-hover:text-primary-600'}
                `}>
          {title}
        </span>

        {isSelected && (
          <div className="absolute top-2 right-2 text-primary-500">
            <Icon icon="solar:check-circle-bold" className="text-xl" />
          </div>
        )}
      </button>
    </div>
  );
};

Consultations.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string
  }).isRequired
};

export default Consultations;
