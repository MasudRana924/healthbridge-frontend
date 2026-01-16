import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { createDoctorSignUp } from '../../features/doctors/doctorsignupSlice';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { message } from 'antd';

const DoctorSignup = () => {
    const dispatch = useDispatch();
    const { success, isLoading } = useSelector((state) => state.doctorsignup);
    const navigate = useNavigate();

    // State
    const [avatar, setAvatar] = useState("/Doctor.png");
    const [avatarPreview, setAvatarPreview] = useState("/Doctor.png");
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        email: '',
        gender: '',
        fees: '',
        nid_No: '',
        bmdc_No: '',
        type: '',
        phone: '',
        password: '',
        degree: '',
        expert: '',
        experience: '',
        work: '',
    });

    // Destructure for easy access
    const { title, name, email, gender, fees, nid_No, bmdc_No, type, phone, password, degree, expert, experience, work } = formData;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const registerSubmit = (e) => {
        e.preventDefault();
        // Basic validation could go here
        dispatch(createDoctorSignUp({ ...formData, avatar }));
    };

    useEffect(() => {
        if (success) {
            navigate('/doctor/login');
            message.success("Account created successfully. Please login.");
        }
    }, [success, navigate]);

    const titles = ['Dr.', 'Prof. Dr.', 'Ass.Prof. Dr.', 'Assoc.Prof. Dr.'];
    const genders = ['Male', 'Female'];
    const types = ['Medical', 'Dental'];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
                        {/* Left Panel - Information */}
                        <div className="hidden lg:block sticky top-32">
                            <div className="mb-12">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-6">
                                    <Icon icon="solar:stethoscope-bold" className="text-primary-600" />
                                    <span className="text-sm font-bold text-primary-700">Join HealthBridge</span>
                                </div>
                                <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                                    Are You A <br />
                                    <span className="text-primary-600">Qualified Doctor?</span>
                                </h1>
                                <p className="text-xl text-slate-500 leading-relaxed font-light">
                                    Join the HealthBridge network to create your virtual chamber, provide video consultations, and expand your reach to patients nationwide.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                        <Icon icon="solar:verified-check-bold" className="text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Verified Platform</h3>
                                        <p className="text-slate-500 text-sm mt-1">We ensure safety by verifying every doctor through BMDC.</p>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                                        <Icon icon="solar:laptop-bold" className="text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Digital Freedom</h3>
                                        <p className="text-slate-500 text-sm mt-1">Work independently and make autonomous medical decisions.</p>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                                        <Icon icon="solar:users-group-two-rounded-bold" className="text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Broad Reach</h3>
                                        <p className="text-slate-500 text-sm mt-1">Connect with patients from all corners of the country.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel - Registration Form */}
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-8 relative z-10">Doctor Registration</h2>

                            <form onSubmit={registerSubmit} className="space-y-6 relative z-10">
                                {/* Avatar Upload */}
                                <div className="flex flex-col items-center mb-8">
                                    <div className="relative group cursor-pointer">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-100 shadow-md group-hover:border-primary-200 transition-colors">
                                            <img
                                                src={avatarPreview}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <label className="absolute bottom-1 right-1 bg-primary-600 p-2.5 rounded-full cursor-pointer shadow-lg hover:bg-primary-700 transition-colors text-white">
                                            <Icon icon="solar:camera-bold" className="text-lg" />
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={registerDataChange}
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>
                                    <p className="text-sm text-slate-400 mt-3">Upload Profile Picture</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Personal Info */}
                                    <div className="col-span-1 md:col-span-2">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Personal Information</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                        <select
                                            name="title"
                                            value={title}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        >
                                            <option value="">Select Title</option>
                                            {titles.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="e.g. John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                                        <select
                                            name="gender"
                                            value={gender}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        >
                                            <option value="">Select Gender</option>
                                            {genders.map(g => <option key={g} value={g}>{g}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="01XXXXXXXXX"
                                        />
                                    </div>

                                    {/* Professional Info */}
                                    <div className="col-span-1 md:col-span-2 mt-2">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Professional Information</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Degree</label>
                                        <input
                                            type="text"
                                            name="degree"
                                            value={degree}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="e.g. MBBS, FCPS"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Specialization</label>
                                        <input
                                            type="text"
                                            name="expert"
                                            value={expert}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="e.g. Cardiology"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Speciality Type</label>
                                        <select
                                            name="type"
                                            value={type}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        >
                                            <option value="">Select Type</option>
                                            {types.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>


                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Experience (Years)</label>
                                        <input
                                            type="number"
                                            name="experience"
                                            value={experience}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="e.g. 5"
                                        />
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Current Workplace</label>
                                        <input
                                            type="text"
                                            name="work"
                                            value={work}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Hospital or Clinic Name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Consultation Fee (TK)</label>
                                        <input
                                            type="number"
                                            name="fees"
                                            value={fees}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="e.g. 1000"
                                        />
                                    </div>

                                    {/* Verification Info */}
                                    <div className="col-span-1 md:col-span-2 mt-2">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Verification & Security</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">BMDC Reg. No</label>
                                        <input
                                            type="text"
                                            name="bmdc_No"
                                            value={bmdc_No}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">NID / Passport</label>
                                        <input
                                            type="text"
                                            name="nid_No"
                                            value={nid_No}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="email@example.com"
                                        />
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Minimum 6 characters"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 mt-8 rounded-xl font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Icon icon="svg-spinners:ring-resize" className="text-xl" />
                                            Creatng Account...
                                        </>
                                    ) : (
                                        <>
                                            Complete Registration
                                            <Icon icon="solar:arrow-right-bold" className="text-xl" />
                                        </>
                                    )}
                                </button>

                                <div className="text-center mt-6">
                                    <p className="text-slate-500">
                                        Already have an account?{' '}
                                        <Link to="/doctor/login" className="text-primary-600 font-bold hover:text-primary-700 transition-colors">
                                            Log In
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DoctorSignup;