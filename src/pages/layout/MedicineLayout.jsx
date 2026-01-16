import { Icon } from '@iconify/react';
import Medicine from '../../pages/medicine/Medicine';
import SearchLayout from './SearchLayout';
import MedicineStats from '../../pages/stats/MedicineStats';
import MedicineFaqLayout from '../../pages/faq/MedicineFaqLayout';
import Footer from '../../components/common/Footer';
import Navbar from '../../components/common/Navbar';

const MedicineLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />

            <main className="flex-grow pt-20">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-teal-600 to-teal-900 text-white py-24 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pattern-dots-sm"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                            <Icon icon="solar:shop-bold" className="text-teal-200" />
                            <span className="text-sm font-medium text-teal-50">Authorized Pharmacy</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            Your Online <span className="text-teal-200">Medicine Store</span>
                        </h1>
                        <p className="text-lg text-teal-100 max-w-2xl mx-auto leading-relaxed">
                            100% Genuine Medicines. Trusted by thousands. Fast home delivery within 24-48 hours.
                        </p>
                    </div>
                </section>

                {/* Content Section - Overlapping with Hero */}
                <div className="w-full">
                    <SearchLayout />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <Medicine />
                    </div>

                    <section className="bg-white py-16 border-y border-slate-100">
                        <MedicineStats />
                    </section>

                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <MedicineFaqLayout />
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MedicineLayout;
