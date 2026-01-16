import { Icon } from '@iconify/react';

const NurseFaqLayout = () => {
  const nurseBenefits = [
    {
      icon: "solar:diploma-verified-bold-duotone",
      title: "Certified Nurses",
      description: "All our nurses are certified, background-checked, and highly trained professionals.",
      highlight: "100% Verified",
      color: "text-indigo-500",
      bg: "bg-indigo-50"
    },
    {
      icon: "solar:home-smile-bold-duotone",
      title: "Home Care",
      description: "Get professional medical care in the comfort and safety of your own home.",
      highlight: "Comfort",
      color: "text-green-500",
      bg: "bg-green-50"
    },
    {
      icon: "solar:clock-circle-bold-duotone",
      title: "Flexible Shifts",
      description: "Choose from various shift options ranging from hourly visits to 24-hour care.",
      highlight: "Flexible",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: "solar:wheelchair-bold-duotone",
      title: "Elderly Care",
      description: "Specialized care for the elderly including mobility assistance and medication management.",
      highlight: "Specialized",
      color: "text-orange-500",
      bg: "bg-orange-50"
    },
    {
      icon: "solar:heart-pulse-bold-duotone",
      title: "Post-Op Care",
      description: "Professional post-operative care to ensure smooth and quicker recovery.",
      highlight: "Recovery",
      color: "text-red-500",
      bg: "bg-red-50"
    },
    {
      icon: "solar:baby-bold-duotone",
      title: "Baby Care",
      description: "Experienced nurses for newborn care and mother assistance.",
      highlight: "Baby Care",
      color: "text-pink-500",
      bg: "bg-pink-50"
    },
    {
      icon: "solar:calendar-add-bold-duotone",
      title: "Easy Booking",
      description: "Simple and quick booking process through our app or website.",
      highlight: "Easy Book",
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
    {
      icon: "solar:users-group-rounded-bold-duotone",
      title: "Patient Support",
      description: "Dedicated support team available 24/7 to assist with any queries.",
      highlight: "Support",
      color: "text-teal-500",
      bg: "bg-teal-50"
    },
  ];

  return (
    <div className="w-full">
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl mb-4">
          Why Choose Our Nursing Service?
        </h2>
        <p className="text-lg text-slate-500 max-w-3xl">
          Professional, compassionate, and reliable care for your loved ones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {nurseBenefits.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 group"
          >
            <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <Icon icon={item.icon} className="text-3xl" />
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 min-h-[60px]">
              {item.description}
            </p>

            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${item.bg} ${item.color}`}>
              <Icon icon="solar:check-circle-bold" className="text-xs" />
              {item.highlight}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NurseFaqLayout;