import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { logout } from '../../features/user/Login/loginSlice';

const UserLayout = () => {
    const dispatch = useDispatch();
    const sidebarItems = [
        { name: "Account Information", path: "update-account", icon: "solar:user-id-bold" },
        { name: "Change Password", path: "change-password", icon: "solar:lock-password-bold" },
        { name: "Consultations History", path: "consultations-history", icon: "solar:stethoscope-bold" },
        { name: "Prescription History", path: "prescription-history", icon: "solar:document-medicine-bold" },
        { name: "Hired Nurses History", path: "nurses-history", icon: "solar:user-hands-bold" },
        { name: "Orders History", path: "orders-history", icon: "solar:cart-large-4-bold" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />

            <div className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Settings</h2>
                            <ul className="space-y-1">
                                {sidebarItems.map((item, index) => (
                                    <li key={index}>
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                                    ? 'bg-primary-50 text-primary-600'
                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                }`
                                            }
                                        >
                                            <Icon icon={item.icon} className="text-lg" />
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <button
                                    onClick={() => dispatch(logout())}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-all"
                                >
                                    <Icon icon="solar:logout-2-bold" className="text-xl" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        <Outlet />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default UserLayout;
