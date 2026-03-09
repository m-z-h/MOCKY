import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOTP from './pages/VerifyOTP';

import StudentLayout from './components/StudentLayout';
import StudentHome from './pages/student/StudentHome';
import TestList from './pages/student/TestList';
import NotesList from './pages/student/NotesList';
import ResultList from './pages/student/ResultList';
import ResultDetail from './pages/student/ResultDetail';

import ExamSimulator from './pages/exam/ExamSimulator';

import PaperSetterLayout from './components/PaperSetterLayout';
import SetterHome from './pages/setter/SetterHome';
import QuestionBank from './pages/setter/QuestionBank';
import SetterTests from './pages/setter/SetterTests';

import AdminLayout from './components/AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import UserManagement from './pages/admin/UserManagement';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!user) return <Navigate to="/login" replace />;
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/unauthorized" element={<div className="p-8">Unauthorized Access</div>} />

        {/* Protected Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminLayout>
              <Routes>
                <Route path="/" element={<AdminHome />} />
                <Route path="/users" element={<UserManagement />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/setter/*" element={
          <ProtectedRoute allowedRoles={['PAPER_SETTER', 'ADMIN']}>
            <PaperSetterLayout>
              <Routes>
                <Route path="/" element={<SetterHome />} />
                <Route path="/questions" element={<QuestionBank />} />
                <Route path="/tests" element={<SetterTests />} />
              </Routes>
            </PaperSetterLayout>
          </ProtectedRoute>
        } />

        {/* Exam Route - Only Students */}
        <Route path="/exam/:id" element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <ExamSimulator />
          </ProtectedRoute>
        } />

        {/* Default Route based on user role */}
        <Route path="/student/*" element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentLayout>
              <Routes>
                <Route path="/" element={<StudentHome />} />
                <Route path="/tests" element={<TestList />} />
                <Route path="/notes" element={<NotesList />} />
                <Route path="/results" element={<ResultList />} />
                <Route path="/results/:id" element={<ResultDetail />} />
              </Routes>
            </StudentLayout>
          </ProtectedRoute>
        } />

        {/* Default Route based on user role */}
        <Route path="/" element={
          <ProtectedRoute>
            <RoleBasedRedirect />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

const RoleBasedRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role === 'ADMIN') return <Navigate to="/admin" />;
  if (user.role === 'PAPER_SETTER') return <Navigate to="/setter" />;
  return <Navigate to="/student" />;
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
