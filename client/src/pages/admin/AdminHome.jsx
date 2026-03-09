import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Users, FileText, BookOpen, UserCheck, Activity } from 'lucide-react';

const AdminHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data);
      } catch (error) {
        console.error('Failed to load stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading analytics...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Platform Analytics</h1>
        <p className="text-slate-500 mt-1">Overview of system activity and resources.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Stat Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Students</p>
            <p className="text-2xl font-bold text-slate-900">{stats?.totalStudents || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
            <UserCheck className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Paper Setters</p>
            <p className="text-2xl font-bold text-slate-900">{stats?.totalSetters || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg shrink-0">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Questions in Bank</p>
            <p className="text-2xl font-bold text-slate-900">{stats?.totalQuestions || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg shrink-0">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Mock Tests Created</p>
            <p className="text-2xl font-bold text-slate-900">{stats?.totalTests || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4 x-col-span-1 md:col-span-2 lg:col-span-2">
          <div className="p-3 bg-red-50 text-red-600 rounded-lg shrink-0">
             <Activity className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Test Submissions</p>
            <p className="text-2xl font-bold text-slate-900">{stats?.totalSubmissions || 0}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminHome;
