

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

export function Footer() {
  return (
    <footer
      className="relative bg-[#050505] border-t border-[rgba(212,175,55,0.08)]"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-full border border-[rgba(212,175,55,0.4)] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
              </div>
              <span className="text-base font-semibold tracking-wider text-white">MEHANS</span>
            </div>
            <p className="text-sm text-[#5a5a5a] leading-relaxed max-w-xs">
              AI-powered sales automation. From first touch to closed deal.
            </p>
          </div>

          {/* Platform */}
          <div>
            <div className="text-xs text-[#5a5a5a] uppercase tracking-widest mb-4 font-medium">Platform</div>
            <nav aria-label="Footer platform links">
              <ul className="space-y-3">
                {[
                  { label: 'How It Works', href: '#workflow' },
                  { label: 'Dashboard', href: '#dashboard' },
                  { label: 'Results', href: '#results' },
                ].map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-sm text-[#a0a0a0] hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Company */}
          <div>
            <div className="text-xs text-[#5a5a5a] uppercase tracking-widest mb-4 font-medium">Company</div>
            <nav aria-label="Footer company links">
              <ul className="space-y-3">
                {[
                  { label: 'Founder', href: '#founder' },
                  { label: 'Contact', href: '#cta' },
                ].map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-sm text-[#a0a0a0] hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-[rgba(255,255,255,0.04)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#5a5a5a]">
            © {new Date().getFullYear()} MEHANS. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-[#5a5a5a]">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
