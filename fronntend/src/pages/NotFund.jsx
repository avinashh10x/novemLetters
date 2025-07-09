import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <ExclamationTriangleIcon className="w-20 h-20 text-[#684df4] mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 text-lg mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-block bg-[#684df4] text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-600 transition duration-300"
      >
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
