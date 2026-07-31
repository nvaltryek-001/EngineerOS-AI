/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Mentor from './pages/Mentor';
import Resume from './pages/Resume';
import Roadmap from './pages/Roadmap';
import Placement from './pages/Placement';
import Coding from './pages/Coding';
import Notes from './pages/Notes';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/" element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="mentor" element={<Mentor />} />
              <Route path="resume" element={<Resume />} />
              <Route path="roadmap" element={<Roadmap />} />
              <Route path="placement" element={<Placement />} />
              <Route path="coding" element={<Coding />} />
              <Route path="notes" element={<Notes />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
