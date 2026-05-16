import React from 'react';

export default function Sidebar({ onOpenLevel }) {
  return (
    <aside className="sidebar">

      {/* ── Main ── */}
      <div className="sidebar-section">
        <div className="sidebar-title">Main</div>
        <button className="sidebar-link active">
          <i className="bi bi-grid-fill" style={{fontSize:15,flexShrink:0}}></i>
          Dashboard
        </button>
        <button className="sidebar-link">
          <i className="bi bi-collection-fill" style={{fontSize:15,flexShrink:0}}></i>
          All Materials
          <span className="sidebar-badge new">New</span>
        </button>
      </div>

      {/* ── CBE Levels ── */}
      <div className="sidebar-section">
        <div className="sidebar-title">CBE Levels</div>
        <button className="sidebar-link" onClick={() => onOpenLevel('pre-primary')}>
          <i className="bi bi-stars" style={{fontSize:15,flexShrink:0}}></i>
          Pre-Primary
          <span className="sidebar-badge">PP1–2</span>
        </button>
        <button className="sidebar-link" onClick={() => onOpenLevel('lower-primary')}>
          <i className="bi bi-book-fill" style={{fontSize:15,flexShrink:0}}></i>
          Lower Primary
          <span className="sidebar-badge">G1–3</span>
        </button>
        <button className="sidebar-link" onClick={() => onOpenLevel('upper-primary')}>
          <i className="bi bi-journals" style={{fontSize:15,flexShrink:0}}></i>
          Upper Primary
          <span className="sidebar-badge">G4–6</span>
        </button>
        <button className="sidebar-link" onClick={() => onOpenLevel('junior-secondary')}>
          <i className="bi bi-mortarboard-fill" style={{fontSize:15,flexShrink:0}}></i>
          Junior Secondary
          <span className="sidebar-badge">G7–9</span>
        </button>
        <button className="sidebar-link" onClick={() => onOpenLevel('senior-school')}>
          <i className="bi bi-building-fill" style={{fontSize:15,flexShrink:0}}></i>
          Senior School
          <span className="sidebar-badge">G10–12</span>
        </button>
        <button className="sidebar-link" onClick={() => onOpenLevel('old-school')}>
          <i className="bi bi-book-fill" style={{fontSize:15,flexShrink:0}}></i>
          8.4.4
          <span className="sidebar-badge">G10–12</span>
        </button>
        <button className="sidebar-link" onClick={() => onOpenLevel('exam-revision')}>
          <i className="bi bi-trophy-fill" style={{fontSize:15,flexShrink:0}}></i>
          Exam Revision
          <span className="sidebar-badge">All</span>
        </button>
      </div>

      {/* ── For Teachers ── */}
      <div className="sidebar-section">
        <div className="sidebar-title">For Teachers</div>
        <button className="sidebar-link" onClick={() => onOpenLevel('schemes-of-work')}>
          <i className="bi bi-calendar3-week-fill" style={{fontSize:15,flexShrink:0}}></i>
          Schemes of Work
        </button>
        <button className="sidebar-link" onClick={() => onOpenLevel('lesson-plans')}>
          <i className="bi bi-file-earmark-text-fill" style={{fontSize:15,flexShrink:0}}></i>
          Lesson Plans
        </button>
        <button className="sidebar-link" onClick={() => onOpenLevel('kicd-syllabus')}>
          <i className="bi bi-journal-bookmark-fill" style={{fontSize:15,flexShrink:0}}></i>
          KICD Syllabus
        </button>
      </div>

      {/* ── Premium ── */}
      <div className="sidebar-premium">
        <div className="sp-title">✦ Go Premium</div>
        <div className="sp-desc">Unlock exclusive revision packs, model answers &amp; KCSE prep bundles.</div>
        <button className="sp-btn">Upgrade — Coming Soon</button>
      </div>

    </aside>
  );
}
