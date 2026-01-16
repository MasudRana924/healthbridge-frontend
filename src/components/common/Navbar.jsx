import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/Login/loginSlice";
import { Icon } from "@iconify/react";

const Navbar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { loggeduser } = useSelector((state) => state.userDetails);
    const user = loggeduser?.user;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Find Doctor", path: "/find-doctor" },
        { name: "Medicine", path: "/medicine/store" },
        { name: "Nurse", path: "/nurses" },
        { name: "Blood", path: "/blood-store" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform duration-300">
                            <Icon icon="solar:heart-pulse-bold" className="text-2xl" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
                            HealthBridge
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors duration-200 capitalize ${location.pathname === link.path
                                        ? "text-primary-600"
                                        : "text-slate-600 hover:text-primary-500"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* User Menu / Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-slate-700">
                                    Hi, {user.name}
                                </span>
                                <div className="relative group">
                                    <Link to={user.role === 'doctor' ? "/doctor-info" : "/user/info"}>
                                        {user?.avatar?.url ? (
                                            <img
                                                src={user.avatar.url}
                                                alt={user.name}
                                                className="h-10 w-10 rounded-full border-2 border-primary-100 object-cover"
                                            />
                                        ) : (
                                            <div className="h-10 w-10 rounded-full bg-primary-50 border-2 border-primary-100 flex items-center justify-center text-primary-500">
                                                <Icon icon="solar:user-circle-bold" className="text-2xl" />
                                            </div>
                                        )}
                                    </Link>
                                </div>
                                <button
                                    onClick={() => dispatch(logout())}
                                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                    title="Logout"
                                >
                                    <Icon icon="solar:logout-2-outline" className="text-xl" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/user/login"
                                    className="text-slate-600 font-medium hover:text-primary-600 px-4 py-2 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/user/register"
                                    className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-full font-medium shadow-lg shadow-primary-500/30 hover:shadow-primary-600/40 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-slate-600 hover:text-primary-600 transition-colors"
                        >
                            <Icon
                                icon={mobileMenuOpen ? "solar:close-circle-bold" : "solar:hamburger-menu-linear"}
                                className="text-2xl"
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu Drawer */}
            <div
                className={`md:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-xl font-bold text-slate-800">Menu</span>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 text-slate-400 hover:text-slate-600"
                        >
                            <Icon icon="solar:close-circle-bold" className="text-2xl" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-lg font-medium p-2 rounded-lg ${location.pathname === link.path
                                            ? "bg-primary-50 text-primary-600"
                                            : "text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100">
                        {user ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 mb-4">
                                    {user?.avatar?.url ? (
                                        <img
                                            src={user.avatar.url}
                                            alt={user.name}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-500">
                                            <Icon icon="solar:user-circle-bold" className="text-2xl" />
                                        </div>
                                    )}
                                    <div>
                                        <div className="font-semibold text-slate-800">{user.name}</div>
                                        <div className="text-sm text-slate-500 capitalize">{user.role}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => dispatch(logout())}
                                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-red-100 text-red-600 hover:bg-red-50 transition-colors font-medium"
                                >
                                    <Icon icon="solar:logout-2-outline" className="text-xl" />
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Link
                                    to="/user/login"
                                    className="w-full text-center py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-50 border border-slate-200"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/user/register"
                                    className="w-full text-center py-3 rounded-xl font-medium text-white bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/25"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
