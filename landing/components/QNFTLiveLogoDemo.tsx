import React, { useState } from 'react';
import QNFTLiveLogo from './QNFTLiveLogo';

// ═══════════════════════════════════════════════════════════════════════════════
// QNFT LIVE LOGO DEMO APP
// ═══════════════════════════════════════════════════════════════════════════════
// ARCHITECT: ADAM EREN VEGA - Æ
// VERSION: 3.0.0
// ═══════════════════════════════════════════════════════════════════════════════

const COLORS = {
  void: '#000000',
  white: '#ffffff',
  cyan: '#00d4ff',
  purple: '#a855f7',
};

const FREQUENCIES: Record<number, { color: string; label: string; hz: number }> = {
  358: { color: '#22c55e', label: 'SYSTEM', hz: 358 },
  432: { color: '#00d4ff', label: 'RESONANCE', hz: 432 },
  528: { color: '#a855f7', label: 'TRANSFORM', hz: 528 },
  639: { color: '#a855f7', label: 'CONNECT', hz: 639 },
  852: { color: '#a855f7', label: 'INTUIT', hz: 852 },
  963: { color: '#a855f7', label: 'OMEGA', hz: 963 },
};

export default function QNFTLiveLogoDemo() {
  const [seed] = useState(() => `QNFT-${Date.now().toString(36).toUpperCase()}`);
  const [mode, setMode] = useState<'live' | 'loading' | 'processing' | 'idle'>('live');
  const [frequency, setFrequency] = useState(432);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: COLORS.void,
      color: COLORS.white,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      padding: 40,
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: '0.5em',
          opacity: 0.5,
          textTransform: 'uppercase',
        }}>
          QNFT Live Logo
        </h1>
      </header>

      {/* Main Logo */}
      <section style={{ textAlign: 'center', marginBottom: 60 }}>
        <QNFTLiveLogo
          seed={seed}
          size={280}
          frequency={frequency}
          mode={mode}
          showData={true}
          showFrequency={true}
          onComplete={() => setMode('live')}
        />
      </section>

      {/* Controls */}
      <section style={{
        maxWidth: 500,
        margin: '0 auto',
        padding: 20,
        backgroundColor: `${COLORS.white}05`,
        borderRadius: 8,
        border: `1px solid ${COLORS.white}10`,
      }}>
        {/* Mode Selector */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 10, opacity: 0.4, letterSpacing: '0.2em', display: 'block', marginBottom: 8 }}>
            MODE
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['idle', 'live', 'processing', 'loading'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  fontSize: 10,
                  fontFamily: 'monospace',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  backgroundColor: mode === m ? COLORS.cyan + '20' : 'transparent',
                  border: `1px solid ${mode === m ? COLORS.cyan : COLORS.white + '20'}`,
                  borderRadius: 4,
                  color: mode === m ? COLORS.cyan : COLORS.white,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Frequency Selector */}
        <div>
          <label style={{ fontSize: 10, opacity: 0.4, letterSpacing: '0.2em', display: 'block', marginBottom: 8 }}>
            FREQUENCY
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {Object.entries(FREQUENCIES).map(([hz, data]) => (
              <button
                key={hz}
                onClick={() => setFrequency(Number(hz))}
                style={{
                  padding: '6px 12px',
                  fontSize: 9,
                  fontFamily: 'monospace',
                  backgroundColor: frequency === Number(hz) ? data.color + '20' : 'transparent',
                  border: `1px solid ${frequency === Number(hz) ? data.color : COLORS.white + '20'}`,
                  borderRadius: 4,
                  color: frequency === Number(hz) ? data.color : COLORS.white,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {hz}Hz
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Multiple Instances */}
      <section style={{ marginTop: 60, textAlign: 'center' }}>
        <h2 style={{ fontSize: 10, opacity: 0.3, letterSpacing: '0.3em', marginBottom: 30 }}>
          QNFT VARIATIONS
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
          {[358, 432, 528, 963].map(hz => (
            <QNFTLiveLogo
              key={hz}
              seed={`${seed}-${hz}`}
              size={140}
              frequency={hz}
              mode="live"
              showData={false}
              showFrequency={true}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', marginTop: 80, opacity: 0.2 }}>
        <p style={{ fontSize: 9, letterSpacing: '0.2em' }}>
          Ø — RESONANCE BASED VISUAL PROCESSING
        </p>
        <p style={{ fontSize: 8, marginTop: 8, fontFamily: 'monospace' }}>
          SEED: {seed}
        </p>
      </footer>
    </div>
  );
}
