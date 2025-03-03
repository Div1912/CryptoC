import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, Shield, User, LogIn, Bell, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState<{ id: string; message: string; read: boolean }[]>([
    { id: '1', message: 'New credential issued to you', read: false },
    { id: '2', message: 'Your credential was verified', read: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-indigo-700 shadow-lg' : 'bg-indigo-700 bg-opacity-95'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 mr-2 text-white" />
              <span className="font-bold text-xl text-white">CryptoCredentials</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-300" />
              </div>
              <input
                type="text"
                placeholder="Search credentials..."
                className="w-64 pl-10 pr-4 py-1 bg-indigo-800 text-white placeholder-indigo-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-600 transition-colors ${
                  location.pathname === '/' ? 'bg-indigo-800' : ''
                }`}
              >
                Home
              </Link>
              
              <Link 
                to="/credentials" 
                className={`px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-600 transition-colors ${
                  location.pathname === '/credentials' ? 'bg-indigo-800' : ''
                }`}
              >
                Credentials
              </Link>
              
              {isAuthenticated && user?.role === 'institution' && (
                <Link 
                  to="/issue" 
                  className={`px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-600 transition-colors ${
                    location.pathname === '/issue' ? 'bg-indigo-800' : ''
                  }`}
                >
                  Issue Credential
                </Link>
              )}
              
              <Link 
                to="/verify" 
                className={`px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-600 transition-colors ${
                  location.pathname === '/verify' ? 'bg-indigo-800' : ''
                }`}
              >
                Verify
              </Link>
              
              {isAuthenticated && (
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-1 rounded-full text-white hover:bg-indigo-600 focus:outline-none"
                  >
                    <Bell className="h-6 w-6" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div 
                        className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                          <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                          <button 
                            onClick={markAllAsRead}
                            className="text-xs text-indigo-600 hover:text-indigo-800"
                          >
                            Mark all as read
                          </button>
                        </div>
                        {notifications.length > 0 ? (
                          <div className="max-h-60 overflow-y-auto">
                            {notifications.map(notification => (
                              <div 
                                key={notification.id}
                                className={`px-4 py-2 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                              >
                                <p className="text-sm text-gray-700">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">Just now</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="px-4 py-2 text-sm text-gray-500">No notifications</div>
                        )}
                        <div className="px-4 py-2 border-t border-gray-100">
                          <Link 
                            to="/notifications" 
                            className="text-xs text-indigo-600 hover:text-indigo-800"
                            onClick={() => setShowNotifications(false)}
                          >
                            View all notifications
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-indigo-600">
                    {user?.avatarUrl ? (
                      <img 
                        src={user.avatarUrl} 
                        alt={user?.name} 
                        className="h-6 w-6 rounded-full mr-2 border border-white"
                      />
                    ) : (
                      <User className="h-4 w-4 mr-2" />
                    )}
                    {user?.name.split(' ')[0]}
                  </button>
                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block z-10">
                    <div className="py-1">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                      {user?.role === 'institution' && (
                        <Link to="/issue" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Issue Credential</Link>
                      )}
                      <button 
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-white text-indigo-700 hover:bg-gray-100 transition-colors">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-indigo-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">Home</Link>
              <Link to="/credentials" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">Credentials</Link>
              
              {isAuthenticated && user?.role === 'institution' && (
                <Link to="/issue" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">Issue Credential</Link>
              )}
              
              <Link to="/verify" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">Verify</Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">Profile</Link>
                  <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600">Dashboard</Link>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-600"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link to="/login" className="flex items-center px-3 py-2 rounded-md text-base font-medium bg-white text-indigo-700 hover:bg-gray-100">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;