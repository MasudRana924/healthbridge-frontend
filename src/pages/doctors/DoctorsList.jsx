import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Search } from 'lucide-react';
import { fetchFilterDoctors } from '../../features/filter/filterSlice';
import DoctorsLists from './DoctorsLists';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
        // Render skeletons when loading
        content = (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="mt-5 border bg-white rounded-lg p-4">
                        <div className="w-full mb-5">
                            <Skeleton className="w-full h-36 border rounded-lg" />
                        </div>
                        <div className="w-full text-start">
                            <div className="flex items-center mt-3">
                                <p className="font-medium">
                                    <Skeleton width={100} />
                                </p>
                                <Skeleton className="ml-2 text-3xl" width={24} height={24} />
                            </div>
                            <p className="text-gray-900 text-sm">
                                <Skeleton width={150} />
                            </p>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm mt-3">Specialities</p>
                                    <p className="text-sm">
                                        <Skeleton width={120} />
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm mt-3">Fees</p>
                                    <p className="text-sm">
                                        <Skeleton width={50} />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="text-start mt-5 mb-5">
                            <p className="text-slate-600 text-md font-medium flex items-center gap-2">
                                <Skeleton width={20} height={20} />
                                <Skeleton width={200} />
                            </p>

                            <div className="flex justify-between mt-4">
                                <div>
                                    <p className="text-slate-400 text-sm">Experience</p>
                                    <p className="text-md text-black">
                                        <Skeleton width={40} /> Years
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm">Total Ratings</p>
                                    <p className="text-md">
                                        <Skeleton width={40} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    } else if (!isLoading && isError) {
        // Show error if there's an issue
        content = <div className="col-span-12">{error}</div>;
    } else if (!isLoading && !isError && doctors?.length === 0) {
        // Show "No Doctors Found" message if there are no doctors
        content = (
            <div className="w-full md:mt-12  flex flex-col items-center justify-center py-12 px-4">
                <div className="bg-gray-50 rounded-full p-6 mb-6">
                    <Search className="w-16 h-16 text-red-500" />
                </div>

                <h3 className="text-xl font-semibold text-red-500 mb-2">
                    No Doctors Found
                </h3>

                <p className="text-gray-500 text-center max-w-sm mb-6">
                    We couldnt find any doctors matching your search criteria. Try adjusting your filters or search terms.
                </p>
            </div>
        );
    } else if (!isLoading && !isError && doctors?.length > 0) {
        // Render the list of doctors
        content = (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {doctors.map(doctor => (
                    <DoctorsLists key={doctor._id} doctor={doctor} />
                ))}
            </div>
        );
    }
    return (
        <div className=" w-11/12 lg:flex md:w-10/12 lg:w-10/12 xl:w-10/12 2xl:w-9/12 justify-between mx-auto mb-20 lg:mt-4">
            <div className="w-full md:w-full lg:w-full">
                {content}
            </div>
        </div>
    );
};
export default DoctorsList;
