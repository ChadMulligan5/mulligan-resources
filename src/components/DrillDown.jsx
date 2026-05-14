import React, { useState } from 'react';
import { LEVELS, SUBJECT_ICONS, CATEGORIES, TEACHER_CATEGORIES, getDocuments } from '../data';
import { DriveSubjectPanel } from './DriveDocuments';
import MpesaPaymentModal from './MpesaPaymentModal';


const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ── Breadcrumb ──────────────────────────────────────────
function Breadcrumb({ state, goHome, goToLevel, goToGrade, goToSubject }) {
  if (!state.level) return null;
  const lv = LEVELS[state.level];
  return (
    <div className="breadcrumb">
      <button className="bc-link" onClick={goHome}>All Levels</button>
      {state.level && !state.grade && <><span className="bc-sep">›</span><span className="bc-current">{lv.label}</span></>}
      {state.grade && !state.subject && <><span className="bc-sep">›</span><button className="bc-link" onClick={goToLevel}>{lv.label}</button><span className="bc-sep">›</span><span className="bc-current">{state.grade.label}</span></>}
      {state.subject && !state.category && <><span className="bc-sep">›</span><button className="bc-link" onClick={goToLevel}>{lv.label}</button><span className="bc-sep">›</span><button className="bc-link" onClick={goToGrade}>{state.grade.label}</button><span className="bc-sep">›</span><span className="bc-current">{state.subject}</span></>}
      {state.category && <><span className="bc-sep">›</span><button className="bc-link" onClick={goToLevel}>{lv.label}</button><span className="bc-sep">›</span><button className="bc-link" onClick={goToGrade}>{state.grade.label}</button><span className="bc-sep">›</span><button className="bc-link" onClick={goToSubject}>{state.subject}</button><span className="bc-sep">›</span><span className="bc-current">{state.category}</span></>}
    </div>
  );
}

// ── Level Cards ─────────────────────────────────────────
function LevelCards({ onOpenLevel }) {
  const studentLevels = [
    { id:'pre-primary',      biIcon:'bi-stars',           color:'lc-pink',   title:'Pre-Primary',      desc:'PP1 & PP2 · Ages 4–6. Early years foundational activities.',               count:'6 subjects' },
    { id:'lower-primary',    biIcon:'bi-book-fill',       color:'lc-green',  title:'Lower Primary',    desc:'Grade 1–3 · Ages 6–9. Foundational literacy, numeracy and life skills.',   count:'6 subjects' },
    { id:'upper-primary',    biIcon:'bi-journals',        color:'lc-blue',   title:'Upper Primary',    desc:'Grade 4–6 · Ages 10–12. Expanding core subjects and practical skills.',    count:'8 subjects' },
    { id:'junior-secondary', biIcon:'bi-mortarboard-fill',color:'lc-gold',   title:'Junior Secondary', desc:'Grade 7–9 · Ages 13–15. Integrated subjects with career pathway options.',  count:'12 subjects' },
    { id:'high-school',      biIcon:'bi-building-fill',   color:'lc-purple', title:'High School',      desc:'Grade 10–12 · Ages 16–18. Specialised tracks: Arts, STEM & TVET.',         count:'12 subjects' },
  ];
  const extraLevels = [
    { id:'exam-revision',     biIcon:'bi-trophy-fill',     color:'lc-coral', title:'Exam Revision',     desc:'KCPE · KPSEA · KJSEA · KCSE — past papers, mocks and marking schemes.',    count:'4 national exams' },
    { id:'teacher-resources', biIcon:'bi-person-video3',   color:'lc-teal',  title:'Teacher Resources', desc:'Schemes of work, lesson plans, rubrics and KICD syllabus for all levels.',  count:'5 level categories' },
  ];

  const Card = ({ level }) => (
    <div className="level-card" onClick={() => onOpenLevel(level.id)}>
      <div className={`lc-icon ${level.color}`}>
        <i className={`bi ${level.biIcon}`} style={{fontSize:20}}></i>
      </div>
      <h3>{level.title}</h3>
      <p>{level.desc}</p>
      <div className="level-meta">
        <span className="sub-count">{level.count}</span>
        <div className="arrow-circle"><ArrowIcon /></div>
      </div>
    </div>
  );

  return (
    <div className="drill-panel">
      <div className="levels-grid">{studentLevels.map(l => <Card key={l.id} level={l} />)}</div>
      <div className="sec-heading" style={{marginBottom:'12px'}}>Exams & Teacher Resources</div>
      <div className="levels-grid">{extraLevels.map(l => <Card key={l.id} level={l} />)}</div>
    </div>
  );
}

// ── Grades Panel ─────────────────────────────────────────
function GradesPanel({ levelId, onOpenGrade }) {
  const lv = LEVELS[levelId];
  return (
    <div className="drill-panel">
      <div className="panel-header">
        <div className={`lc-icon ${lv.color}`} style={{width:36,height:36,borderRadius:9,flexShrink:0}}>{lv.icon}</div>
        <h2>{lv.label}</h2>
        <span className="ph-badge">{lv.grades.length} grades</span>
      </div>
      <div className="grade-grid">
        {lv.grades.map(g => (
          <div key={g.id} className="grade-card" onClick={() => onOpenGrade(g)}>
            <div className="gc-num">{g.num || g.label.substring(0,4)}</div>
            <div className="gc-label">{g.label}</div>
            <div className="gc-age">{g.age}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Subjects Panel ───────────────────────────────────────
function SubjectsPanel({ grade, onOpenSubject }) {
  return (
    <div className="drill-panel">
      <div className="panel-header">
        <h2>{grade.label} Subjects</h2>
        <span className="ph-badge">{grade.subjects.length} subjects</span>
      </div>
      <div className="subject-grid">
        {grade.subjects.map(sub => (
          <div key={sub} className="subject-card" onClick={() => onOpenSubject(sub)}>
            <div className="sc-icon">{SUBJECT_ICONS[sub] || '📄'}</div>
            <div>
              <div className="sc-name">{sub}</div>
              <div className="sc-count">4 categories</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Categories Panel ─────────────────────────────────────
function CategoriesPanel({ levelId, grade, subject, onOpenCategory }) {
  const cats = levelId === 'teacher-resources' ? TEACHER_CATEGORIES : CATEGORIES;
  return (
    <div className="drill-panel">
      <div className="panel-header">
        <div style={{fontSize:22}}>{SUBJECT_ICONS[subject] || '📄'}</div>
        <h2>{subject}</h2>
        <span className="ph-badge">{grade.label} · {LEVELS[levelId].label}</span>
      </div>
      <div className="cat-grid">
        {cats.map(cat => {
          const docs = getDocuments(levelId, grade.id, subject, cat.name);
          return (
            <div key={cat.name} className="cat-card" onClick={() => onOpenCategory(cat.name)}>
              <div className="cat-icon">{cat.icon}</div>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-desc">{cat.desc}</div>
              <span className="cat-count">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                {docs.length} document{docs.length !== 1 ? 's' : ''}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Documents Panel ──────────────────────────────────────
function DocumentsPanel({ levelId, grade, subject, category, onOpenDoc }) {
  const [payingDoc, setPayingDoc] = useState(null);

  const cats = levelId === 'teacher-resources' ? TEACHER_CATEGORIES : CATEGORIES;
  const catObj = cats.find(c => c.name === category) || {};
  const docs = getDocuments(levelId, grade.id, subject, category);
  const free = docs.filter(d => d.free);
  const prem = docs.filter(d => !d.free);

  function handleDownload(paidDoc) {
    const url = `https://drive.google.com/uc?export=download&id=${paidDoc.id || paidDoc.driveLink}`;
    const fileName = paidDoc.title || paidDoc.name || 'document';
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const DocCard = ({ doc }) => (
    <div className="doc-card" onClick={() => onOpenDoc(doc)}>
      <div className={`doc-thumb ${doc.type}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <span>{doc.type.toUpperCase()}</span>
      </div>
      <div className="doc-info">
        <div className="doc-title">{doc.title}</div>
        <div className="doc-meta">
          <span className={`doc-badge badge-${doc.type}`}>{doc.type.toUpperCase()}</span>
          <span className="doc-meta-dot"></span>
          <span>{doc.size}</span>
          <span className="doc-meta-dot"></span>
          <span>{doc.date}</span>
          <span className="doc-meta-dot"></span>
          <span className={`doc-badge ${doc.free ? 'badge-free' : 'badge-prem'}`}>{doc.free ? 'Free' : '✦ Premium'}</span>
        </div>
      </div>
      <div className="doc-actions">
        <button
          className="doc-action-btn"
          title="Download"
          onClick={e => { e.stopPropagation(); setPayingDoc(doc); }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="drill-panel">
        <div className="panel-header">
          <div style={{fontSize:22}}>{catObj.icon || '📁'}</div>
          <h2>{category}</h2>
          <span className="ph-badge">{subject} · {grade.label}</span>
        </div>

        {docs.length === 0 ? (
          <div className="empty-state">
            <div className="es-icon">📂</div>
            <div className="es-title">No documents yet</div>
            <div className="es-desc">Documents for this category will appear here once uploaded.</div>
          </div>
        ) : (
          <>
            {free.length > 0 && (
              <><div className="doc-section-label">Free Documents</div>
              <div className="doc-list">{free.map((d,i) => <DocCard key={i} doc={d} />)}</div></>
            )}
            {prem.length > 0 && (
              <><div className="doc-section-label" style={{marginTop:20}}>✦ Premium Documents</div>
              <div className="doc-list">{prem.map((d,i) => <DocCard key={i} doc={d} />)}</div></>
            )}
          </>
        )}
      </div>

      {payingDoc && (
        <MpesaPaymentModal
          doc={payingDoc}
          onClose={() => setPayingDoc(null)}
          onDownload={(paidDoc) => { handleDownload(paidDoc); setPayingDoc(null); }}
        />
      )}
    </>
  );
}

// ── Main DrillDown ───────────────────────────────────────
export default function DrillDown({ initialLevel, onOpenDoc }) {
  const [state, setState] = useState({
    level: initialLevel || null,
    grade: null,
    subject: null,
    category: null,
  });

  const goHome      = () => setState({ level:null, grade:null, subject:null, category:null });
  const goToLevel   = () => setState(s => ({ ...s, grade:null, subject:null, category:null }));
  const goToGrade   = () => setState(s => ({ ...s, subject:null, category:null }));
  const goToSubject = () => setState(s => ({ ...s, category:null }));

  const openLevel    = id  => setState({ level:id, grade:null, subject:null, category:null });
  const openGrade    = g   => setState(s => ({ ...s, grade:g, subject:null, category:null }));
  const openSubject  = sub => setState(s => ({ ...s, subject:sub, category:null }));
  const openCategory = cat => setState(s => ({ ...s, category:cat }));

  // allow parent to trigger openLevel
  React.useEffect(() => { if (initialLevel) openLevel(initialLevel); }, [initialLevel]);

  const { level, grade, subject, category } = state;

  return (
    <>
      <div className="sec-heading fade-up-1" id="levels">Browse by CBE Level</div>

      <Breadcrumb state={state} goHome={goHome} goToLevel={goToLevel} goToGrade={goToGrade} goToSubject={goToSubject} />

      {!level && <LevelCards onOpenLevel={openLevel} />}
      {level && !grade && <GradesPanel levelId={level} onOpenGrade={openGrade} />}

      {/* Grade has driveId → use Drive-powered subject/category/file panels */}
      {level && grade && grade.driveId && (
        <DriveSubjectPanel
          key={grade.id}
          gradeFolderId={grade.driveId}
          gradeName={grade.label}
          onOpenDoc={onOpenDoc}
        />
      )}

      {/* No driveId → use static data flow */}
      {level && grade && !grade.driveId && !subject && <SubjectsPanel grade={grade} onOpenSubject={openSubject} />}
      {level && grade && !grade.driveId && subject && !category && <CategoriesPanel levelId={level} grade={grade} subject={subject} onOpenCategory={openCategory} />}
      {level && grade && !grade.driveId && subject && category && <DocumentsPanel levelId={level} grade={grade} subject={subject} category={category} onOpenDoc={onOpenDoc} />}
      </>
  );
}