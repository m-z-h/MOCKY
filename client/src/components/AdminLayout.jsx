import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Users, BarChart2, Shield } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0">
        <div className="p-6">
          <h2 className="text-xl font-bold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
            <Shield className="w-5 h-5 mr-2 text-red-400" />
            Admin Panel
          </h2>
          <p className="text-slate-400 text-sm mt-1">{user?.email}</p>
        </div>

        <nav className="mt-4 px-4 space-y-2">
          <Link to="/admin" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors rounded-lg">
            <BarChart2 className="h-5 w-5 mr-3" />
            Analytics
          </Link>
          <Link to="/admin/users" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors rounded-lg">
            <Users className="h-5 w-5 mr-3" />
            Manage Users
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full md:w-64 p-4">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-red-400/10 transition-colors rounded-lg"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
