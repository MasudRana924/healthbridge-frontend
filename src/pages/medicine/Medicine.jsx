import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { fetchFilterMedicne } from '../../features/medicine/FilterMedicineSlice';
import Medicines from '../../components/medicines/Medicines';

const Medicine = () => {
    const dispatch = useDispatch();
    const { medicines } = useSelector(state => state.medicines.medicines);
    const { isLoading } = useSelector(state => state.medicines);
    const { search } = useSelector(state => state.filter);

    useEffect(() => {
        dispatch(fetchFilterMedicne({ search }));
    }, [dispatch, search]);

    let content;

    if (medicines?.length === 0 && !isLoading) {
        content = (
            <div className="flex flex-col items-center justify-center py-20 text-center col-span-12">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                    <Icon icon="solar:pill-broken-bold-duotone" className="text-5xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                    No Medicine Found
                </h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                    We couldn't find any medicine matching your search criteria. Try adjusting your search terms.
                </p>
            </div>
        );
    }

    if (medicines?.length > 0 && !isLoading) {
        content = medicines.map(medicine => (
            <Medicines key={medicine._id} medicine={medicine} />
        ));
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-12 gap-6">
                {isLoading ? (
                    Array(6).fill().map((_, index) => (
                        <div key={index} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-100 h-[380px] flex flex-col animate-pulse">
                            <div className="bg-slate-100 h-48 rounded-xl mb-4 w-full"></div>
                            <div className="h-4 bg-slate-100 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-slate-100 rounded w-1/4 mb-6"></div>
                            <div className="mt-auto flex justify-between items-center">
                                <div className="h-6 bg-slate-100 rounded w-20"></div>
                                <div className="h-10 bg-slate-100 rounded w-24"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    content
                )}
            </div>
        </div>
    );
};

export default Medicine;
