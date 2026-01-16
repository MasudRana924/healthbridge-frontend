import { Icon } from '@iconify/react';

const BloodStats = () => {
  const bloodStats = [
    {
      id: 1,
      name: 'Blood Groups Available',
      value: '8+',
      description: 'All common blood groups',
      icon: 'solar:drop-bold-duotone',
      color: 'text-red-500',
      bg: 'bg-red-50'
    },
    {
      id: 2,
      name: 'Donors Connected',
      value: '5k+',
      description: 'Verified blood donors near you',
      icon: 'solar:heart-angle-bold-duotone',
      color: 'text-pink-500',
      bg: 'bg-pink-50'
    },
    {
      id: 3,
      name: 'Availability Time',
      value: '24/7',
      description: 'Round-the-clock assistance',
      icon: 'solar:clock-circle-bold-duotone',
      color: 'text-orange-500',
      bg: 'bg-orange-50'
    },
    {
      id: 4,
      name: 'Successful Donations',
      value: '12k+',
      description: 'Lives saved through platform',
      icon: 'solar:hand-shake-bold-duotone',
      color: 'text-teal-500',
      bg: 'bg-teal-50'
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl mb-4">
          Blood Services Impact
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl">
          Building a reliable network of life-saving connections.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {bloodStats.map((stat) => (
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

export default BloodStats;
