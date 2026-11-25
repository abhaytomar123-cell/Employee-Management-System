import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          My Profile
        </h1>
        <p className="text-gray-500 mt-2">
          View your personal and account information.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 max-w-3xl">

        {/* Profile Header */}
        <div className="flex items-center gap-5 border-b pb-8 mb-8">
          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {currentUser.name}
            </h2>
            <p className="text-gray-500">Employee</p>
          </div>
        </div>

        {/* Personal Information */}
        <h3 className="text-lg font-semibold mb-5">
          Personal Information
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-gray-500 mb-2">Full Name</p>
            <p className="font-medium text-gray-800">{currentUser.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Email Address</p>
            <p className="font-medium text-gray-800">{currentUser.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Employee ID</p>
            <p className="font-medium text-gray-800">{currentUser.id}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Role</p>
            <p className="font-medium text-gray-800">{currentUser.role}</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
