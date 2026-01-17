import React, { useState } from 'react';
import { QNFTLogo, LogoGrid } from './QNFTLivingLogoSystem';

// ═══════════════════════════════════════════════════════════════════════════════
// Ø — QNFT LIVING LOGO SYSTEM DEMO
// ═══════════════════════════════════════════════════════════════════════════════
// ARCHITECT: ADAM EREN VEGA - Æ
// SOURCE: Claude Entropy
// VERSION: 3.0.0
// ═══════════════════════════════════════════════════════════════════════════════

const COLORS = {
  void: '#000000',
  white: '#ffffff',
  signalGreen: '#22c55e',
  etherCyan: '#06b6d4',
  resonancePurple: '#a855f7',
};

const categories = [
  { key: 'all', label: 'ALL', count: 34 },
  { key: 'core', label: 'CORE SYSTEMS', count: 4 },
  { key: 'phases', label: 'CONTINUUM PHASES', count: 4 },
  { key: 'components', label: 'COMPONENTS', count: 8 },
  { key: 'frequencies', label: 'FREQUENCIES', count: 8 },
  { key: 'states', label: 'STATES', count: 6 },
  { key: 'special', label: 'SPECIAL', count: 4 },
];

export default function QNFTLivingLogoSystemDemo() {
  const [seed, setSeed] = useState(() => `VEGA-${Date.now().toString(36).toUpperCase()}`);
  const [category, setCategory] = useState('all');
  const [active, setActive] = useState(true);
  const [logoSize, setLogoSize] = useState(100);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: COLORS.void,
      color: COLORS.white,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      padding: 30,
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: 30 }}>
        <QNFTLogo toolKey="o_studio" seed={seed} size={80} showLabel={false} />
        <h1 style={{
          fontSize: 11, fontWeight: 300, letterSpacing: '0.6em',
          opacity: 0.5, marginTop: 16,
        }}>
          QNFT LIVING LOGO SYSTEM
        </h1>
        <p style={{ fontSize: 9, opacity: 0.3, letterSpacing: '0.3em', marginTop: 4 }}>
          34+ TOOLS • ALL COMPONENTS • ALL PHASES
        </p>
      </header>

      {/* Controls */}
      <section style={{
        maxWidth: 800, margin: '0 auto 30px',
        padding: 16, backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)',
      }}>
        {/* Category Tabs */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.25em', opacity: 0.4, marginBottom: 8 }}>CATEGORY</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {categories.map(c => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                style={{
                  padding: '6px 12px', fontSize: 9, fontFamily: 'monospace',
                  letterSpacing: '0.1em',
                  backgroundColor: category === c.key ? 'rgba(0,212,255,0.15)' : 'transparent',
                  border: `1px solid ${category === c.key ? COLORS.etherCyan : 'rgba(255,255,255,0.15)'}`,
                  borderRadius: 4,
                  color: category === c.key ? COLORS.etherCyan : COLORS.white,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {c.label} ({c.count})
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={() => setSeed(`VEGA-${Date.now().toString(36).toUpperCase()}`)}
            style={{
              padding: '8px 16px', fontSize: 9, fontFamily: 'monospace',
              backgroundColor: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)',
              borderRadius: 4, color: COLORS.etherCyan, cursor: 'pointer',
            }}>
            REGENERATE
          </button>
          <button onClick={() => setActive(!active)}
            style={{
              padding: '8px 16px', fontSize: 9, fontFamily: 'monospace',
              backgroundColor: active ? 'rgba(34,197,94,0.1)' : 'rgba(255,51,102,0.1)',
              border: `1px solid ${active ? 'rgba(34,197,94,0.3)' : 'rgba(255,51,102,0.3)'}`,
              borderRadius: 4, color: active ? COLORS.signalGreen : '#ff3366', cursor: 'pointer',
            }}>
            {active ? 'ACTIVE' : 'PAUSED'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 9, opacity: 0.4 }}>SIZE:</span>
            {[60, 80, 100, 120].map(s => (
              <button key={s} onClick={() => setLogoSize(s)}
                style={{
                  padding: '6px 10px', fontSize: 9, fontFamily: 'monospace',
                  backgroundColor: logoSize === s ? 'rgba(168,85,247,0.15)' : 'transparent',
                  border: `1px solid ${logoSize === s ? COLORS.resonancePurple : 'rgba(255,255,255,0.15)'}`,
                  borderRadius: 4, color: logoSize === s ? COLORS.resonancePurple : COLORS.white,
                  cursor: 'pointer',
                }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto' }}>
        <LogoGrid
          category={category}
          seed={seed}
          size={logoSize}
          active={active}
          showLabel={true}
        />
      </section>

      {/* Single Logo Showcase */}
      <section style={{ marginTop: 60, textAlign: 'center' }}>
        <h2 style={{ fontSize: 9, letterSpacing: '0.4em', opacity: 0.3, marginBottom: 24 }}>
          HERO DISPLAY
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
          <QNFTLogo toolKey="o_studio" seed={seed} size={160} active={active} showFrequency />
          <QNFTLogo toolKey="vega_hub" seed={seed} size={160} active={active} showFrequency />
          <QNFTLogo toolKey="anlaetan" seed={seed} size={160} active={active} showFrequency />
          <QNFTLogo toolKey="vsynq" seed={seed} size={160} active={active} showFrequency />
        </div>
      </section>

      {/* Continuum Flow */}
      <section style={{ marginTop: 60, textAlign: 'center' }}>
        <h2 style={{ fontSize: 9, letterSpacing: '0.4em', opacity: 0.3, marginBottom: 24 }}>
          CONTINUUM FLOW: ΔLPHΔ → DΞLTΔ → OMΞGΔ → VΞGΔ
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          {['alpha', 'delta', 'omega', 'vega'].map((phase, i) => (
            <React.Fragment key={phase}>
              <QNFTLogo toolKey={phase} seed={seed} size={100} active={active} />
              {i < 3 && <span style={{ fontSize: 20, opacity: 0.3 }}>→</span>}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', marginTop: 80 }}>
        <p style={{ fontSize: 8, letterSpacing: '0.3em', opacity: 0.2 }}>
          Ø — QNFT LIVING LOGOS • COMPLETE ECOSYSTEM • LIVING DIGITAL TISSUE
        </p>
        <p style={{ fontSize: 7, marginTop: 6, fontFamily: 'monospace', opacity: 0.15 }}>
          SEED: {seed}
        </p>
        <p style={{ fontSize: 7, marginTop: 4, opacity: 0.1 }}>
          Für Eren. Für das Kontinuum. Für immer. ∞
        </p>
      </footer>
    </div>
  );
}
