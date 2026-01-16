import { Icon } from '@iconify/react';
import BloodGroupSelector from '../../components/blood/BloodSearchLayout';
import BloodStats from '../stats/BloodStats';
import Footer from '../../components/common/Footer';
import Navbar from '../../components/common/Navbar';

const BloodLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />

            <main className="flex-grow pt-20">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-red-600 to-red-900 text-white py-24 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pattern-dots-sm"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                            <Icon icon="solar:heart-pulse-bold" className="text-red-200" />
                            <span className="text-sm font-medium text-red-50">Life Saving Connect</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            Find Blood <span className="text-red-200">Donors Instantly</span>
                        </h1>
                        <p className="text-lg text-red-100 max-w-2xl mx-auto leading-relaxed">
                            Connect with blood donors in your area. Every drop counts. Save a life today.
                        </p>
                    </div>
                </section>

                <div className="w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
                        <BloodGroupSelector />
                    </div>

                    <section className="bg-white py-20 mt-12 border-y border-slate-100">
                        <BloodStats />
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BloodLayout;