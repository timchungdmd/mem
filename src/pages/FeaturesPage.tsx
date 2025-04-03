// src/pages/FeaturesPage.tsx
import React from 'react';
import Navbar from '../components/landing/Navbar'; // Reuse landing Navbar
import Footer from '../components/landing/Footer'; // Reuse landing Footer
import { DollarSign, Repeat, Users, MessageSquare, Lock, BarChartHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard: React.FC<{ icon: React.ElementType; title: string; children: React.ReactNode; benefit: 'Revenue' | 'Retention' | 'Both' }> = ({ icon: Icon, title, children, benefit }) => {
  const benefitColor = benefit === 'Revenue' ? 'text-green-600 bg-green-100' : benefit === 'Retention' ? 'text-blue-600 bg-blue-100' : 'text-purple-600 bg-purple-100';
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="mr-4 inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0">
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${benefitColor}`}>{benefit} Benefit</span>
        </div>
      </div>
      <p className="text-gray-600 flex-grow">{children}</p>
    </div>
  );
};


const FeaturesPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Page Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-16 md:py-24 text-center">
        <div className="container mx-auto px-6">
           {/* Updated Brand Name */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Unlock Growth with AmplifyHub Features</h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto">
            Discover how our tools empower you to not only manage your members efficiently but also boost your revenue and keep your community engaged.
          </p>
        </div>
      </header>

      {/* Features Grid */}
      <main className="flex-grow container mx-auto px-6 py-16 md:py-20">
        {/* Revenue Focused Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Drive Revenue Growth</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={DollarSign} title="Flexible Membership Tiers" benefit="Revenue">
              Create multiple membership levels (e.g., Basic, Premium, VIP) with different pricing and benefits. Upsell members to higher tiers, directly increasing your subscription income. Cater to diverse needs and budgets.
            </FeatureCard>
            <FeatureCard icon={Repeat} title="Automated Renewals & Reminders" benefit="Both">
              Reduce churn and secure recurring revenue with automatic renewal options and timely payment reminders. Minimize manual follow-up and prevent accidental membership lapses, ensuring consistent cash flow.
            </FeatureCard>
             <FeatureCard icon={Lock} title="Exclusive Content & Offers" benefit="Both">
              Gate premium content, resources, or special offers behind specific membership tiers. This incentivizes upgrades and provides tangible value, justifying subscription costs and boosting perceived worth.
            </FeatureCard>
          </div>
        </section>

        {/* Retention Focused Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Enhance Member Retention</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <FeatureCard icon={Users} title="Centralized Member Database" benefit="Retention">
              Maintain accurate and easily accessible member profiles. Understand your members better, personalize interactions, and track their journey, making them feel valued and understood, which fosters loyalty.
            </FeatureCard>
            <FeatureCard icon={MessageSquare} title="Targeted Communication Tools" benefit="Retention">
              Segment your members based on tier, interests, or engagement level (future feature). Send relevant announcements, newsletters, or event invitations, keeping them informed and connected to the community.
            </FeatureCard>
            <FeatureCard icon={BarChartHorizontal} title="Engagement Analytics (Coming Soon)" benefit="Retention">
              Gain insights into member activity and engagement patterns. Identify at-risk members, understand popular benefits, and tailor your offerings to keep your community active and reduce churn proactively.
            </FeatureCard>
          </div>
        </section>

         {/* Call to Action */}
        <section className="text-center mt-16 bg-white p-10 rounded-lg shadow-md border border-gray-100">
             {/* Updated Brand Name */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Ready to Elevate Your Membership Management?</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
                 {/* Updated Brand Name */}
                Stop juggling spreadsheets and start growing your community with AmplifyHub.
            </p>
            <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
            >
                Get Started for Free
            </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
