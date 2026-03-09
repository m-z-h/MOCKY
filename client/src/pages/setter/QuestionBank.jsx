import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    chapter: '',
    difficulty: 'MEDIUM',
    question_text: '',
    options: ['', '', '', ''],
    correct_answer: '',
    question_type: 'MCQ',
    marks_correct: 4,
    marks_wrong: -1
  });

  const fetchQuestions = async () => {
    try {
      const res = await api.get('/questions');
      setQuestions(res.data);
    } catch (error) {
      console.error('Failed to fetch questions', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/questions', formData);
      setShowModal(false);
      fetchQuestions();
      // Reset form
      setFormData({
        subject: '', chapter: '', difficulty: 'MEDIUM', question_text: '',
        options: ['', '', '', ''], correct_answer: '', question_type: 'MCQ',
        marks_correct: 4, marks_wrong: -1
      });
    } catch (error) {
      console.error('Error saving question', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this question?')) {
      try {
        await api.delete(`/questions/${id}`);
        fetchQuestions();
      } catch (error) {
        console.error('Error deleting question', error);
      }
    }
  };

  if (loading) return <div>Loading questions...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Question Bank</h1>
          <p className="text-slate-500 mt-1">Manage all questions for mock tests.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Question
        </button>
      </div>

      {/* Question List */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <div className="py-12 text-center text-slate-500 bg-white rounded-xl border border-dashed border-slate-300">
            No questions added yet. Start building your bank!
          </div>
        ) : (
           questions.map((q, index) => (
             <div key={q._id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-4">
               <div className="flex justify-between items-start">
                 <div className="flex gap-3 text-xs font-semibold uppercase tracking-wide">
                   <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded">{q.subject}</span>
                   <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded">{q.chapter}</span>
                   <span className={`px-2 py-1 rounded text-white ${
                     q.difficulty === 'EASY' ? 'bg-green-500' : q.difficulty === 'HARD' ? 'bg-red-500' : 'bg-yellow-500'
                   }`}>
                     {q.difficulty}
                   </span>
                 </div>
                 <div className="flex gap-2">
                   <button onClick={() => handleDelete(q._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                     <Trash2 className="h-4 w-4" />
                   </button>
                 </div>
               </div>
               
               <p className="text-slate-900 font-medium">Q. {q.question_text}</p>
               
               {q.question_type === 'MCQ' && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                   {q.options.map((opt, i) => (
                     <div key={i} className={`p-2 rounded border text-sm ${opt === q.correct_answer ? 'border-green-500 bg-green-50 text-green-800' : 'border-slate-200 text-slate-600'}`}>
                       {opt}
                     </div>
                   ))}
                 </div>
               )}
               {q.question_type === 'NUMERICAL' && (
                 <div className="p-2 rounded border border-green-500 bg-green-50 text-green-800 text-sm inline-block">
                   Ans: {q.correct_answer}
                 </div>
               )}
             </div>
           ))
        )}
      </div>

      {/* Basic Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Add New Question</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Subject</label>
                  <input type="text" required className="w-full border p-2 rounded" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Chapter</label>
                  <input type="text" required className="w-full border p-2 rounded" value={formData.chapter} onChange={e => setFormData({...formData, chapter: e.target.value})} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select className="w-full border p-2 rounded" value={formData.question_type} onChange={e => setFormData({...formData, question_type: e.target.value})}>
                    <option value="MCQ">MCQ</option>
                    <option value="NUMERICAL">Numerical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Difficulty</label>
                  <select className="w-full border p-2 rounded" value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})}>
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Question Text</label>
                <textarea required className="w-full border p-2 rounded h-24" value={formData.question_text} onChange={e => setFormData({...formData, question_text: e.target.value})}></textarea>
              </div>

              {formData.question_type === 'MCQ' ? (
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Options</label>
                  {formData.options.map((opt, i) => (
                    <input key={i} required placeholder={`Option ${i+1}`} className="w-full border p-2 rounded" value={opt} onChange={e => handleOptionChange(i, e.target.value)} />
                  ))}
                  <div>
                    <label className="block text-sm font-medium mb-1 mt-4">Correct Option (Must match one exactly)</label>
                    <input type="text" required className="w-full border p-2 rounded" value={formData.correct_answer} onChange={e => setFormData({...formData, correct_answer: e.target.value})} />
                  </div>
                </div>
              ) : (
                <div>
                    <label className="block text-sm font-medium mb-1">Correct Answer (Numeric)</label>
                    <input type="text" required className="w-full border p-2 rounded" value={formData.correct_answer} onChange={e => setFormData({...formData, correct_answer: e.target.value})} />
                </div>
              )}

              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700">Save Question</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBank;
