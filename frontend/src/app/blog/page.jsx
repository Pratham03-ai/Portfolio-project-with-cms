import React from 'react';
import Link from 'next/link';
import { getBlogs } from '../../lib/api';
import { ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react';

export const metadata = {
  title: 'Blog & Technical Articles | Portfolio',
  description: 'Writings on system architecture, software engineering, and web development.',
};

export default async function BlogArchivePage() {
  const blogs = await getBlogs('published=true');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </Link>

      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Articles & Publications
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Engineering deep dives, architectural trade-offs, and lessons learned building software.
        </p>
      </div>

      <div className="space-y-6">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="block bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-slate-700 transition group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>

              {blog.tags && (
                <div className="flex items-center gap-1.5">
                  {blog.tags.split(',').slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition leading-snug mb-3">
              {blog.title}
            </h2>

            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              {blog.summary}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span>Read Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
