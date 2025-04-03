import React from 'react';
import { UserPlus, BarChart2, Settings, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: UserPlus,
    title: 'Easy Member Onboarding',
    description: 'Quickly add new members with customizable profiles and membership levels.',
  },
  {
    icon: BarChart2,
    title: 'Insightful Analytics',
    description: 'Track member growth, engagement, and retention with clear dashboards (Coming Soon!).',
  },
  {
    icon: Settings,
    title: 'Flexible Configuration',
    description: 'Define different membership tiers, manage permissions, and customize settings.',
  },
   {
    icon: CheckCircle,
    title: 'Simple Interface',
    description: 'An intuitive and clean user interface makes management a breeze.',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose MemberFlow?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your community effectively and efficiently.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
