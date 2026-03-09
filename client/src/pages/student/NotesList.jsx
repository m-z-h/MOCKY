import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Download, FileText, BookOpen, Clock, ArrowRight } from 'lucide-react';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        setNotes(res.data);
      } catch (error) {
        console.error('Failed to fetch notes', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64 text-slate-400 font-medium tracking-wide">Gathering study materials...</div>;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Study Materials</h1>
          <p className="text-slate-500 font-medium mt-2">Expert-curated notes to streamline your preparation.</p>
        </div>
        <div className="flex items-center space-x-2 bg-secondary/10 px-4 py-2 rounded-2xl border border-secondary/10">
          <BookOpen className="w-4 h-4 text-secondary" />
          <span className="text-xs font-black text-secondary uppercase tracking-widest">Library Access</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {notes.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] shadow-premium border border-slate-100 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
               <FileText className="w-8 h-8" />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No notes available yet</p>
            <p className="text-slate-300 text-xs mt-2">Staff members are currently uploading materials.</p>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="group bg-white p-8 rounded-[2rem] shadow-premium border border-slate-100/50 flex items-start space-x-6 hover:-translate-y-1 transition-all duration-300">
              <div className="bg-primary/10 p-5 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm relative overflow-hidden">
                <FileText className="h-7 w-7 relative z-10" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                   <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{note.subject}</span>
                   <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{note.chapter}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 truncate tracking-tight">{note.title}</h3>
                
                <div className="mt-8">
                  <a 
                    href={note.content} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-slate-50 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white hover:shadow-lg transition-all active:scale-95 group/btn"
                  >
                    <Download className="h-4 w-4 mr-3 group-hover/btn:animate-bounce" />
                    Download PDF
                    <ArrowRight className="h-3 w-3 ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesList;
