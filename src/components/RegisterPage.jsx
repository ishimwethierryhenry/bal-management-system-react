import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    dateOfBirth: '',
    phoneNumber: '',
    role: '',
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // File validation similar to backend
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('File size exceeds the maximum limit of 5MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPEG and PNG files are allowed');
      return;
    }

    setProfilePicture(file);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    // Create FormData for file upload
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSubmit.append(key, formData[key]);
    });

    if (profilePicture) {
      formDataToSubmit.append('profilePicture', profilePicture);
    }

    try {
      const response = await axios.post('/register', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Handle successful registration
      setMessage('Registration successful');
      // Optionally redirect to login or dashboard
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-r from-[#ff758c] to-[#ff7eb3] 
      flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="container flex bg-[#3b3b3b] rounded-lg overflow-hidden max-w-4xl w-full shadow-lg">
        {/* Left Registration Form Section */}
        <div className="register-box w-1/2 p-10 bg-opacity-10 backdrop-blur-md text-white">
          <h2 className="text-3xl text-center mb-6">Welcome to Basketball Africa League</h2>
          
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {message && <div className="text-green-500 text-center mb-4">{message}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {['email', 'firstName', 'lastName', 'username', 'password', 'dateOfBirth', 'phoneNumber'].map(field => (
                <div key={field}>
                  <label className="block text-sm mb-2 capitalize">
                    {field.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type={field === 'password' ? 'password' : 
                          field === 'dateOfBirth' ? 'date' : 
                          field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-full bg-[#282828] text-white 
                    border-2 border-transparent focus:border-[#29ffdf] 
                    focus:ring-2 focus:ring-[#29ffdf]/50 transition duration-300"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm mb-2">Profile Picture</label>
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleFileChange}
                  accept="image/jpeg, image/png"
                  className="w-full px-4 py-3 rounded-full bg-[#282828] text-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-full bg-[#282828] text-white"
                >
                  <option value="" disabled>Select your role</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-green-600 hover:bg-green-700 
                rounded-full text-white font-bold transition duration-300 
                transform hover:-translate-y-1 shadow-lg"
              >
                Register
              </button>
            </div>
          </form>

          <div className="social-register mt-6 text-center">
            <p className="mb-4">Or register with:</p>
            <div className="flex justify-center space-x-6">
              {[
                { icon: faGoogle, url: '#' },
                { icon: faGithub, url: '#' },
                { icon: faFacebook, url: '#' }
              ].map(({ icon, url }) => (
                <a 
                  key={icon.iconName} 
                  href={url} 
                  className="text-white text-2xl hover:text-[#ff758c] transition"
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>

          <p className="text-center mt-4">
            Already have an account? <a href="/login" className="text-[#ff758c] hover:text-[#ff5a70]">Log In</a>
          </p>
        </div>

        {/* Right Description Section */}
        <div className="right-side w-1/2 bg-opacity-20 backdrop-blur-md text-white flex flex-col justify-center items-center p-8 text-center">
          <h3 className="text-3xl mb-4">Basketball Africa League</h3>
          <blockquote className="italic text-lg mb-6">
            "The Basketball Africa League (BAL) is the premier professional basketball league in Africa, showcasing the continent's top talent."
          </blockquote>
          <p className="mb-6">
            As a member, you'll get access to exclusive content, live game updates, and player statistics!
          </p>
          <div className="nav-buttons space-x-4 mb-4">
            <button className="w-12 h-12 bg-[#ff758c] hover:bg-[#ff5a70] rounded-full">
              &lt;
            </button>
            <button className="w-12 h-12 bg-[#ff758c] hover:bg-[#ff5a70] rounded-full">
              &gt;
            </button>
          </div>
          <p>Register today to follow your favorite teams and players!</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;