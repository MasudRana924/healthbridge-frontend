import { Icon } from '@iconify/react';

const MedicineStats = () => {
  const medicineStats = [
    {
      id: 1,
      name: 'Medicine Available',
      value: '10k+',
      description: 'Medicines and healthcare products',
      icon: 'solar:pill-bold-duotone',
      color: 'text-teal-500',
      bg: 'bg-teal-50',
    },
    {
      id: 2,
      name: 'Delivery Time',
      value: '24-48 hrs',
      description: 'Fast and reliable delivery',
      icon: 'solar:delivery-bold-duotone',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      id: 3,
      name: 'Service Charge',
      value: 'Free',
      description: 'No hidden charges on purchases',
      icon: 'solar:wallet-money-bold-duotone',
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl mb-4">
          Medicine Services at a Glance
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl">
          Ensuring availability, timely delivery, and affordable services for our customers
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {medicineStats.map((stat) => (
          <div
            key={stat.id}
            className="bg-slate-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`p-4 ${stat.bg} rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <Icon icon={stat.icon} className={`text-4xl ${stat.color}`} />
              </div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {stat.name}
              </h3>
              <div className="text-4xl font-extrabold text-slate-800 mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-slate-500">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineStats;
