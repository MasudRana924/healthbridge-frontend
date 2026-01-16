import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { fetchFilterNurses } from '../../features/nurses/nursesSlices';
import Nurse from '../../components/nurse/Nurse';

const Nurses = () => {
    const dispatch = useDispatch();
    const { nurses, isError, error } = useSelector((state) => state.filterNurses.filterNurses);
    const { isLoading } = useSelector((state) => state.filterNurses);
    const [location] = useState('');
    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        dispatch(fetchFilterNurses({ location }));
    }, [dispatch, location]);

    const handleSeeMore = () => {
        setVisibleCount((prevCount) => prevCount + 6);
    };

    let content;

    if (isLoading) {
        content = (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm animate-pulse h-[500px] flex flex-col">
                        <div className="h-60 bg-slate-100 rounded-2xl mb-4 w-full" />
                        <div className="space-y-3 flex-1">
                            <div className="h-6 bg-slate-100 rounded w-3/4" />
                            <div className="h-4 bg-slate-100 rounded w-full" />
                            <div className="h-4 bg-slate-100 rounded w-2/3" />
                        </div>
                        <div className="mt-6 flex gap-3">
                            <div className="h-16 bg-slate-100 rounded-xl w-1/2"></div>
                            <div className="h-16 bg-slate-100 rounded-xl w-1/2"></div>
                        </div>
                        <div className="mt-4 h-12 bg-slate-100 rounded-xl w-full"></div>
                    </div>
                ))}
            </div>
        )
    }

    if (!isLoading && isError) {
        content = (
            <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center flex items-center justify-center gap-2">
                <Icon icon="solar:danger-triangle-bold" className="text-xl" />
                {error}
            </div>
        );
    }

    if (!isLoading && !isError && nurses?.length === 0) {
        content = (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                    <Icon icon="solar:user-cross-bold-duotone" className="text-5xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No Nurses Found</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                    We couldn't find any nurses matching your criteria.
                </p>
            </div>
        );
    }

    if (!isLoading && !isError && nurses?.length > 0) {
        content = (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nurses.slice(0, visibleCount).map((nurse) => <Nurse key={nurse._id} nurse={nurse} />)}
            </div>
        );
    }

    return (
        <section className="min-h-[400px]">
            {content}
            {!isLoading && !isError && nurses?.length > visibleCount && (
                <div className="text-center mt-12">
                    <button
                        onClick={handleSeeMore}
                        className="px-8 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm flex items-center gap-2 mx-auto"
                    >
                        <span>Load More Nurses</span>
                        <Icon icon="solar:alt-arrow-down-bold" />
                    </button>
                </div>
            )}
        </section>
    );
};

export default Nurses;
