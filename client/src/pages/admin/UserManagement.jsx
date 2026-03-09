import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Plus, Trash2, ShieldAlert } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'PAPER_SETTER',
    category: ''
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = { ...formData };
      if (dataToSubmit.role === 'PAPER_SETTER' || dataToSubmit.role === 'ADMIN') {
         delete dataToSubmit.category; // Only students need categories
      }
      
      await api.post('/admin/users', dataToSubmit);
      setShowModal(false);
      fetchUsers();
      setFormData({ name: '', email: '', password: '', role: 'PAPER_SETTER', category: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating user');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this user?')) {
      try {
        await api.delete(`/admin/users/${id}`);
        fetchUsers();
      } catch (error) {
         console.error('Error deleting user', error);
      }
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500 mt-1">Create staff accounts or remove existing users.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900">{u.name}</div>
                  {u.category && <div className="text-xs text-slate-500">{u.category}</div>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {u.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    u.role === 'PAPER_SETTER' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {u.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {u.verified ? (
                     <span className="text-green-600 flex items-center"><ShieldAlert className="w-4 h-4 mr-1 opacity-0"/> Verified</span>
                  ) : (
                     <span className="text-red-500 flex items-center"><ShieldAlert className="w-4 h-4 mr-1"/> Pending OTP</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(u._id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5 mx-auto" />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-slate-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" required className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" required className="w-full border p-2 rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input type="password" required className="w-full border p-2 rounded" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select className="w-full border p-2 rounded bg-white" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="PAPER_SETTER">Paper Setter</option>
                  <option value="STUDENT">Student</option>
                </select>
              </div>
              {formData.role === 'STUDENT' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select className="w-full border p-2 rounded bg-white" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="">Select Category</option>
                    <option value="NEET">NEET</option>
                    <option value="JEE">JEE</option>
                  </select>
                </div>
              )}
              
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
