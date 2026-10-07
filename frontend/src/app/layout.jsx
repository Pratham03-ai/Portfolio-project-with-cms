import './globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { getAbout } from '../lib/api';

export const metadata = {
  title: 'Full Stack Engineer & UI Architect | Portfolio',
  description: 'Portfolio powered by a custom-coded Headless CMS with real-time content management.',
};

export default async function RootLayout({ children }) {
  const about = await getAbout();

  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-emerald-500/20 selection:text-emerald-400">
        <Navbar />
        <div className="flex-1 pt-16">
          {children}
        </div>
        <Footer about={about} />
      </body>
    </html>
  );
}
