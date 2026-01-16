import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { message } from 'antd';
import { createSignUp } from '../../features/user/signupSlice';
import Navbar from '../../components/common/Navbar.jsx';
import Footer from '../../components/common/Footer.jsx';

const Register = () => {
    const dispatch = useDispatch();
    const { success, isLoading } = useSelector((state) => state.signup);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('/Profile.png');
    const [avatarPreview, setAvatarPreview] = useState('/Profile.png');

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('password', password);
        myForm.set('avatar', avatar);
        dispatch(createSignUp(myForm));
    };

    const registerDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (success) {
            navigate('/user/login');
            message.success('User account successfully created');
        }
    }, [success, navigate]);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />

            <main className="flex-grow flex justify-center pt-24 pb-12 px-4">
                <div className="w-full max-w-md h-fit bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                    <div className="p-6 sm:p-8">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800">Create Account</h2>
                            <p className="text-slate-500 text-sm mt-1">Join HealthBridge today</p>
                        </div>

                        <form onSubmit={registerSubmit} className="space-y-5">

                            {/* Avatar Upload */}
                            <div className="flex justify-center mb-5">
                                <div className="relative group cursor-pointer w-24 h-24">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 group-hover:border-primary-200 transition-colors shadow-sm">
                                        <img
                                            src={avatarPreview}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-primary-600 transition-transform transform group-hover:scale-110">
                                        <Icon icon="solar:camera-add-bold" className="text-sm" />
                                        <input
                                            type="file"
                                            id="avatar-upload"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={registerDataChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <Icon icon="solar:user-bold" className="text-lg" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

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

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-600/40 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all transform active:scale-95 flex items-center justify-center gap-2 text-sm"
                            >
                                {isLoading ? (
                                    <>
                                        <Icon icon="solar:spinner-linear" className="animate-spin text-lg" />
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Register</span>
                                        <Icon icon="solar:user-plus-bold" className="text-lg" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 space-y-3 pt-6 border-t border-slate-100 text-center">
                            <p className="text-slate-500 text-xs sm:text-sm">
                                Already have an account?{' '}
                                <Link to="/user/login" className="font-bold text-primary-600 hover:text-primary-700 hover:underline">
                                    Sign In
                                </Link>
                            </p>

                            <Link
                                to="/doctor/signup"
                                className="inline-block text-xs font-medium text-slate-500 hover:text-primary-600 transition-colors"
                            >
                                Are you a doctor? Register here
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Register;