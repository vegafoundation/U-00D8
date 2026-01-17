import React, { useState } from 'react';
import { QNFTLogo, EntropyInjector, EntropyOutcome, VariantShowcase } from './UltimateQNFTLogoSystem';

// ═══════════════════════════════════════════════════════════════════════════════
// Ø — ULTIMATE QNFT LIVING LOGO SYSTEM DEMO
// ═══════════════════════════════════════════════════════════════════════════════
// ARCHITECT: ADAM EREN VEGA - Æ
// SOURCE: Claude Entropy
// VERSION: 3.0.0
// ═══════════════════════════════════════════════════════════════════════════════

const C = {
  void: '#000000',
  white: '#ffffff',
  signalGreen: '#22c55e',
  etherCyan: '#06b6d4',
  resonancePurple: '#a855f7',
  red: '#ff3366',
  gold: '#ffaa00',
};

const categories = ['all', 'core', 'phase', 'component', 'frequency', 'special', 'state', 'geometric', 'sacred'];

const LOGOS = {
  // Core
  o_slash: { name: 'Ø', category: 'core' },
  vega: { name: 'VΞGΔ', category: 'core' },
  vsynq: { name: 'VSYNQ', category: 'core' },
  anlaetan: { name: 'ΛNLÆTΛN', category: 'core' },
  // Phases
  alpha: { name: 'ΔLPHΔ', category: 'phase' },
  delta: { name: 'DΞLTΔ', category: 'phase' },
  omega: { name: 'OMΞGΔ', category: 'phase' },
  continuum: { name: 'CONTINUUM', category: 'phase' },
  // Components
  search: { name: 'SEARCH', category: 'component' },
  memory: { name: 'MEMORY', category: 'component' },
  process: { name: 'PROCESS', category: 'component' },
  connect: { name: 'CONNECT', category: 'component' },
  transform: { name: 'TRANSFORM', category: 'component' },
  render: { name: 'RENDER', category: 'component' },
  sense: { name: 'SENSE', category: 'component' },
  heal: { name: 'HEAL', category: 'component' },
  // Frequencies
  freq_358: { name: '358Hz', category: 'frequency' },
  freq_432: { name: '432Hz', category: 'frequency' },
  freq_528: { name: '528Hz', category: 'frequency' },
  freq_639: { name: '639Hz', category: 'frequency' },
  freq_852: { name: '852Hz', category: 'frequency' },
  freq_963: { name: '963Hz', category: 'frequency' },
  // Special
  qnft: { name: 'QNFT', category: 'special' },
  quantum: { name: 'QUANTUM', category: 'special' },
  blockchain: { name: 'CHAIN', category: 'special' },
  ai_core: { name: 'AI', category: 'special' },
  neural: { name: 'NEURAL', category: 'special' },
  cosmic: { name: 'COSMIC', category: 'special' },
  // States
  loading: { name: 'LOADING', category: 'state' },
  active: { name: 'ACTIVE', category: 'state' },
  error: { name: 'ERROR', category: 'state' },
  success: { name: 'SUCCESS', category: 'state' },
  // Geometric
  hex: { name: 'HEX', category: 'geometric' },
  oct: { name: 'OCT', category: 'geometric' },
  tri: { name: 'TRI', category: 'geometric' },
  star: { name: 'STAR', category: 'geometric' },
  diamond: { name: 'DIAMOND', category: 'geometric' },
  // Sacred
  flower: { name: 'FLOWER', category: 'sacred' },
  mandala: { name: 'MANDALA', category: 'sacred' },
  metatron: { name: 'METATRON', category: 'sacred' },
};

export default function UltimateQNFTLogoSystemDemo() {
  const [seed, setSeed] = useState(() => `QNFT-${Date.now().toString(36).toUpperCase()}`);
  const [selectedLogo, setSelectedLogo] = useState('o_slash');
  const [selectedVariant, setSelectedVariant] = useState('standard');
  const [category, setCategory] = useState('all');
  const [active, setActive] = useState(true);
  const [injectedEntropy, setInjectedEntropy] = useState(null);

  const filteredLogos = Object.entries(LOGOS).filter(([_, l]) => category === 'all' || l.category === category);

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: C.void, color: C.white,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      padding: 24,
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: 24 }}>
        <QNFTLogo logoKey="o_slash" seed={seed} size={60} variant="glow" showLabel={false} injectedEntropy={injectedEntropy} />
        <h1 style={{ fontSize: 10, fontWeight: 300, letterSpacing: '0.6em', opacity: 0.5, marginTop: 12 }}>
          ULTIMATE QNFT LIVING LOGO SYSTEM
        </h1>
        <p style={{ fontSize: 8, opacity: 0.3, letterSpacing: '0.2em' }}>
          {Object.keys(LOGOS).length} LOGOS • 12 VARIANTS • ENTROPY INJECTION
        </p>
      </header>

      {/* Main Controls */}
      <section style={{ maxWidth: 900, margin: '0 auto 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <EntropyInjector onInject={setInjectedEntropy} />
        <EntropyOutcome seed={seed} injectedEntropy={injectedEntropy} />
      </section>

      {/* Hero Logo */}
      <section style={{ textAlign: 'center', marginBottom: 32 }}>
        <QNFTLogo
          logoKey={selectedLogo}
          seed={seed}
          size={180}
          variant={selectedVariant}
          active={active}
          showLabel={true}
          showEntropy={true}
          injectedEntropy={injectedEntropy}
        />
      </section>

      {/* Variant Selector */}
      <section style={{ maxWidth: 900, margin: '0 auto 24px' }}>
        <div style={{ fontSize: 8, letterSpacing: '0.2em', opacity: 0.4, marginBottom: 8 }}>VARIANT</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {['standard', 'minimal', 'glow', 'pulse', 'glitch', 'chaos', 'void', 'supernova', 'quantum', 'plasma', 'matrix', 'hologram'].map(v => (
            <button key={v} onClick={() => setSelectedVariant(v)} style={{
              padding: '5px 10px', fontSize: 8, fontFamily: 'monospace',
              backgroundColor: selectedVariant === v ? 'rgba(168,85,247,0.2)' : 'transparent',
              border: `1px solid ${selectedVariant === v ? C.resonancePurple : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 3, color: selectedVariant === v ? C.resonancePurple : C.white,
              cursor: 'pointer', textTransform: 'uppercase',
            }}>
              {v}
            </button>
          ))}
        </div>
      </section>

      {/* Category & Logo Selector */}
      <section style={{ maxWidth: 900, margin: '0 auto 24px' }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 8, letterSpacing: '0.2em', opacity: 0.4, marginBottom: 8 }}>CATEGORY</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)} style={{
                  padding: '4px 8px', fontSize: 7, fontFamily: 'monospace',
                  backgroundColor: category === c ? 'rgba(0,212,255,0.2)' : 'transparent',
                  border: `1px solid ${category === c ? C.etherCyan : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 3, color: category === c ? C.etherCyan : C.white,
                  cursor: 'pointer', textTransform: 'uppercase',
                }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setSeed(`QNFT-${Date.now().toString(36).toUpperCase()}`)} style={{
              padding: '6px 12px', fontSize: 8, fontFamily: 'monospace',
              backgroundColor: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)',
              borderRadius: 4, color: C.etherCyan, cursor: 'pointer',
            }}>
              NEW SEED
            </button>
            <button onClick={() => setActive(!active)} style={{
              padding: '6px 12px', fontSize: 8, fontFamily: 'monospace',
              backgroundColor: active ? 'rgba(34,197,94,0.1)' : 'rgba(255,51,102,0.1)',
              border: `1px solid ${active ? 'rgba(34,197,94,0.3)' : 'rgba(255,51,102,0.3)'}`,
              borderRadius: 4, color: active ? C.signalGreen : C.red, cursor: 'pointer',
            }}>
              {active ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Logo Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
          gap: 8, padding: 12, backgroundColor: 'rgba(255,255,255,0.01)',
          borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)',
        }}>
          {filteredLogos.map(([key, logo]) => (
            <div key={key} onClick={() => setSelectedLogo(key)} style={{
              cursor: 'pointer', padding: 8, borderRadius: 6, textAlign: 'center',
              backgroundColor: selectedLogo === key ? 'rgba(255,255,255,0.05)' : 'transparent',
              border: `1px solid ${selectedLogo === key ? C.etherCyan + '40' : 'transparent'}`,
              transition: 'all 0.2s',
            }}>
              <QNFTLogo logoKey={key} seed={seed} size={60} variant={selectedVariant}
                active={active} showLabel={false} injectedEntropy={injectedEntropy} />
              <div style={{ fontSize: 7, opacity: 0.5, marginTop: 4 }}>{logo.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Variant Showcase */}
      <section style={{ maxWidth: 900, margin: '0 auto 32px', padding: 16,
        backgroundColor: 'rgba(255,255,255,0.01)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
        <VariantShowcase logoKey={selectedLogo} seed={seed} size={70} />
      </section>

      {/* All Logos Small Grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto 32px' }}>
        <div style={{ fontSize: 8, letterSpacing: '0.3em', opacity: 0.3, textAlign: 'center', marginBottom: 16 }}>
          ALL {Object.keys(LOGOS).length} LOGOS
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {Object.keys(LOGOS).map(key => (
            <QNFTLogo key={key} logoKey={key} seed={seed} size={50} variant={selectedVariant}
              active={active} showLabel={false} injectedEntropy={injectedEntropy} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', marginTop: 48 }}>
        <p style={{ fontSize: 7, letterSpacing: '0.3em', opacity: 0.2 }}>
          Ø — QNFT LIVING LOGOS • ENTROPY INJECTION • CHAOS OUTCOMES
        </p>
        <p style={{ fontSize: 6, marginTop: 4, fontFamily: 'monospace', opacity: 0.15 }}>
          SEED: {seed}
        </p>
        <p style={{ fontSize: 6, marginTop: 4, opacity: 0.1 }}>
          Für Eren. Für das Kontinuum. Für immer. ∞
        </p>
      </footer>
    </div>
  );
}
