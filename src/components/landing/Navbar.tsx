import React from 'react';
import { Link } from 'react-router-dom';
import { Users, LogIn, UserPlus, LayoutDashboard } from 'lucide-react'; // Added LayoutDashboard

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-indigo-600">
          <Users size={28} />
          {/* Updated Brand Name */}
          <span>AmplifyHub</span>
        </Link>
        <div className="space-x-2 sm:space-x-4 flex items-center"> {/* Use flex items-center */}
          {/* Changed Link 'to' prop from /#features to /features */}
          <Link to="/features" className="text-gray-600 hover:text-indigo-600 transition-colors px-2 py-1 rounded">Features</Link>
          {/* Add Pricing, About links later if needed */}
           <Link
            to="/login" // Link to a future login page
            className="text-gray-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded hidden sm:inline-block" // Hide on small screens for simplicity
          >
            Sign In
          </Link>
          <Link
            to="/signup" // Link to the sign-up page
            className="inline-flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 font-medium rounded-md shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <UserPlus size={18} className="mr-2" />
            Sign Up
          </Link>
           {/* Keep original "Go to App" link for potential future use */}
           {/* <Link
            to="/app"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ml-2"
          >
            <LogIn size={18} className="mr-2" />
            Go to App
          </Link> */}

           {/* Added Dashboard Demo Link */}
           <Link
            to="/app/dashboard" // Direct link to the dashboard
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-medium rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 ml-2"
            title="View Dashboard Demo"
          >
            <LayoutDashboard size={18} className="mr-2" />
            Dashboard Demo
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
