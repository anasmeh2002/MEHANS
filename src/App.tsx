import { LoadingScreen } from './components/layout/LoadingScreen';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Statistics } from './components/sections/Statistics';
import { Services } from './components/sections/Services';
import { WhoWeHelp } from './components/sections/WhoWeHelp';
import { WhyMehans } from './components/sections/WhyMehans';
import { AIAdvantages } from './components/sections/AIAdvantages';
import { Testimonials } from './components/sections/Testimonials';
import { Process } from './components/sections/Process';
import { FAQ } from './components/sections/FAQ';
import { CTA } from './components/sections/CTA';
import { Contact } from './components/sections/Contact';

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Statistics />
        <Services />
        <WhoWeHelp />
        <WhyMehans />
        <AIAdvantages />
        <Testimonials />
        <Process />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
