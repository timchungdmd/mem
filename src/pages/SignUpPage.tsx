import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../components/auth/SignUpForm';
import { Users } from 'lucide-react'; // Re-use logo icon

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
         <Link to="/" className="flex justify-center items-center space-x-2 text-3xl font-bold text-indigo-600 mb-6">
            <Users size={36} />
             {/* Updated Brand Name */}
            <span>AmplifyHub</span>
         </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          And start managing your members today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <SignUpForm />
        </div>
      </div>
       <p className="mt-6 text-center text-xs text-gray-500">
           {/* Updated Brand Name */}
          &copy; {new Date().getFullYear()} AmplifyHub. All rights reserved.
        </p>
    </div>
  );
};

export default SignUpPage;
