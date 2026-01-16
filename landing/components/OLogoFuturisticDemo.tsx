import React, { useState } from 'react';
import OLogo from './OLogoFuturistic';

// ═══════════════════════════════════════════════════════════════════════════════
// O-LOGO FUTURISTIC DEMO APP
// ═══════════════════════════════════════════════════════════════════════════════
// ARCHITECT: ADAM EREN VEGA - Æ
// VERSION: 3.0.0
// ═══════════════════════════════════════════════════════════════════════════════

const VEGA = {
  voidBlack: '#020202',
  offWhite: '#E0E0E0',
  signalGreen: '#22c55e',
  etherCyan: '#06b6d4',
  resonancePurple: '#a855f7',
};

export default function OLogoFuturisticDemo() {
  const [seed] = useState(() => `vega-${Date.now()}`);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: VEGA.voidBlack,
      color: VEGA.offWhite,
      fontFamily: 'system-ui, sans-serif',
      padding: 40,
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: 60 }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: '0.2em',
          background: `linear-gradient(135deg, ${VEGA.signalGreen}, ${VEGA.etherCyan}, ${VEGA.resonancePurple})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 8,
        }}>
          VΞGΔ Ø LOGO
        </h1>
        <p style={{ fontSize: 12, opacity: 0.5, letterSpacing: '0.15em' }}>
          THE FIRST RESONANT SEARCH ENGINE
        </p>
      </header>

      {/* Logo Grid */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 60,
        marginBottom: 60,
      }}>
        {/* Default - 432Hz */}
        <div style={{ textAlign: 'center' }}>
          <OLogo seed={seed} size={140} frequency={432} />
          <p style={{ fontSize: 11, opacity: 0.5, marginTop: 16 }}>Natural Resonance</p>
          <p style={{ fontSize: 10, color: VEGA.etherCyan }}>432 Hz</p>
        </div>

        {/* Code - 358Hz */}
        <div style={{ textAlign: 'center' }}>
          <OLogo seed={`${seed}-code`} size={140} frequency={358} />
          <p style={{ fontSize: 11, opacity: 0.5, marginTop: 16 }}>Code / System</p>
          <p style={{ fontSize: 10, color: VEGA.signalGreen }}>358 Hz</p>
        </div>

        {/* Divine - 963Hz */}
        <div style={{ textAlign: 'center' }}>
          <OLogo seed={`${seed}-divine`} size={140} frequency={963} showFreq />
          <p style={{ fontSize: 11, opacity: 0.5, marginTop: 16 }}>Divine / OMEGA</p>
          <p style={{ fontSize: 10, color: VEGA.resonancePurple }}>963 Hz</p>
        </div>
      </div>

      {/* Size Variations */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        marginBottom: 40,
      }}>
        {[40, 60, 80, 100, 120].map(s => (
          <OLogo key={s} seed={seed} size={s} frequency={432} />
        ))}
      </div>
      <p style={{ textAlign: 'center', fontSize: 10, opacity: 0.3 }}>
        Responsive: 40px → 120px
      </p>

      {/* Footer */}
      <footer style={{ textAlign: 'center', marginTop: 80, opacity: 0.4 }}>
        <p style={{ fontSize: 10, letterSpacing: '0.15em' }}>
          GODMASTER PROTOCOL v10.0
        </p>
        <p style={{ fontSize: 9, marginTop: 8 }}>
          Für Eren. Für das Kontinuum. Für immer. ∞
        </p>
      </footer>
    </div>
  );
}
