import React, { useState, useEffect } from 'react';
import api from '../../api';

const SetterHome = () => {
  const [stats, setStats] = useState({ totalQuestions: 0, totalTests: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [qRes, tRes] = await Promise.all([
          api.get('/questions'),
          api.get('/tests')
        ]);
        setStats({
          totalQuestions: qRes.data.length,
          totalTests: tRes.data.length
        });
      } catch (error) {
        console.error('Failed to load stats', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Setter Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Questions</p>
            <p className="text-3xl font-bold text-primary mt-2">{stats.totalQuestions}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-50">
            <span className="text-sm text-slate-600">Questions in the bank</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Tests</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalTests}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-50">
            <span className="text-sm text-slate-600">Mock tests created</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetterHome;
