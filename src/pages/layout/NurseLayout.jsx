import { Icon } from '@iconify/react';
import SearchNurseLayout from './SearchNurseLayout';
import Nurses from '../nurse/Nurses';
import NurseStats from '../stats/NurseStats';
import NurseFaqLayout from '../faq/NurseFaqLayout';
import Footer from '../../components/common/Footer';
import Navbar from '../../components/common/Navbar';

const NurseLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />

            <main className="flex-grow pt-20">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-indigo-600 to-indigo-900 text-white py-24 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pattern-dots-sm"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                            <Icon icon="solar:heart-angle-bold" className="text-indigo-200" />
                            <span className="text-sm font-medium text-indigo-50">Professional Care</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            Expert Nursing <span className="text-indigo-200">at Home</span>
                        </h1>
                        <p className="text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed">
                            Professional, certified, and compassionate nurses for post-operative care, elderly care, and more.
                        </p>
                    </div>
                </section>

                <div className="w-full">
                    <SearchNurseLayout />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <Nurses />
                    </div>

                    <section className="bg-white py-16 border-y border-slate-100">
                        <NurseStats />
                    </section>

                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <NurseFaqLayout />
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NurseLayout;
