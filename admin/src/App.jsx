import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { AboutView } from './pages/AboutView';
import { SkillsView } from './pages/SkillsView';
import { ProjectsView } from './pages/ProjectsView';
import { BlogsView } from './pages/BlogsView';
import { ExperienceView } from './pages/ExperienceView';
import { TestimonialsView } from './pages/TestimonialsView';
import { ServicesView } from './pages/ServicesView';
import { MessagesView } from './pages/MessagesView';
import { MediaView } from './pages/MediaView';

export const App = () => {
  const { isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8 min-h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'about' && <AboutView />}
          {activeTab === 'skills' && <SkillsView />}
          {activeTab === 'projects' && <ProjectsView />}
          {activeTab === 'blogs' && <BlogsView />}
          {activeTab === 'experience' && <ExperienceView />}
          {activeTab === 'testimonials' && <TestimonialsView />}
          {activeTab === 'services' && <ServicesView />}
          {activeTab === 'messages' && <MessagesView />}
          {activeTab === 'media' && <MediaView />}
        </div>
      </main>
    </div>
  );
};

export default App;
