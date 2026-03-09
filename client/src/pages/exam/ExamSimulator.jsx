import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import { ChevronLeft, ChevronRight, AlertTriangle, Monitor, Clock, CheckCircle, Save, XCircle, RotateCcw } from 'lucide-react';

const ExamSimulator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Exam State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { qId: "A" }
  const [questionStatus, setQuestionStatus] = useState({}); // { qId: "answered" | "not_answered" | "marked" | "not_visited" }
  const [timeLeft, setTimeLeft] = useState(0);
  const [cheatingWarnings, setCheatingWarnings] = useState(0);

  // Initialize Data
  useEffect(() => {
    const initExam = async () => {
      try {
        const res = await api.get(`/tests/${id}`);
        const testData = res.data;
        setTest(testData);
        setTimeLeft(testData.duration * 60);
        
        // Init question status
        const initialStatus = {};
        testData.questions.forEach((q, i) => {
          initialStatus[q._id] = i === 0 ? 'not_answered' : 'not_visited';
        });
        setQuestionStatus(initialStatus);

      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load test');
      } finally {
        setLoading(false);
      }
    };
    initExam();
  }, [id]);

  // Timer Countdown
  useEffect(() => {
    if (!test || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [test, timeLeft]);

  // Anti-Cheating: Tab Visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setCheatingWarnings(prev => {
          const newWarnings = prev + 1;
          if (newWarnings >= 3) {
            alert("Test auto-submitted due to multiple tab switches.");
            handleSubmitTest();
          } else {
            alert(`Warning ${newWarnings}/3: Please do not switch tabs during the exam!`);
          }
          return newWarnings;
        });
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [test]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = test?.questions[currentIdx];

  const handleOptionSelect = (opt) => {
    setAnswers({ ...answers, [currentQ._id]: opt });
  };
  
  const handleNumericInput = (e) => {
    setAnswers({ ...answers, [currentQ._id]: e.target.value });
  };

  const updateStatusAndMove = (newStatus, offset = 0) => {
    setQuestionStatus(prev => ({
      ...prev,
      [currentQ._id]: newStatus
    }));

    const nextIdx = currentIdx + offset;
    if (nextIdx >= 0 && nextIdx < test.questions.length) {
      setCurrentIdx(nextIdx);
      // Mark next question as not_answered if it was not_visited
      setQuestionStatus(prev => {
         const nextQid = test.questions[nextIdx]._id;
         if (prev[nextQid] === 'not_visited') {
            return { ...prev, [nextQid]: 'not_answered' };
         }
         return prev;
      });
    }
  };

  const handleSaveAndNext = () => {
    const hasAnswer = answers[currentQ._id];
    updateStatusAndMove(hasAnswer ? 'answered' : 'not_answered', 1);
  };

  const handleClear = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQ._id];
    setAnswers(newAnswers);
  };

  const handleMarkForReviewAndNext = () => {
    updateStatusAndMove('marked', 1);
  };

  const handleSubmitTest = async () => {
    if (!window.confirm("Are you sure you want to submit the exam?")) return;
    
    const formattedAnswers = Object.keys(answers).map(qId => ({
      questionId: qId,
      selected_answer: answers[qId]
    }));

    try {
      setLoading(true);
      await api.post('/results', { testId: test._id, answers: formattedAnswers });
      navigate('/student/results');
    } catch (error) {
       alert("Error submitting test. " + error.message);
       setLoading(false);
    }
  };

  const jumpToQuestion = (idx) => {
    setQuestionStatus(prev => {
      const nextQid = test.questions[idx]._id;
      if (prev[nextQid] === 'not_visited') {
         return { ...prev, [nextQid]: 'not_answered' };
      }
      return prev;
    });
    setCurrentIdx(idx);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 font-medium text-slate-500 tracking-wide">Initializing Exam Environment...</div>;
  if (error) return <div className="p-8 text-center text-red-600 font-bold">{error}</div>;

  // Stats for palette
  const answeredCount = Object.values(questionStatus).filter(s => s === 'answered').length;
  const notAnsweredCount = Object.values(questionStatus).filter(s => s === 'not_answered').length;
  const notVisitedCount = Object.values(questionStatus).filter(s => s === 'not_visited').length;
  const markedCount = Object.values(questionStatus).filter(s => s === 'marked').length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans select-none overflow-hidden h-screen">
      {/* Top Header */}
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-lg z-20 shrink-0 border-b border-white/5">
        <div className="flex items-center space-x-4">
           <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
             <Monitor className="w-5 h-5 text-white" />
           </div>
           <div>
             <h1 className="text-lg font-black uppercase tracking-tight leading-none">{test.title}</h1>
             <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-[0.2em]">{user?.category} CANDIDATE PORTAL</p>
           </div>
        </div>
        <div className="flex items-center space-x-6">
           <div className="flex items-center bg-white/5 px-6 py-2.5 rounded-2xl border border-white/10 group overflow-hidden relative">
             <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
             <Clock className="w-4 h-4 mr-3 text-primary relative z-10" />
             <span className="text-xl font-black font-mono tracking-[0.1em] relative z-10">{formatTime(timeLeft)}</span>
           </div>
           <button 
             onClick={handleSubmitTest} 
             className="bg-accent hover:bg-accent/90 text-slate-900 px-8 py-2.5 font-black rounded-2xl shadow-xl shadow-accent/20 transition-all active:scale-95 text-xs uppercase tracking-widest"
           >
             Submit Exam
           </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Question Area */}
        <div className="flex-1 flex flex-col bg-white rounded-tr-[3rem] shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.05)] relative z-10 overflow-hidden">
          
          <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
             <div className="flex items-center space-x-2">
               <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-tighter">{currentQ.subject}</span>
               <span className="text-slate-400 font-bold text-xs">{currentQ.chapter || 'Section 1'}</span>
             </div>
             <span className="text-slate-400 font-black text-xs uppercase tracking-widest">Question <span className="text-slate-900">{currentIdx + 1}</span> / {test.questions.length}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-10 md:p-14 lg:p-20 relative">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
              <span className="text-[10rem] font-black leading-none">{currentIdx + 1}</span>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="text-2xl font-semibold text-slate-900 mb-12 leading-relaxed whitespace-pre-wrap">
                {currentQ.question_text}
              </div>

              <div className="space-y-4">
                {currentQ.question_type === 'MCQ' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQ.options.map((opt, i) => {
                      const isSelected = answers[currentQ._id] === opt;
                      return (
                        <label key={i} className={`group flex items-center p-6 border-2 rounded-3xl cursor-pointer transition-all duration-200 ${
                          isSelected 
                            ? 'border-primary bg-primary/5 shadow-xl shadow-primary/5' 
                            : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                        }`}>
                          <input 
                            type="radio" 
                            name={`q-${currentQ._id}`} 
                            className="hidden" 
                            checked={isSelected}
                            onChange={() => handleOptionSelect(opt)}
                          />
                          <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${
                            isSelected ? 'border-primary bg-primary' : 'border-slate-300 group-hover:border-slate-400'
                          }`}>
                            {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </div>
                          <span className={`text-base font-bold transition-colors ${isSelected ? 'text-primary' : 'text-slate-600 group-hover:text-slate-900'}`}>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <div className="max-w-md">
                     <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Numerical Response</label>
                     <div className="relative">
                        <input 
                          type="number" 
                          placeholder="0.00"
                          className="bg-slate-50 border-2 border-slate-100 px-8 py-5 rounded-[2rem] focus:outline-none focus:border-primary focus:bg-white w-full text-2xl font-black text-slate-900 transition-all placeholder:text-slate-200" 
                          value={answers[currentQ._id] || ''}
                          onChange={handleNumericInput}
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                     </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="bg-slate-50/50 p-8 border-t border-slate-100 flex justify-between items-center shrink-0 relative z-20">
             <div className="flex space-x-3">
                <button 
                  onClick={handleMarkForReviewAndNext} 
                  className="flex items-center space-x-2 bg-white border border-purple-100 text-purple-600 hover:bg-purple-50 px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-sm active:scale-95"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Review Later</span>
                </button>
                <button 
                  onClick={handleClear} 
                  className="flex items-center space-x-2 bg-white border border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50 px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-sm active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear</span>
                </button>
             </div>
             <div className="flex space-x-3">
                <button 
                  onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-white text-slate-400 hover:text-slate-900 transition-all active:scale-90 shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleSaveAndNext} 
                  className="bg-primary hover:bg-primary/90 text-white px-10 py-3.5 rounded-2xl font-black shadow-xl shadow-primary/20 flex items-center transition-all active:scale-95 text-xs uppercase tracking-widest"
                >
                  Save & Next <ChevronRight className="w-4 h-4 ml-2" />
                </button>
             </div>
          </div>

        </div>

        {/* Right Side: Palette */}
        <aside className="w-96 bg-[#F8FAFC] flex flex-col shrink-0 flex-col relative z-0">
           {/* Candidate Info */}
           <div className="p-8 border-b border-slate-200/50 flex items-center space-x-5 bg-white/50 backdrop-blur-md">
              <div className="w-16 h-16 bg-slate-100 rounded-[1.5rem] shrink-0 border-4 border-white shadow-sm overflow-hidden flex items-center justify-center">
                <div className="text-[10px] font-black text-slate-300 uppercase leading-none text-center">No<br/>Photo</div>
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate</p>
                <p className="font-black text-slate-900 text-lg truncate leading-tight group-hover:text-primary transition-colors cursor-default">{user?.name}</p>
                <div className="flex items-center text-xs font-bold text-primary mt-1">
                  ID: {user?._id?.slice(-8).toUpperCase()}
                </div>
              </div>
           </div>

           {/* Legend Grid */}
           <div className="p-6 grid grid-cols-2 gap-3 bg-white/30 backdrop-blur-sm">
              <div className="flex items-center bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-green-500 flex items-center justify-center mr-3 shadow-md shadow-green-500/20"><span className="text-white text-[10px] font-black">{answeredCount}</span></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Done</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-red-500 flex items-center justify-center mr-3 shadow-md shadow-red-500/20"><span className="text-white text-[10px] font-black">{notAnsweredCount}</span></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Missed</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center mr-3"><span className="text-slate-500 text-[10px] font-black">{notVisitedCount}</span></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">New</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center mr-3 shadow-md shadow-purple-600/20"><span className="text-white text-[10px] font-black">{markedCount}</span></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Review</span>
              </div>
           </div>

           {/* Question Grid Container */}
           <div className="flex-1 overflow-y-auto p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-slate-400 text-xs uppercase tracking-widest">Question Palette</h3>
                <div className="w-px h-4 bg-slate-200"></div>
                <div className="text-[10px] font-black bg-primary/10 text-primary px-3 py-1 rounded-full">{test.questions.length} Items</div>
              </div>
              
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                 {test.questions.map((q, i) => {
                    const status = questionStatus[q._id];
                    let statusClasses = 'bg-white border-slate-100 text-slate-400';
                    let dotColor = 'bg-slate-200';
                    
                    if (status === 'answered') {
                      statusClasses = 'bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/20';
                      dotColor = 'bg-white';
                    } else if (status === 'not_answered') {
                      statusClasses = 'bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/20';
                      dotColor = 'bg-white';
                    } else if (status === 'marked') {
                      statusClasses = 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-600/20';
                      dotColor = 'bg-white';
                    }

                    const isCurrent = currentIdx === i;

                    return (
                      <button
                        key={q._id}
                        onClick={() => jumpToQuestion(i)}
                        className={`group relative w-full aspect-square rounded-[1.2rem] font-black text-[11px] border-2 transition-all duration-200 active:scale-90 flex flex-col items-center justify-center ${statusClasses} ${
                          isCurrent ? 'border-primary ring-4 ring-primary/20 scale-105 z-10' : ''
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full mb-1 transition-colors ${dotColor}`}></div>
                        {i + 1}
                      </button>
                    );
                 })}
              </div>
           </div>
           
           <div className="p-8 bg-white/50 border-t border-slate-200/50">
             <div className="bg-slate-900 rounded-2xl p-4 flex items-center justify-between shadow-xl">
               <div className="flex items-center">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Sync</span>
               </div>
               <div className="text-[10px] font-bold text-slate-400">ENC: AES-256</div>
             </div>
           </div>
        </aside>

      </div>
    </div>
  );
};

export default ExamSimulator;
