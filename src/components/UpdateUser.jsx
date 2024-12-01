import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useAuth();
  const isUserProfile = !id; // If no ID in params, user is updating their own profile

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    username: '',
    password: '',
    phoneNumber: '',
    role: '',
    profilePicture: null
  });

  const [previewUrl, setPreviewUrl] = useState('/images/default-profile.png');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetch(isUserProfile 
          ? '/api/user/profile' 
          : `/api/admin/users/${id}`
        );
        if (response.ok) {
          const userData = await response.json();
          setFormData(userData);
          if (userData.profilePicturePath) {
            setPreviewUrl(userData.profilePicturePath);
          }
        }
      } catch (error) {
        setError('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, [id, isUserProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (key !== 'profilePicture' || formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(isUserProfile 
        ? '/api/user/profile/update'
        : `/api/admin/users/update/${id}`,
        {
          method: 'POST',
          body: formDataToSend
        }
      );

      if (response.ok) {
        navigate(isUserProfile ? '/user/dashboard' : '/admin/users');
      } else {
        setError('Failed to update user information');
      }
    } catch (error) {
      setError('An error occurred while updating user information');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600">
      <header className="sticky top-0 z-50 bg-black/70 shadow-lg px-6 py-4 flex justify-between items-center">
        <h1 className="text-yellow-400 text-2xl flex items-center">
          <img src="/images/uppermostlogo.jpg" alt="BAL Logo" className="h-10 mr-3" />
          <span>Basketball Africa League</span>
        </h1>
      </header>

      <div className="max-w-2xl mx-auto my-12 p-8 bg-white/10 rounded-lg shadow-xl">
        <button
          onClick={() => navigate(isUserProfile ? '/user/dashboard' : '/admin/users')}
          className="mb-6 px-6 py-2 bg-yellow-400 text-blue-900 rounded-lg font-bold hover:bg-yellow-500 transform hover:scale-105 transition duration-300"
        >
          {isUserProfile ? 'Back to Dashboard' : 'Back to User Management'}
        </button>

        <h2 className="text-2xl text-white text-center mb-8">
          {isUserProfile ? 'Update Your Profile' : 'Update User Information'}
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-500/50 text-white rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            className="w-48 h-48 mx-auto mb-8 rounded-full border-4 border-white bg-center bg-cover cursor-pointer transform hover:scale-110 transition duration-300"
            style={{ backgroundImage: `url(${previewUrl})` }}
            onClick={() => document.getElementById('profilePicture').click()}
          >
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-white font-bold">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-white/20 text-white focus:bg-white/30 transition duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-white font-bold">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-white/20 text-white focus:bg-white/30 transition duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-white font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-white/20 text-white focus:bg-white/30 transition duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-white font-bold">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-white/20 text-white focus:bg-white/30 transition duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-white font-bold">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-white/20 text-white focus:bg-white/30 transition duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-white font-bold">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-white/20 text-white focus:bg-white/30 transition duration-300"
                required
              />
            </div>

            {!isUserProfile && (
              <div className="space-y-2">
                <label className="block text-white font-bold">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white/20 text-white focus:bg-white/30 transition duration-300"
                  required
                >
                  <option value="" disabled>Select user role</option>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-8 py-3 px-6 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transform hover:scale-105 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;