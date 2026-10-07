import React, { useState, useEffect } from 'react';
import api from '../api';
import { Header } from '../components/Header';
import {
  FolderGit2,
  Wrench,
  FileText,
  Mail,
  Briefcase,
  Quote,
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const Dashboard = ({ setActiveTab }) => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    blogs: 0,
    experiences: 0,
    messages: 0,
    unreadMessages: 0,
    testimonials: 0,
    services: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          projRes,
          skillsRes,
          blogsRes,
          expRes,
          msgRes,
          testRes,
          servRes,
        ] = await Promise.all([
          api.get('/projects'),
          api.get('/skills'),
          api.get('/blogs'),
          api.get('/experience'),
          api.get('/contact/messages'),
          api.get('/testimonials'),
          api.get('/services'),
        ]);

        const msgs = msgRes.data || [];
        setStats({
          projects: projRes.data?.length || 0,
          skills: skillsRes.data?.length || 0,
          blogs: blogsRes.data?.length || 0,
          experiences: expRes.data?.length || 0,
          messages: msgs.length,
          unreadMessages: msgs.filter((m) => !m.isRead).length,
          testimonials: testRes.data?.length || 0,
          services: servRes.data?.length || 0,
        });
        setRecentMessages(msgs.slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { id: 'projects', label: 'Projects', count: stats.projects, icon: FolderGit2, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { id: 'skills', label: 'Skills', count: stats.skills, icon: Wrench, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { id: 'blogs', label: 'Blog Posts', count: stats.blogs, icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { id: 'messages', label: 'Inquiries', count: stats.messages, unread: stats.unreadMessages, icon: Mail, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { id: 'experience', label: 'Experience', count: stats.experiences, icon: Briefcase, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    { id: 'testimonials', label: 'Testimonials', count: stats.testimonials, icon: Quote, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { id: 'services', label: 'Services', count: stats.services, icon: Sparkles, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div>
      <Header
        title="Dashboard Overview"
        subtitle="Manage all your portfolio content, review contact messages, and update assets."
      />

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => setActiveTab(card.id)}
              className="text-left bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-xl transition hover:shadow-lg group cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${card.bg} border ${card.border} ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-slate-500 group-hover:text-slate-300 transition">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                {card.count}
                {card.unread > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-normal">
                    {card.unread} new
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">{card.label}</div>
            </button>
          );
        })}
      </div>

      {/* Two Columns: Recent Messages & Quick CMS Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <h3 className="font-semibold text-white text-base flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" /> Recent Inquiries
            </h3>
            <button
              onClick={() => setActiveTab('messages')}
              className="text-xs text-emerald-400 hover:text-emerald-300 transition"
            >
              View All ({stats.messages})
            </button>
          </div>

          {recentMessages.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">
              No contact form submissions yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-medium text-sm text-white">{msg.name}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mb-1">{msg.email}</div>
                  <div className="text-xs text-slate-300 line-clamp-2">{msg.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick CMS Actions & System Info */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="font-semibold text-white text-base mb-4 pb-3 border-b border-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveTab('projects')}
                className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 text-left transition group"
              >
                <div className="font-medium text-sm text-white group-hover:text-emerald-400 transition">
                  + Add New Project
                </div>
                <div className="text-xs text-slate-500 mt-1">Add title, slug, tags & repo</div>
              </button>
              <button
                onClick={() => setActiveTab('blogs')}
                className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-850 text-left transition group"
              >
                <div className="font-medium text-sm text-white group-hover:text-purple-400 transition">
                  + Write Blog Post
                </div>
                <div className="text-xs text-slate-500 mt-1">Publish tech articles</div>
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-850 text-left transition group"
              >
                <div className="font-medium text-sm text-white group-hover:text-blue-400 transition">
                  Edit About / Bio
                </div>
                <div className="text-xs text-slate-500 mt-1">Update profile & socials</div>
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 text-left transition group"
              >
                <div className="font-medium text-sm text-white group-hover:text-amber-400 transition">
                  Upload Media
                </div>
                <div className="text-xs text-slate-500 mt-1">Store images and assets</div>
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="font-semibold text-white text-base mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> CMS Engine Status
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Database Engine:</span>
                <span className="text-white font-mono">SQLite (Prisma ORM)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">API Server:</span>
                <span className="text-emerald-400 font-mono">http://localhost:5001</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Authentication:</span>
                <span className="text-white">JWT (Bearer) + bcrypt hashing</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Media Storage:</span>
                <span className="text-white">Local Disk (/uploads)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
