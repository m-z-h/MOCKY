import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, Award, Home, Info, Mail } from 'lucide-react';

const PublicLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-peace font-sans text-slate-900 overflow-x-hidden">
      {/* Dynamic Mesh Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-secondary/15 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[50%] bg-accent/8 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[45%] h-[45%] bg-primary/10 rounded-full blur-[110px] animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-peace/40 backdrop-blur-3xl border-b border-primary/5">
        <div className="w-full px-4 md:px-12">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-6 md:space-x-12">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
                  MOCKY
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`text-sm font-black tracking-wide transition-all duration-200 hover:text-primary ${
                        isActive ? 'text-primary underline decoration-2 underline-offset-8' : 'text-slate-500'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop Login */}
            <div className="hidden md:flex items-center">
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-3 rounded-2xl bg-slate-900 text-white text-sm font-black shadow-2xl shadow-slate-900/20 hover:bg-primary hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Student Portal
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-primary transition-colors p-2 bg-white/50 rounded-xl border border-white/50"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'} transition-all duration-300 bg-peace/95 backdrop-blur-xl border-t border-primary/5 absolute w-full shadow-3xl`}>
          <div className="px-6 py-8 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center px-6 py-4 text-lg font-black text-slate-600 hover:bg-white/60 hover:text-primary rounded-2xl transition-all border border-transparent hover:border-white/50"
              >
                <item.icon className="w-6 h-6 mr-4 text-primary/60" />
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-6 py-5 mt-6 bg-slate-900 text-white rounded-2xl font-black text-xl text-center justify-center shadow-2xl shadow-slate-900/20 active:scale-95 transition-all"
            >
              Portal Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 min-h-[calc(100vh-80px-300px)]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary/5 border-t border-primary/5 py-24 relative z-10 mt-20">
        <div className="w-full px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter">MOCKY</h3>
              <p className="text-xl text-slate-500 max-w-sm font-bold leading-relaxed mb-8">
                The ultimate platform for NEET/JEE preparation. Master your exams with our intelligent mock test system and premium resources.
              </p>
              <div className="flex space-x-4">
                 <div className="w-12 h-12 rounded-xl bg-white/50 border border-white flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform cursor-pointer font-bold italic">M</div>
                 <span className="text-slate-400 font-black self-center tracking-widest uppercase text-xs">Since 2024</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-8">Explore</h4>
              <ul className="space-y-5">
                {navItems.map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-lg text-slate-500 hover:text-primary font-bold transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-8">Legal</h4>
              <ul className="space-y-5">
                <li><Link to="/privacy" className="text-lg text-slate-500 hover:text-primary font-bold transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-lg text-slate-500 hover:text-primary font-bold transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm font-black tracking-wide">
            <p>&copy; {new Date().getFullYear()} MOCKY Platform. All rights reserved.</p>
            <div className="mt-6 md:mt-0 flex space-x-10">
              <span className="hover:text-primary transition-colors cursor-default underline decoration-primary/20 decoration-2 underline-offset-4">Handcrafted for Aspirants</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
