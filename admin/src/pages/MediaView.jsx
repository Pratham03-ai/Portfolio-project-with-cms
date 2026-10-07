import React, { useState, useEffect } from 'react';
import api, { ASSET_BASE } from '../api';
import { Header } from '../components/Header';
import { UploadCloud, Trash2, Copy, Check, File, Image as ImageIcon, AlertCircle } from 'lucide-react';

export const MediaView = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchMedia = async () => {
    try {
      const res = await api.get('/media');
      setMediaList(res.data || []);
    } catch (err) {
      console.error('Failed to load media:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setToast(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setToast({ type: 'success', message: 'File uploaded successfully!' });
      fetchMedia();
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.error || 'Failed to upload file' });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleCopy = (id, url) => {
    const fullUrl = `${ASSET_BASE}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this file?')) return;
    try {
      await api.delete(`/media/${id}`);
      setToast({ type: 'success', message: 'File deleted' });
      setMediaList((prev) => prev.filter((m) => m.id !== id));
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to delete file' });
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div>
      <Header
        title="Media & File Library"
        subtitle="Upload photos, project assets, and documents to easily link across your portfolio."
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

      {/* Upload Drop Area */}
      <div className="bg-slate-900 border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl p-8 mb-8 text-center transition">
        <label className="cursor-pointer flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
            <UploadCloud className="w-8 h-8" />
          </div>
          <span className="text-base font-semibold text-white mb-1">
            {uploading ? 'Uploading File...' : 'Click to Upload Asset'}
          </span>
          <span className="text-xs text-slate-400 max-w-sm mb-4">
            Supports PNG, JPG, WEBP, GIF, SVG, and PDF documents up to 10MB
          </span>
          <span className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium shadow-lg shadow-emerald-950">
            Browse Computer
          </span>
          <input
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            accept="image/*,application/pdf"
          />
        </label>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      ) : mediaList.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-500 text-sm">
          <ImageIcon className="w-10 h-10 mx-auto text-slate-700 mb-3" />
          No media uploaded yet. Use the upload box above to add your first asset!
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mediaList.map((item) => {
            const isImage = item.mimeType.startsWith('image/');
            const fullUrl = `${ASSET_BASE}${item.url}`;
            return (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition group flex flex-col justify-between"
              >
                <div className="h-32 bg-slate-950 flex items-center justify-center relative overflow-hidden">
                  {isImage ? (
                    <img
                      src={fullUrl}
                      alt={item.originalName}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <File className="w-10 h-10 text-slate-600" />
                  )}
                </div>

                <div className="p-3">
                  <div className="font-medium text-white text-xs truncate" title={item.originalName}>
                    {item.originalName}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {formatBytes(item.size)}
                  </div>

                  <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => handleCopy(item.id, item.url)}
                      className="flex-1 py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium flex items-center justify-center gap-1 transition"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
