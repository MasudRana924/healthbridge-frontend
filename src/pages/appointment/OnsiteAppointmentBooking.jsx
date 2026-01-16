import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { createAppointments } from '../../features/appointments/appointmentsSlice';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { message } from 'antd';

const OnsiteAppointmentBooking = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, loggeduser } = useSelector((state) => state.userDetails);
    const { doctor } = useSelector(state => state.doctor.doctor);
    const { success, isLoading } = useSelector(state => state.appointments);

    const userToken = loggeduser.token;

    // Form State
    const [patientname, setPname] = useState('');
    const [patientemail, setEmail] = useState('');
    const [patientgender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [schedule, setSchedule] = useState('');

    useEffect(() => {
        if (!token) {
            navigate('/user/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        if (success) {
            message.success("Onsite Appointment Booked Successfully");
            // Optional: navigate away or clear form
        }
    }, [success]);

    const handleCreate = (e) => {
        e.preventDefault();

        if (!patientname || !phone || !date || !schedule) {
            message.error("Please fill in all required fields");
            return;
        }

        const data = {
            doctortitle: doctor.title,
            doctorname: doctor.name,
            doctoremail: doctor.email,
            doctorfees: doctor.fees,
            doctorimage: doctor.avatar?.url,
            doctorId: doctor._id,
            doctordegree: doctor.degree,
            doctorwork: doctor.work,
            patientname,
            patientgender,
            phone,
            date,
            schedule,
            url: doctor.url,
            patientemail
        };

        dispatch(createAppointments({ data, userToken }));
    };

    if (!doctor) {
        return (
            <div className="flex flex-col min-h-screen bg-slate-50">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-slate-500">No doctor selected. Please go back.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 text-center sm:text-left">
                        <Link to={`/doctor/${doctor._id}`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary-600 mb-4 transition">
                            <Icon icon="solar:arrow-left-bold" className="mr-1" />
                            Back to Profile
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900">Book In-Person Appointment</h1>
                        <p className="text-slate-500 mt-2">Fill in your details to schedule a visit.</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden lg:grid lg:grid-cols-3">
                        {/* Doctor Summary Sidebar */}
                        <div className="bg-slate-50 p-8 border-b lg:border-b-0 lg:border-r border-slate-100 lg:col-span-1">
                            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Appointment With</h2>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 overflow-hidden mb-4 shadow-sm">
                                    <img
                                        src={doctor?.avatar?.url || 'https://placehold.co/200'}
                                        alt={doctor.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="font-bold text-slate-900 text-lg">{doctor.title} {doctor.name}</h3>
                                <p className="text-primary-600 font-medium text-sm mt-1">{doctor.expert}</p>
                                <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
                                    <Icon icon="solar:hospital-bold" />
                                    {doctor.work}
                                </p>
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                                    <span className="text-slate-500 text-sm font-medium">Consultation Fee</span>
                                    <span className="text-slate-900 font-bold">{doctor.fees} BDT</span>
                                </div>
                            </div>
                        </div>

                        {/* Booking Form */}
                        <div className="p-8 lg:col-span-2">
                            <form onSubmit={handleCreate} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                                    <input
                                        type="text"
                                        value={patientname}
                                        onChange={(e) => setPname(e.target.value)}
                                        placeholder="Full Name"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="01XXXXXXXXX"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                                        <select
                                            value={patientgender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email (Optional)</label>
                                    <input
                                        type="email"
                                        value={patientemail}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@example.com"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-slate-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Time Slot</label>
                                        <select
                                            value={schedule}
                                            onChange={(e) => setSchedule(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        >
                                            <option value="">Select Slot</option>
                                            <option value="Morning">Morning (09:00 - 12:00)</option>
                                            <option value="Afternoon">Afternoon (02:00 - 05:00)</option>
                                            <option value="Evening">Evening (06:00 - 09:00)</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 mt-4 rounded-xl font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Icon icon="svg-spinners:ring-resize" />
                                            Confirming...
                                        </>
                                    ) : (
                                        <>
                                            Confirm Appointment
                                            <Icon icon="solar:check-circle-bold" className="text-xl" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OnsiteAppointmentBooking;