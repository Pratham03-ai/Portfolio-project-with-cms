import React, { useState, useEffect } from 'react';
import api from '../api';
import { Header } from '../components/Header';
import { Save, Check, AlertCircle } from 'lucide-react';

export const AboutView = () => {
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    bio: '',
    secondaryBio: '',
    avatarUrl: '',
    resumeUrl: '',
    location: '',
    email: '',
    phone: '',
    githubUrl: '',
    linkedinUrl: '',
    twitterUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get('/about');
        if (res.data) {
          setForm((prev) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error('Failed to load about data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setToast(null);
    try {
      await api.put('/about', form);
      setToast({ type: 'success', message: 'About profile updated successfully!' });
      setTimeout(() => setToast(null), 4000);
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to update about profile.' });
    } finally {
      setSaving(false);
    }
  };

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
        title="About & Profile"
        subtitle="Configure your personal biography, headline, location, and social links displayed across the portfolio."
        action={
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition shadow-lg shadow-emerald-900/30 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        }
      />

      {toast && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center gap-2 text-sm ${
            toast.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          {toast.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{toast.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Core Profile */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-3">
            Core Introduction
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                Headline / Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title || ''}
                onChange={handleChange}
                placeholder="e.g. Senior Full Stack Engineer"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location || ''}
                onChange={handleChange}
                placeholder="e.g. San Francisco, CA / Remote"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
              Subtitle / Hook
            </label>
            <input
              type="text"
              name="subtitle"
              value={form.subtitle || ''}
              onChange={handleChange}
              placeholder="e.g. Crafting high-performance digital products and scalable systems."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
              Primary Biography
            </label>
            <textarea
              rows={4}
              name="bio"
              value={form.bio || ''}
              onChange={handleChange}
              placeholder="Detailed description of your background and passion..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
              Secondary / Technical Biography
            </label>
            <textarea
              rows={3}
              name="secondaryBio"
              value={form.secondaryBio || ''}
              onChange={handleChange}
              placeholder="Specializations, philosophy, or architectural focus..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Media & Links */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-3">
            Assets & Media
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                Avatar / Profile Picture URL
              </label>
              <input
                type="text"
                name="avatarUrl"
                value={form.avatarUrl || ''}
                onChange={handleChange}
                placeholder="https://... or /uploads/avatar.png"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                Resume / CV URL
              </label>
              <input
                type="text"
                name="resumeUrl"
                value={form.resumeUrl || ''}
                onChange={handleChange}
                placeholder="https://... or /uploads/resume.pdf"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Socials & Contact Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-3">
            Contact & Social Profiles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                Public Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email || ''}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone || ''}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                GitHub URL
              </label>
              <input
                type="text"
                name="githubUrl"
                value={form.githubUrl || ''}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                LinkedIn URL
              </label>
              <input
                type="text"
                name="linkedinUrl"
                value={form.linkedinUrl || ''}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
                Twitter / X URL
              </label>
              <input
                type="text"
                name="twitterUrl"
                value={form.twitterUrl || ''}
                onChange={handleChange}
                placeholder="https://twitter.com/username"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
