import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const user = await login(email, password);
      if (user.role === 'ADMIN') navigate('/admin');
      else if (user.role === 'PAPER_SETTER') navigate('/setter');
      else navigate('/student');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
      if (err.response?.status === 401 && err.response?.data?.message?.includes('OTP')) {
         navigate('/verify-otp', { state: { email } });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl shadow-premium border border-slate-100 mb-6 scale-110">
             <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="mt-3 text-slate-500 font-medium">Continue your preparation journey</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-100/50 relative z-10">
          {error && (
            <div className="mb-8 bg-red-50/50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-center text-sm font-bold animate-in shake duration-500">
              <AlertCircle className="h-4 w-4 mr-3 shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    className="pl-12 appearance-none rounded-[1.25rem] relative block w-full px-4 py-4 border border-slate-100 bg-slate-50/50 placeholder-slate-300 text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 sm:text-sm transition-all"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Security Key</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    className="pl-12 appearance-none rounded-[1.25rem] relative block w-full px-4 py-4 border border-slate-100 bg-slate-50/50 placeholder-slate-300 text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 sm:text-sm transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-between items-center py-4 px-8 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-slate-900 hover:bg-primary shadow-xl hover:shadow-primary/20 active:scale-95 disabled:opacity-50 transition-all overflow-hidden"
              >
                <span className="relative z-10">{loading ? 'Accessing...' : 'Enter Dashboard'}</span>
                <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </div>
          </form>
          
          <div className="mt-10 pt-8 border-t border-slate-50 text-center">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">New here? </span>
            <Link to="/register" className="text-xs font-black text-primary uppercase tracking-widest hover:text-slate-900 transition-colors">
              Create Account
            </Link>
          </div>
        </div>
        
        <p className="mt-10 text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Official Mock Simulation Platform</p>
      </div>
    </div>
  );
};

export default Login;
