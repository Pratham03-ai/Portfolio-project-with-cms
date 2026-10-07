import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '../../../lib/api';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from 'lucide-react';

export async function generateMetadata({ params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Projects</span>
      </Link>

      <div className="space-y-4 mb-8">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {project.title}
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">{project.summary}</p>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition shadow-lg shadow-emerald-950"
            >
              <span>Visit Live Application</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium text-sm transition"
            >
              <Github className="w-4 h-4" />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>

      {project.imageUrl && (
        <div className="w-full h-80 sm:h-[420px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 mb-10">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Tech Tags */}
      {project.tags && (
        <div className="mb-8 pb-8 border-b border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium mr-2 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Technologies:
          </span>
          {project.tags.split(',').map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1 rounded-lg"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Project Description / Case study */}
      <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
        {project.description || project.summary}
      </div>
    </article>
  );
}
