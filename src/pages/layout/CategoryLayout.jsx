import { Outlet } from 'react-router-dom';
import { Icon } from '@iconify/react';

const CategoryLayout = () => {
    return (
        <div className="w-full max-w-5xl mx-auto -mt-6">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                        <div className="p-2 bg-primary-50 rounded-lg text-primary-500">
                            <Icon icon="solar:magnifer-bold" className="text-xl" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-800">Find Your Specialist</h2>
                    </div>

                    <div className="min-h-[300px]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryLayout;
