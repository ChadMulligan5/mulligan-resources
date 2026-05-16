import React from 'react';
import './Topbar.css';

export default function Topbar({ onHamburger, onMobSearch }) {
  return (
    <header className="topbar">

      {/* ── Logo ── */}
      <a href="/" className="logo">
        <div className="logo-icon">M</div>
        <div className="logo-text-wrap">
          <div className="logo-text">Mulligan Resource Center</div>
          <div className="logo-sub">Kenya CBE Platform</div>
        </div>
      </a>

      {/* ── Desktop search bar (hidden on mobile) ── */}
      <div className="topbar-center">
        <div className="search-wrap">
          <svg className="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Search materials, subjects, levels…" />
        </div>
      </div>

      {/* ── Right controls ── */}
      <div className="topbar-right">

        {/* Mobile: search → avatar → hamburger */}
        <button className="mob-search-btn" onClick={onMobSearch} aria-label="Search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>

        <div className="avatar mob-avatar">JM</div>

        <button className="hamburger-btn" onClick={onHamburger} aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Desktop only */}
        <button className="nav-link">Browse</button>
        <button className="nav-link">Subjects</button>
        <button className="nav-link">Exams</button>
        <button className="notif-btn">
          <div className="notif-dot"></div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
        <div className="avatar">JM</div>
        <button className="btn-primary">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
          Sign In
        </button>

      </div>
    </header>
  );
}