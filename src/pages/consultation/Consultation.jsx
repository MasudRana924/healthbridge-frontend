import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import Consultations from '../../components/consultations/Consultations';
import { fetchCategory } from '../../features/category/categorySlice';

const SkeletonConsultation = () => {
    return (
        <div className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <div className="w-full aspect-[4/3] rounded-2xl bg-slate-100 animate-pulse border border-slate-200 p-4 flex flex-col items-center justify-center">
                <div className="h-12 w-12 bg-slate-200 rounded-full mb-3"></div>
                <div className="h-4 w-20 bg-slate-200 rounded"></div>
            </div>
        </div>
    );
};

const Consultation = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.categories.categories);
    const { isLoading } = useSelector(state => state.categories);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    return (
        <div className="w-full">
            <div className="mb-8 flex items-center gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Icon icon="solar:filter-bold-duotone" className="text-xl" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-sm">Filter by Speciality</h3>
                    <p className="text-slate-500 text-xs mt-0.5">Select one or more specialities to find the right doctor for you.</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
                {(!isLoading && categories) ? (
                    categories.map((category) => (
                        <Consultations key={category._id} title={category.title} image={category.image} />
                    ))
                ) : (
                    Array(6).fill().map((_, index) => <SkeletonConsultation key={index} />)
                )}
            </div>
        </div>
    );
};

export default Consultation;
