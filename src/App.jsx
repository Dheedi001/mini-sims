import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Login';
import Layout from './Layout';
import Dashboard from './Dashboard';
import Fees from './Fees';
import Attendance from './Attendance';
import Timetable from './Timetable';
import StudentProvisioning from './StudentProvisioning';
import LecturerDashboard from './LecturerDashboard';
import StudentDashboard from './StudentDashboard';
import StudentDirectory from './StudentDirectory';
import Analytics from './Analytics';
import StudentFees from './StudentFees';
import LecturerRegistry from './LecturerRegistry';
import Settings from './Settings';
import LecturerGrades from './LecturerGrades';
import StudentTranscript from './StudentTranscript';

// RBAC SECURITY INTERCEPTOR
const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  if (!isAuthenticated || !user) return <Navigate to="/" replace />;

  // Check if user's role is allowed in this route
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return children;
};

// Placeholder for the forced password reset screen
const ForcePasswordReset = () => (
  <div className="h-screen flex items-center justify-center bg-slate-900 text-white font-bold text-xl">
    🔒 Security Check: You must change your default password to continue.
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/update-password" element={<ForcePasswordReset />} />
        
        {/* ==========================================
            ADMINISTRATOR WORKSPACE
            ========================================== */}
        <Route element={<RoleProtectedRoute allowedRoles={['admin']}><Layout /></RoleProtectedRoute>}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/provision" element={<StudentProvisioning />} />
          <Route path="/admin/fees" element={<Fees />} />
          <Route path="/admin/attendance" element={<Attendance />} />
          <Route path="/admin/timetable" element={<Timetable />} />
          <Route path="/admin/students" element={<StudentDirectory />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/settings" element={<Settings />} />
          {/* In the LECTURER WORKSPACE */}
          <Route path="/lecturer/grades" element={<LecturerGrades />} />
          {/* In the STUDENT WORKSPACE */}    
          <Route path="/student/transcript" element={<StudentTranscript />} />
        </Route>

        {/* ==========================================
            LECTURER WORKSPACE
            ========================================== */}
        <Route element={<RoleProtectedRoute allowedRoles={['lecturer']}><Layout /></RoleProtectedRoute>}>
          <Route path="/lecturer/dashboard" element={<LecturerDashboard />} />
          <Route path="/lecturer/registry" element={<LecturerRegistry />} />
          <Route path="/lecturer/timetable" element={<Timetable />} />
          <Route path="/lecturer/settings" element={<Settings />} />
        </Route>

        {/* ==========================================
            STUDENT WORKSPACE
            ========================================== */}
        <Route element={<RoleProtectedRoute allowedRoles={['student']}><Layout /></RoleProtectedRoute>}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/fees" element={<StudentFees />} />
          <Route path="/student/timetable" element={<Timetable />} />
          <Route path="/student/settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}