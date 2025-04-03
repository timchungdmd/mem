import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const CallToActionSection: React.FC = () => {
  return (
    <section className="bg-indigo-700 py-16 md:py-20">
      <div className="container mx-auto px-6 text-center">
        <Rocket size={48} className="text-white mx-auto mb-6 opacity-80" />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Simplify Your Membership Management?
        </h2>
        <p className="text-indigo-100 text-lg max-w-2xl mx-auto mb-8">
          Join hundreds of organizations streamlining their workflows. Get started today!
        </p>
        <Link
          to="/signup" // Link to sign-up page
          className="inline-flex items-center justify-center px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white transition-colors duration-300 transform hover:scale-105"
        >
          Sign Up Now
        </Link>
      </div>
    </section>
  );
};

export default CallToActionSection;
