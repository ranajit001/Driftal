import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Settings, 
  FileText, 
  BarChart3,
  AlertTriangle 
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Activity, label: 'Live Logs', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: AlertTriangle, label: 'Alerts', active: false },
    { icon: FileText, label: 'Reports', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 glass-card border-0 border-r border-white/10">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
                  item.active
                    ? 'bg-blue-600/20 text-blue-400 neon-blue'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
