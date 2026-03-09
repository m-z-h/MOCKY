import React, { useEffect, useState } from 'react';
import api from '../../api';
import { BookOpen, CheckCircle, BarChart, ArrowUpRight, Lightbulb } from 'lucide-react';

const StudentHome = () => {
  const [stats, setStats] = useState({ testsAvailable: 0, completedTests: 0, avgScore: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [testsRes, resultsRes] = await Promise.all([
          api.get('/tests'),
          api.get('/results')
        ]);
        
        let totalScore = 0;
        resultsRes.data.forEach(r => totalScore += r.total_score);
        
        setStats({
          testsAvailable: testsRes.data.length,
          completedTests: resultsRes.data.length,
          avgScore: resultsRes.data.length ? Math.round(totalScore / resultsRes.data.length) : 0
        });
      } catch (error) {
        console.error('Error fetching home data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  if (loading) {
     return <div className="flex items-center justify-center h-full text-slate-400 font-medium">Loading your stats...</div>;
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome back!</h1>
          <p className="text-slate-500 font-medium mt-2">Here's a quick look at your overall progress.</p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Available Tests */}
        <div className="relative group overflow-hidden bg-white p-8 rounded-[2rem] shadow-premium border border-slate-100/50 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
            <BookOpen className="w-24 h-24 text-primary" />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
              <BookOpen className="h-6 w-6" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Available Tests</p>
            <div className="flex items-end space-x-2 mt-2">
              <span className="text-4xl font-black text-slate-900">{stats.testsAvailable}</span>
              <span className="text-slate-400 font-bold mb-1">New</span>
            </div>
            <div className="mt-auto pt-6 flex items-center text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
              EXPLORE TESTS <ArrowUpRight className="ml-1 h-3 w-3" />
            </div>
          </div>
        </div>
        
        {/* Card 2: Completed Tests */}
        <div className="relative group overflow-hidden bg-white p-8 rounded-[2rem] shadow-premium border border-slate-100/50 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
            <CheckCircle className="w-24 h-24 text-secondary" />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6">
              <CheckCircle className="h-6 w-6" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Attempts</p>
            <p className="text-4xl font-black text-slate-900 mt-2">{stats.completedTests}</p>
            <div className="mt-auto pt-6 flex items-center text-xs font-bold text-secondary group-hover:translate-x-1 transition-transform">
              VIEW HISTORY <ArrowUpRight className="ml-1 h-3 w-3" />
            </div>
          </div>
        </div>

        {/* Card 3: Average Score */}
        <div className="relative group overflow-hidden bg-white p-8 rounded-[2rem] shadow-premium border border-slate-100/50 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
            <BarChart className="w-24 h-24 text-accent" />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
              <BarChart className="h-6 w-6" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Average Performance</p>
            <div className="flex items-end space-x-1 mt-2">
              <span className="text-4xl font-black text-slate-900">{stats.avgScore}</span>
              <span className="text-slate-400 font-bold mb-1.5">%</span>
            </div>
            <div className="mt-auto pt-6 flex items-center text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
              DETAILED ANALYTICS <ArrowUpRight className="ml-1 h-3 w-3" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-xl self-center md:self-start">
              <Lightbulb className="w-10 h-10 text-accent animate-pulse" />
            </div>
            <div>
               <h3 className="text-3xl font-bold text-white tracking-tight">Preparation Strategy</h3>
               <p className="text-slate-300 mt-4 leading-relaxed max-w-2xl text-lg font-medium">
                 Consistency is the key to mastering NEET and JEE. Our exam interface is engineered to precisely mimic the NTA experience, helping you build psychological endurance and technical familiarity with the real testing environment.
               </p>
               <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                 <div className="px-5 py-2.5 bg-white/5 border border-white/5 rounded-full text-xs font-black text-slate-400 tracking-wider">REAL-TIME FEEDBACK</div>
                 <div className="px-5 py-2.5 bg-white/5 border border-white/5 rounded-full text-xs font-black text-slate-400 tracking-wider">NTA PATTERN MATCHED</div>
                 <div className="px-5 py-2.5 bg-white/5 border border-white/5 rounded-full text-xs font-black text-slate-400 tracking-wider">ADVANCED ANALYTICS</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StudentHome;
