import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, Users, Briefcase, MapPin, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

const AppLayout: React.FC = () => {
  const { appUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home, roles: ['Super Admin', 'Admin', 'General Manager', 'Project Manager', 'Site Supervisor', 'Client'] },
    { name: 'Users', path: '/users', icon: Users, roles: ['Super Admin', 'Admin', 'General Manager'] },
    { name: 'Projects', path: '/projects', icon: Briefcase, roles: ['Super Admin', 'Admin', 'General Manager', 'Project Manager'] },
    { name: 'Sites', path: '/sites', icon: MapPin, roles: ['Super Admin', 'Admin', 'General Manager', 'Project Manager', 'Site Supervisor'] },
  ];

  const filteredNavItems = navItems.filter(item => 
    appUser && item.roles.includes(appUser.role)
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 w-full">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xl font-bold text-primary">Kala Group</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {filteredNavItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {appUser?.fullName?.charAt(0) || 'U'}
              </div>
            </div>
            <div className="ml-3 truncate">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{appUser?.fullName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{appUser?.role}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex w-full items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="flex-shrink-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="md:hidden flex items-center">
            <span className="text-xl font-bold text-primary">Kala Group</span>
          </div>
          <div className="flex items-center ml-auto space-x-4">
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
        <nav className="flex justify-around">
          {filteredNavItems.slice(0, 4).map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-3 px-2 text-xs font-medium ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`
              }
            >
              <item.icon className="h-6 w-6 mb-1" />
              {item.name}
            </NavLink>
          ))}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center py-3 px-2 text-xs font-medium ${
                isActive 
                  ? 'text-primary' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`
            }
          >
            <User className="h-6 w-6 mb-1" />
            Profile
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default AppLayout;
