import React from 'react';
import { Users } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users size={28} />
          <h1 className="text-2xl font-bold">Membership Manager</h1>
        </div>
        {/* Add navigation or user info here later if needed */}
      </div>
    </header>
  );
};

export default Header;
