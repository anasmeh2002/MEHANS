import { useState, useEffect } from 'react';
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
import { ServicePage } from './components/sections/ServicePage';
import { isServiceSlug, ServiceSlug } from './router';

function useRoute(): { isService: boolean; slug: ServiceSlug | null } {
  const [route, setRoute] = useState(() => {
    const path = window.location.pathname;
    const match = path.match(/^\/services\/([a-z0-9-]+)$/);
    if (match && isServiceSlug(match[1])) {
      return { isService: true, slug: match[1] as ServiceSlug };
    }
    return { isService: false, slug: null };
  });

  useEffect(() => {
    const onPop = () => {
      const path = window.location.pathname;
      const match = path.match(/^\/services\/([a-z0-9-]+)$/);
      if (match && isServiceSlug(match[1])) {
        setRoute({ isService: true, slug: match[1] as ServiceSlug });
      } else {
        setRoute({ isService: false, slug: null });
      }
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return route;
}

export default function App() {
  const route = useRoute();

  if (route.isService && route.slug) {
    return (
      <>
        <CursorGlow />
        <Navbar />
        <main>
          <ServicePage slug={route.slug} />
        </main>
        <Footer />
        <MobileStickyCTA />
      </>
    );
  }

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
