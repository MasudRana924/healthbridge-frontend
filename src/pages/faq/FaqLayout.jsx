import { Icon } from '@iconify/react';

const FaqLayout = () => {
  const benefitsData = [
    {
      icon: "solar:stethoscope-bold",
      title: "Easy Appointments",
      description: "Book verified doctors instantly. Compare ratings and find your perfect slot.",
      highlight: "24/7 Booking"
    },
    {
      icon: "solar:pill-bold",
      title: "Online Medicine",
      description: "Order medications from certified pharmacies with doorstep delivery and tracking.",
      highlight: "Fast Delivery"
    },
    {
      icon: "solar:user-heart-bold",
      title: "Home Nursing",
      description: "Connect with certified, experienced nurses for professional home care services.",
      highlight: "Verified Staff"
    },
    {
      icon: "solar:ambulance-bold",
      title: "Emergency Service",
      description: "Quick access to emergency transport with GPS tracking and trained paramedics.",
      highlight: "Rapid Response"
    },
    {
      icon: "solar:clock-circle-bold",
      title: "24/7 Support",
      description: "Round-the-clock medical assistance and customer support for all your needs.",
      highlight: "Always Open"
    },
    {
      icon: "solar:card-bold",
      title: "Secure Payments",
      description: "Multiple safe payment options including insurance coverage with transparent pricing.",
      highlight: "Secure"
    },
    {
      icon: "solar:shield-check-bold",
      title: "Quality Assured",
      description: "Verified healthcare providers monitored for quality to maintain high standards.",
      highlight: "Top Quality"
    },
    {
      icon: "solar:smartphone-bold",
      title: "Mobile Access",
      description: "Manage appointments, orders, and records on the go with our user-friendly app.",
      highlight: "Easy Access"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefitsData.map((item, index) => (
          <div
            key={index}
            className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Icon icon={item.icon} className="text-2xl" />
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-primary-600 transition-colors">
              {item.title}
            </h3>

            <p className="text-slate-500 text-sm leading-relaxed mb-4 min-h-[60px]">
              {item.description}
            </p>

            <div className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full uppercase tracking-wide">
              <Icon icon="solar:check-circle-bold" className="text-sm" />
              {item.highlight}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqLayout;