import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Layout from './components/layout/Layout';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthProvider>
  );
};

export default App;
