import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { CursorGlow } from './components/CursorGlow';
import { AIWorkflow } from './components/AIWorkflow';
import { Dashboard } from './components/Dashboard';
import { ClientExperience } from './components/ClientExperience';
import { Results } from './components/Results';
import { Founder } from './components/Founder';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <CursorGlow />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#d4af37] focus:text-black focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <Nav />

      <main id="main-content">
        <Hero />
        <AIWorkflow />
        <Dashboard />
        <ClientExperience />
        <Results />
        <Founder />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
