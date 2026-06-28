import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, Briefcase, Bell, MoreHorizontal, ArrowLeft, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import logo from '@/assets/logo.png';

const AppLayout: React.FC = () => {
  const { appUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  // Nav items based on the design PDF bottom bar
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home, roles: ['Super Admin', 'Admin', 'General Manager', 'Project Manager', 'Site Supervisor', 'Client'] },
    { name: 'Projects', path: '/projects', icon: Briefcase, roles: ['Super Admin', 'Admin', 'General Manager', 'Project Manager'] },
    { name: 'Users', path: '/users', icon: Users, roles: ['Super Admin', 'Admin', 'General Manager'] },
  ];

  const filteredNavItems = navItems.filter(item => 
    appUser && item.roles.includes(appUser.role)
  );

  // Is this a deep route (not a main tab) to show back button instead of menu?
  const isDeepRoute = location.pathname !== '/dashboard' && location.pathname !== '/projects' && location.pathname !== '/users';

  return (
    <div className="flex h-screen bg-gray-50 w-full font-sans">
      
      {/* Mobile Top App Bar (Design precise) */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 z-50">
        <button 
          onClick={() => isDeepRoute ? navigate(-1) : null}
          className="p-1 -ml-1 text-gray-700"
        >
          {isDeepRoute ? <ArrowLeft className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        <div className="flex flex-col items-center justify-center flex-1">
          <img src={logo} alt="Kala Logo" className="h-10 w-auto object-contain" />
        </div>
        
        <button className="relative p-1 -mr-1 text-gray-700">
          <Bell className="h-6 w-6" />
          <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] text-white font-bold border border-white">
            4
          </span>
        </button>
      </header>

      {/* Desktop Sidebar (Retained for larger screens but stylized) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100">
        <div className="flex flex-col items-center justify-center h-20 border-b border-gray-100">
          <img src={logo} alt="Kala Logo" className="h-14 w-auto object-contain mt-2" />
        </div>
        
        <nav className="flex-1 py-6">
          <ul className="space-y-1 px-4">
            {filteredNavItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-red-50 text-primary' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <item.icon className={`mr-3 h-5 w-5 ${location.pathname === item.path ? 'text-primary' : 'text-gray-400'}`} />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-primary font-bold">
              {appUser?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="ml-3 truncate">
              <p className="text-sm font-semibold text-gray-900 truncate">{appUser?.fullName}</p>
              <p className="text-xs text-gray-500 truncate">{appUser?.role}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full py-2.5 text-sm font-semibold text-gray-700 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white md:bg-gray-50 pt-14 md:pt-0 pb-16 md:pb-0">
        {/* Desktop Header */}
        <header className="hidden md:flex h-16 bg-white border-b border-gray-100 items-center justify-end px-8">
           <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white font-bold border-2 border-white">
              4
            </span>
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-gray-50 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation (Design precise) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 pb-safe">
        <nav className="flex justify-around items-center h-16">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                  isActive ? 'text-primary' : 'text-gray-400'
                }`
              }
            >
              <item.icon className="h-[22px] w-[22px]" strokeWidth={location.pathname === item.path ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          ))}
          
          {/* More Tab */}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-400"
          >
            <MoreHorizontal className="h-[22px] w-[22px]" />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AppLayout;
