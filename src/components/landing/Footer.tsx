import React from 'react';
import { Users } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center items-center space-x-2 mb-4">
           <Users size={24} className="text-indigo-400"/>
           {/* Updated Brand Name */}
           <span className="font-semibold text-lg text-white">AmplifyHub</span>
        </div>
        <p className="text-sm">
          {/* Updated Brand Name */}
          &copy; {new Date().getFullYear()} AmplifyHub. All rights reserved.
        </p>
        {/* Add social links or other footer content here later */}
      </div>
    </footer>
  );
};

export default Footer;
