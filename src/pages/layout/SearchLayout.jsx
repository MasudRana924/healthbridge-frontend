import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { fetchFilterMedicne } from '../../features/medicine/FilterMedicineSlice';
import { addsearchToStore } from '../../features/medicine/searchSlice';
import { searched } from '../../features/filter/filterReducer';

const SearchLayout = () => {
    const dispatch = useDispatch();
    const { search } = useSelector(state => state.filter);
    const [input, setInput] = useState(search);
    const { cartTotalQuantity } = useSelector((state) => state.cart);
    const { searchList } = useSelector(state => state.searchList);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searched(input));
        dispatch(addsearchToStore(input));
    };

    useEffect(() => {
        dispatch(fetchFilterMedicne({ search }));
    }, [dispatch, search]);

    return (
        <div className="w-full max-w-5xl mx-auto -mt-8 relative z-20 px-4">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Icon icon="solar:capsule-bold" className="text-primary-500 text-2xl" />
                            Search Medicine
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">Find your required medicines instantly</p>
                    </div>

                    <Link
                        to="/cart"
                        className="relative group flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 text-slate-600 hover:bg-primary-500 hover:text-white transition-all duration-300"
                    >
                        <Icon icon="solar:cart-large-bold" className="text-2xl" />
                        {cartTotalQuantity > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-bounce">
                                {cartTotalQuantity}
                            </span>
                        )}
                    </Link>
                </div>

                <div className="flex gap-3">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Icon icon="solar:magnifer-bold" className="text-xl" />
                        </div>
                        <input
                            className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-slate-800 placeholder-slate-400 text-lg"
                            type="search"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type medicine name (e.g. Napa, Histasin)..."
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="bg-primary-500 hover:bg-primary-600 text-white px-8 rounded-xl font-semibold shadow-lg shadow-primary-500/30 transition-all transform hover:scale-105 active:scale-95 hidden md:block"
                    >
                        Search
                    </button>
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="bg-primary-500 hover:bg-primary-600 text-white w-14 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 transition-all active:scale-95 md:hidden h-14"
                    >
                        <Icon icon="solar:arrow-right-bold" className="text-2xl" />
                    </button>
                </div>

                {searchList && searchList.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2 items-center">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">Recent:</span>
                        <div className="flex flex-wrap gap-2">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm text-slate-600 border border-slate-100 transition-colors cursor-pointer">
                                <Icon icon="solar:history-bold" className="text-slate-400 text-xs" />
                                {searchList}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchLayout;
