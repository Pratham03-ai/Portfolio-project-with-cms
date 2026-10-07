const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
export const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_URL || 'http://localhost:5001';

async function fetchFromCMS(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      cache: 'no-store', // Ensures CMS changes show up immediately
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!res.ok) {
      console.warn(`CMS API error [${res.status}] for ${endpoint}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`CMS fetch failed for ${endpoint}:`, error.message);
    return null;
  }
}

export async function getAbout() {
  return await fetchFromCMS('/about') || {
    title: 'Full Stack Engineer & Creative Developer',
    subtitle: 'Building modern, performant web applications with elegant architectures.',
    bio: 'I am a passionate software developer specializing in scalable web systems, intuitive user interfaces, and robust backend services.',
    secondaryBio: 'Specializing in React, Next.js, Node.js, and TypeScript.',
    location: 'Remote Worldwide',
    email: 'contact@example.com',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    twitterUrl: 'https://twitter.com',
  };
}

export async function getSkills() {
  return await fetchFromCMS('/skills') || [];
}

export async function getProjects(params = '') {
  return await fetchFromCMS(`/projects${params ? `?${params}` : ''}`) || [];
}

export async function getProjectBySlug(slug) {
  return await fetchFromCMS(`/projects/${slug}`);
}

export async function getBlogs(params = '') {
  return await fetchFromCMS(`/blogs${params ? `?${params}` : ''}`) || [];
}

export async function getBlogBySlug(slug) {
  return await fetchFromCMS(`/blogs/${slug}`);
}

export async function getExperience() {
  return await fetchFromCMS('/experience') || [];
}

export async function getTestimonials() {
  return await fetchFromCMS('/testimonials') || [];
}

export async function getServices() {
  return await fetchFromCMS('/services') || [];
}

export async function submitContact(data) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}
