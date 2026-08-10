import { SpeedInsights } from '@vercel/speed-insights/react';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { TrustedBy } from './components/sections/TrustedBy';
import { Services } from './components/sections/Services';
import { WhoWeHelp } from './components/sections/WhoWeHelp';
import { DashboardPreview } from './components/sections/DashboardPreview';
import { Process } from './components/sections/Process';
import { Founder } from './components/sections/Founder';
import { CTA } from './components/sections/CTA';
import { Contact } from './components/sections/Contact';
import { MobileStickyCTA } from './components/ui/MobileStickyCTA';
import { DesktopStickyCTA } from './components/ui/DesktopStickyCTA';
import { CursorGlow } from './components/ui/CursorGlow';
import { LazySection } from './components/ui/LazySection';

export default function App() {
  return (
    <>
      <SpeedInsights />
      <CursorGlow />
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <LazySection fallbackHeight={600}><Services /></LazySection>
        <LazySection fallbackHeight={600}><WhoWeHelp /></LazySection>
        <LazySection fallbackHeight={600}><DashboardPreview /></LazySection>
        <LazySection fallbackHeight={600}><Process /></LazySection>
        <LazySection fallbackHeight={500}><Founder /></LazySection>
        <LazySection fallbackHeight={400}><CTA /></LazySection>
        <LazySection fallbackHeight={700}><Contact /></LazySection>
        <LazySection fallbackHeight={300}><TrustedBy /></LazySection>
      </main>
      <Footer />
      <MobileStickyCTA />
      <DesktopStickyCTA />
    </>
  );
}
