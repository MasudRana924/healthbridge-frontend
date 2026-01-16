import { Icon } from '@iconify/react';

const Stats = () => {
  const stats = [
    {
      id: 1,
      name: 'Satisfied Patients',
      value: '20k+',
      description: 'Happy patients treated',
      icon: 'solar:users-group-rounded-bold'
    },
    {
      id: 2,
      name: 'Medical Staff',
      value: '150+',
      description: 'Experienced professionals',
      icon: 'solar:user-plus-bold'
    },
    {
      id: 3,
      name: 'Years of Service',
      value: '25+',
      description: 'Dedicated to excellence',
      icon: 'solar:clock-circle-bold'
    },
    {
      id: 4,
      name: 'Specializations',
      value: '30+',
      description: 'Medical departments',
      icon: 'solar:stethoscope-bold'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl mb-4">
          Our Healthcare Impact
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl">
          Delivering excellence in healthcare through our dedicated team of medical professionals
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-primary-100 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-primary-50 rounded-2xl mb-5 group-hover:bg-primary-500 transition-colors duration-300">
                <Icon icon={stat.icon} className="text-3xl text-primary-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-sm font-semibold text-slate-500 tracking-wide uppercase">
                {stat.name}
              </h3>
              <div className="mt-2 text-4xl font-extrabold text-slate-800">
                {stat.value}
              </div>
              <p className="mt-2 text-sm text-slate-400">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;