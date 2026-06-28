import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoute from '@/components/ProtectedRoute';

// Layouts
import AppLayout from '@/layouts/AppLayout';

// Pages
import Login from '@/pages/Login';
import SetupPassword from '@/pages/SetupPassword';
import Setup from '@/pages/Setup';
import Dashboard from '@/pages/Dashboard';
import Unauthorized from '@/pages/Unauthorized';
import Users from '@/pages/Users';
import CreateUser from '@/pages/CreateUser';
import UserDetails from '@/pages/UserDetails';
import AssignPermissions from '@/pages/AssignPermissions';
import Projects from '@/pages/Projects';
import Sites from '@/pages/Sites';

import CreateSite from '@/pages/CreateSite';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/setup-password" element={<SetupPassword />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/create" element={<CreateUser />} />
                <Route path="/users/assign" element={<AssignPermissions />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/sites" element={<Sites />} />
                <Route path="/sites/create" element={<CreateSite />} />
              </Route>
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
