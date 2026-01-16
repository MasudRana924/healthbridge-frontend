import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import { fetchFilterNurses } from '../../features/nurses/nursesSlices';

const locations = ["Uttara", "Dhanmondi", "Mirpur", "Banani", "Gulshan"];

const SearchNurseLayout = () => {
    const dispatch = useDispatch();
    const [location, setLocation] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchFilterNurses({ location }));
    }, [dispatch, location]);

    const handleSearch = () => {
        if (search.trim()) {
            dispatch(fetchFilterNurses({ search }));
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto -mt-8 relative z-20 px-4">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Icon icon="solar:user-heart-bold" className="text-indigo-500 text-2xl" />
                        Find a Nurse
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">Search by name, specialty, or location</p>
                </div>

                <div className="flex gap-3 mb-6">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Icon icon="solar:magnifer-bold" className="text-xl" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name or specialty..."
                            className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-800 placeholder-slate-400 text-lg"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-105 active:scale-95 hidden md:block"
                    >
                        Search
                    </button>
                    <button
                        onClick={handleSearch}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white w-14 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 transition-all active:scale-95 md:hidden h-14"
                    >
                        <Icon icon="solar:arrow-right-bold" className="text-2xl" />
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold text-slate-500 flex items-center gap-1">
                        <Icon icon="solar:map-point-bold" className="text-indigo-500" />
                        Popular Locations:
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {locations.map((loc) => (
                            <button
                                key={loc}
                                onClick={() => setLocation(loc)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${location === loc
                                        ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-200 hover:text-indigo-500'
                                    }`}
                            >
                                {loc}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchNurseLayout;
