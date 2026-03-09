import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, BookOpen, Layers, PlusCircle, Settings, Home } from 'lucide-react';

const PaperSetterLayout = ({ children }) => {
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
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Paper Setter Panel
          </h2>
          <p className="text-slate-400 text-sm mt-1">{user?.name}</p>
        </div>

        <nav className="mt-4 px-4 space-y-2">
          <Link to="/setter" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors rounded-lg">
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          <Link to="/setter/questions" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors rounded-lg">
            <BookOpen className="h-5 w-5 mr-3" />
            Question Bank
          </Link>
          <Link to="/setter/tests" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors rounded-lg">
            <Layers className="h-5 w-5 mr-3" />
            Mock Tests
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

export default PaperSetterLayout;
