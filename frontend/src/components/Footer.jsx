import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, ArrowUp, Heart } from 'lucide-react';

export const Footer = ({ about }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-white text-sm">Portfolio CMS</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Custom Engine
            </span>
          </div>
          <p className="text-slate-500 max-w-sm">
            Powered by a custom-built Express + SQLite CMS backend with dynamic Next.js frontend.
          </p>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {about?.githubUrl && (
            <a
              href={about.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {about?.linkedinUrl && (
            <a
              href={about.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {about?.twitterUrl && (
            <a
              href={about.twitterUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
        </div>

        <div className="text-slate-500 text-center md:text-right">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
};
