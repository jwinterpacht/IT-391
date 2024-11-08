import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './components/HomePage';
import InventoryPage from './components/InventoryPage';
import SettingsPage from './components/SettingsPage';
import RecipesPage from './components/RecipesPage';
import NotificationsPage from './components/NotificationsPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './components/Apps.css'; // Import global CSS

function App() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    'Milk is running low!',
    'Eggs will expire in 2 days!',
    'Flour is almost out!',
  ]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 100) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <header>
        <h1>Dean's Food List</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/login">Logout</Link>
          <div className="notification-icon" onClick={toggleNotifications}>
            <FontAwesomeIcon icon={faBell} />
            {notifications.length > 0 && (
              <span className="notification-count">{notifications.length}</span>
            )}
            {showNotifications && (
              <div className="notification-dropdown">
                <ul>
                  {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                  ))}
                </ul>
                <Link
                  to="/notifications"
                  className="see-all-link"
                  onClick={() => setShowNotifications(false)}
                >
                  See All
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
