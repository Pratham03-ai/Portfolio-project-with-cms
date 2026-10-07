import React from 'react';
import {
  LayoutDashboard,
  User,
  Wrench,
  FolderGit2,
  FileText,
  Briefcase,
  Quote,
  Sparkles,
  Mail,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'about', label: 'About & Profile', icon: User },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'blogs', label: 'Blog Posts', icon: FileText },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'testimonials', label: 'Testimonials', icon: Quote },
  { id: 'services', label: 'Services', icon: Sparkles },
  { id: 'messages', label: 'Contact Messages', icon: Mail },
  { id: 'media', label: 'Media Library', icon: ImageIcon },
];

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { logout, user } = useAuth();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
            ⚡
          </div>
          <div>
            <h1 className="font-semibold text-white tracking-wide text-sm">Portfolio CMS</h1>
            <p className="text-xs text-slate-400">Admin Control Panel</p>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-3 overflow-y-auto space-y-1">
        <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase px-3 py-2">
          Content Management
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer / User & Logout */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex flex-col gap-2">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs uppercase">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="truncate">
              <div className="text-xs font-medium text-white truncate">{user?.name || 'Admin'}</div>
              <div className="text-[10px] text-slate-400 truncate">{user?.email}</div>
            </div>
          </div>
          <button
            onClick={logout}
            title="Log Out"
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
