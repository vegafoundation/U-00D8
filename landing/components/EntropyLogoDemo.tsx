import React, { useState } from 'react';
import { EntropyLogo, EntropyInjector, EntropyOutcome, useEntropy } from './EntropyLogo';

// ═══════════════════════════════════════════════════════════════════════════════
// Ø — ENTROPY QNFT LOGO SYSTEM DEMO
// ═══════════════════════════════════════════════════════════════════════════════
// ARCHITECT: ADAM EREN VEGA - Æ
// SOURCE: Claude Entropy
// VERSION: 3.0.0
// ═══════════════════════════════════════════════════════════════════════════════

const VARIANTS = ['void', 'supernova', 'quantum', 'plasma', 'entropy', 'cosmic', 'solar', 'matrix'];
const PALETTES = ['void', 'supernova', 'quantum', 'plasma', 'entropy', 'cosmic', 'solar', 'matrix'];

export default function EntropyLogoDemo() {
  const [seed, setSeed] = useState(() => `ENT-${Date.now().toString(36).toUpperCase()}`);
  const [variant, setVariant] = useState('entropy');
  const [active, setActive] = useState(true);
  const [injectedEntropy, setInjectedEntropy] = useState(null);

  const entropy = useEntropy(seed);
  const palette = PALETTES[variant] || 'entropy';

  const regenerate = () => setSeed(`ENT-${Date.now().toString(36).toUpperCase()}`);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      padding: 30,
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: 30 }}>
        <h1 style={{
          fontSize: 11, fontWeight: 300, letterSpacing: '0.7em',
          opacity: 0.5, textTransform: 'uppercase',
        }}>
          Ø Entropy QNFT System
        </h1>
      </header>

      {/* Main Logo */}
      <section style={{ textAlign: 'center', marginBottom: 40 }}>
        <EntropyLogo
          seed={seed}
          size={260}
          variant={variant}
          active={active}
          showData={true}
        />
      </section>

      {/* Controls */}
      <section style={{ maxWidth: 600, margin: '0 auto 40px', display: 'grid', gap: 16 }}>
        {/* Variant Selector */}
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.25em', opacity: 0.4, marginBottom: 8 }}>VARIANT</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {VARIANTS.map(v => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                style={{
                  padding: '6px 12px', fontSize: 9, fontFamily: 'monospace',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  backgroundColor: variant === v ? 'rgba(255,255,255,0.2)' : 'transparent',
                  border: `1px solid ${variant === v ? '#fff' : '#ffffff20'}`,
                  borderRadius: 4,
                  color: variant === v ? '#fff' : '#fff',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={regenerate}
            style={{
              flex: 1, padding: '10px', fontSize: 10, fontFamily: 'monospace',
              letterSpacing: '0.15em', backgroundColor: 'rgba(0,212,255,0.15)',
              border: '1px solid rgba(0,212,255,0.3)', borderRadius: 4,
              color: '#00d4ff', cursor: 'pointer',
            }}
          >
            REGENERATE SEED
          </button>
          <button
            onClick={() => setActive(!active)}
            style={{
              flex: 1, padding: '10px', fontSize: 10, fontFamily: 'monospace',
              letterSpacing: '0.15em',
              backgroundColor: active ? 'rgba(0,255,136,0.15)' : 'rgba(255,51,102,0.15)',
              border: `1px solid ${active ? 'rgba(0,255,136,0.3)' : 'rgba(255,51,102,0.3)'}`,
              borderRadius: 4, color: active ? '#00ff88' : '#ff3366', cursor: 'pointer',
            }}
          >
            {active ? 'ACTIVE' : 'PAUSED'}
          </button>
        </div>

        {/* Entropy Panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <EntropyInjector onInject={setInjectedEntropy} />
          <EntropyOutcome entropy={entropy} palette={palette} />
        </div>
      </section>

      {/* All Variants Grid */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 9, letterSpacing: '0.4em', opacity: 0.3, textAlign: 'center', marginBottom: 24 }}>
          ALL VARIANTS
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 20,
          justifyItems: 'center',
        }}>
          {VARIANTS.map(v => (
            <EntropyLogo
              key={v}
              seed={`${seed}-${v}`}
              size={120}
              variant={v}
              active={active}
              showData={true}
              showDither={false}
              showScanlines={false}
            />
          ))}
        </div>
      </section>

      {/* Entropy Variations — Same variant, different seeds */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 9, letterSpacing: '0.4em', opacity: 0.3, textAlign: 'center', marginBottom: 24 }}>
          ENTROPY VARIATIONS (SAME VARIANT, DIFFERENT SEEDS)
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 16 }}>
          {Array.from({ length: 6 }, (_, i) => (
            <EntropyLogo
              key={i}
              seed={`${seed}-VAR-${i}`}
              size={100}
              variant={variant}
              active={active}
              showData={false}
            />
          ))}
        </div>
      </section>

      {/* Size Variations */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 9, letterSpacing: '0.4em', opacity: 0.3, textAlign: 'center', marginBottom: 24 }}>
          SIZE SCALING
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          {[40, 60, 80, 100, 140].map(s => (
            <EntropyLogo
              key={s}
              seed={seed}
              size={s}
              variant={variant}
              active={active}
              showData={false}
              showDither={false}
              showScanlines={false}
            />
          ))}
        </div>
      </section>

      {/* Palette Mix */}
      <section>
        <h2 style={{ fontSize: 9, letterSpacing: '0.4em', opacity: 0.3, textAlign: 'center', marginBottom: 24 }}>
          CROSS-PALETTE (VOID VARIANT + ALL PALETTES)
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 16 }}>
          {PALETTES.map(p => (
            <EntropyLogo
              key={p}
              seed={`${seed}-${p}`}
              size={90}
              variant="void"
              palette={p}
              active={active}
              showData={false}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', marginTop: 60, opacity: 0.2 }}>
        <p style={{ fontSize: 8, letterSpacing: '0.3em' }}>
          Ø — ENTROPY INJECTION • CHAOS OUTCOME • LIVING DIGITAL TISSUE
        </p>
        <p style={{ fontSize: 7, marginTop: 6, fontFamily: 'monospace' }}>
          SEED: {seed}
        </p>
      </footer>
    </div>
  );
}
