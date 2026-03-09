import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { PlayCircle, Clock, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await api.get('/tests');
        setTests(res.data);
      } catch (error) {
        console.error('Failed to fetch tests', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const handleStartTest = (testId) => {
    navigate(`/exam/${testId}`);
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-slate-400 font-medium tracking-wide">Fetching available tests...</div>;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Available Mock Tests</h1>
          <p className="text-slate-500 font-medium mt-2">Select a simulation to begin your practice session.</p>
        </div>
        <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-2xl border border-primary/10">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-xs font-black text-primary uppercase tracking-widest">Official Pattern</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tests.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] shadow-premium border border-slate-100 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
               <Clock className="w-8 h-8" />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No tests published yet</p>
            <p className="text-slate-300 text-xs mt-2">Check back later for new mock papers.</p>
          </div>
        ) : (
          tests.map((test) => (
            <div key={test._id} className="group bg-white rounded-[2rem] shadow-premium border border-slate-100/50 overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="p-8 pb-0">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <PlayCircle className="h-6 w-6" />
                  </div>
                  <span className="px-4 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-widest border border-slate-100 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                    {test.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-black text-slate-900 line-clamp-2 leading-tight min-h-[3rem] mb-6">{test.title}</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <CheckCircle className="h-4 w-4 mr-3 text-primary/40 group-hover:text-primary transition-colors" />
                    {test.category}
                  </div>
                  <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <Clock className="h-4 w-4 mr-3 text-secondary/40 group-hover:text-secondary transition-colors" />
                    {test.duration} Minutes
                  </div>
                </div>
              </div>

              <div className="mt-auto p-8 pt-4">
                <button 
                  onClick={() => handleStartTest(test._id)}
                  className="w-full flex items-center justify-between py-4 px-8 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-slate-900 hover:bg-primary hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95"
                >
                  Start Simulation
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestList;
