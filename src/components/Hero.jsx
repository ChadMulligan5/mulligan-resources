import React from 'react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>

      <div className="hero-full">
        <div className="hero-top fade-up">
          <div className="section-label">
            <div className="pulse-dot"></div>
            Kenya CBE Curriculum · All Levels
          </div>
          <h1>Your Complete <em>Study Hub</em> — From PP1 to Form 4</h1>
          <p>
            Access thousands of revision notes, past papers and study materials aligned
            to Kenya's Competency-Based Education curriculum.{' '}
            <span style={{ color:'var(--ok)', fontWeight:600 }}>Free</span> for every student.
          </p>
          <div className="hero-actions fade-up-1">
            <button className="btn-primary" style={{ fontSize:'14px', padding:'11px 28px' }}>
              <i className="bi bi-collection-fill"></i> Browse Materials
            </button>
            <button className="btn-outline" style={{ fontSize:'14px', padding:'11px 28px' }}>
              Explore by Level <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}