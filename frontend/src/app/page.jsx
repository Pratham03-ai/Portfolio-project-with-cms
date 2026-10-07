import React from 'react';
import Link from 'next/link';
import {
  getAbout,
  getSkills,
  getProjects,
  getBlogs,
  getExperience,
  getTestimonials,
  getServices,
} from '../lib/api';
import { ContactForm } from '../components/ContactForm';
import {
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  FileText,
  MapPin,
  Calendar,
  Star,
  Sparkles,
  Code2,
  Terminal,
} from 'lucide-react';

export default async function HomePage() {
  const [
    about,
    skills,
    projects,
    blogs,
    experiences,
    testimonials,
    services,
  ] = await Promise.all([
    getAbout(),
    getSkills(),
    getProjects('featured=true'),
    getBlogs('published=true'),
    getExperience(),
    getTestimonials(),
    getServices(),
  ]);

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const cat = skill.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <main className="space-y-24 pb-24">
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative pt-20 pb-12 overflow-hidden">
        {/* Glow Backgrounds */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for new roles & projects</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                {about?.title || 'Full Stack Engineer'}
              </h1>

              <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                {about?.subtitle ||
                  'Crafting high-performance digital products, scalable systems, and delightful developer experiences.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-emerald-950 transition"
                >
                  <span>Explore Work</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {about?.resumeUrl && (
                  <a
                    href={about.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium text-sm flex items-center gap-2 transition"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Resume</span>
                  </a>
                )}

                <a
                  href="#contact"
                  className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium text-sm transition"
                >
                  Get in Touch
                </a>
              </div>

              {/* Social links */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 text-slate-400">
                {about?.githubUrl && (
                  <a
                    href={about.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 hover:text-white hover:border-slate-700 transition"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {about?.linkedinUrl && (
                  <a
                    href={about.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 hover:text-white hover:border-slate-700 transition"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {about?.twitterUrl && (
                  <a
                    href={about.twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 hover:text-white hover:border-slate-700 transition"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Avatar or Visual Badge */}
            <div className="relative shrink-0">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-2 border-slate-800 p-2 bg-slate-900/50 backdrop-blur-sm relative group shadow-2xl">
                {about?.avatarUrl ? (
                  <img
                    src={about.avatarUrl}
                    alt={about.title}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-emerald-600/20 via-slate-900 to-blue-600/20 flex flex-col items-center justify-center p-6 text-center">
                    <Terminal className="w-12 h-12 text-emerald-400 mb-3" />
                    <span className="font-bold text-white text-lg">Full-Stack</span>
                    <span className="text-xs text-slate-400">Custom CMS Portfolio</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              <span>About Me</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Passionate about engineering reliable web software and clean architectures.
            </h2>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {about?.bio}
            </p>

            {about?.secondaryBio && (
              <p className="text-slate-400 leading-relaxed text-sm">
                {about.secondaryBio}
              </p>
            )}

            {about?.location && (
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{about.location}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. SKILLS SECTION */}
      <section id="skills" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
            Expertise
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight mt-2">
            Technical Stack & Proficiencies
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Languages, frameworks, database systems, and infrastructure tools I leverage daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillsByCategory).map(([category, items]) => (
            <div
              key={category}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition"
            >
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
                {category}
              </h3>
              <div className="space-y-3.5">
                {items.map((skill) => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-white">{skill.name}</span>
                      <span className="text-slate-400 font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-1.5 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Portfolio
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-2">
              Featured Case Studies
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select production web applications and tools built from scratch.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
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
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-3">
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
                    View Details
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
      </section>

      {/* 5. SERVICES */}
      {services.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Services
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-2">
              What I Bring to Your Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. WORK EXPERIENCE TIMELINE */}
      {experiences.length > 0 && (
        <section id="experience" className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Career
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-2">
              Work History & Experience
            </h2>
          </div>

          <div className="relative border-l border-slate-800 ml-4 sm:ml-8 space-y-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-6 sm:pl-8 group">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-500 group-hover:scale-125 transition" />
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="font-bold text-white text-base">{exp.role}</h3>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-emerald-400 mb-3">{exp.company}</div>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Endorsements
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-2">
              What Colleagues & Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 italic leading-relaxed mb-6">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  {t.avatarUrl ? (
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs uppercase">
                      {t.name[0]}
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-white text-sm">{t.name}</h4>
                    <p className="text-xs text-slate-400">
                      {t.role} {t.company ? `• ${t.company}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. LATEST ARTICLES */}
      {blogs.length > 0 && (
        <section id="blog" className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                Writing
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight mt-2">
                Latest Publications
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition"
            >
              <span>Browse All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.slice(0, 2).map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition flex flex-col justify-between group"
              >
                <div>
                  <span className="text-xs text-slate-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2 group-hover:text-emerald-400 transition leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {blog.summary}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 9. CONTACT SECTION */}
      <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Get in Touch
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-2">
              Let's build something remarkable together.
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Have an opening, consulting project, or question? Send a message and I'll respond within 24 hours.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
