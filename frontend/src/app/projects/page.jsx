import React from 'react';
import Link from 'next/link';
import { getProjects } from '../../lib/api';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'All Projects | Portfolio',
  description: 'Full portfolio of software projects and systems built with modern web technologies.',
};

export default async function ProjectsArchivePage() {
  const projects = await getProjects();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </Link>

      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          All Projects & Experiments
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          An exhaustive archive of open-source tools, commercial web apps, and system prototypes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between group"
          >
            {proj.imageUrl && (
              <div className="h-48 bg-slate-950 overflow-hidden relative">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {proj.summary}
                </p>
                {proj.tags && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.tags.split(',').map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <Link
                  href={`/projects/${proj.slug}`}
                  className="text-slate-300 hover:text-white font-medium"
                >
                  Read Case Study
                </Link>
                <div className="flex items-center gap-3">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-white transition"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
