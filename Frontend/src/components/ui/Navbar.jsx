import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Growth Tracking", path: "/sonography", authRequired: true },
    { name: "Exercise", path: "/exercise", authRequired: true },
    { name: "Books", path: "/books", authRequired: true },
    { name: "Diet Plan", path: "/diet", authRequired: true },
    { name: "Hospitals", path: "/hospitals", authRequired: true },
    { name: "AI Assistant", path: "/ai", authRequired: true },
  ];

  const getVisibleMenuItems = () => {
    return menuItems.filter(item => !item.authRequired || user);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div onClick={() => navigate("/")} className="flex-shrink-0 cursor-pointer">
              <img src="/logo.png" alt="Mom's Companion" className="h-10 w-auto" />
            </div>
            
            <div className="hidden md:ml-6 md:flex md:space-x-4 overflow-x-auto">
              {getVisibleMenuItems().map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`${
                    isActive(item.path)
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-500 hover:text-purple-600"
                  } px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <span className="text-gray-700 text-sm hidden md:block">
                    {user.username}
                  </span>
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt="Profile"
                    className="h-8 w-8 rounded-full border-2 border-purple-200 object-cover"
                  />
                </button>
                
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                    >
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate("/profile");
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        Your Profile
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate("/diet");
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        Diet Plan
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate("/sonography");
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        Growth Tracking
                      </button>
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowProfileMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-600 hover:text-purple-600 px-4 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate("/RegisterUser")}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors duration-200"
                >
                  Sign up
                </button>
              </div>
            )}

            <div className="flex md:hidden ml-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <svg
                  className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {getVisibleMenuItems().map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                  className={`${
                    isActive(item.path)
                      ? "bg-purple-50 text-purple-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-purple-600"
                  } block w-full text-left px-3 py-2 rounded-md text-base font-medium`}
                >
                  {item.name}
                </button>
              ))}
              {!user && (
                <>
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-purple-600"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => {
                      navigate("/RegisterUser");
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-purple-600 hover:bg-purple-50"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
