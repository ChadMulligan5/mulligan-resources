import React, { useState, useEffect } from 'react';
import { getFileType, cleanName } from '../services/driveService';
import MpesaPaymentModal from './MpesaPaymentModal';

const TYPE_ICON = {
  pdf:  { icon:'bi-file-earmark-pdf-fill',  color:'#E86060', label:'PDF'  },
  docx: { icon:'bi-file-earmark-word-fill', color:'#6DA8F5', label:'WORD' },
  html: { icon:'bi-file-earmark-code-fill', color:'#3DBF8A', label:'HTML' },
  pptx: { icon:'bi-file-earmark-ppt-fill',  color:'#D4A843', label:'PPT'  },
  xlsx: { icon:'bi-file-earmark-excel-fill',color:'#A882DD', label:'XLS'  },
  file: { icon:'bi-file-earmark-fill',      color:'#A8B8C8', label:'FILE' },
};

const DOC_SCALE = 2;
const TOOLBAR_BLOCK_HEIGHT = Math.ceil(60 * DOC_SCALE);

const S = {
  overlay: {
    position:'fixed',
    inset:0,
    zIndex:999,
    background:'rgba(7,12,20,.88)',
    backdropFilter:'blur(14px)',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },

  box: {
    position:'absolute',
    inset:8,
    background:'#10233B',
    border:'1px solid rgba(212,168,67,.18)',
    borderRadius:18,
    display:'flex',
    flexDirection:'column',
    overflow:'hidden',
    boxShadow:'0 32px 90px rgba(0,0,0,.75)',
  },

  header: {
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    padding:'14px 20px',
    borderBottom:'1px solid rgba(212,168,67,.15)',
    background:'linear-gradient(135deg,#162B46,#0F1C2E)',
    flexShrink:0,
    gap:16,
  },

  headerLeft: {
    display:'flex',
    alignItems:'center',
    gap:12,
    minWidth:0,
  },

  titleText: {
    fontFamily:"'DM Serif Display',serif",
    fontSize:16,
    color:'#F7F3ED',
    whiteSpace:'nowrap',
    overflow:'hidden',
    textOverflow:'ellipsis',
  },

  meta: {
    fontSize:11,
    color:'#8FA4BF',
    marginTop:2,
  },

  headerActions: {
    display:'flex',
    alignItems:'center',
    gap:8,
    flexShrink:0,
  },

  btnGold: {
    display:'inline-flex',
    alignItems:'center',
    gap:6,
    background:'linear-gradient(135deg,#D4A843,#C8932A)',
    color:'#0F1C2E',
    fontSize:12,
    fontWeight:700,
    padding:'8px 15px',
    borderRadius:8,
    textDecoration:'none',
    cursor:'pointer',
    border:'none',
  },

  closeBtn: {
    width:36,
    height:36,
    borderRadius:8,
    background:'rgba(255,255,255,.05)',
    border:'1px solid rgba(255,255,255,.08)',
    color:'#F7F3ED',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    cursor:'pointer',
    fontSize:18,
    outline:'none',
  },

  viewer: {
    flex:1,
    position:'relative',
    background:'#10233B',
    overflow:'hidden',
  },

  loading: {
    position:'absolute',
    inset:0,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    gap:12,
    color:'#D4A843',
    background:'#10233B',
    zIndex:3,
  },

  iframeWrapper: {
    position:'absolute',
    inset:0,
    overflow:'hidden',
  },

  toolbarBlocker: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    height: TOOLBAR_BLOCK_HEIGHT,
    zIndex:2,
    background:'transparent',
    cursor:'default',
  },

  fallback: {
    position:'absolute',
    inset:0,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    gap:20,
    padding:40,
    textAlign:'center',
    background:'linear-gradient(180deg,#132238,#0F1C2E)',
  },

  fallbackTitle: {
    fontSize:24,
    color:'#F7F3ED',
  },

  fallbackDesc: {
    fontSize:13,
    color:'#A8B8C8',
    maxWidth:360,
    lineHeight:1.7,
  },

  btnOutlineLg: {
    display:'inline-flex',
    alignItems:'center',
    gap:7,
    background:'transparent',
    color:'#D4A843',
    border:'1.5px solid rgba(212,168,67,.35)',
    fontWeight:600,
    fontSize:13,
    padding:'11px 22px',
    borderRadius:10,
    textDecoration:'none',
    cursor:'pointer',
  },
};

export default function DocModal({ doc, onClose }) {
  const [loading, setLoading]       = useState(true);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (doc) setLoading(true);

    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [doc, onClose]);

  if (!doc) return null;

  const type   = doc.type  || getFileType(doc);
  const name   = doc.title || cleanName(doc.name || '');
  const fileId = doc.id    || null;

  const tc = TYPE_ICON[type] || TYPE_ICON.file;
  const canPreview = type === 'pdf' || type === 'docx';

  const embedUrl = fileId
    ? `https://drive.google.com/file/d/${fileId}/preview`
    : '';

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  // Called by MpesaPaymentModal after confirmed payment
  function handleDownload(paidDoc) {
    // TODO: replace URL with your actual signed/gated download URL
    const url = `https://drive.google.com/uc?export=download&id=${paidDoc.id}`;
    const fileName = paidDoc.title || paidDoc.name || 'document';

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const iframeStyle = {
    width: `${(1 / DOC_SCALE) * 100}%`,
    height: `${(1 / DOC_SCALE) * 100}%`,
    transform: `scale(${DOC_SCALE})`,
    transformOrigin: 'top left',
    border: 'none',
    display: 'block',
    background: '#10233B',
  };

  return (
    <>
      <div style={S.overlay} onClick={handleOverlayClick}>
        <div style={S.box}>

          {/* ── Header ── */}
          <div style={S.header}>
            <div style={S.headerLeft}>
              <i
                className={`bi ${tc.icon}`}
                style={{ fontSize:22, color:tc.color, flexShrink:0 }}
              />
              <div style={{ minWidth:0 }}>
                <div style={S.titleText}>{name}</div>
                <div style={S.meta}>
                  <span style={{ color:tc.color, fontWeight:700 }}>{tc.label}</span>
                  {doc.size && <span> · {doc.size}</span>}
                  {doc.date && <span> · Added {doc.date}</span>}
                </div>
              </div>
            </div>

            <div style={S.headerActions}>
              <button style={S.btnGold} onClick={() => setShowPayment(true)}>
                <i className="bi bi-download" />
                Download
              </button>

              <button onClick={onClose} style={S.closeBtn}>✕</button>
            </div>
          </div>

          {/* ── Viewer ── */}
          <div style={S.viewer}>
            {canPreview && embedUrl ? (
              <>
                {loading && (
                  <div style={S.loading}>
                    <div className="spinner" />
                    <span>Loading document…</span>
                  </div>
                )}

                <div style={S.iframeWrapper}>
                  <div style={S.toolbarBlocker} />
                  <iframe
                    key={embedUrl}
                    src={embedUrl}
                    title={name}
                    style={iframeStyle}
                    onLoad={() => setLoading(false)}
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                </div>
              </>
            ) : (
              <div style={S.fallback}>
                <i
                  className={`bi ${tc.icon}`}
                  style={{ fontSize:64, color:tc.color }}
                />
                <div style={S.fallbackTitle}>{tc.label} Document</div>
                <div style={S.fallbackDesc}>
                  This file cannot be previewed in-browser.
                  Purchase to download and view it.
                </div>

                <button style={S.btnOutlineLg} onClick={() => setShowPayment(true)}>
                  <i className="bi bi-download" />
                  Download
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* M-Pesa payment modal — mounts on top of DocModal */}
      {showPayment && (
        <MpesaPaymentModal
          doc={doc}
          onClose={() => setShowPayment(false)}
          onDownload={handleDownload}
        />
      )}
    </>
  );
}