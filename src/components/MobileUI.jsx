import React, { useState, useEffect } from 'react';

export function MobileDrawer({ open, onClose, onOpenLevel }) {
  return (
    <>
      <div className={`drawer-overlay${open ? ' open' : ''}`} onClick={onClose}></div>
      <div className={`drawer${open ? ' open' : ''}`}>
        <div className="drawer-header">
          <a href="/" className="logo">
            <div className="logo-icon">M</div>
            <div>
              <div className="logo-text" style={{fontSize:15}}>Mulligan Resources</div>
              <div className="logo-sub">Kenya C.B.E Platform</div>
            </div>
          </a>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>
        <div style={{padding:'16px 0'}}>
          <div className="sidebar-title" style={{padding:'0 20px',marginBottom:8}}>Main</div>
          <button className="sidebar-link active" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Dashboard
          </button>

          <div className="sidebar-title" style={{padding:'12px 20px 8px'}}>CBE Levels</div>
          {[
            { id:'pre-primary',       label:'Pre-Primary',       badge:'PP1–PP2' },
            { id:'lower-primary',     label:'Lower Primary',     badge:'G1–G3' },
            { id:'upper-primary',     label:'Upper Primary',     badge:'G4–G6' },
            { id:'junior-secondary',  label:'Junior Secondary',  badge:'G7–G9' },
            { id:'senior-school',     label:'Senior School',     badge:'G10–G12' },
            { id:'old-school',        label:'8.4.4',             badge:'F3–F4' },
            { id:'exam-revision',     label:'Exam Revision',     badge:'All' },

          ].map(item => (
            <button key={item.id} className="sidebar-link" onClick={() => { onClose(); onOpenLevel(item.id); }}>
              <i className="bi bi-mortarboard-fill" style={{fontSize:16}}></i>
              {item.label}
              <span className={`sidebar-badge${item.badgeClass ? ` ${item.badgeClass}` : ''}`}>{item.badge}</span>
            </button>
          ))}

          <div className="sidebar-title" style={{padding:'12px 20px 8px'}}>For Teachers</div>
          {[
            { id:'teacher-resources', label:'Teacher Resources', badge:'New', badgeClass:'new' },
            { id:'schemes-of-work', label:'Schemes of Work', badge:'New', badgeClass:'new' },
            { id:'lesson-plans', label:'Lesson Plans', badge:'New', badgeClass:'new' },
            { id:'kicd-syllabus', label:'KICD Syllabus', badge:'New', badgeClass:'new' },
          ].map(item => (
            <button key={item.id} className="sidebar-link" onClick={() => { onClose(); onOpenLevel(item.id); }}>
              <i className="bi bi-mortarboard-fill" style={{fontSize:16}}></i>
              {item.label}
              <span className={`sidebar-badge${item.badgeClass ? ` ${item.badgeClass}` : ''}`}>{item.badge}</span>
            </button>
          ))}

          <div style={{margin:'16px 16px 0'}}>
            <div className="sidebar-premium">
              <div className="sp-title">✦ Go Premium</div>
              <div className="sp-desc">Unlock exclusive revision packs, model answers &amp; KCSE prep bundles.</div>
              <button className="sp-btn">Upgrade — Coming Soon</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function MobileSearch({ open, onClose, onOpenLevel }) {
  return (
    <div className={`mob-search-overlay${open ? ' open' : ''}`}>
      <div className="mob-search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color:'var(--tm)',flexShrink:0}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="search" placeholder="Search materials, subjects…" autoFocus />
        <button className="mob-search-cancel" onClick={onClose}>Cancel</button>
      </div>
      <div>
        {[
          { id:'lower-primary',    emoji:'📗', label:'Lower Primary Materials' },
          { id:'upper-primary',    emoji:'📘', label:'Upper Primary Materials' },
          { id:'exam-revision',    emoji:'🏆', label:'KCPE & KCSE Past Papers' },
          { id:'junior-secondary', emoji:'📙', label:'Junior Secondary Notes' },
          { id:'senior-school',    emoji:'📓', label:'Senior School Resources' },
          { id:'old-school',       emoji:'📓', label:'8.4.4 Resources' },
        ].map(h => (
          <div key={h.id} className="mob-hint" onClick={() => { onClose(); onOpenLevel(h.id); }}>
            <span style={{fontSize:18}}>{h.emoji}</span> {h.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MobileBottomNav({ onOpenLevel, onOpenSearch }) {
  const [active, setActive] = useState('home');
  return (
    <nav className="mobile-bottom-nav">
      {[
        { id:'home',   label:'Home',   onClick:() => setActive('home') },
        { id:'levels', label:'Levels', onClick:() => setActive('levels') },
        { id:'search', label:'Search', onClick:() => { setActive('search'); onOpenSearch(); } },
        { id:'saved',  label:'Saved',  onClick:() => setActive('saved') },
        { id:'menu',   label:'Menu',   onClick:() => setActive('menu') },
      ].map((item, i) => (
        <button key={item.id} className={`mob-nav-item${active === item.id ? ' active' : ''}`} onClick={item.onClick}>
          <div className="mob-nav-icon">
            {i === 0 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>}
            {i === 1 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>}
            {i === 2 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>}
            {i === 3 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
            {i === 4 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>}
          </div>
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export function PWABanner() {
  const [show, setShow] = useState(false);
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      setPrompt(e);
      const isMobile = /Android/i.test(navigator.userAgent);
      const dismissed = sessionStorage.getItem('pwa-dismissed');
      if (isMobile && !dismissed) setTimeout(() => setShow(true), 3000);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = () => {
    if (!prompt) return;
    prompt.prompt();
    prompt.userChoice.then(() => { setShow(false); setPrompt(null); });
  };

  const dismiss = () => { setShow(false); sessionStorage.setItem('pwa-dismissed','1'); };

  if (!show) return null;

  return (
    <div className="pwa-banner show">
      <div className="pwa-banner-top">
        <div className="pwa-app-icon">M</div>
        <div className="pwa-info" style={{flex:1}}>
          <div className="pwa-title">Install Mulligan RC</div>
          <div className="pwa-desc">Add to your home screen for faster access — works offline too!</div>
        </div>
        <button className="pwa-close-x" onClick={dismiss}>✕</button>
      </div>
      <div className="pwa-features">
        {['Works offline','Faster loading','App experience','Free forever'].map(f => (
          <span key={f} className="pwa-feat">{f}</span>
        ))}
      </div>
      <div className="pwa-actions">
        <button className="pwa-install-btn" onClick={install}>Install App</button>
        <button className="pwa-later-btn" onClick={dismiss}>Maybe Later</button>
      </div>
    </div>
  );
}