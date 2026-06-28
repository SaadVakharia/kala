import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { User as AppUser } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users as UsersIcon, UserCheck, UserX, Clock, Search, ChevronDown, Plus, Edit2 } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'active' | 'inactive'>('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map(doc => ({
          ...doc.data(),
        })) as AppUser[];
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    (user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'all' ? true : 
     activeTab === 'active' ? user.status === 'Active' :
     activeTab === 'inactive' ? user.status === 'Inactive' :
     user.status === 'Pending') // Assuming 'New' means 'Pending'
  );

  // Mock stats for UI demonstration as per PDF
  const stats = {
    all: 156,
    new: 12,
    active: 132,
    inactive: 18
  };

  return (
    <div className="flex flex-col min-h-full bg-white relative pb-24">
      
      {/* Header */}
      <div className="px-4 py-3">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">User Management</h1>
        <p className="text-xs text-gray-500 mt-0.5">Manage registrations, roles and user access</p>
      </div>

      {/* Stats Grid */}
      <div className="px-4 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="flex flex-col items-center justify-center p-2 bg-white rounded-xl border border-gray-100 shadow-sm">
            <UsersIcon className="h-5 w-5 text-blue-500 mb-1" />
            <span className="text-sm font-bold text-gray-900">{stats.all}</span>
            <span className="text-[9px] font-medium text-gray-500 mt-0.5 leading-tight">All<br/>Users</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-white rounded-xl border border-gray-100 shadow-sm">
            <Clock className="h-5 w-5 text-orange-500 mb-1" />
            <span className="text-sm font-bold text-gray-900">{stats.new}</span>
            <span className="text-[9px] font-medium text-gray-500 mt-0.5 leading-tight">New<br/>Registrations</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-white rounded-xl border border-gray-100 shadow-sm">
            <UserCheck className="h-5 w-5 text-green-500 mb-1" />
            <span className="text-sm font-bold text-gray-900">{stats.active}</span>
            <span className="text-[9px] font-medium text-gray-500 mt-0.5 leading-tight">Active<br/>&nbsp;</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-white rounded-xl border border-gray-100 shadow-sm">
            <UserX className="h-5 w-5 text-gray-400 mb-1" />
            <span className="text-sm font-bold text-gray-900">{stats.inactive}</span>
            <span className="text-[9px] font-medium text-gray-500 mt-0.5 leading-tight">Inactive<br/>&nbsp;</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-2 pt-2 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('all')}
          className={`flex-1 pb-3 pt-2 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'all' ? 'border-primary text-gray-900' : 'border-transparent text-gray-500'}`}
        >
          All
        </button>
        <button 
          onClick={() => setActiveTab('new')}
          className={`flex-1 pb-3 pt-2 text-sm font-semibold transition-colors border-b-2 flex justify-center items-center ${activeTab === 'new' ? 'border-primary text-gray-900' : 'border-transparent text-gray-500'}`}
        >
          New <span className="ml-1.5 bg-red-100 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">{stats.new}</span>
        </button>
        <button 
          onClick={() => setActiveTab('active')}
          className={`flex-1 pb-3 pt-2 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'active' ? 'border-primary text-gray-900' : 'border-transparent text-gray-500'}`}
        >
          Active
        </button>
        <button 
          onClick={() => setActiveTab('inactive')}
          className={`flex-1 pb-3 pt-2 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'inactive' ? 'border-primary text-gray-900' : 'border-transparent text-gray-500'}`}
        >
          Inactive
        </button>
      </div>

      {/* Search & Filter */}
      <div className="px-4 py-4 flex items-center space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search by name, email or phone..." 
            className="pl-9 h-10 bg-gray-50 border-gray-200 text-xs rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center text-xs font-semibold text-gray-600 bg-gray-50 px-3 h-10 rounded-lg border border-gray-200 whitespace-nowrap">
          Role: All Roles
          <ChevronDown className="ml-1 h-3.5 w-3.5" />
        </button>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-auto bg-gray-50/50">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No users found.</div>
        ) : (
          <div className="px-4 space-y-3 pb-8">
            {filteredUsers.map((user, idx) => (
              <div 
                key={user.uid || idx} 
                onClick={() => navigate(`/users/${user.uid || '123'}`)}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center relative cursor-pointer hover:border-red-100 transition-colors"
              >
                
                {/* Avatar */}
                <div className="flex-shrink-0 relative">
                  <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">
                    {user.fullName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()}
                  </div>
                </div>
                
                {/* Info */}
                <div className="ml-3 flex-1 min-w-0 pr-16">
                  <h3 className="text-sm font-bold text-gray-900 truncate">{user.fullName}</h3>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{user.email || 'No email provided'}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{user.phone}</p>
                </div>
                
                {/* Badges & Actions */}
                <div className="absolute right-4 top-4 bottom-4 flex flex-col items-end justify-between">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    user.role === 'Project Manager' ? 'text-blue-600 bg-blue-50' : 
                    user.role === 'Site Supervisor' ? 'text-green-600 bg-green-50' : 
                    user.role === 'Senior Technician' ? 'text-purple-600 bg-purple-50' : 
                    'text-gray-600 bg-gray-100'
                  }`}>
                    {user.role}
                  </span>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      user.status === 'Active' ? 'text-green-600 border-green-200 bg-green-50' : 
                      user.status === 'Inactive' ? 'text-gray-500 border-gray-200 bg-gray-50' : 
                      'text-orange-600 border-orange-200 bg-orange-50'
                    }`}>
                      {user.status || 'Pending'}
                    </span>
                    <button className="text-blue-500 hover:bg-blue-50 p-1.5 rounded-full transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAB (Floating Action Button) */}
      <div className="fixed bottom-20 right-4 z-40">
        <Button onClick={() => navigate('/users/create')} className="h-12 px-5 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white font-bold text-sm">
          <Plus className="mr-2 h-5 w-5" />
          Create User
        </Button>
      </div>

    </div>
  );
};

export default Users;
