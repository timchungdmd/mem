import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-indigo-50 via-white to-white pt-20 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Manage Your Memberships, <span className="text-indigo-600">Effortlessly</span>.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Streamline your member management, track engagement, and grow your community with our intuitive platform. Focus on what matters most – your members.
        </p>
        <Link
          to="/signup" // Link to sign-up page
          className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
        >
          Get Started Free
          <ArrowRight size={20} className="ml-2" />
        </Link>
      </div>
      {/* Optional: Add a subtle background image or graphic */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white to-transparent z-0"></div>
       {/* Example using an Unsplash image - replace with a relevant one */}
       <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
        alt="Community working together"
        className="absolute inset-0 w-full h-full object-cover opacity-5 z-0" // Very subtle background image
      />
    </section>
  );
};

export default HeroSection;
