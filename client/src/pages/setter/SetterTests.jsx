import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Plus, Edit2, Play, CheckCircle } from 'lucide-react';

const SetterTests = () => {
  const [tests, setTests] = useState([]);
  const [questions, setQuestions] = useState([]); // For test creation
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'NEET',
    type: 'MOCK',
    duration: 180,
    isPublished: false,
    questions: [] // Array of question IDs
  });

  const fetchData = async () => {
    try {
      const [tRes, qRes] = await Promise.all([
        api.get('/tests'),
        api.get('/questions')
      ]);
      setTests(tRes.data);
      setQuestions(qRes.data);
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleQuestion = (id) => {
    const selected = formData.questions.includes(id);
    if (selected) {
      setFormData({ ...formData, questions: formData.questions.filter(q => q !== id) });
    } else {
      setFormData({ ...formData, questions: [...formData.questions, id] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.questions.length === 0) {
      alert("Please select at least one question.");
      return;
    }
    try {
      await api.post('/tests', formData);
      setShowModal(false);
      fetchData();
      setFormData({ title: '', category: 'NEET', type: 'MOCK', duration: 180, isPublished: false, questions: [] });
    } catch (error) {
      console.error('Error creating test', error);
    }
  };

  const handlePublishToggle = async (testId, currentStatus) => {
    try {
      await api.put(`/tests/${testId}`, { isPublished: !currentStatus });
      fetchData();
    } catch (error) {
      console.error("Error toggling publish", error);
    }
  };

  if (loading) return <div>Loading tests...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Mock Tests</h1>
          <p className="text-slate-500 mt-1">Create and manage mock tests.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Test
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {tests.map(t => (
           <div key={t._id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                 <h3 className="font-semibold text-lg line-clamp-2">{t.title}</h3>
                 <span className={`px-2 py-1 text-xs rounded-full shrink-0 ${t.isPublished ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                   {t.isPublished ? 'Published' : 'Draft'}
                 </span>
              </div>
              <div className="space-y-2 text-sm text-slate-600 mb-2">
                <div>Category: <span className="font-medium text-slate-900">{t.category}</span></div>
                <div>Questions: <span className="font-medium text-slate-900">{t.questions?.length || 0}</span></div>
                <div>Duration: <span className="font-medium text-slate-900">{t.duration} m</span></div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2">
                <button 
                  onClick={() => handlePublishToggle(t._id, t.isPublished)}
                  className={`flex-1 py-1.5 rounded border text-sm font-medium transition-colors ${
                    t.isPublished 
                    ? 'border-orange-200 text-orange-600 hover:bg-orange-50' 
                    : 'border-green-200 text-green-600 hover:bg-green-50'
                  }`}
                >
                  {t.isPublished ? 'Unpublish' : 'Publish'}
                </button>
              </div>
           </div>
         ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b shrink-0 flex justify-between items-center bg-slate-50">
               <h2 className="text-xl font-bold">Create New Mock Test</h2>
            </div>
            
            <form id="test-form" onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-8">
               {/* Left Col - Details */}
               <div className="w-full md:w-1/3 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Test Title</label>
                    <input type="text" required className="w-full border p-2 rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select className="w-full border p-2 rounded" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                      <option value="NEET">NEET</option>
                      <option value="JEE">JEE</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select className="w-full border p-2 rounded" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                      <option value="MOCK">Full Mock</option>
                      <option value="CHAPTER">Chapter-Wise</option>
                      <option value="PRACTICE">Practice</option>
                    </select>
                  </div>
                   <div>
                    <label className="block text-sm font-medium mb-1">Duration (mins)</label>
                    <input type="number" min="1" required className="w-full border p-2 rounded" value={formData.duration} onChange={e => setFormData({...formData, duration: Number(e.target.value)})} />
                  </div>
                  
                  <div className="p-4 bg-slate-50 rounded border mt-4">
                    <div className="text-sm font-semibold text-slate-700">Selected Questions: {formData.questions.length}</div>
                  </div>
               </div>

               {/* Right Col - Question Picker */}
               <div className="w-full md:w-2/3 border rounded-lg flex flex-col h-[500px]">
                 <div className="bg-slate-100 p-3 border-b text-sm font-semibold text-slate-700 shrink-0">
                    Select Questions ({formData.category})
                 </div>
                 <div className="overflow-y-auto p-4 space-y-2 flex-1 relative">
                    {questions.filter(q => formData.category === 'NEET' || formData.category === 'JEE').map(q => (
                       <label key={q._id} className="flex gap-4 p-3 border rounded items-start hover:border-blue-400 cursor-pointer transition-colors bg-white">
                         <input 
                           type="checkbox" 
                           checked={formData.questions.includes(q._id)}
                           onChange={() => handleToggleQuestion(q._id)}
                           className="mt-1 w-4 h-4 text-primary shrink-0"
                         />
                         <div className="flex-1 min-w-0">
                           <p className="text-sm font-medium text-slate-900 line-clamp-2">{q.question_text}</p>
                           <p className="text-xs text-slate-500 mt-1">{q.subject} • {q.chapter} • {q.difficulty}</p>
                         </div>
                       </label>
                    ))}
                 </div>
               </div>
            </form>

            <div className="p-4 border-t shrink-0 flex justify-end gap-3 bg-slate-50">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-slate-600 hover:bg-white bg-white">Cancel</button>
                <button type="submit" form="test-form" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow flex items-center">
                   <CheckCircle className="w-4 h-4 mr-2" /> Save Draft Test
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetterTests;
