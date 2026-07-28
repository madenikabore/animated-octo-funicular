import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PhoneFrame } from './components/PhoneFrame';
import { AppProvider, useApp } from './context/AppContext';
import { Splash } from './pages/Splash';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Subscriptions } from './pages/Subscriptions';
import { Payment } from './pages/Payment';
import { Pass } from './pages/Pass';
import { MapTracking } from './pages/MapTracking';
import { LinesSchedule } from './pages/LinesSchedule';
import { BusIdentify } from './pages/BusIdentify';
import { Profile } from './pages/Profile';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subscriptions"
        element={
          <ProtectedRoute>
            <Subscriptions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pass"
        element={
          <ProtectedRoute>
            <Pass />
          </ProtectedRoute>
        }
      />
      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <MapTracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lines"
        element={
          <ProtectedRoute>
            <LinesSchedule />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bus-identify"
        element={
          <ProtectedRoute>
            <BusIdentify />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <PhoneFrame>
        <AppRoutes />
      </PhoneFrame>
    </AppProvider>
  );
}

export default App;
