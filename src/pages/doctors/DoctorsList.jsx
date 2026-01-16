import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { fetchFilterDoctors } from '../../features/filter/filterSlice';
import DoctorsLists from './DoctorsLists';

const DoctorsList = () => {
    const dispatch = useDispatch();
    const { doctors, isError, error } = useSelector(state => state.filterDoctors.filterDoctors);
    const { isLoading } = useSelector(state => state.filterDoctors);
    const { experts, fees, genders, ratingss, search, status } = useSelector(state => state.filter);

    useEffect(() => {
        dispatch(fetchFilterDoctors({ experts, fees, genders, ratingss, search, status }));
    }, [dispatch, experts, fees, genders, ratingss, search, status]);

    let content;
    if (isLoading) {
        content = (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-pulse">
                        <div className="flex gap-4 mb-4">
                            <div className="w-20 h-20 bg-slate-100 rounded-xl" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-slate-100 rounded w-3/4" />
                                <div className="h-3 bg-slate-100 rounded w-1/2" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-3 bg-slate-100 rounded w-full" />
                            <div className="h-3 bg-slate-100 rounded w-2/3" />
                        </div>
                    </div>
                ))}
            </div>
        );
    } else if (!isLoading && isError) {
        content = (
            <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center flex items-center justify-center gap-2">
                <Icon icon="solar:danger-triangle-bold" className="text-xl" />
                {error}
            </div>
        );
    } else if (!isLoading && !isError && doctors?.length === 0) {
        content = (
            <div className="text-center py-16 px-4">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-50 mb-6 text-slate-300">
                    <Icon icon="solar:magnifer-bold-duotone" className="text-5xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No Doctors Found</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                    We couldn't find any doctors matching your search criteria. Try adjusting your filters.
                </p>
            </div>
        );
    } else if (!isLoading && !isError && doctors?.length > 0) {
        content = (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map(doctor => (
                    <DoctorsLists key={doctor._id} doctor={doctor} />
                ))}
            </div>
        );
    }

    return (
        <div className="w-full">
            {content}
        </div>
    );
};

export default DoctorsList;
