import React from 'react';
import { SnackbarProvider } from 'notistack';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
