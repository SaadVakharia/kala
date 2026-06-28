import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Phone, Mail, BadgeCent, ChevronDown, CheckCircle2 } from 'lucide-react';

const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  
  const [isActiveAccount, setIsActiveAccount] = useState(true);
  const [isSendInvite, setIsSendInvite] = useState(true);

  return (
    <div className="flex flex-col min-h-full bg-white relative pb-32 font-sans">
      
      {/* Header */}
      <div className="px-4 py-4 flex items-center border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-700 mr-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Create New User</h1>
          <p className="text-xs text-gray-500 mt-0.5">Add a new user and assign access.</p>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-auto">
        
        {/* Full Name */}
        <div className="space-y-1.5 relative">
          <Label className="text-xs font-bold text-gray-700">Full Name</Label>
          <div className="relative flex items-center">
            <User className="absolute left-3 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Enter full name" 
              className="pl-9 h-12 bg-white border-gray-300 rounded-lg text-sm shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div className="space-y-1.5 relative">
          <Label className="text-xs font-bold text-gray-700">Mobile Number</Label>
          <div className="relative flex items-center">
            <Phone className="absolute left-3 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Enter mobile number" 
              className="pl-9 h-12 bg-white border-gray-300 rounded-lg text-sm shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-1.5 relative">
          <Label className="text-xs font-bold text-gray-700">Email Address</Label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Enter email address" 
              type="email"
              className="pl-9 h-12 bg-white border-gray-300 rounded-lg text-sm shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* Employee ID */}
        <div className="space-y-1.5 relative">
          <Label className="text-xs font-bold text-gray-700">Employee ID <span className="font-normal text-gray-400">(optional)</span></Label>
          <div className="relative flex items-center">
            <BadgeCent className="absolute left-3 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Enter employee ID" 
              className="pl-9 h-12 bg-white border-gray-300 rounded-lg text-sm shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* User Type */}
        <div className="space-y-1.5 relative">
          <Label className="text-xs font-bold text-gray-700">User Type</Label>
          <div className="relative flex items-center">
            <User className="absolute left-3 text-gray-400 h-4 w-4" />
            <select className="w-full pl-9 pr-10 h-12 bg-white border border-gray-300 rounded-lg text-sm shadow-sm appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
              <option value="" disabled selected>Select user type</option>
              <option value="Employee">Employee</option>
              <option value="Contractor">Contractor</option>
            </select>
            <ChevronDown className="absolute right-3 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>
        </div>

        {/* Role */}
        <div className="space-y-1.5 relative">
          <Label className="text-xs font-bold text-gray-700">Role</Label>
          <div className="relative flex items-center">
            <BadgeCent className="absolute left-3 text-gray-400 h-4 w-4" />
            <select className="w-full pl-9 pr-10 h-12 bg-white border border-gray-300 rounded-lg text-sm shadow-sm appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
              <option value="" disabled selected>Select role</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Site Engineer">Site Engineer</option>
            </select>
            <ChevronDown className="absolute right-3 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>
        </div>

        {/* Department */}
        <div className="space-y-1.5 relative">
          <Label className="text-xs font-bold text-gray-700">Department</Label>
          <div className="relative flex items-center">
            <BadgeCent className="absolute left-3 text-gray-400 h-4 w-4" />
            <select className="w-full pl-9 pr-10 h-12 bg-white border border-gray-300 rounded-lg text-sm shadow-sm appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
              <option value="" disabled selected>Select department</option>
              <option value="Site Operations">Site Operations</option>
              <option value="Planning">Planning</option>
            </select>
            <ChevronDown className="absolute right-3 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>
        </div>

        {/* Assign Project & Reporting To Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5 relative">
            <Label className="text-xs font-bold text-gray-700 leading-tight">Assign Project<br/><span className="font-normal text-[10px] text-gray-400">(optional)</span></Label>
            <div className="relative flex items-center">
              <select className="w-full pl-3 pr-8 h-12 bg-white border border-gray-300 rounded-lg text-xs shadow-sm appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                <option value="" disabled selected>Select project</option>
              </select>
              <ChevronDown className="absolute right-2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-1.5 relative">
            <Label className="text-xs font-bold text-gray-700 leading-tight">Reporting To<br/><span className="font-normal text-[10px] text-gray-400">(optional)</span></Label>
            <div className="relative flex items-center">
              <select className="w-full pl-3 pr-8 h-12 bg-white border border-gray-300 rounded-lg text-xs shadow-sm appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                <option value="" disabled selected>Select manager</option>
              </select>
              <ChevronDown className="absolute right-2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="my-6 border-t border-gray-100"></div>

        {/* Toggles */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <button 
              type="button"
              onClick={() => setIsActiveAccount(!isActiveAccount)}
              className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isActiveAccount ? 'bg-green-500' : 'bg-gray-200'}`}
            >
              <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isActiveAccount ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
            <div>
              <p className="text-sm font-bold text-gray-900">Active Account</p>
              <p className="text-xs text-gray-500 mt-0.5">User will be able to login and access the system.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <button 
              type="button"
              onClick={() => setIsSendInvite(!isSendInvite)}
              className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isSendInvite ? 'bg-green-500' : 'bg-gray-200'}`}
            >
              <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isSendInvite ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
            <div>
              <p className="text-sm font-bold text-gray-900">Send login invite immediately</p>
              <p className="text-xs text-gray-500 mt-0.5">An email with login instructions will be sent to the user.</p>
            </div>
          </div>
        </div>

        {/* Quick Access Summary */}
        <div className="mt-6 bg-purple-50 border border-purple-100 rounded-xl p-4">
          <h4 className="text-xs font-bold text-purple-900 mb-3 flex items-center">
             <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
             Quick Access Summary
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-purple-400 font-semibold mb-1">Role</p>
              <div className="inline-flex items-center text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">
                Not Selected
              </div>
            </div>
            <div>
              <p className="text-[10px] text-purple-400 font-semibold mb-1">Permissions Preview</p>
              <div className="flex space-x-1.5">
                <span className="text-[9px] text-purple-600 bg-white px-1.5 py-0.5 rounded shadow-sm flex items-center border border-purple-100"><CheckCircle2 className="w-3 h-3 text-green-500 mr-1"/> View Projects</span>
                <span className="text-[9px] text-purple-600 bg-white px-1.5 py-0.5 rounded shadow-sm flex items-center border border-purple-100"><CheckCircle2 className="w-3 h-3 text-green-500 mr-1"/> Create Reports</span>
              </div>
            </div>
          </div>
          <p className="text-[9px] text-purple-400 mt-3 italic">Select role to preview permissions and access level.</p>
        </div>

      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 flex flex-col space-y-3 pb-safe pt-3">
        <Button className="w-full py-6 text-base font-bold rounded-lg shadow-md bg-primary hover:bg-primary/90 text-white">
          <User className="mr-2 h-5 w-5" />
          Create User
        </Button>
        <Button variant="outline" onClick={() => navigate(-1)} className="w-full py-6 text-base font-bold rounded-lg border-2 border-primary text-primary hover:bg-red-50">
          Cancel
        </Button>
      </div>

    </div>
  );
};

export default CreateUser;
