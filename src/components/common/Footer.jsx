import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-slate-900 pt-16 pb-8 text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Services */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                            <Icon icon="solar:stethoscope-bold" className="text-primary-500" />
                            Our Services
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                "Find Doctors",
                                "Order Medicine",
                                "Book Nurses",
                                "Call Ambulance",
                                "Health Packages",
                                "Lab Tests"
                            ].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                                        <Icon icon="solar:arrow-right-align-bold-duotone" className="text-xs text-primary-500" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Payment Options */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                            <Icon icon="solar:card-bold" className="text-primary-500" />
                            Payment Options
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {/* Placeholders for payment icons using Iconify */}
                            <div className="bg-white p-2 rounded flex items-center justify-center w-12 h-8">
                                <Icon icon="logos:visa" className="text-2xl" />
                            </div>
                            <div className="bg-white p-2 rounded flex items-center justify-center w-12 h-8">
                                <Icon icon="logos:mastercard" className="text-2xl" />
                            </div>
                            <div className="bg-white p-2 rounded flex items-center justify-center w-12 h-8">
                                <Icon icon="logos:bkash" className="text-2xl" />
                            </div>
                        </div>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                            <Icon icon="solar:chat-round-call-bold" className="text-primary-500" />
                            24/7 Support
                        </h3>
                        <p className="text-sm leading-relaxed mb-6">
                            Emergency medical assistance available 24/7. Our dedicated team is always ready to help.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Icon icon="solar:map-point-bold" className="text-primary-500 text-xl mt-1" />
                                <div>
                                    <div className="text-white font-medium">Main Center</div>
                                    <div className="text-sm">123 Medical Avenue</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                            <Icon icon="solar:phone-calling-bold" className="text-primary-500" />
                            Contact Us
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3 group">
                                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-primary-500/20 transition-colors">
                                    <Icon icon="solar:phone-bold" className="text-primary-500" />
                                </div>
                                <span>1-800-HealthBridge</span>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-primary-500/20 transition-colors">
                                    <Icon icon="solar:letter-bold" className="text-primary-500" />
                                </div>
                                <span>support@healthbridge.com</span>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            {["facebook", "instagram", "linkedin"].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="p-2 bg-slate-800 rounded-lg hover:bg-primary-500 hover:text-white transition-all transform hover:-translate-y-1"
                                >
                                    <Icon icon={`mdi:${social}`} className="text-xl" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p>© {new Date().getFullYear()} HealthBridge. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;