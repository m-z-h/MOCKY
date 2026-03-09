import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { Target, CheckCircle2, XCircle, MinusCircle, ArrowRight, BarChart3 } from 'lucide-react';

const ResultList = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get('/results');
        setResults(res.data);
      } catch (error) {
        console.error('Failed to fetch results', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64 text-slate-400 font-medium tracking-wide">Analyzing your history...</div>;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">My Performance</h1>
          <p className="text-slate-500 font-medium mt-2">Comprehensive review of your mock test attempts.</p>
        </div>
        <div className="flex items-center space-x-4">
           <div className="bg-slate-900 px-6 py-2.5 rounded-2xl shadow-xl flex items-center space-x-3">
              <BarChart3 className="w-4 h-4 text-accent" />
              <span className="text-white font-black text-[10px] uppercase tracking-widest">Growth Tracker</span>
           </div>
        </div>
      </header>

      <div className="space-y-6">
        {results.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-[2.5rem] shadow-premium border border-slate-100 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
               <Target className="w-8 h-8" />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No attempts recorded</p>
            <p className="text-slate-300 text-xs mt-2">Complete a mock test to see your performance analysis.</p>
          </div>
        ) : (
          results.map((result) => (
            <div key={result._id} className="group bg-white rounded-[2rem] shadow-premium border border-slate-100/50 p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 transition-all duration-300 hover:border-primary/20 hover:-translate-y-1">
              <div className="flex-1 flex items-center space-x-6">
                <div className="w-14 h-14 bg-slate-50 rounded-[1.25rem] flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors">{result.test?.title || 'System Level Simulation'}</h3>
                  <div className="flex items-center space-x-3 mt-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attempted on</span>
                    <span className="text-xs font-bold text-slate-500">{new Date(result.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 relative">
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 bg-slate-100"></div>
                
                <div className="flex flex-col items-center lg:items-start">
                  <div className="flex items-center text-green-500 space-x-2 mb-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-lg font-black">{result.correct_answers}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Correct</span>
                </div>
                
                <div className="flex flex-col items-center lg:items-start">
                  <div className="flex items-center text-red-500 space-x-2 mb-1">
                    <XCircle className="h-4 w-4" />
                    <span className="text-lg font-black">{result.wrong_answers}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Wrong</span>
                </div>

                <div className="flex flex-col items-center lg:items-start">
                  <div className="flex items-center text-slate-400 space-x-2 mb-1">
                    <MinusCircle className="h-4 w-4" />
                    <span className="text-lg font-black">{result.unattempted}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Missed</span>
                </div>
                
                <div className="flex flex-col items-center lg:items-start lg:pl-8 lg:border-l lg:border-slate-100">
                  <div className="text-3xl font-black text-slate-900 leading-none mb-1 ring-offset-4 ring-primary/20 hover:text-primary transition-colors">
                    {result.total_score}
                  </div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">MARKS</span>
                </div>
              </div>

              <div className="lg:pl-6 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0">
                <Link 
                  to={`/student/results/${result._id}`}
                  className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-primary hover:text-white hover:rotate-45 transition-all duration-500 shadow-sm"
                >
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResultList;
