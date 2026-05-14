import React from 'react';

const STATS = [
  { icon:'bi-collection-fill',  num:'1,240+', lbl:'Materials Available' },
  { icon:'bi-layers-fill',      num:'7',      lbl:'CBE Levels' },
  { icon:'bi-grid-3x3-gap-fill',num:'40+',    lbl:'Subjects Covered' },
  { icon:'bi-patch-check-fill', num:'Free',   lbl:'Full Access' },
];

const LEVELS = [
  { icon:'bi-stars',            color:'#EC64A0', label:'Pre-Primary',      sub:'PP1 & PP2' },
  { icon:'bi-book-fill',        color:'#3DBF8A', label:'Lower Primary',    sub:'Grade 1 – 3' },
  { icon:'bi-journals',         color:'#6DA8F5', label:'Upper Primary',    sub:'Grade 4 – 6' },
  { icon:'bi-mortarboard-fill', color:'#D4A843', label:'Junior Secondary', sub:'Grade 7 – 9' },
  { icon:'bi-building-fill',    color:'#A882DD', label:'High School',      sub:'Grade 10 – 12' },
  { icon:'bi-trophy-fill',      color:'#E86060', label:'Exam Revision',    sub:'KCPE · KCSE' },
  { icon:'bi-person-video3',    color:'#20C8B4', label:'Teachers',         sub:'Resources' },
];

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
