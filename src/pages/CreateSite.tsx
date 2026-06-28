import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, MapPin, UploadCloud, Plus, Save, ChevronDown, CheckCircle2 } from 'lucide-react';

const CreateSite: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full bg-white relative pb-32 font-sans">
      
      {/* Header */}
      <div className="px-4 py-4 flex items-center border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-700 mr-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Create New Site</h1>
          <p className="text-[10px] text-gray-500 mt-0.5">Add a new project site, client, subsites and specifications.</p>
        </div>
      </div>

      <div className="p-4 space-y-6 flex-1 overflow-auto">
        
        {/* SITE BASIC DETAILS */}
        <div>
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Site Basic Details</h3>
          
          <div className="space-y-4">
            <div className="space-y-1.5 relative">
              <Label className="text-[11px] font-bold text-gray-700">Site / Project Name</Label>
              <Input 
                placeholder="Enter site or project name" 
                className="h-12 bg-white border-gray-300 rounded-lg text-sm shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5 relative">
              <div className="flex justify-between items-center">
                 <Label className="text-[11px] font-bold text-gray-700">Client</Label>
                 <button className="text-[11px] font-bold text-primary flex items-center">
                   <Plus className="w-3 h-3 mr-0.5" /> Add Client
                 </button>
              </div>
              <div className="relative flex items-center">
                <select className="w-full px-3 pr-10 h-12 bg-white border border-gray-300 rounded-lg text-sm shadow-sm appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="" disabled selected>Select client</option>
                </select>
                <ChevronDown className="absolute right-3 text-gray-400 h-4 w-4 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-[2fr,1fr] gap-3">
              <div className="space-y-1.5 relative">
                <Label className="text-[11px] font-bold text-gray-700 leading-tight">Location of Project</Label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Enter project location" 
                    className="pl-9 h-12 bg-white border-gray-300 rounded-lg text-xs shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
              <div className="space-y-1.5 relative">
                <Label className="text-[11px] font-bold text-gray-700 leading-tight">Number of Panels<br/><span className="text-[9px] font-normal text-gray-400">per site</span></Label>
                <Input 
                  placeholder="Enter number" 
                  type="number"
                  className="h-12 bg-white border-gray-300 rounded-lg text-xs shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100"></div>

        {/* SITE FILES */}
        <div>
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Site Files</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-[11px] font-bold text-gray-700 mb-2 block">Documents Related to Site</Label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border border-dashed border-gray-300 rounded-lg p-3 flex flex-col items-center justify-center text-center bg-gray-50/50 cursor-pointer hover:bg-gray-50">
                    <UploadCloud className="w-5 h-5 text-gray-400 mb-1" />
                    <p className="text-[9px] font-bold text-gray-700 leading-tight">Upload Document</p>
                    <p className="text-[7px] text-gray-400 mt-0.5">max 2mb, .pdf, .jpeg</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-[11px] font-bold text-gray-700 mb-2 block">Logo Picture</Label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2].map(i => (
                  <div key={i} className="border border-dashed border-gray-300 rounded-lg p-3 flex flex-col items-center justify-center text-center bg-gray-50/50 cursor-pointer hover:bg-gray-50">
                    <UploadCloud className="w-5 h-5 text-gray-400 mb-1" />
                    <p className="text-[9px] font-bold text-gray-700 leading-tight">Upload Image</p>
                    <p className="text-[7px] text-gray-400 mt-0.5">max 2mb, .jpeg, .png</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100"></div>

        {/* SUB SITES */}
        <div>
           <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Sub Sites</h3>
              <button className="text-[10px] font-bold text-primary flex items-center bg-red-50 px-2 py-1 rounded">
                <Plus className="w-3 h-3 mr-0.5" /> Add Sub Site
              </button>
           </div>
           
           <div className="border border-gray-200 rounded-xl p-3 bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] relative">
              <div className="absolute -left-1.5 top-6 bottom-6 w-1 bg-red-100 rounded-full"></div>
              
              <div className="grid grid-cols-[2fr,1fr] gap-3 mb-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-gray-500">Sub Site Name</Label>
                  <Input 
                    defaultValue="Block A" 
                    className="h-9 bg-gray-50 border-gray-200 rounded text-xs font-bold shadow-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-gray-500">Number of Panels</Label>
                  <Input 
                    defaultValue="120" 
                    type="number"
                    className="h-9 bg-gray-50 border-gray-200 rounded text-xs font-bold shadow-none"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <Label className="text-[10px] font-bold text-gray-500">Type of Work</Label>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[9px] font-bold px-2 py-1 rounded border border-primary bg-red-50 text-primary flex items-center">
                    Interior Painting <CheckCircle2 className="w-3 h-3 ml-1"/>
                  </span>
                  <span className="text-[9px] font-bold px-2 py-1 rounded border border-gray-200 bg-white text-gray-500">
                    Exterior Painting
                  </span>
                  <span className="text-[9px] font-bold px-2 py-1 rounded border border-gray-200 bg-white text-gray-500">
                    Civil Repair
                  </span>
                </div>
              </div>

              <div className="space-y-2 bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                <Label className="text-[10px] font-bold text-gray-700">Internal Painting Specification</Label>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <Label className="text-[8px] text-gray-500 leading-tight block mb-1">Number of floors</Label>
                    <Input defaultValue="10" className="h-7 text-xs text-center border-gray-200 p-1" />
                  </div>
                  <div>
                    <Label className="text-[8px] text-gray-500 leading-tight block mb-1">Floor Utility</Label>
                    <Input defaultValue="1" className="h-7 text-xs text-center border-gray-200 p-1" />
                  </div>
                  <div>
                    <Label className="text-[8px] text-gray-500 leading-tight block mb-1">Refuge Area</Label>
                    <Input defaultValue="1" className="h-7 text-xs text-center border-gray-200 p-1" />
                  </div>
                  <div>
                    <Label className="text-[8px] text-gray-500 leading-tight block mb-1">Staircase</Label>
                    <Input defaultValue="2" className="h-7 text-xs text-center border-gray-200 p-1" />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                 <div className="flex items-center space-x-2">
                   <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-[9px] font-bold">MS</div>
                   <div>
                     <p className="text-[9px] text-gray-500 leading-tight">Client Selected</p>
                     <p className="text-[10px] font-bold text-gray-900 leading-tight">Metro Station Client</p>
                   </div>
                 </div>
                 <div className="flex items-center space-x-4">
                   <div className="text-right">
                     <p className="text-[9px] text-gray-500 leading-tight">Total Sub Sites</p>
                     <p className="text-[11px] font-bold text-gray-900 leading-tight">2</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[9px] text-gray-500 leading-tight">Total Panels</p>
                     <p className="text-[11px] font-bold text-gray-900 leading-tight">200</p>
                   </div>
                 </div>
              </div>

           </div>
        </div>

      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 flex flex-col space-y-3 pb-safe pt-3">
        <Button className="w-full py-6 text-base font-bold rounded-lg shadow-md bg-primary hover:bg-primary/90 text-white">
          <CheckCircle2 className="mr-2 h-5 w-5" />
          Create Site
        </Button>
        <Button variant="outline" className="w-full py-6 text-base font-bold rounded-lg border-2 border-primary text-primary hover:bg-red-50">
          <Save className="mr-2 h-5 w-5" />
          Save Draft
        </Button>
      </div>

    </div>
  );
};

export default CreateSite;
