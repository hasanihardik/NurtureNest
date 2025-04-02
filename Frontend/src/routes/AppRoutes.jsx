import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Components
import Home from "../components/ui/HomePage";
import Exercise from "../components/ui/Exercise";
import Books from "../components/ui/Books";
import AIAssistant from "../components/ui/AIAssistant";
import MapComponent from "../components/ui/MapComponent";
import DietPlan from "../components/ui/DietPlan";
import Login from "../components/ui/Login";
import RegisterUser from "../components/ui/RegisterUser";
import UserProfile from "../components/ui/UserProfile";
import UpdateProfile from "../components/ui/UpdateProfile";
import MainFeature from "../components/ui/MainFeaturePage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/RegisterUser" element={<RegisterUser />} />
      
      {/* Protected Routes */}
      <Route path="/exercise" element={
        <ProtectedRoute>
          <Exercise />
        </ProtectedRoute>
      } />
      
      <Route path="/books" element={
        <ProtectedRoute>
          <Books />
        </ProtectedRoute>
      } />
      
      <Route path="/ai" element={
        <ProtectedRoute>
          <AIAssistant />
        </ProtectedRoute>
      } />
      
      <Route path="/hospitals" element={
        <ProtectedRoute>
          <MapComponent />
        </ProtectedRoute>
      } />
      
      <Route path="/diet" element={
        <ProtectedRoute>
          <DietPlan />
        </ProtectedRoute>
      } />

      <Route path="/sonography" element={
        <ProtectedRoute>
          <MainFeature />
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      } />
      
      <Route path="/update-profile" element={
        <ProtectedRoute>
          <UpdateProfile />
        </ProtectedRoute>
      } />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
