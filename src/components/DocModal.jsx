import React, { useState, useEffect } from 'react';
import { previewUrl, downloadUrl, getFileType, cleanName } from '../services/driveService';

const TYPE_ICON = {
  pdf:  { icon:'bi-file-earmark-pdf-fill',  color:'#E86060', label:'PDF'  },
  docx: { icon:'bi-file-earmark-word-fill', color:'#6DA8F5', label:'WORD' },
  html: { icon:'bi-file-earmark-code-fill', color:'#3DBF8A', label:'HTML' },
  pptx: { icon:'bi-file-earmark-ppt-fill',  color:'#D4A843', label:'PPT'  },
  xlsx: { icon:'bi-file-earmark-excel-fill',color:'#A882DD', label:'XLS'  },
  file: { icon:'bi-file-earmark-fill',      color:'#A8B8C8', label:'FILE' },
};

const S = {
  overlay: {
    position:'fixed', inset:0, zIndex:999,
    background:'rgba(8,14,22,.95)',
    backdropFilter:'blur(12px)',
    display:'flex', alignItems:'center', justifyContent:'center',
  },
  box: {
    position:'absolute', inset:16,
    background:'#0F1C2E',
    border:'1px solid #263D5A',
    borderRadius:16,
    display:'flex', flexDirection:'column',
    overflow:'hidden',
    boxShadow:'0 32px 80px rgba(0,0,0,.7)',
  },
  header: {
    display:'flex', alignItems:'center', justifyContent:'space-between',
    padding:'12px 18px',
    borderBottom:'1px solid #263D5A',
    background:'#162438',
    flexShrink:0, gap:16,
  },
  headerLeft: { display:'flex', alignItems:'center', gap:12, minWidth:0 },
  titleText: {
    fontFamily:"'DM Serif Display',serif",
    fontSize:15, color:'#F7F3ED',
    whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
  },
  meta: { fontSize:11, color:'#6A82A0', marginTop:2 },
  headerActions: { display:'flex', alignItems:'center', gap:8, flexShrink:0 },
  btnGold: {
    display:'inline-flex', alignItems:'center', gap:6,
    background:'linear-gradient(135deg,#D4A843,#C8932A)',
    color:'#0F1C2E', fontFamily:"'DM Sans',sans-serif",
    fontSize:12, fontWeight:700,
    padding:'7px 14px', borderRadius:8, textDecoration:'none',
  },
  btnBlue: {
    display:'inline-flex', alignItems:'center', gap:6,
    background:'rgba(109,168,245,.12)', color:'#6DA8F5',
    border:'1px solid rgba(109,168,245,.2)',
    fontFamily:"'DM Sans',sans-serif",
    fontSize:12, fontWeight:600,
    padding:'7px 14px', borderRadius:8, textDecoration:'none',
  },
  closeBtn: {
    width:34, height:34, borderRadius:8,
    background:'#1E3250', border:'1px solid #263D5A',
    color:'#A8B8C8', display:'flex', alignItems:'center',
    justifyContent:'center', cursor:'pointer', fontSize:18, lineHeight:1,
  },
  viewer: {
    flex:1, minHeight:0,
    position:'relative', background:'#0a1220',
    display:'flex', flexDirection:'column',
    overflow:'hidden',
  },
  loading: {
    position:'absolute', inset:0,
    display:'flex', flexDirection:'column',
    alignItems:'center', justifyContent:'center',
    gap:14, color:'#6A82A0', fontSize:13,
    zIndex:5,
  },
  fallback: {
    flex:1,
    display:'flex', flexDirection:'column',
    alignItems:'center', justifyContent:'center',
    gap:20, padding:40, textAlign:'center',
  },
  fallbackTitle: { fontFamily:"'DM Serif Display',serif", fontSize:22, color:'#F7F3ED' },
  fallbackDesc:  { fontSize:13, color:'#6A82A0', maxWidth:340, lineHeight:1.65 },
  fallbackActions: { display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center' },
  btnGoldLg: {
    display:'inline-flex', alignItems:'center', gap:7,
    background:'linear-gradient(135deg,#D4A843,#C8932A)',
    color:'#0F1C2E', fontFamily:"'DM Sans',sans-serif",
    fontWeight:700, fontSize:13,
    padding:'11px 22px', borderRadius:10, textDecoration:'none',
  },
  btnOutlineLg: {
    display:'inline-flex', alignItems:'center', gap:7,
    background:'transparent', color:'#A8B8C8',
    border:'1.5px solid #263D5A',
    fontFamily:"'DM Sans',sans-serif",
    fontWeight:500, fontSize:13,
    padding:'11px 22px', borderRadius:10, textDecoration:'none',
  },
};

function PaywallOverlay({ onUnlock }) {
  const [unlocking, setUnlocking] = useState(false);

  function handleUnlock() {
    setUnlocking(true);
    setTimeout(function() {
      sessionStorage.setItem('mrc-premium', '1');
      onUnlock();
      setUnlocking(false);
    }, 1800);
  }

  return (
    <div style={{
      flex:1,
      background:'rgba(8,14,22,.98)',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      padding:'32px 20px',
      position:'relative',
      overflow:'hidden',
    }}>
      {/* Decorative top gradient suggesting content beneath */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:80,
        background:'linear-gradient(to bottom, rgba(8,14,22,0) 0%, rgba(8,14,22,.98) 100%)',
        pointerEvents:'none',
      }}/>

      {/* Blurred fake content lines to suggest there's more */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:70,
        filter:'blur(6px)',
        opacity:0.25,
        background:'repeating-linear-gradient(transparent, transparent 10px, rgba(168,184,200,.15) 10px, rgba(168,184,200,.15) 12px)',
      }}/>

      {/* Subscription card */}
      <div style={{
        position:'relative', zIndex:2,
        background:'linear-gradient(135deg,#162438 0%,#1a2d45 100%)',
        border:'1px solid rgba(212,168,67,.3)',
        borderRadius:18,
        padding:'28px 32px',
        maxWidth:400, width:'100%',
        textAlign:'center',
        boxShadow:'0 20px 60px rgba(0,0,0,.6), 0 0 0 1px rgba(212,168,67,.08)',
      }}>
        <div style={{
          width:56, height:56,
          background:'rgba(212,168,67,.12)',
          border:'1px solid rgba(212,168,67,.25)',
          borderRadius:14,
          display:'flex', alignItems:'center', justifyContent:'center',
          margin:'0 auto 16px', fontSize:26,
        }}>
          <i className="bi bi-crown-fill" style={{ color:'#D4A843' }}></i>
        </div>

        <div style={{
          fontFamily:"'DM Serif Display',serif",
          fontSize:20, color:'#F7F3ED', marginBottom:8,
        }}>
          Unlock Full Document
        </div>
        <div style={{ fontSize:13, color:'#6A82A0', lineHeight:1.7, marginBottom:20 }}>
          You are viewing a <strong style={{color:'#A8B8C8'}}>preview</strong> of this document.
          Subscribe to <strong style={{color:'#D4A843'}}>Mulligan Premium</strong> to access
          the full content, all past papers and marking schemes.
        </div>

        <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', marginBottom:22 }}>
          {['Unlimited Access','All Past Papers','Marking Schemes','Revision Sets'].map(function(f) {
            return (
              <span key={f} style={{
                display:'inline-flex', alignItems:'center', gap:5,
                background:'rgba(212,168,67,.08)',
                border:'1px solid rgba(212,168,67,.15)',
                borderRadius:20, padding:'4px 12px',
                fontSize:11, color:'#A8B8C8',
              }}>
                <i className="bi bi-check-circle-fill" style={{ color:'#3DBF8A', fontSize:11 }}></i>
                {f}
              </span>
            );
          })}
        </div>

        <button
          onClick={handleUnlock}
          disabled={unlocking}
          style={{
            width:'100%',
            background: unlocking ? 'rgba(212,168,67,.3)' : 'linear-gradient(135deg,#D4A843,#C8932A)',
            color:'#0F1C2E',
            fontFamily:"'DM Sans',sans-serif",
            fontWeight:700, fontSize:14,
            padding:'13px',
            borderRadius:12, border:'none',
            cursor: unlocking ? 'not-allowed' : 'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            boxShadow:'0 4px 20px rgba(212,168,67,.3)',
            transition:'opacity .2s',
          }}
        >
          {unlocking ? (
            <React.Fragment>
              <div style={{
                width:16, height:16,
                border:'2px solid rgba(15,28,46,.3)',
                borderTopColor:'#0F1C2E',
                borderRadius:'50%',
                animation:'spin .7s linear infinite',
              }}/>
              Unlocking...
            </React.Fragment>
          ) : (
            <React.Fragment>
              <i className="bi bi-unlock-fill"></i>
              Unlock Full Document
            </React.Fragment>
          )}
        </button>

        <div style={{ fontSize:11, color:'#6A82A0', marginTop:12 }}>
          Already subscribed?{' '}
          <span onClick={handleUnlock} style={{ color:'#D4A843', cursor:'pointer', textDecoration:'underline' }}>
            Sign in to access
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DocModal({ doc, onClose }) {
  const [loading,  setLoading]  = useState(true);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(function() {
    if (doc) {
      setLoading(true);
      var alreadyPremium = sessionStorage.getItem('mrc-premium') === '1';
      setUnlocked(alreadyPremium);
    }
    var onKey = function(e) { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return function() { window.removeEventListener('keydown', onKey); };
  }, [doc, onClose]);

  if (!doc) return null;

  var type       = doc.type || getFileType(doc);
  var name       = doc.title || cleanName(doc.name || '');
  var driveId    = doc.id || null;
  var link       = doc.driveLink || null;
  var canPreview = type === 'pdf' || type === 'docx';
  var tc         = TYPE_ICON[type] || TYPE_ICON.file;
  var isFree     = doc.free === true;
  var showPaywall = !isFree && !unlocked;

  var fileIdFromLink = link ? (link.match(/\/d\/([^/]+)/) || [])[1] : null;
  var embedUrl = driveId
    ? previewUrl(driveId)
    : (fileIdFromLink ? 'https://drive.google.com/file/d/' + fileIdFromLink + '/preview' : '');
  var dlUrl    = driveId ? downloadUrl(driveId) : link;
  var driveUrl = driveId ? 'https://drive.google.com/file/d/' + driveId + '/view' : link;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div style={S.overlay} onClick={handleOverlayClick}>
      <div style={S.box}>

        {/* Header */}
        <div style={S.header}>
          <div style={S.headerLeft}>
            <i className={'bi ' + tc.icon} style={{ fontSize:22, color:tc.color, flexShrink:0 }}></i>
            <div style={{ minWidth:0 }}>
              <div style={S.titleText}>{name}</div>
              <div style={S.meta}>
                <span style={{ color:tc.color, fontWeight:700 }}>{tc.label}</span>
                {doc.size ? <span> · {doc.size}</span> : null}
                {doc.date ? <span> · Added {doc.date}</span> : null}
                {doc.free !== undefined && (
                  <span> · {isFree
                    ? <span style={{color:'#3DBF8A',fontWeight:700}}>Free</span>
                    : <span style={{color:'#D4A843',fontWeight:700}}>Premium</span>}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div style={S.headerActions}>
            {(isFree || unlocked) && (
              <a href={dlUrl} download style={S.btnGold}>
                <i className="bi bi-download"></i> Download
              </a>
            )}
            <a href={driveUrl} target="_blank" rel="noreferrer" style={S.btnBlue}>
              <i className="bi bi-box-arrow-up-right"></i> Drive
            </a>
            <button onClick={onClose} style={S.closeBtn}>
              <span>&#x2715;</span>
            </button>
          </div>
        </div>

        {/* Viewer */}
        <div style={S.viewer}>
          {canPreview ? (
            <React.Fragment>

              {/* Loading spinner */}
              {loading ? (
                <div style={S.loading}>
                  <div className="spinner"></div>
                  <span>Loading document...</span>
                </div>
              ) : null}

              {/* 
                When paywall is active: iframe is fixed to ~45% height (shows ~1 page)
                When unlocked: iframe fills 100% of viewer 
              */}
              <div style={{
                position:'relative',
                height: showPaywall ? '42%' : '100%',
                flexShrink:0,
                overflow:'hidden',
                transition:'height .4s ease',
              }}>
                <iframe
                  src={embedUrl}
                  title={name}
                  style={{
                    width:'100%',
                    height: showPaywall ? '230%' : '100%',
                    border:'none',
                    display: loading ? 'none' : 'block',
                    pointerEvents: showPaywall ? 'none' : 'auto',
                  }}
                  onLoad={function() { setLoading(false); }}
                />
              </div>

              {/* Paywall section beneath the preview */}
              {!loading && showPaywall && (
                <PaywallOverlay onUnlock={function() { setUnlocked(true); }} />
              )}

            </React.Fragment>
          ) : (
            <div style={S.fallback}>
              <i className={'bi ' + tc.icon} style={{ fontSize:64, color:tc.color }}></i>
              <div style={S.fallbackTitle}>{tc.label} Document</div>
              <div style={S.fallbackDesc}>
                This file type cannot be previewed in the browser.
                Use the buttons above to open or download it.
              </div>
              <div style={S.fallbackActions}>
                <a href={driveUrl} target="_blank" rel="noreferrer" style={S.btnGoldLg}>
                  <i className="bi bi-box-arrow-up-right"></i> Open in Google Drive
                </a>
                <a href={dlUrl} download style={S.btnOutlineLg}>
                  <i className="bi bi-download"></i> Download
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
