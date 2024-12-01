import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement user registration logic
    console.log('Form submitted:', formData);
    // Example: Call your backend API to add user
  };

  const handleBack = () => {
    navigate('/admin/users');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-5 bg-black/70 sticky top-0 z-50">
        <h1 className="text-3xl flex items-center">
          <img 
            src="/images/uppermostlogo.jpg" 
            alt="BAL Logo" 
            className="h-10 mr-3"
          />
          Basketball Africa League
        </h1>
        <nav className="flex space-x-4">
          <a href="/home" className="px-4 py-2 bg-white/20 rounded-full hover:bg-white/40 transition">Home</a>
          <a href="/admin/users" className="px-4 py-2 bg-white/20 rounded-full hover:bg-white/40 transition">User Management</a>
          <a href="/logout" className="px-4 py-2 bg-white/20 rounded-full hover:bg-white/40 transition">Logout</a>
        </nav>
      </header>

      {/* Add User Container */}
      <div className="max-w-md mx-auto mt-10 p-6 bg-white/10 rounded-lg">
        <button 
          onClick={handleBack} 
          className="mb-4 px-3 py-2 bg-yellow-500 text-blue-900 rounded font-bold hover:bg-yellow-600 transition"
        >
          Back to User Management
        </button>

        <h2 className="text-2xl text-center mb-6">Add New User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Fields */}
          <div className="flex flex-col space-y-2">
            <label className="font-bold self-start">First Name</label>
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required 
              className="w-full p-2 rounded bg-white/20 text-white text-center border border-white"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-bold self-start">Last Name</label>
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required 
              className="w-full p-2 rounded bg-white/20 text-white text-center border border-white"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-bold self-start">Date of Birth</label>
            <input 
              type="date" 
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required 
              className="w-full p-2 rounded bg-white/20 text-white text-center border border-white"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-bold self-start">Phone Number</label>
            <input 
              type="text" 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required 
              className="w-full p-2 rounded bg-white/20 text-white text-center border border-white"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-bold self-start">Username</label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required 
              className="w-full p-2 rounded bg-white/20 text-white text-center border border-white"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-bold self-start">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required 
              className="w-full p-2 rounded bg-white/20 text-white text-center border border-white"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-bold self-start">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required 
              className="w-full p-2 rounded bg-white/20 text-white text-center border border-white"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-bold self-start">Role</label>
            <select 
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required 
              className="w-full p-2 rounded bg-white/20 text-white text-center border border-white"
            >
              <option value="" disabled>Select user role</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center space-y-2">
            <label className="font-bold self-start">Profile Picture</label>
            <input 
              type="file" 
              id="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
            <div 
              onClick={() => document.getElementById('profilePicture').click()}
              className="w-40 h-40 border-2 border-white rounded flex items-center justify-center cursor-pointer relative hover:bg-black/70 transition"
              style={{ 
                backgroundImage: profilePicture ? `url(${profilePicture})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {!profilePicture && (
                <div className="flex flex-col items-center">
                  <Camera className="text-blue-500 text-4xl" />
                  <span className="text-white text-sm absolute bottom-2">Choose file</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full p-3 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;