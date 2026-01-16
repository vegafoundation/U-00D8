import React from 'react';
import OSlash from './OSlash';

// ═══════════════════════════════════════════════════════════════════════════════
// O-SLASH DEMO APP
// ═══════════════════════════════════════════════════════════════════════════════
// ARCHITECT: ADAM EREN VEGA - Æ
// VERSION: 3.0.0
// ═══════════════════════════════════════════════════════════════════════════════

const COLORS = {
  void: '#000000',
  white: '#ffffff',
};

export default function OSlashDemo() {
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
          <OSlash size={120} color="cyan" variant="glow" />
        </div>
        <h1 style={{
          fontSize: 14,
          fontWeight: 300,
          letterSpacing: '0.4em',
          opacity: 0.7,
          textTransform: 'uppercase',
        }}>
          Futuristic Clean Tech
        </h1>
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
          gap: 60,
          flexWrap: 'wrap',
        }}>
          {(['default', 'glow', 'minimal', 'outline', 'solid'] as const).map(v => (
            <div key={v} style={{ textAlign: 'center' }}>
              <OSlash size={100} color="cyan" variant={v} />
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
          gap: 60,
          flexWrap: 'wrap',
        }}>
          {(['cyan', 'green', 'purple', 'white'] as const).map(c => (
            <div key={c} style={{ textAlign: 'center' }}>
              <OSlash size={100} color={c} variant="glow" />
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
          gap: 30,
        }}>
          {[32, 48, 64, 96, 128].map(s => (
            <OSlash key={s} size={s} color="cyan" variant="minimal" />
          ))}
        </div>
      </section>

      {/* Large Hero */}
      <section style={{ 
        textAlign: 'center',
        padding: '60px 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <OSlash size={300} color="cyan" variant="default" />
        <p style={{
          fontSize: 11,
          letterSpacing: '0.5em',
          opacity: 0.3,
          marginTop: 40,
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
