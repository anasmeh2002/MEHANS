import { LoadingScreen } from './components/layout/LoadingScreen';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { TrustedBy } from './components/sections/TrustedBy';
import { AIWorkflow } from './components/sections/AIWorkflow';
import { Services } from './components/sections/Services';
import { Process } from './components/sections/Process';
import { Founder } from './components/sections/Founder';
import { FAQ } from './components/sections/FAQ';
import { CTA } from './components/sections/CTA';
import { Contact } from './components/sections/Contact';
import { MobileStickyCTA } from './components/ui/MobileStickyCTA';
import { CursorGlow } from './components/ui/CursorGlow';

export default function App() {
  return (
    <>
      <CursorGlow />
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <AIWorkflow />
        <Services />
        <Process />
        <Founder />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
