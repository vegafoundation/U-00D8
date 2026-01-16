import React from 'react';
import OSlashDiagonal from './OSlashDiagonal';

// ═══════════════════════════════════════════════════════════════════════════════
// O-SLASH DIAGONAL DEMO APP
// ═══════════════════════════════════════════════════════════════════════════════
// ARCHITECT: ADAM EREN VEGA - Æ
// VERSION: 3.0.0
// ═══════════════════════════════════════════════════════════════════════════════

const COLORS = {
  void: '#000000',
  white: '#ffffff',
};

export default function OSlashDiagonalDemo() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: COLORS.void,
      color: COLORS.white,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      padding: 40,
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: 80 }}>
        <div style={{ marginBottom: 20 }}>
          <OSlashDiagonal size={140} color="cyan" variant="glow" />
        </div>
        <h1 style={{
          fontSize: 13,
          fontWeight: 300,
          letterSpacing: '0.5em',
          opacity: 0.6,
          textTransform: 'uppercase',
        }}>
          Unicode U+00D8 Style
        </h1>
        <p style={{
          fontSize: 48,
          fontWeight: 200,
          opacity: 0.3,
          marginTop: 10,
          fontFamily: 'serif',
        }}>
          Ø
        </p>
        <p style={{
          fontSize: 10,
          opacity: 0.3,
          letterSpacing: '0.2em',
        }}>
          ↗ diagonal stroke extends beyond circle ↙
        </p>
      </header>

      {/* Variants */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{
          fontSize: 10,
          letterSpacing: '0.3em',
          opacity: 0.4,
          textAlign: 'center',
          marginBottom: 40,
          textTransform: 'uppercase',
        }}>
          Variants
        </h2>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 50,
          flexWrap: 'wrap',
        }}>
          {(['default', 'glow', 'minimal', 'outline', 'solid'] as const).map(v => (
            <div key={v} style={{ textAlign: 'center' }}>
              <OSlashDiagonal size={90} color="cyan" variant={v} />
              <p style={{ 
                fontSize: 10, 
                opacity: 0.4, 
                marginTop: 16,
                letterSpacing: '0.1em',
              }}>
                {v}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Overshoot Variations */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{
          fontSize: 10,
          letterSpacing: '0.3em',
          opacity: 0.4,
          textAlign: 'center',
          marginBottom: 40,
          textTransform: 'uppercase',
        }}>
          Stroke Extension (Overshoot)
        </h2>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
          flexWrap: 'wrap',
        }}>
          {[0, 0.15, 0.25, 0.35, 0.5].map(o => (
            <div key={o} style={{ textAlign: 'center' }}>
              <OSlashDiagonal size={80} color="cyan" variant="minimal" overshoot={o} />
              <p style={{ 
                fontSize: 9, 
                opacity: 0.4, 
                marginTop: 12,
                fontFamily: 'monospace',
              }}>
                {(o * 100).toFixed(0)}%
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Colors */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{
          fontSize: 10,
          letterSpacing: '0.3em',
          opacity: 0.4,
          textAlign: 'center',
          marginBottom: 40,
          textTransform: 'uppercase',
        }}>
          Colors
        </h2>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 50,
          flexWrap: 'wrap',
        }}>
          {(['cyan', 'green', 'purple', 'white'] as const).map(c => (
            <div key={c} style={{ textAlign: 'center' }}>
              <OSlashDiagonal size={90} color={c} variant="glow" />
              <p style={{ 
                fontSize: 10, 
                opacity: 0.4, 
                marginTop: 16,
                letterSpacing: '0.1em',
              }}>
                {c}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{
          fontSize: 10,
          letterSpacing: '0.3em',
          opacity: 0.4,
          textAlign: 'center',
          marginBottom: 40,
          textTransform: 'uppercase',
        }}>
          Sizes
        </h2>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 24,
        }}>
          {[24, 36, 48, 64, 80, 100].map(s => (
            <OSlashDiagonal key={s} size={s} color="cyan" variant="minimal" />
          ))}
        </div>
      </section>

      {/* Large Hero */}
      <section style={{ 
        textAlign: 'center',
        padding: '80px 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <OSlashDiagonal size={280} color="cyan" variant="default" overshoot={0.25} />
        <p style={{
          fontSize: 11,
          letterSpacing: '0.5em',
          opacity: 0.25,
          marginTop: 50,
          textTransform: 'uppercase',
        }}>
          Für alles und nichts
        </p>
      </section>

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        paddingTop: 40,
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <p style={{ fontSize: 9, opacity: 0.2, letterSpacing: '0.2em' }}>
          Ø — THE FIRST RESONANT SEARCH ENGINE
        </p>
      </footer>
    </div>
  );
}
