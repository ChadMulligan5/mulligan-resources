import React, { useState } from 'react';
import './Dashboard.css';
import Topbar   from './components/Topbar';
import Hero     from './components/Hero';
import Sidebar  from './components/Sidebar';
import DrillDown from './components/DrillDown';
import DocModal from './components/DocModal';
import { MobileDrawer, MobileSearch, MobileBottomNav, PWABanner } from './components/MobileUI';

export default function Dashboard() {
  const [drawerOpen,     setDrawerOpen]     = useState(false);
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [activeDoc,      setActiveDoc]      = useState(null);
  const [triggerLevel,   setTriggerLevel]   = useState(null);

  const openLevel = id => {
    setTriggerLevel(null);
    setTimeout(() => setTriggerLevel(id), 0); // force DrillDown reset
    // scroll to levels section
    const el = document.getElementById('levels');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      {/* ── Top navigation ── */}
      <Topbar
        onHamburger={() => setDrawerOpen(true)}
        onMobSearch={() => setSearchOpen(true)}
      />

      {/* ── Hero with carousel ── */}
      <Hero />

      {/* ── Page body: sidebar + content ── */}
      <div className="page-body">
        <Sidebar onOpenLevel={openLevel} />

        <main className="content">
          <DrillDown
            initialLevel={triggerLevel}
            onOpenDoc={doc => setActiveDoc(doc)}
          />

          {/* Premium banner */}
          <div className="premium-banner fade-up-3">
            <div className="pb-left">
              <div className="pb-icon">✦</div>
              <div>
                <div className="pb-title">Unlock Premium Materials</div>
                <div className="pb-desc">
                  Get full access to exclusive revision packs, model answers, KCSE topic boosters,
                  and more. Launching soon at affordable rates.
                </div>
              </div>
            </div>
            <button className="btn-primary" style={{flexShrink:0}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              Get Premium — Soon
            </button>
          </div>
        </main>
      </div>

      {/* ── Footer: full width below sidebar + content ── */}
      <footer className="footer">
        <div style={{textAlign:'center', width:'100%'}}>
          <div className="footer-copy">© 2026 Mulligan Resource Center. All rights reserved. Nairobi, Kenya.</div>
          <div className="footer-status" style={{justifyContent:'center', marginTop:6}}>
            <div className="status-dot"></div>
            Platform operational · Kenya CBE Aligned
          </div>
        </div>
      </footer>

      {/* ── Mobile UI ── */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpenLevel={openLevel}
      />
      <MobileSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenLevel={openLevel}
      />
      <MobileBottomNav
        onOpenLevel={openLevel}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <PWABanner />

      {/* ── Document modal ── */}
      {activeDoc && <DocModal doc={activeDoc} onClose={() => setActiveDoc(null)} />}
    </div>
  );
}
