import { Icon } from '@iconify/react';

const MedicineFaqLayout = () => {
  const medicineBenefits = [
    {
      icon: "solar:box-minimalistic-bold-duotone",
      title: "Extensive Inventory",
      description: "Access a wide variety of medications including rare drugs from trusted suppliers.",
      highlight: "10k+ Medicines",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: "solar:delivery-bold-duotone",
      title: "Fast Delivery",
      description: "Get your medications delivered quickly and reliably right to your doorstep.",
      highlight: "Same-Day",
      color: "text-green-500",
      bg: "bg-green-50"
    },
    {
      icon: "solar:tag-price-bold-duotone",
      title: "Affordable Pricing",
      description: "Competitive pricing with discounts on bulk orders. No hidden fees.",
      highlight: "Best Prices",
      color: "text-yellow-500",
      bg: "bg-yellow-50"
    },
    {
      icon: "solar:verified-check-bold-duotone",
      title: "Certified Products",
      description: "All medications undergo strict quality checks ensuring safety and efficacy.",
      highlight: "100% Genuine",
      color: "text-teal-500",
      bg: "bg-teal-50"
    },
    {
      icon: "solar:magic-stick-3-bold-duotone",
      title: "Smart Suggestions",
      description: "AI-driven recommendations based on your prescription history.",
      highlight: "Personalized",
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
    {
      icon: "solar:refresh-circle-bold-duotone",
      title: "Easy Refills",
      description: "Seamless refill process for recurring prescriptions with reminders.",
      highlight: "Auto-Refill",
      color: "text-indigo-500",
      bg: "bg-indigo-50"
    },
    {
      icon: "solar:map-point-bold-duotone",
      title: "Nationwide",
      description: "Order from anywhere in the country with our extensive delivery network.",
      highlight: "All Areas",
      color: "text-red-500",
      bg: "bg-red-50"
    },
    {
      icon: "solar:globus-bold-duotone",
      title: "Live Tracking",
      description: "Track your orders in real-time with our intuitive tracking system.",
      highlight: "Real-time",
      color: "text-orange-500",
      bg: "bg-orange-50"
    },
  ];

  return (
    <div className="w-full">
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl mb-4">
          Why Choose Our Pharmacy?
        </h2>
        <p className="text-lg text-slate-500 max-w-3xl">
          Delivering quality medicines at your convenience—trusted by thousands for affordability, reliability, and exceptional service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {medicineBenefits.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300 group"
          >
            <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <Icon icon={item.icon} className="text-3xl" />
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-primary-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 min-h-[60px]">
              {item.description}
            </p>

            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${item.bg} ${item.color}`}>
              <Icon icon="solar:star-bold" className="text-xs" />
              {item.highlight}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineFaqLayout;
