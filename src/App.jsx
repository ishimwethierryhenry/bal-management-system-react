import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage'; // Add this line
import AboutBal from './components/AboutBal'; // Add this import
import Gallery from './components/Gallery';
import Matches from './components/Matches'; // Add this import
import Players from './components/Players'; // Add this import
import Stats from './components/Stats'; // Add this import
import Standings from './components/Standings'; // Add this import
import { AuthProvider } from './contexts/AuthContext';
import AddUser from './components/AddUser';
import UserManagement from './components/UserManagement';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import UpdateUser from './components/UpdateUser';
import AccessDenied from './components/AccessDenied';




function App() {
  return (
    <AuthProvider>
    
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutBal />} /> {/* Add this line */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* Add this line */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/matches" element={<Matches />} /> {/* Add this line */}
            <Route path="/players" element={<Players />} /> {/* Add this line */}
            <Route path="/stats" element={<Stats />} /> {/* Add this line */}
            <Route path="/standings" element={<Standings />} /> {/* Add this line */}
            <Route path="/admin/users/add" element={<AddUser />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/user/profile/update" element={<UpdateUser />} />
            <Route path="/admin/users/update/:id" element={<UpdateUser />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />





            {/* Add more routes as needed */}
          </Routes>
        </Router>
    </AuthProvider>
        
        );
}

export default App;