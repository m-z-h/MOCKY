import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShieldCheck, AlertCircle, ArrowRight, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { verifyOtpAndLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const user = await verifyOtpAndLogin(email, otp);
      if (user.role === 'ADMIN') navigate('/admin');
      else if (user.role === 'PAPER_SETTER') navigate('/setter');
      else navigate('/student');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="absolute top-8 left-8 z-50">
        <Link to="/login" className="flex items-center space-x-2 text-slate-400 hover:text-primary transition-all group">
          <div className="w-10 h-10 rounded-xl bg-white shadow-premium flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest hidden md:block">Back to Login</span>
        </Link>
      </div>

      <div className="max-w-md w-full animate-in fade-in zoom-in duration-1000">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-premium border border-slate-100 relative z-10 text-center">
          <div className="flex justify-center mb-10">
            <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary animate-pulse">
              <ShieldCheck className="h-10 w-10" />
            </div>
          </div>
          
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Verify Identity</h2>
            <div className="mt-4 flex flex-col items-center space-y-2">
               <span className="bg-slate-50 px-4 py-2 rounded-full flex items-center text-xs font-bold text-slate-500 border border-slate-100">
                  <Mail className="w-3 h-3 mr-2" />
                  {email}
               </span>
               <p className="text-slate-400 text-xs font-medium">We've sent a 6-digit code to your inbox.</p>
            </div>
          </div>
          
          {error && (
            <div className="mb-8 bg-red-50/50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-center text-sm font-bold text-left animate-in shake duration-500">
              <AlertCircle className="h-4 w-4 mr-3 shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-10" onSubmit={handleSubmit}>
            <div>
              <label className="sr-only">Access Code</label>
              <input
                type="text"
                required
                maxLength={6}
                className="appearance-none rounded-[2rem] relative block w-full px-6 py-6 border border-slate-100 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 text-center tracking-[1em] font-black text-3xl placeholder-slate-200 transition-all font-mono"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="group relative w-full flex justify-between items-center py-4 px-8 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-slate-900 hover:bg-primary shadow-xl hover:shadow-primary/20 active:scale-95 disabled:opacity-50 transition-all overflow-hidden"
              >
                <span className="relative z-10">{loading ? 'Verifying...' : 'Finalize Setup'}</span>
                <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </div>
          </form>
          
          <div className="mt-12 text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-relaxed">
              Code will expire shortly.<br />
              Please check your spam folder.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
