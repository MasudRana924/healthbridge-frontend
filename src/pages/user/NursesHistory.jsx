import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchHireNurses } from '../../features/user/hirenurse/myHireNurseSlice';
import { Icon } from '@iconify/react';

const NursesHistory = () => {
    const { loggeduser } = useSelector((state) => state.userDetails);
    const userToken = loggeduser.token;
    const dispatch = useDispatch();
    const { hireNurse, isLoading, isError, error } = useSelector((state) => state.myHireNurses.myHireNurses);

    useEffect(() => {
        dispatch(fetchHireNurses({ userToken }));
    }, [dispatch, userToken]);

    let content;

    if (isLoading) {
        content = <div className="col-span-12 text-center p-8"><Icon icon="svg-spinners:ring-resize" className="text-3xl text-primary-500 inline-block" /></div>;
    } else if (isError) {
        content = <div className="col-span-12 bg-red-50 text-red-600 p-4 rounded-xl">{error}</div>;
    } else if (hireNurse?.length === 0) {
        content = (
            <div className="col-span-12 text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Icon icon="solar:user-cross-bold" className="text-3xl" />
                </div>
                <h3 className="text-slate-800 font-bold mb-2">No Hired Nurses</h3>
                <Link to="/nurses" className="text-primary-600 font-bold hover:underline">Find a Nurse Now</Link>
            </div>
        );
    } else {
        content = hireNurse.map((hire) => (
            <div key={hire._id} className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                            <img src={hire.nurseimage || 'https://placehold.co/100'} className="w-full h-full object-cover" alt={hire.nursename} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-800 truncate">{hire.nursename}</h4>
                            <p className="text-primary-600 text-sm font-semibold flex items-center gap-1 mt-1">
                                <Icon icon="solar:bill-bold" />
                                {hire.nursefees} Tk
                            </p>
                            <div className="text-xs text-slate-500 mt-2 bg-slate-50 inline-block px-2 py-1 rounded">
                                {new Date(hire.date).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                <Icon icon="solar:user-hands-bold" className="text-primary-500" />
                Hired Nurses History
            </h2>
            <div className="grid grid-cols-12 gap-4">
                {content}
            </div>
        </div>
    );
};

export default NursesHistory;