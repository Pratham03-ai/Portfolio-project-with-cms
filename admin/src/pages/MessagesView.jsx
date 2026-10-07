import React, { useState, useEffect } from 'react';
import api from '../api';
import { Header } from '../components/Header';
import { Mail, Check, Trash2, MailOpen, Clock, AlertCircle } from 'lucide-react';

export const MessagesView = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/contact/messages');
      setMessages(res.data || []);
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = async (id, currentStatus) => {
    try {
      await api.patch(`/contact/messages/${id}/read`, { isRead: !currentStatus });
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isRead: !currentStatus } : m))
      );
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to update message status' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/messages/${id}`);
      setToast({ type: 'success', message: 'Message deleted' });
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to delete message' });
    }
  };

  return (
    <div>
      <Header
        title="Contact Form Messages"
        subtitle="Review, manage, and respond to incoming inquiries from your portfolio visitors."
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

      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-500 text-sm">
          <Mail className="w-10 h-10 mx-auto text-slate-700 mb-3" />
          No messages received yet. Submit a message via the portfolio contact form to see it here!
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`border rounded-xl p-5 transition ${
                m.isRead
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-slate-900/90 border-emerald-500/30 shadow-lg shadow-emerald-950/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      m.isRead ? 'bg-slate-600' : 'bg-emerald-400 animate-pulse'
                    }`}
                  />
                  <h3 className="font-bold text-white text-base">{m.name}</h3>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-xs text-emerald-400 hover:underline font-mono"
                  >
                    &lt;{m.email}&gt;
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(m.createdAt).toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleMarkRead(m.id, m.isRead)}
                    title={m.isRead ? 'Mark as Unread' : 'Mark as Read'}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
                  >
                    {m.isRead ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4 text-emerald-400" />}
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    title="Delete Message"
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {m.subject && (
                <div className="text-xs font-semibold text-slate-300 mb-2">
                  Subject: <span className="text-white font-normal">{m.subject}</span>
                </div>
              )}

              <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                {m.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
