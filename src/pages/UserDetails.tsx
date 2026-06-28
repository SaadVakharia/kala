import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, Trash2, FileText, Check, ChevronRight } from 'lucide-react';

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id: _id } = useParams(); // Can use this to fetch data, currently mocking
  return (
    <div className="flex flex-col min-h-full bg-gray-50 relative pb-28 font-sans">

      {/* Header */}
      <div className="px-4 py-4 flex items-center bg-white border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-700 mr-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">New Registration Details</h1>
          <p className="text-[11px] text-gray-500 mt-0.5">Review and moderate new user registration.</p>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-auto">

        {/* Profile Card */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm relative">
          <div className="absolute top-4 right-4">
            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2.5 py-1 rounded">
              Pending Approval
            </span>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xl">
              RK
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Ravi Kumar</h2>
              <p className="text-[11px] text-gray-500 mt-0.5">ravi.kumar@kala.com</p>
              <p className="text-[11px] text-gray-500 mt-0.5">+91 98765 43210</p>
            </div>
          </div>

          {/* Requested Access */}
          <div className="flex justify-between items-center text-[11px] border-t border-gray-100 pt-3">
            <div className="flex space-x-2">
              <span className="text-gray-500">Requested Access</span>
              <span className="font-bold text-blue-600">Project Manager</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-gray-400 text-[9px]">Registration Date</span>
              <span className="text-gray-600 font-medium">16 Mar 2026, 09:41 AM</span>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center">
            <UserIcon className="w-4 h-4 mr-2 text-gray-400" /> Personal Info
          </h3>

          <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs">
            <div>
              <p className="text-gray-500 text-[10px] mb-0.5">Full Name</p>
              <p className="font-semibold text-gray-900">Ravi Kumar</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] mb-0.5">Date of Birth</p>
              <p className="font-semibold text-gray-900">12 Jan 1990</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] mb-0.5">Email Address</p>
              <p className="font-semibold text-gray-900 truncate">ravi.kumar@kala.com</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] mb-0.5">Gender</p>
              <p className="font-semibold text-gray-900">Male</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] mb-0.5">Phone Number</p>
              <p className="font-semibold text-gray-900">+91 98765 43210</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] mb-0.5">Location</p>
              <p className="font-semibold text-gray-900">Chennai, Tamil Nadu</p>
            </div>
          </div>
        </div>

        {/* Uploaded Documents */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center">
            <FileText className="w-4 h-4 mr-2 text-gray-400" /> Uploaded Documents
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="border border-gray-200 rounded-lg p-2.5 flex flex-col relative overflow-hidden">
              <div className="flex items-start space-x-2 mb-2 z-10">
                <div className="bg-gray-100 p-1.5 rounded flex-shrink-0">
                  <FileText className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 line-clamp-1">Aadhar Card</p>
                  <div className="flex items-center mt-1">
                    <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-[9px] text-green-600 font-bold">Verified</span>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <FileText className="w-16 h-16" />
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-2.5 flex flex-col relative overflow-hidden">
              <div className="flex items-start space-x-2 mb-2 z-10">
                <div className="bg-gray-100 p-1.5 rounded flex-shrink-0">
                  <FileText className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 line-clamp-1">Employee ID</p>
                  <div className="flex items-center mt-1">
                    <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-[9px] text-green-600 font-bold">Verified</span>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <FileText className="w-16 h-16" />
              </div>
            </div>
          </div>
        </div>

        {/* Roles Details Row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
            <p className="text-[10px] text-gray-500 mb-1 flex items-center"><UserIcon className="w-3 h-3 mr-1" /> Department</p>
            <p className="text-xs font-bold text-gray-900">Projects</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
            <p className="text-[10px] text-gray-500 mb-1 flex items-center"><UserIcon className="w-3 h-3 mr-1" /> Role</p>
            <p className="text-xs font-bold text-gray-900">Project Manager</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
            <p className="text-[10px] text-gray-500 mb-1 flex items-center"><UserIcon className="w-3 h-3 mr-1" /> Reporting To</p>
            <p className="text-xs font-bold text-gray-900 truncate w-full">Suresh Yadav</p>
          </div>
        </div>

        {/* Permissions Preview */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center">
              <ShieldIcon className="w-4 h-4 mr-2 text-gray-400" /> Permissions Preview
            </h3>
            <button onClick={() => navigate('/users/assign')} className="text-[10px] font-bold text-primary flex items-center bg-red-50 px-2 py-1 rounded">
              Edit <ChevronRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-2">
            <div className="flex items-center text-[10px] text-gray-700 font-medium">
              <Check className="w-3 h-3 text-green-500 mr-2 shrink-0" strokeWidth={3} /> View Projects
            </div>
            <div className="flex items-center text-[10px] text-gray-700 font-medium">
              <Check className="w-3 h-3 text-green-500 mr-2 shrink-0" strokeWidth={3} /> User Management
            </div>
            <div className="flex items-center text-[10px] text-gray-700 font-medium">
              <Check className="w-3 h-3 text-green-500 mr-2 shrink-0" strokeWidth={3} /> Create Reports
            </div>
            <div className="flex items-center text-[10px] text-gray-700 font-medium">
              <Check className="w-3 h-3 text-green-500 mr-2 shrink-0" strokeWidth={3} /> Audit Logs
            </div>
            <div className="flex items-center text-[10px] text-gray-700 font-medium">
              <Check className="w-3 h-3 text-green-500 mr-2 shrink-0" strokeWidth={3} /> Manage Issues
            </div>
            <div className="flex items-center text-[10px] text-gray-700 font-medium">
              <Check className="w-3 h-3 text-green-500 mr-2 shrink-0" strokeWidth={3} /> System Settings
            </div>
            <div className="flex items-center text-[10px] text-gray-700 font-medium">
              <Check className="w-3 h-3 text-green-500 mr-2 shrink-0" strokeWidth={3} /> Material Entry
            </div>
            <div className="flex items-center text-[10px] text-gray-500 font-medium italic">
              + 6 more permissions
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 flex items-center justify-between pb-safe pt-3">
        <Button className="flex-1 py-6 text-[13px] font-bold rounded-lg shadow-sm bg-green-500 hover:bg-green-600 text-white mr-2">
          <CheckCircle2 className="mr-1.5 h-4 w-4" />
          Approve & Activate
        </Button>
        <div className="flex space-x-2 flex-1">
          <Button variant="outline" className="flex-1 py-6 text-[11px] font-bold rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-50 px-0">
            <XCircle className="mr-1 h-3.5 w-3.5" />
            Reject
          </Button>
          <Button variant="outline" className="flex-1 py-6 text-[11px] font-bold rounded-lg border-2 border-gray-300 text-gray-500 hover:bg-gray-50 px-0">
            <Trash2 className="mr-1 h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      </div>

    </div>
  );
};

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

export default UserDetails;
