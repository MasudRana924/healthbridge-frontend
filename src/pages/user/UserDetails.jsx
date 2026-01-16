import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../features/user/Login/loginSlice';
import { Icon } from '@iconify/react';

const UserDetails = () => {
    const { loggeduser } = useSelector((state) => state.userDetails);
    const user = loggeduser.user;
    const userToken = loggeduser.token;
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        phone: '',
        birthdate: '',
        avatar: null,
        avatarPreview: '/Profile.png',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                gender: user.gender || '',
                phone: user.phone || '',
                birthdate: user.birthdate || '',
                avatar: null,
                avatarPreview: user.avatar?.url || '/Profile.png',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setFormData((prevData) => ({
                    ...prevData,
                    avatarPreview: reader.result,
                    avatar: file,
                }));
            }
        };

        if (file) reader.readAsDataURL(file);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const { name, email, gender, phone, avatar } = formData;
        const updatedData = { name, email, gender, phone, avatar };

        dispatch(updateProfile({ data: updatedData, userToken }));
        message.success('Your Info Updated Successfully');
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                <Icon icon="solar:user-id-bold" className="text-primary-500" />
                Account Information
            </h2>

            <form onSubmit={handleUpdate} className="max-w-2xl">
                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative group cursor-pointer inline-block">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-100 shadow-lg group-hover:border-primary-200 transition-colors">
                            <img
                                src={formData.avatarPreview}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <label className="absolute bottom-1 right-1 bg-primary-600 p-2.5 rounded-full cursor-pointer shadow-lg hover:bg-primary-700 transition-colors text-white">
                            <Icon icon="solar:camera-bold" className="text-lg" />
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email (Read Only)</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            readOnly
                            className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-8 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                >
                    <Icon icon="solar:diskette-bold" className="text-xl" />
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default UserDetails;
