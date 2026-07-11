import { LoadingScreen } from './components/layout/LoadingScreen';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Statistics } from './components/sections/Statistics';
import { Services } from './components/sections/Services';
import { WhoWeHelp } from './components/sections/WhoWeHelp';
import { WhyMehans } from './components/sections/WhyMehans';
import { AIAdvantages } from './components/sections/AIAdvantages';
import { AIWorkflow } from './components/sections/AIWorkflow';
import { DashboardPreview } from './components/sections/DashboardPreview';
import { ClientJourney } from './components/sections/ClientJourney';
import { Testimonials } from './components/sections/Testimonials';
import { Process } from './components/sections/Process';
import { Pricing } from './components/sections/Pricing';
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
        <Statistics />
        <AIWorkflow />
        <DashboardPreview />
        <ClientJourney />
        <Services />
        <WhoWeHelp />
        <WhyMehans />
        <AIAdvantages />
        <Testimonials />
        <Process />
        <Pricing />
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
