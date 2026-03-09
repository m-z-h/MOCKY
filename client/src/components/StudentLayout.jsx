import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, BookOpen, FileText, CheckCircle, Clock, Layout, ChevronRight } from 'lucide-react';

const StudentLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/student', icon: Layout },
    { name: 'Mock Tests', path: '/student/tests', icon: CheckCircle },
    { name: 'Study Notes', path: '/student/notes', icon: BookOpen },
    { name: 'My Results', path: '/student/results', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200/60 flex-shrink-0 flex flex-col shadow-sm relative z-20">
        <div className="p-8">
          <div className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-5 h-5 bg-primary rounded-md shadow-sm"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {user?.category} Portal
              </h2>
              <div className="flex items-center text-xs font-medium text-slate-400 mt-0.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                Student Active
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name}
                to={item.path} 
                className={`flex items-center justify-between group px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary/5 text-primary shadow-[0_4px_12px_-4px_rgba(79,70,229,0.12)] border border-primary/10' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center font-semibold text-[0.9375rem]">
                  <Icon className={`h-[1.125rem] w-[1.125rem] mr-3.5 transition-colors ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  {item.name}
                </div>
                {isActive && <ChevronRight className="h-4 w-4 text-primary/50" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-slate-50 rounded-2xl p-4 mb-4 border border-slate-100/50">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Authenticated</p>
             <p className="text-sm font-semibold text-slate-700 truncate">{user?.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 rounded-2xl font-bold text-[0.9375rem] group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mr-3 group-hover:bg-red-100 transition-colors">
              <LogOut className="h-4 w-4 mr-0" />
            </div>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40"></div>
        <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto relative z-10 scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
