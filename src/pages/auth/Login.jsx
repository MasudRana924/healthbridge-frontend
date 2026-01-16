import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { createLogin } from '../../features/user/Login/loginSlice.js';
import Navbar from '../../components/common/Navbar.jsx';
import Footer from '../../components/common/Footer.jsx';
import { message } from 'antd';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, loggeduser, isLoading } = useSelector((state) => state.userDetails);
    const user = loggeduser?.user;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        myForm.set("password", password);
        dispatch(createLogin(myForm));
    };

    useEffect(() => {
        if (user) {
            navigate('/');
            message.success("User logged in successfully");
        }
    }, [user, navigate]);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />

            <main className="flex-grow flex justify-center pt-28 pb-12 px-4">
                <div className="w-full max-w-md h-fit bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                    <div className="p-6 sm:p-8">
                        <div className="text-center mb-6">
                            <div className="inline-flex justify-center items-center w-14 h-14 rounded-full bg-primary-50 text-primary-500 mb-3 ring-8 ring-primary-50/50">
                                <Icon icon="solar:user-circle-bold" className="text-2xl" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Welcome Back</h2>
                            <p className="text-slate-500 text-sm mt-1">Sign in to access your account</p>
                        </div>

                        {error && (
                            <div className="mb-5 bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 text-sm">
                                <Icon icon="solar:danger-circle-bold" className="text-lg flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={loginSubmit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <Icon icon="solar:letter-bold" className="text-lg" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <Icon icon="solar:lock-password-bold" className="text-lg" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs sm:text-sm">
                                <Link to="/doctor/login" className="font-medium text-primary-600 hover:text-primary-700 hover:underline">
                                    Login as Doctor
                                </Link>
                                <Link to="/user/password" className="text-slate-500 hover:text-slate-700">
                                    Forgot Password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-600/40 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all transform active:scale-95 flex items-center justify-center gap-2 text-sm"
                            >
                                {isLoading ? (
                                    <>
                                        <Icon icon="solar:spinner-linear" className="animate-spin text-lg" />
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <Icon icon="solar:login-2-bold" className="text-lg" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                            <p className="text-slate-500 text-xs sm:text-sm">
                                Don't have an account?{' '}
                                <Link to="/user/register" className="font-bold text-primary-600 hover:text-primary-700 hover:underline">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Login;