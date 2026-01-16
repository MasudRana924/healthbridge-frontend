import Footer from '../../components/common/Footer';
import Navbar from '../../components/common/Navbar';
import CategoryLayout from './CategoryLayout';
import DoctorsList from '../doctors/DoctorsList';
import FaqLayout from '../faq/FaqLayout';
import Stats from '../stats/Stats';
import { Icon } from '@iconify/react';

const HomeLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />

            <main className="flex-grow pt-20">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white pb-32 pt-16 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pattern-dots-sm"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in-up">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium text-emerald-100">24/7 Medical Assistance</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                            Your Health, Our <span className="text-primary-200">Priority</span>
                        </h1>
                        <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Connect with top specialists instantly. Expert medical advice, prescriptions, and holistic care—all in one place.
                        </p>
                    </div>
                </section>

                {/* Overlapping Content Section (Category Layout) */}
                <section className="relative z-20 -mt-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="transform transition-all duration-300">
                            <CategoryLayout />
                        </div>
                    </div>
                </section>

                {/* Main Content Sections */}
                <div className="space-y-20 py-20">
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
                                <Icon icon="solar:user-id-bold" className="text-primary-500" />
                                Top Rated Doctors
                            </h2>
                            <p className="text-slate-500 mt-2">Book appointments with the best specialists</p>
                        </div>
                        <DoctorsList />
                    </section>

                    <section className="bg-white py-16 border-y border-slate-100">
                        <Stats />
                    </section>

                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
                                <Icon icon="solar:stars-minimalistic-bold" className="text-primary-500" />
                                Why Choose Us
                            </h2>
                            <p className="text-slate-500 mt-2">Everything you need for your health, in one place</p>
                        </div>
                        <FaqLayout />
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HomeLayout;
