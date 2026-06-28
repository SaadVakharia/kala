export type Role = 
  | "Super Admin" 
  | "Admin" 
  | "General Manager" 
  | "Project Manager" 
  | "Project Coordinator" 
  | "Planning Engineer" 
  | "Site Supervisor" 
  | "Safety Supervisor" 
  | "Quality Supervisor" 
  | "Senior Technician" 
  | "Junior Technician" 
  | "Billing Engineer" 
  | "Sr. Purchase Manager" 
  | "Jr. Purchase Manager" 
  | "Accounts Manager" 
  | "HR Manager" 
  | "Project Sales Officer" 
  | "Client";

export type Status = "Active" | "Inactive" | "Pending";

export interface User {
  uid: string;
  employeeId: string;
  fullName: string;
  phone: string;
  email: string;
  role: Role;
  status: Status;
  assignedProjects: "ALL" | string[];
  aadhaarNumber?: string;
  aadhaarFile?: string; // URL
  panNumber?: string;
  panFile?: string; // URL
  photoURL?: string;
  passwordSet?: boolean;
  createdBy?: string;
  createdAt: number;
  updatedAt: number;
  lastLogin?: number;
}

export interface Company {
  id: string;
  name: string;
  createdAt: number;
  superAdminId: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  location: string;
  status: "Planning" | "In Progress" | "Completed" | "On Hold";
  startDate: number;
  endDate: number;
  projectManagerId: string;
  description: string;
  createdAt: number;
  updatedAt: number;
}

export interface Site {
  id: string;
  projectId: string;
  name: string;
  address: string;
  gpsLocation?: { lat: number; lng: number };
  status: "Active" | "Inactive" | "Completed";
  assignedEmployees: string[]; // array of UIDs
  createdAt: number;
  updatedAt: number;
}
