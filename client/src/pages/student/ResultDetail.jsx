import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';
import { ArrowLeft, CheckCircle2, XCircle, MinusCircle, BarChart3, TrendingUp, Info, BookOpen, Clock } from 'lucide-react';

const ResultDetail = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await api.get(`/results/${id}`);
        setResult(res.data);
      } catch (error) {
        console.error('Error fetching result detail', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400 font-medium">Analyzing your results...</div>;
  if (!result) return <div className="min-h-screen flex items-center justify-center text-slate-400 font-medium">Result not found or deleted.</div>;

  const subjectArray = result.subject_wise_score ? Object.entries(result.subject_wise_score) : [];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <Link to="/student/results" className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-premium border border-slate-100 hover:scale-110 transition-transform active:scale-95 group">
            <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
          </Link>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Post-Exam Analysis</h1>
            <div className="flex items-center space-x-3 mt-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest">{result.test?.category}</span>
              <span className="text-slate-400 font-bold text-sm">{result.test?.title} • {new Date(result.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
           <div className="bg-slate-900 px-6 py-3 rounded-2xl shadow-xl flex items-center space-x-3">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-white font-black text-sm uppercase tracking-widest">Performance Report</span>
           </div>
        </div>
      </header>

      {/* Primary Score Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white rounded-[2.5rem] shadow-premium border border-slate-100/50 p-10 flex flex-col items-center justify-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
           <span className="text-slate-400 font-black text-xs uppercase tracking-[0.2em] mb-4">Final Score</span>
           <div className="text-[7rem] font-black text-slate-900 leading-none tracking-tighter">{result.total_score}</div>
           <div className="mt-6 flex flex-col items-center">
              <span className="text-sm font-bold text-red-500 bg-red-50 px-4 py-1.5 rounded-full">{result.negative_marks} Negative Marks</span>
              <p className="text-slate-400 text-xs font-bold mt-4 uppercase tracking-widest">Across {result.answers.length} Questions</p>
           </div>
        </div>
        
        <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 flex flex-col justify-center relative shadow-2xl overflow-hidden">
           <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
           <div className="flex justify-between items-center mb-10 relative z-10">
              <h3 className="text-xl font-black text-white uppercase tracking-widest">Question Breakdown</h3>
              <Info className="w-5 h-5 text-slate-500" />
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10">
              <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-8 border border-white/5 transition-transform hover:scale-105">
                 <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-400 mb-6">
                    <CheckCircle2 className="w-6 h-6" />
                 </div>
                 <div className="text-4xl font-black text-white">{result.correct_answers}</div>
                 <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Correct Hits</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-8 border border-white/5 transition-transform hover:scale-105">
                 <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center text-red-400 mb-6">
                    <XCircle className="w-6 h-6" />
                 </div>
                 <div className="text-4xl font-black text-white">{result.wrong_answers}</div>
                 <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Incorrect</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-8 border border-white/5 transition-transform hover:scale-105">
                 <div className="w-12 h-12 bg-slate-500/20 rounded-2xl flex items-center justify-center text-slate-400 mb-6">
                    <MinusCircle className="w-6 h-6" />
                 </div>
                 <div className="text-4xl font-black text-white">{result.unattempted}</div>
                 <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Unattempted</p>
              </div>
           </div>
        </div>
      </div>

      {/* Subject-wise breakdown */}
      {subjectArray.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
             <div className="w-2 h-8 bg-primary rounded-full"></div>
             <h2 className="text-2xl font-black text-slate-900 tracking-tight">Subject-wise Analytics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subjectArray.map(([subject, stats]) => (
              <div key={subject} className="bg-white rounded-[2rem] shadow-premium border border-slate-100 p-8 group transition-all duration-300 hover:-translate-y-1">
                 <div className="flex justify-between items-start mb-6">
                    <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight leading-none">{subject}</h3>
                    <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:bg-primary/10 group-hover:text-primary transition-colors">Section</div>
                 </div>
                 <div className="flex items-baseline space-x-2 mb-8">
                    <span className="text-4xl font-black text-slate-900">{stats.score}</span>
                    <span className="text-slate-400 font-bold text-sm tracking-widest">MARK</span>
                 </div>
                 
                 <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-transparent group-hover:border-slate-100 transition-colors">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Correct</span>
                      <span className="font-black text-green-600">{stats.correct}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-transparent group-hover:border-slate-100 transition-colors">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Wrong</span>
                      <span className="font-black text-red-600">{stats.wrong}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-transparent group-hover:border-slate-100 transition-colors">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Missed</span>
                      <span className="font-black text-slate-900">{stats.unattempted}</span>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Solution Review Mode */}
      <div className="space-y-10 pt-10 border-t border-slate-200">
        <div className="flex items-center justify-between">
           <div className="flex items-center space-x-3">
              <div className="w-2 h-8 bg-accent rounded-full"></div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight text-center md:text-left">Solution Walkthrough</h2>
           </div>
           <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Correct</span>
              </div>
              <div className="flex items-center space-x-2">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Wrong</span>
              </div>
           </div>
        </div>

        <div className="space-y-12">
          {result.answers.map((ans, idx) => {
            const q = ans.question;
            if (!q) return null;

            const isCorrect = ans.status === 'CORRECT';
            const isUnattempted = ans.status === 'UNATTEMPTED';
            
            return (
              <div key={idx} className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100/50 overflow-hidden group">
                <div className={`px-10 py-6 border-b flex flex-col md:flex-row justify-between items-center gap-4 transition-colors ${
                  isCorrect ? 'bg-green-50/50 border-green-100' : 
                  isUnattempted ? 'bg-slate-50 border-slate-100' : 'bg-red-50/50 border-red-100'
                }`}>
                  <div className="flex items-center space-x-4">
                    <span className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center font-black text-slate-900 text-sm">#{idx + 1}</span>
                    <span className="font-black text-slate-900 uppercase tracking-widest text-xs">{q.subject}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                     <span className={`px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase ${
                       isCorrect ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 
                       isUnattempted ? 'bg-slate-200 text-slate-500' : 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                     }`}>
                       {ans.status}
                     </span>
                  </div>
                </div>
                
                <div className="p-10 md:p-14">
                  <p className="text-xl font-medium text-slate-900 leading-relaxed whitespace-pre-wrap">{q.question_text}</p>
                  
                  <div className="mt-12">
                    {q.question_type === 'MCQ' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {q.options.map((opt, i) => {
                           const isSelected = ans.selected_answer === opt;
                           const isRightOption = q.correct_answer === opt;
                           
                           let borderClass = "border-slate-100";
                           let bgClass = "bg-white";
                           let textClass = "text-slate-600";
                           let indicator = null;

                           if (isRightOption) {
                              borderClass = "border-green-500";
                              bgClass = "bg-green-50/50";
                              textClass = "text-green-800 font-black";
                              indicator = <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500"></div>;
                           } else if (isSelected && !isRightOption) {
                              borderClass = "border-red-500 scale-[0.98]";
                              bgClass = "bg-red-50/50";
                              textClass = "text-red-800 font-black";
                              indicator = <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></div>;
                           }

                           return (
                             <div key={i} className={`relative p-5 border-2 rounded-2xl flex items-center transition-all ${borderClass} ${bgClass} ${textClass}`}>
                                {indicator}
                                <span className="mr-3 text-xs opacity-30 font-black">{String.fromCharCode(65 + i)}</span>
                                <span className="text-sm">{opt}</span>
                                {isRightOption && <CheckCircle2 className="w-4 h-4 ml-auto text-green-600" />}
                             </div>
                           )
                         })}
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row gap-6 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                        <div className="flex-1 flex flex-col items-center md:items-start">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Your Answer</span>
                          <span className={`text-2xl font-black ${isCorrect ? 'text-green-600' : isUnattempted ? 'text-slate-400' : 'text-red-600'}`}>
                            {ans.selected_answer || '--'}
                          </span>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-slate-200 self-center"></div>
                        <div className="flex-1 flex flex-col items-center md:items-start group-hover:scale-105 transition-transform">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Correct Constant</span>
                          <span className="text-2xl font-black text-slate-900">{q.correct_answer}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {q.explanation && (
                    <div className="mt-12 p-10 bg-primary/5 rounded-[2.5rem] border border-primary/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-5">
                        <BookOpen className="w-20 h-20" />
                      </div>
                      <div className="flex items-center space-x-3 mb-4">
                         <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white">
                            <Info className="w-4 h-4" />
                         </div>
                         <h4 className="text-sm font-black text-primary uppercase tracking-widest">Detailed Explanation</h4>
                      </div>
                      <p className="text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">{q.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultDetail;
