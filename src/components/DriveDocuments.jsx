import React, { useState, useEffect } from 'react';
import { listSubFolders, listFiles, cleanName } from '../services/driveService';
import MpesaPaymentModal from './MpesaPaymentModal';

const CAT_ICONS = {
  'Notes & Summaries': 'bi-journal-text',
  'Past Papers':       'bi-file-earmark-ruled',
  'Marking Schemes':   'bi-check2-square',
  'Revision Sets':     'bi-collection',
  'Schemes of Work':   'bi-calendar3-week',
  'Lesson Plans':      'bi-file-earmark-text',
  'Activity Sheets':   'bi-pencil-square',
  'KICD Syllabus':     'bi-book',
};

const SUBJECT_ICONS = {
  'Mathematical Activities':          '🔢',
  'Language Activities':              '🗣️',
  'Environmental Activities':         '🌿',
  'Psychomotor & Creative Activities':'🤸',
  'Religious Education & Life Skills':'✝️',
  'Digital Literacy':                 '💻',
  'Literacy Activities':              '📝',
  'Kiswahili Language Activities':    '🗣️',
  'Creative Arts':                    '🎨',
  'Religious Education':              '✝️',
  'Science & Technology':             '🔬',
  'Social Studies':                   '🌍',
  'Business Studies':                 '💼',
  'Agriculture':                      '🌱',
  'Computer Science':                 '💻',
  'Physical Education':               '🏃',
  'Physical & Health Education':      '🏃',
  'Integrated Science':               '⚗️',
  'Foreign Language':                 '🌐',
  'Music':                            '🎵',
  'Art & Design':                     '🖌️',
  'History':                          '📜',
  'Geography':                        '🗺️',
  'Biology':                          '🧬',
  'Chemistry':                        '⚗️',
  'Physics':                          '🔭',
  'English':                          '📖',
  'Kiswahili':                        '🗣️',
  'Mathematics':                      '🔢',
};

// ── Loading spinner ───────────────────────────────────
function Spinner({ text = 'Loading…' }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:14, padding:'48px 0', color:'var(--tm)' }}>
      <div className="spinner"></div>
      <span style={{ fontSize:13 }}>{text}</span>
    </div>
  );
}

// ── Error box ─────────────────────────────────────────
function ErrorBox({ message }) {
  return (
    <div style={{ padding:16, background:'rgba(232,96,96,.08)', border:'1px solid rgba(232,96,96,.2)', borderRadius:10, color:'#E86060', fontSize:13 }}>
      <i className="bi bi-exclamation-triangle-fill"></i> {message}
      <div style={{ marginTop:6, fontSize:11, color:'var(--tm)' }}>
        Make sure the folder is shared as "Anyone with the link" on G drive server.
      </div>
    </div>
  );
}

// ── Row styles ────────────────────────────────────────
const RS = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    borderRadius: 14,
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,.06)',
  },

  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '14px 18px',
    background: 'rgba(255,255,255,.02)',
    borderBottom: '1px solid rgba(255,255,255,.05)',
    cursor: 'pointer',
    transition: 'background .18s',
    position: 'relative',
  },

  rowLast: {
    borderBottom: 'none',
  },

  // Accent left bar — color matches file type
  rowAccent: {
    position: 'absolute',
    left: 0, top: 0, bottom: 0,
    width: 3,
    borderRadius: '0 2px 2px 0',
  },

  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  nameWrap: {
    flex: 1,
    minWidth: 0,
  },

  name: {
    fontSize: 14,
    fontWeight: 600,
    color: '#EAE6DF',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    letterSpacing: '-0.1px',
    fontFamily: "'DM Sans', sans-serif",
  },

  sub: {
    fontSize: 11,
    color: '#4A6A88',
    marginTop: 2,
    fontFamily: "'DM Sans', sans-serif",
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },

  btnView: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '7px 13px',
    borderRadius: 8,
    background: 'rgba(109,168,245,.1)',
    border: '1px solid rgba(109,168,245,.2)',
    color: '#6DA8F5',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'background .15s',
    whiteSpace: 'nowrap',
  },

  btnDownload: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '7px 13px',
    borderRadius: 8,
    background: 'linear-gradient(135deg, rgba(212,168,67,.15), rgba(200,147,42,.1))',
    border: '1px solid rgba(212,168,67,.3)',
    color: '#D4A843',
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'background .15s',
    whiteSpace: 'nowrap',
  },

  crown: {
    fontSize: 11,
    lineHeight: 1,
  },

  // Mobile: hide button labels, show icons only
  btnLabel: {
    // controlled via inline media query workaround — visible on desktop
  },
};

// ── LEVEL 3: File listing inside a category folder ───
function DriveFileList({ folderId, onOpenDoc }) {
  const [files,      setFiles]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [payingDoc,  setPayingDoc]  = useState(null);
  const [hoveredId,  setHoveredId]  = useState(null);

  useEffect(() => {
    if (!folderId) return;
    setLoading(true); setError(null);
    listFiles(folderId)
      .then(f => { setFiles(f); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [folderId]);

  // Download is now handled internally by MpesaPaymentModal during the 'downloading' stage

  if (loading) return <Spinner text="Loading documents…" />;
  if (error)   return <ErrorBox message={error} />;
  if (files.length === 0) return (
    <div className="empty-state">
      <div className="es-icon">📂</div>
      <div className="es-title">No resources yet</div>
      <div className="es-desc">We're still adding resources for this category.</div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&display=swap');
        .doc-row-item:hover { background: rgba(109,168,245,.06) !important; }
        .doc-row-item:hover .doc-row-accent { opacity: 1 !important; }
        .btn-view-doc:hover  { background: rgba(109,168,245,.2) !important; }
        .btn-dl-doc:hover    { background: linear-gradient(135deg,rgba(212,168,67,.28),rgba(200,147,42,.2)) !important; }
        @media (max-width: 600px) {
          .doc-btn-label { display: none !important; }
          .btn-view-doc, .btn-dl-doc { padding: 8px !important; }
        }
      `}</style>

      <div style={RS.list}>
        {files.map((file, idx) => {
          const name = cleanName(file.name);
          const isLast = idx === files.length - 1;

          return (
            <div
              key={file.id}
              className="doc-row-item"
              style={{
                ...RS.row,
                ...(isLast ? RS.rowLast : {}),
              }}
              onClick={() => onOpenDoc(file)}
              onMouseEnter={() => setHoveredId(file.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Left accent bar */}
              <div
                className="doc-row-accent"
                style={{
                  ...RS.rowAccent,
                  background: '#D4A843',
                  opacity: hoveredId === file.id ? 1 : 0.35,
                  transition: 'opacity .18s',
                }}
              />

              {/* Universal document icon */}
              <div style={{
                ...RS.iconWrap,
                background: 'rgba(212,168,67,.08)',
                border: '1px solid rgba(212,168,67,.18)',
              }}>
                <i className="bi bi-file-earmark-text-fill" style={{ fontSize: 20, color: '#D4A843' }} />
              </div>

              {/* Document name */}
              <div style={RS.nameWrap}>
                <div style={RS.name}>{name}</div>
                <div style={RS.sub}>
                  <i className="bi bi-lock-fill" style={{ fontSize: 9, marginRight: 4, color: '#D4A843' }} />
                  Premium resource · Tap to preview
                </div>
              </div>

              {/* Actions */}
              <div style={RS.actions} onClick={e => e.stopPropagation()}>
                {/* View / Read button */}
                <button
                  className="btn-view-doc"
                  style={RS.btnView}
                  title="Read document"
                  onClick={e => { e.stopPropagation(); onOpenDoc(file); }}
                >
                  <i className="bi bi-eye-fill" style={{ fontSize: 12 }} />
                  <span className="doc-btn-label">Read</span>
                </button>

                {/* Download (paid) button */}
                <button
                  className="btn-dl-doc"
                  style={RS.btnDownload}
                  title="Download — Premium"
                  onClick={e => { e.stopPropagation(); setPayingDoc(file); }}
                >
                  <span style={RS.crown}>♛</span>
                  <i className="bi bi-download" style={{ fontSize: 12 }} />
                  <span className="doc-btn-label">Save</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {payingDoc && (
        <MpesaPaymentModal
          doc={payingDoc}
          onClose={() => setPayingDoc(null)}
        />
      )}
    </>
  );
}

// ── LEVEL 2: Category cards (same look as static) ────
export function DriveCategoryPanel({ subjectFolderId, subjectName, gradeName, onBack, onOpenDoc }) {
  const [categories, setCategories] = useState([]);
  const [selected,   setSelected]   = useState(null); // { id, name }
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  useEffect(() => {
    if (!subjectFolderId) return;
    setLoading(true); setError(null); setSelected(null);
    listSubFolders(subjectFolderId)
      .then(folders => { setCategories(folders); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [subjectFolderId]);

  if (selected) {
    return (
      <div className="drill-panel">
        <div className="panel-header">
          <div style={{ fontSize:22 }}>{CAT_ICONS[selected.name] ? <i className={`bi ${CAT_ICONS[selected.name]}`}></i> : '📁'}</div>
          <h2>{selected.name}</h2>
          <span className="ph-badge">{subjectName} · {gradeName}</span>
          <button className="bc-link" style={{ marginLeft:'auto' }} onClick={() => setSelected(null)}>
            ← Back
          </button>
        </div>
        <DriveFileList folderId={selected.id} onOpenDoc={onOpenDoc} />
      </div>
    );
  }

  if (loading) return <Spinner text="Loading categories…" />;
  if (error)   return <ErrorBox message={error} />;
  if (categories.length === 0) return (
    <div className="empty-state">
      <div className="es-icon">📁</div>
      <div className="es-title">No categories found</div>
      <div className="es-desc">We're working on creating content for this subject.</div>
    </div>
  );

  return (
    <div className="drill-panel">
      <div className="panel-header">
        <div style={{ fontSize:22 }}>{SUBJECT_ICONS[subjectName] || '📄'}</div>
        <h2>{subjectName}</h2>
        <span className="ph-badge">{gradeName}</span>
      </div>
      <div className="cat-grid">
        {categories.map(cat => (
          <div key={cat.id} className="cat-card" onClick={() => setSelected(cat)}>
            <div className="cat-icon">
              {CAT_ICONS[cat.name]
                ? <i className={`bi ${CAT_ICONS[cat.name]}`} style={{ fontSize:34 }}></i>
                : '📁'}
            </div>
            <div className="cat-name">{cat.name}</div>
            <div className="cat-desc" style={{ fontSize:12, color:'var(--tm)', marginBottom:10 }}>
              Click to browse documents in this category.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── LEVEL 1: Subject cards (same look as static) ─────
export function DriveSubjectPanel({ gradeFolderId, gradeName, onBack, onOpenDoc }) {
  const [subjects, setSubjects] = useState([]);
  const [selected, setSelected] = useState(null); // { id, name }
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    if (!gradeFolderId) return;
    setLoading(true); setError(null); setSelected(null);
    listSubFolders(gradeFolderId)
      .then(folders => { setSubjects(folders); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [gradeFolderId]);

  if (selected) {
    return (
      <DriveCategoryPanel
        subjectFolderId={selected.id}
        subjectName={selected.name}
        gradeName={gradeName}
        onBack={() => setSelected(null)}
        onOpenDoc={onOpenDoc}
      />
    );
  }

  if (loading) return <Spinner text="Loading subjects …" />;
  if (error)   return <ErrorBox message={error} />;
  if (subjects.length === 0) return (
    <div className="empty-state">
      <div className="es-icon">📁</div>
      <div className="es-title">No subjects found</div>
      <div className="es-desc">We're working on creating materials for {gradeName}. Thank you for your patience.</div>
    </div>
  );

  return (
    <div className="drill-panel">
      <div className="panel-header">
        <h2>{gradeName} Subjects</h2>
        <span className="ph-badge">{subjects.length} subjects</span>
      </div>
      <div className="subject-grid">
        {subjects.map(sub => (
          <div key={sub.id} className="subject-card" onClick={() => setSelected(sub)}>
            <div className="sc-icon">{SUBJECT_ICONS[sub.name] || '📄'}</div>
            <div>
              <div className="sc-name">{sub.name}</div>
              <div className="sc-count">browse categories</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Default export (kept for backward compat) ─────────
export default DriveSubjectPanel;