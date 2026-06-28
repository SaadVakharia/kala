import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, HardHat, Wrench, Building, Truck, Shield, ChevronDown, Save, UserX } from 'lucide-react';

const AssignPermissions: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('Project Manager');

  const roles = [
    { id: 'Project Manager', icon: User, color: 'red' },
    { id: 'Site Engineer', icon: HardHat, color: 'gray' },
    { id: 'Technician', icon: Wrench, color: 'gray' },
    { id: 'Client', icon: Building, color: 'gray' },
    { id: 'Vendor', icon: Truck, color: 'gray' },
    { id: 'Admin', icon: Shield, color: 'gray' },
  ];

  const initialPermissions = [
    { id: 'view_projects', label: 'View Projects', active: true },
    { id: 'create_reports', label: 'Create Reports', active: true },
    { id: 'manage_issues', label: 'Manage Issues', active: true },
    { id: 'material_entry', label: 'Material Entry', active: true },
    { id: 'approve_users', label: 'Approve Users', active: false },
    { id: 'view_audit_logs', label: 'View Audit Logs', active: false },
    { id: 'manage_safety', label: 'Manage Safety Violations', active: true },
    { id: 'edit_roles', label: 'Edit Roles', active: false },
  ];

  const [permissions, setPermissions] = useState(initialPermissions);

  const togglePermission = (id: string) => {
    setPermissions(permissions.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ));
  };

  return (
    <div className="flex flex-col min-h-full bg-white relative pb-32 font-sans">
      
      {/* Header */}
      <div className="px-4 py-4 flex items-center border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-700 mr-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Assign Role & Permissions</h1>
          <p className="text-xs text-gray-500 mt-0.5">Assign access level and permissions.</p>
        </div>
      </div>

      <div className="p-4 space-y-6 flex-1 overflow-auto">
        
        {/* Profile Card */}
        <div className="flex items-center space-x-4 relative">
          <div className="absolute top-0 right-0">
            <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded">
              Active
            </span>
          </div>
          
          <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">
            SY
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">Suresh Yadav</h2>
            <p className="text-[11px] text-gray-500 mt-0.5">suresh.yadav@kala.com</p>
            <p className="text-[11px] text-gray-500 mt-0.5">+91 91234 56789</p>
          </div>
        </div>

        {/* Select Role */}
        <div>
          <h3 className="text-xs font-bold text-gray-900 mb-3">Select Role</h3>
          <div className="grid grid-cols-3 gap-2">
            {roles.map(role => {
              const isSelected = selectedRole === role.id;
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex items-center p-2 border rounded-lg transition-colors ${
                    isSelected 
                      ? 'border-primary bg-red-50 text-primary' 
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-1.5 rounded-full mr-2 ${isSelected ? 'bg-white' : 'bg-gray-100'}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-bold text-left leading-tight">{role.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5 relative">
            <label className="text-[10px] text-gray-500">Department</label>
            <div className="relative flex items-center">
              <select className="w-full pl-3 pr-8 h-10 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-900 shadow-sm appearance-none focus:outline-none focus:border-primary">
                <option>Site Operations</option>
              </select>
              <ChevronDown className="absolute right-2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-1.5 relative">
            <label className="text-[10px] text-gray-500">Reporting To</label>
            <div className="relative flex items-center">
              <select className="w-full pl-3 pr-8 h-10 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-900 shadow-sm appearance-none focus:outline-none focus:border-primary">
                <option>Ravi Kumar (Project Manager)</option>
              </select>
              <ChevronDown className="absolute right-2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100"></div>

        {/* Permissions List */}
        <div>
          <h3 className="text-xs font-bold text-gray-900 mb-4">Permissions</h3>
          <div className="space-y-4">
            {permissions.map(p => (
              <div key={p.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center mr-3 border border-gray-100">
                     <PermissionIcon id={p.id} className="w-3 h-3 text-gray-400" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{p.label}</span>
                </div>
                
                {/* Toggle Switch */}
                <button 
                  type="button"
                  onClick={() => togglePermission(p.id)}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${p.active ? 'bg-green-500' : 'bg-gray-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${p.active ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 flex space-x-3 pb-safe pt-3">
        <Button className="flex-1 py-6 text-sm font-bold rounded-lg shadow-md bg-primary hover:bg-primary/90 text-white">
          <Save className="mr-2 h-4 w-4" />
          Save Assignment
        </Button>
        <Button variant="outline" className="flex-1 py-6 text-sm font-bold rounded-lg border-2 border-primary text-primary hover:bg-red-50">
          <UserX className="mr-2 h-4 w-4" />
          Deactivate User
        </Button>
      </div>

    </div>
  );
};

const PermissionIcon = ({ id, className }: { id: string, className?: string }) => {
  switch (id) {
    case 'view_projects': return <Building className={className} />;
    case 'create_reports': return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
    case 'manage_issues': return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
    case 'material_entry': return <Truck className={className} />;
    case 'approve_users': return <User className={className} />;
    case 'view_audit_logs': return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
    case 'manage_safety': return <Shield className={className} />;
    case 'edit_roles': return <Wrench className={className} />;
    default: return <User className={className} />;
  }
};

export default AssignPermissions;
