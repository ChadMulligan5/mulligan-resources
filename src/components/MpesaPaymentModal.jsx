import React, { useState, useEffect, useRef } from 'react';

// ─── Stages ───────────────────────────────────────────────────────────────────
// 'prompt'     → show price + phone input
// 'processing' → simulating STK push sent, waiting
// 'success'    → payment confirmed, enable download

const PRICE = 50; // KES — change per document if needed

const S = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 1100,
    background: 'rgba(4,10,18,.92)',
    backdropFilter: 'blur(18px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  card: {
    width: '100%',
    maxWidth: 400,
    background: 'linear-gradient(160deg,#0E2038 0%,#091525 100%)',
    border: '1px solid rgba(255,255,255,.07)',
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 40px 100px rgba(0,0,0,.7), 0 0 0 1px rgba(212,168,67,.08)',
    fontFamily: "'DM Sans', sans-serif",
  },

  // Green M-Pesa branded header strip
  topBar: {
    background: 'linear-gradient(135deg,#00A651,#007A3D)',
    padding: '20px 24px 18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  mpesaLabel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },

  mpesaTag: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 3,
    color: 'rgba(255,255,255,.65)',
    textTransform: 'uppercase',
  },

  mpesaTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: '#fff',
    letterSpacing: -0.5,
  },

  mpesaLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: 'rgba(255,255,255,.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
  },

  body: {
    padding: '24px 24px 28px',
  },

  docRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: 'rgba(255,255,255,.04)',
    border: '1px solid rgba(255,255,255,.07)',
    borderRadius: 12,
    padding: '12px 14px',
    marginBottom: 22,
  },

  docIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: 'rgba(232,96,96,.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: '#E86060',
    flexShrink: 0,
  },

  docName: {
    fontSize: 13,
    fontWeight: 600,
    color: '#F0EBE3',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  docSub: {
    fontSize: 11,
    color: '#6A8099',
    marginTop: 2,
  },

  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 22,
  },

  currency: {
    fontSize: 16,
    fontWeight: 700,
    color: '#00A651',
    letterSpacing: 1,
  },

  amount: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 52,
    fontWeight: 400,
    color: '#F7F3ED',
    lineHeight: 1,
    letterSpacing: -2,
  },

  amountSub: {
    fontSize: 12,
    color: '#6A8099',
    textAlign: 'center',
    marginTop: -10,
    marginBottom: 24,
  },

  label: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1.5,
    color: '#6A8099',
    textTransform: 'uppercase',
    marginBottom: 8,
  },

  phoneWrap: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255,255,255,.05)',
    border: '1.5px solid rgba(255,255,255,.1)',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
    transition: 'border-color .2s',
  },

  phoneWrapFocus: {
    borderColor: '#00A651',
  },

  phonePrefix: {
    padding: '0 14px',
    fontSize: 14,
    fontWeight: 700,
    color: '#00A651',
    borderRight: '1px solid rgba(255,255,255,.08)',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    background: 'rgba(0,166,81,.07)',
  },

  phoneInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#F7F3ED',
    fontSize: 16,
    fontWeight: 600,
    padding: '0 14px',
    height: 50,
    letterSpacing: 1,
    fontFamily: 'inherit',
  },

  phoneHint: {
    fontSize: 11,
    color: '#4A6070',
    marginBottom: 24,
  },

  btnPay: {
    width: '100%',
    height: 52,
    background: 'linear-gradient(135deg,#00A651,#007A3D)',
    border: 'none',
    borderRadius: 12,
    color: '#fff',
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: 0.3,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    transition: 'opacity .2s, transform .1s',
  },

  btnPayDisabled: {
    opacity: 0.45,
    cursor: 'not-allowed',
  },

  divider: {
    height: 1,
    background: 'rgba(255,255,255,.06)',
    margin: '20px 0',
  },

  secureRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    fontSize: 11,
    color: '#4A6070',
  },

  // ── Processing stage ──────────────────────────────────────────────────────
  processingWrap: {
    padding: '36px 24px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    textAlign: 'center',
  },

  phoneRing: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    background: 'rgba(0,166,81,.1)',
    border: '2px solid rgba(0,166,81,.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 34,
    animation: 'mpesaPulse 1.4s ease-in-out infinite',
  },

  processingTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#F7F3ED',
  },

  processingDesc: {
    fontSize: 13,
    color: '#6A8099',
    lineHeight: 1.7,
    maxWidth: 280,
  },

  phoneDisplay: {
    fontSize: 15,
    fontWeight: 700,
    color: '#00A651',
    background: 'rgba(0,166,81,.08)',
    border: '1px solid rgba(0,166,81,.2)',
    borderRadius: 8,
    padding: '8px 18px',
    letterSpacing: 1.5,
  },

  dots: {
    display: 'flex',
    gap: 6,
    marginTop: 8,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#00A651',
  },

  // ── Success stage ─────────────────────────────────────────────────────────
  successWrap: {
    padding: '36px 24px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 14,
    textAlign: 'center',
  },

  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#00A651,#007A3D)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 36,
    boxShadow: '0 8px 32px rgba(0,166,81,.4)',
    animation: 'mpesaPop .4s cubic-bezier(.34,1.56,.64,1)',
  },

  successTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: '#F7F3ED',
    letterSpacing: -0.3,
  },

  successDesc: {
    fontSize: 13,
    color: '#6A8099',
    lineHeight: 1.7,
    maxWidth: 280,
  },

  receiptBox: {
    width: '100%',
    background: 'rgba(0,166,81,.06)',
    border: '1px solid rgba(0,166,81,.15)',
    borderRadius: 12,
    padding: '14px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },

  receiptRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 12,
  },

  receiptKey: {
    color: '#4A6070',
  },

  receiptVal: {
    color: '#C8D8E8',
    fontWeight: 600,
  },

  btnDownload: {
    width: '100%',
    height: 52,
    background: 'linear-gradient(135deg,#D4A843,#C8932A)',
    border: 'none',
    borderRadius: 12,
    color: '#0F1C2E',
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: 0.3,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    marginTop: 4,
    transition: 'opacity .2s',
  },

  btnClose: {
    background: 'none',
    border: 'none',
    color: '#4A6070',
    fontSize: 12,
    cursor: 'pointer',
    fontFamily: 'inherit',
    marginTop: 2,
    textDecoration: 'underline',
  },
};

// Fake receipt code generator
function fakeCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default function MpesaPaymentModal({ doc, onClose }) {
  const [stage, setStage]       = useState('prompt');    // 'prompt' | 'processing' | 'success' | 'downloading'
  const [phone, setPhone]       = useState('');
  const [focused, setFocused]   = useState(false);
  const [receipt, setReceipt]   = useState(null);
  const [dotIdx, setDotIdx]     = useState(0); // eslint-disable-line no-unused-vars
  const [progress, setProgress] = useState(0); // 0–100
  const inputRef                = useRef(null);

  // Animate the waiting dots
  useEffect(() => {
    if (stage !== 'processing') return;
    const id = setInterval(() => setDotIdx(i => (i + 1) % 3), 500);
    return () => clearInterval(id);
  }, [stage]);

  // Animate circular progress, trigger download, then auto-close
  useEffect(() => {
    if (stage !== 'downloading') return;
    setProgress(0);

    // Trigger the actual file download silently in the background
    const url = `https://drive.google.com/uc?export=download&id=${doc.id}`;
    const fileName = doc.title || doc.name || 'document';
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Animate progress over ~2.5s then dismiss
    let current = 0;
    const id = setInterval(() => {
      current += Math.random() * 18 + 6;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(id);
        setTimeout(() => onClose(), 600);
      } else {
        setProgress(Math.min(current, 100));
      }
    }, 120);

    return () => clearInterval(id);
  }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  // Simulate STK push + payment confirmation
  function handlePay() {
    if (!isValidPhone) return;
    setStage('processing');

    // TODO: replace timeout with real M-Pesa STK push API call
    setTimeout(() => {
      setReceipt({
        code: fakeCode(),
        amount: `KES ${PRICE}.00`,
        phone: `+254${phone}`,
        date: new Date().toLocaleString('en-KE', {
          day: '2-digit', month: 'short', year: 'numeric',
          hour: '2-digit', minute: '2-digit',
        }),
      });
      setStage('success');
    }, 4000);
  }

  function handlePhoneChange(e) {
    // Strip non-digits, max 9 digits (after 254 prefix)
    const val = e.target.value.replace(/\D/g, '').slice(0, 9);
    setPhone(val);
  }

  const isValidPhone = (phone.length === 9 && phone.startsWith('7')) || phone.startsWith('1');

  const docName = doc?.title || doc?.name || 'Document';
  const docType = (doc?.type || 'file').toUpperCase();

  return (
    <>
      {/* Keyframe styles injected once */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&family=DM+Serif+Display&display=swap');
        @keyframes mpesaPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(0,166,81,.35); }
          50%      { box-shadow: 0 0 0 18px rgba(0,166,81,0); }
        }
        @keyframes mpesaPop {
          from { transform: scale(.4); opacity: 0; }
          to   { transform: scale(1);  opacity: 1; }
        }
        @keyframes dotBounce {
          0%,80%,100% { transform: translateY(0); opacity:.3; }
          40%          { transform: translateY(-6px); opacity:1; }
        }
        .mpesa-dot-0 { animation: dotBounce 1s ease-in-out infinite 0s; }
        .mpesa-dot-1 { animation: dotBounce 1s ease-in-out infinite .2s; }
        .mpesa-dot-2 { animation: dotBounce 1s ease-in-out infinite .4s; }
      `}</style>

      <div style={S.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div style={S.card}>

          {/* ── M-Pesa header ── */}
          <div style={S.topBar}>
            <div style={S.mpesaLabel}>
              <span style={S.mpesaTag}>Secure Payment via</span>
              <span style={S.mpesaTitle}>M-PESA</span>
            </div>
            <div style={S.mpesaLogo}>📱</div>
          </div>

          {/* ══════════════ PROMPT STAGE ══════════════ */}
          {stage === 'prompt' && (
            <div style={S.body}>

              {/* Document info */}
              <div style={S.docRow}>
                <div style={S.docIcon}>
                  <i className={`bi bi-file-earmark-${doc?.type === 'pdf' ? 'pdf' : 'word'}-fill`} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={S.docName}>{docName}</div>
                  <div style={S.docSub}>{docType} · Download access</div>
                </div>
              </div>

              {/* Price */}
              <div style={S.priceRow}>
                <span style={S.currency}>KES</span>
                <span style={S.amount}>{PRICE}</span>
              </div>
              <div style={S.amountSub}>One-time payment for full download access</div>

              {/* Phone input */}
              <div style={S.label}>M-Pesa Phone Number</div>
              <div style={{ ...S.phoneWrap, ...(focused ? S.phoneWrapFocus : {}) }}>
                <div style={S.phonePrefix}>+254</div>
                <input
                  ref={inputRef}
                  type="tel"
                  inputMode="numeric"
                  placeholder="7XX XXX XXX"
                  value={phone}
                  onChange={handlePhoneChange}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePay()}
                  style={S.phoneInput}
                />
              </div>
              <div style={S.phoneHint}>Enter the number registered with M-Pesa</div>

              {/* Pay button */}
              <button
                style={{ ...S.btnPay, ...(isValidPhone ? {} : S.btnPayDisabled) }}
                onClick={handlePay}
                disabled={!isValidPhone}
              >
                <i className="bi bi-shield-lock-fill" />
                Pay KES {PRICE} & Get Access
              </button>

              <div style={S.divider} />

              <div style={S.secureRow}>
                <i className="bi bi-lock-fill" style={{ color:'#00A651', fontSize:12 }} />
                <span>Secured by Safaricom M-Pesa · No card required</span>
              </div>
            </div>
          )}

          {/* ══════════════ PROCESSING STAGE ══════════════ */}
          {stage === 'processing' && (
            <div style={S.processingWrap}>
              <div style={S.phoneRing}>📲</div>

              <div style={S.processingTitle}>STK Push Sent!</div>
              <div style={S.processingDesc}>
                Check your phone for the M-Pesa prompt and enter your PIN to complete payment.
              </div>

              <div style={S.phoneDisplay}>+254 {phone}</div>

              <div style={S.dots}>
                <div style={S.dot} className="mpesa-dot-0" />
                <div style={S.dot} className="mpesa-dot-1" />
                <div style={S.dot} className="mpesa-dot-2" />
              </div>

              <div style={{ fontSize:12, color:'#4A6070', marginTop:4 }}>
                Waiting for confirmation…
              </div>
            </div>
          )}

          {/* ══════════════ SUCCESS STAGE ══════════════ */}
          {stage === 'success' && receipt && (
            <div style={S.successWrap}>
              <div style={S.checkCircle}>✓</div>

              <div style={S.successTitle}>Payment Confirmed!</div>
              <div style={S.successDesc}>
                Your payment was received. You can now download your document.
              </div>

              {/* Receipt */}
              <div style={S.receiptBox}>
                <div style={S.receiptRow}>
                  <span style={S.receiptKey}>Receipt No.</span>
                  <span style={{ ...S.receiptVal, color:'#00A651', letterSpacing:1 }}>{receipt.code}</span>
                </div>
                <div style={S.receiptRow}>
                  <span style={S.receiptKey}>Amount</span>
                  <span style={S.receiptVal}>{receipt.amount}</span>
                </div>
                <div style={S.receiptRow}>
                  <span style={S.receiptKey}>Phone</span>
                  <span style={S.receiptVal}>{receipt.phone}</span>
                </div>
                <div style={S.receiptRow}>
                  <span style={S.receiptKey}>Date</span>
                  <span style={S.receiptVal}>{receipt.date}</span>
                </div>
              </div>

              {/* Download button */}
              <button
                style={S.btnDownload}
                onClick={() => setStage('downloading')}
              >
                <i className="bi bi-download" />
                Download {docType}
              </button>

              <button style={S.btnClose} onClick={onClose}>
                Close
              </button>
            </div>
          )}

          {/* ══════════════ DOWNLOADING STAGE ══════════════ */}
          {stage === 'downloading' && (
            <div style={S.processingWrap}>

              {/* Circular progress ring */}
              <div style={{ position:'relative', width:90, height:90 }}>
                <svg width="90" height="90" style={{ transform:'rotate(-90deg)' }}>
                  {/* Track */}
                  <circle
                    cx="45" cy="45" r="38"
                    fill="none"
                    stroke="rgba(212,168,67,.12)"
                    strokeWidth="6"
                  />
                  {/* Progress arc */}
                  <circle
                    cx="45" cy="45" r="38"
                    fill="none"
                    stroke="#D4A843"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 38}`}
                    strokeDashoffset={`${2 * Math.PI * 38 * (1 - progress / 100)}`}
                    style={{ transition:'stroke-dashoffset .12s ease' }}
                  />
                </svg>
                {/* Percentage in centre */}
                <div style={{
                  position:'absolute', inset:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexDirection:'column', gap:1,
                }}>
                  {progress < 100
                    ? <span style={{ fontSize:18, fontWeight:800, color:'#D4A843', fontFamily:"'DM Sans',sans-serif" }}>{Math.round(progress)}%</span>
                    : <span style={{ fontSize:26 }}>✓</span>
                  }
                </div>
              </div>

              <div style={S.processingTitle}>
                {progress < 100 ? 'Downloading…' : 'Complete!'}
              </div>
              <div style={S.processingDesc}>
                {progress < 100
                  ? `Saving ${docName} to your device.`
                  : 'Your file has been saved. This window will close shortly.'
                }
              </div>

              {/* Linear progress bar underneath */}
              <div style={{
                width:'100%', height:4,
                background:'rgba(212,168,67,.12)',
                borderRadius:4, overflow:'hidden',
              }}>
                <div style={{
                  height:'100%',
                  width:`${progress}%`,
                  background:'linear-gradient(90deg,#D4A843,#C8932A)',
                  borderRadius:4,
                  transition:'width .12s ease',
                }} />
              </div>

            </div>
          )}

        </div>
      </div>
    </>
  );
}