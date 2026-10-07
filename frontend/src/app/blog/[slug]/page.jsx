import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '../../../lib/api';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

export async function generateMetadata({ params }) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) return { title: 'Article Not Found' };
  return {
    title: `${blog.title} | Portfolio Blog`,
    description: blog.summary,
  };
}

export default async function BlogArticlePage({ params }) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Articles</span>
      </Link>

      <header className="space-y-4 mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Calendar className="w-3.5 h-3.5" />
          <span>
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.2]">
          {blog.title}
        </h1>

        {blog.summary && (
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            {blog.summary}
          </p>
        )}

        {blog.tags && (
          <div className="flex flex-wrap gap-2 pt-2">
            {blog.tags.split(',').map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1 rounded-lg"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </header>

      {blog.coverImage && (
        <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 mb-10">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Blog Article Body */}
      <div className="prose prose-invert max-w-none text-slate-300 text-base leading-relaxed space-y-4 whitespace-pre-line border-t border-slate-800/80 pt-8">
        {blog.content}
      </div>
    </article>
  );
}
