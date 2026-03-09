import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, BookOpen, AlertCircle, ArrowRight, Sparkles, ArrowLeft } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    category: 'NEET'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await registerUser(formData);
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="absolute top-8 left-8 z-50">
        <Link to="/" className="flex items-center space-x-2 text-slate-400 hover:text-secondary transition-all group">
          <div className="w-10 h-10 rounded-xl bg-white shadow-premium flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest hidden md:block">Back to Home</span>
        </Link>
      </div>

      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl shadow-premium border border-slate-100 mb-6 scale-110">
             <Sparkles className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight text-center">Join Simulation</h2>
          <p className="mt-3 text-slate-500 font-medium">Create your official candidate profile</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-100/50 relative z-10">
          {error && (
            <div className="mb-8 bg-red-50/50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-center text-sm font-bold animate-in shake duration-500">
              <AlertCircle className="h-4 w-4 mr-3 shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Full Identity</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    required
                    className="pl-12 appearance-none rounded-[1.25rem] relative block w-full px-4 py-4 border border-slate-100 bg-slate-50/50 placeholder-slate-300 text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 sm:text-sm transition-all"
                    placeholder="Candidate Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="pl-12 appearance-none rounded-[1.25rem] relative block w-full px-4 py-4 border border-slate-100 bg-slate-50/50 placeholder-slate-300 text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 sm:text-sm transition-all"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Create Secret</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    className="pl-12 appearance-none rounded-[1.25rem] relative block w-full px-4 py-4 border border-slate-100 bg-slate-50/50 placeholder-slate-300 text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 sm:text-sm transition-all"
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Exam Category</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BookOpen className="h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                  </div>
                  <select
                    name="category"
                    className="pl-12 appearance-none rounded-[1.25rem] relative block w-full px-4 py-4 border border-slate-100 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 sm:text-sm transition-all"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="NEET">Medical (NEET)</option>
                    <option value="JEE">Engineering (JEE)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-between items-center py-4 px-8 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-slate-900 hover:bg-secondary shadow-xl hover:shadow-secondary/20 active:scale-95 disabled:opacity-50 transition-all overflow-hidden"
              >
                <span className="relative z-10">{loading ? 'Processing...' : 'Verify Email & Join'}</span>
                <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </div>
          </form>
          
          <div className="mt-10 pt-8 border-t border-slate-50 text-center">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Registered candidate? </span>
            <Link to="/login" className="text-xs font-black text-primary uppercase tracking-widest hover:text-slate-900 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
