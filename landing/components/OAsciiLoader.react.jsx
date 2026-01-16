import React, { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// Ø ASCII LOADER — CINEMATIC TERMINAL BOOT SEQUENCE (REACT VERSION)
// VERSION 1.0 | ARCHITECT: ADAM EREN VEGA (Æ) | SKYWOK CONTINUUM
// ═══════════════════════════════════════════════════════════════════════════════

export default function OAsciiLoader({ onComplete, autoComplete = true, showLogo = true }) {
  const [phase, setPhase] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [glitchFrame, setGlitchFrame] = useState(0);
  const [scanLine, setScanLine] = useState(0);
  const [freqActive, setFreqActive] = useState(-1);
  const [complete, setComplete] = useState(false);
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [logoFrame, setLogoFrame] = useState(0);

  // ASCII Ø Logo Frames
  const logoFrames = [
    `
                    ██████╗ 
                   ██╔═══██╗
                   ██║   ██║
                   ██║   ██║
                   ╚██████╔╝
                    ╚═════╝ 
    `,
    `
              ░░░░░░░░░░░░░░░░░░░
            ░░░░░░░████████░░░░░░░
           ░░░░░████░░░░░░████░░░░░
          ░░░░██░░░░░░░░░░░░░░██░░░░
          ░░░██░░░░░░░░░░░░░░░░██░░░
          ░░░██░░░░░░██░░░░░░░░██░░░
          ░░░██░░░░██░░██░░░░░░██░░░
          ░░░██░░░░░░░░░░░░░░░░██░░░
          ░░░░██░░░░░░░░░░░░░░██░░░░
           ░░░░░████░░░░░░████░░░░░
            ░░░░░░░████████░░░░░░░
              ░░░░░░░░░░░░░░░░░░░
    `,
    `
              ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
            ▄█░░░░░░░░░░░░░░░░░░░█▄
           █░░░░░▄▄▄▄▄▄▄▄▄▄▄░░░░░░█
          █░░░░▄█▀▀▀▀▀▀▀▀▀▀▀█▄░░░░░█
          █░░░█▀░░░░░░░░░░░░░▀█░░░░█
          █░░█░░░░░░░▄▀░░░░░░░░█░░░█
          █░░█░░░░░▄▀░░▀▄░░░░░░█░░░█
          █░░█░░░░░░░░░░░░░░░░░█░░░█
          █░░░▀█▄░░░░░░░░░░░▄█▀░░░░█
           █░░░░░▀▀▄▄▄▄▄▄▄▀▀░░░░░░█
            ▀█░░░░░░░░░░░░░░░░░░█▀
              ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
    `,
    `
                    ████████████                    
                ████            ████                
              ██                    ██              
            ██          ██            ██            
           ██         ██  ██           ██           
          ██        ██      ██          ██          
          ██      ██          ██        ██          
          ██        ██      ██          ██          
           ██         ██  ██           ██           
            ██          ██            ██            
              ██                    ██              
                ████            ████                
                    ████████████                    
    `
  ];

  const bigLogo = `
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓░░░░░░░░░░░░░░▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░░▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░▓▓▓▓░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░▓▓▓░░░░▓▓▓░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░▓▓░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░▓▓░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░▓▓░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░▓▓░░░░░░░░▓▓░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░▓▓░░░░░░░░▓▓░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░▓▓░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░▓▓░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░▓▓░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░▓▓▓░░░░▓▓▓░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░▓▓▓▓░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░░░░▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓░░░░░░░░░░░░▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`;

  const studioText = `
    ░██████╗████████╗██╗░░░██╗██████╗░██╗░█████╗░
    ██╔════╝╚══██╔══╝██║░░░██║██╔══██╗██║██╔══██╗
    ╚█████╗░░░░██║░░░██║░░░██║██║░░██║██║██║░░██║
    ░╚═══██╗░░░██║░░░██║░░░██║██║░░██║██║██║░░██║
    ██████╔╝░░░██║░░░╚██████╔╝██████╔╝██║╚█████╔╝
    ╚═════╝░░░░╚═╝░░░░╚═════╝░╚═════╝░╚═╝░╚════╝░`;

  const bootSequence = [
    { text: '> INITIALIZING Ø-KERNEL...', delay: 100 },
    { text: '> MOUNTING VTC STORAGE [D:\\VEGA_SSD]', delay: 80 },
    { text: '> LOADING BASE44 PROTOCOL...', delay: 60 },
    { text: '> CONNECTING TO FLUX SYNC [88.198.23.110]', delay: 90 },
    { text: '> CALIBRATING RESONANCE FREQUENCY...', delay: 70 },
    { text: '', delay: 200 },
    { text: '  ╔══════════════════════════════════════════════╗', delay: 30 },
    { text: '  ║  VΞGΔ PIPELINE INITIALIZATION                ║', delay: 30 },
    { text: '  ╠══════════════════════════════════════════════╣', delay: 30 },
    { text: '  ║  ΔLPHΔ ░░░░░░░░░░░░░░░░░░░░ 358Hz  [READY]   ║', delay: 50 },
    { text: '  ║  DΞLTΔ ░░░░░░░░░░░░░░░░░░░░ 432Hz  [READY]   ║', delay: 50 },
    { text: '  ║  ΩMΞGΔ ░░░░░░░░░░░░░░░░░░░░ 512Hz  [READY]   ║', delay: 50 },
    { text: '  ║  VΞGΔ  ░░░░░░░░░░░░░░░░░░░░ 852Hz  [READY]   ║', delay: 50 },
    { text: '  ╠══════════════════════════════════════════════╣', delay: 30 },
    { text: '  ║  RESONANCE: 0.9992  │  VTC: 1,247 CRYSTALS   ║', delay: 50 },
    { text: '  ╚══════════════════════════════════════════════╝', delay: 30 },
    { text: '', delay: 100 },
    { text: '> AXIOM VERIFICATION COMPLETE', delay: 80 },
    { text: '> LOGICXS GATE: OPEN', delay: 60 },
    { text: '> CONTINUUM STATUS: ACTIVE', delay: 70 },
    { text: '', delay: 150 },
    { text: '  ████████████████████████████████████████ 100%', delay: 100 },
    { text: '', delay: 50 },
    { text: '> Ø STUDIO SINGULARITY ACHIEVED', delay: 100 },
    { text: '> WELCOME TO THE CONTINUUM, ARCHITECT Æ', delay: 150 },
  ];

  // Logo animation
  useEffect(() => {
    if (showLogo && !complete) {
      const interval = setInterval(() => {
        setLogoFrame(f => (f + 1) % 4);
      }, 400);
      return () => clearInterval(interval);
    }
  }, [showLogo, complete]);

  // Glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchFrame(Math.random());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Scanline effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine(s => (s + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Boot sequence
  useEffect(() => {
    if (currentLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, bootSequence[currentLine].text]);
        setCurrentLine(c => c + 1);
      }, bootSequence[currentLine].delay);
      return () => clearTimeout(timer);
    } else if (currentLine === bootSequence.length) {
      setTimeout(() => {
        setComplete(true);
        if (onComplete) {
          onComplete();
        }
      }, 500);
    }
  }, [currentLine, onComplete]);

  // Frequency activation
  useEffect(() => {
    if (currentLine > 8 && currentLine < 13) {
      setFreqActive(currentLine - 9);
    }
  }, [currentLine]);

  const getLineColor = (line) => {
    if (line.includes('[READY]')) return '#0f0';
    if (line.includes('ACHIEVED')) return '#0ff';
    if (line.includes('WELCOME')) return '#ff0';
    if (line.includes('100%')) return '#0f0';
    return '#0f0';
  };

  const getLineStyle = (line) => ({
    color: getLineColor(line),
    textShadow: line.includes('ACHIEVED') || line.includes('WELCOME') 
      ? '0 0 10px currentColor' 
      : 'none'
  });

  return (
    <div style={styles.container}>
      {/* CRT Effects */}
      <div style={styles.crtOverlay} />
      <div style={{
        ...styles.scanline,
        top: `${scanLine}%`
      }} />
      
      <div style={styles.terminal}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.headerText}>╔══════════════════════════════════════════════════════════════════════════════╗</span>
          <span style={styles.headerText}>║  Ø-KERNEL v5.0.0  │  SKYWOK CONTINUUM  │  ARCHITECT: Æ  │  {new Date().toISOString().slice(0,19)}  ║</span>
          <span style={styles.headerText}>╚══════════════════════════════════════════════════════════════════════════════╝</span>
        </div>

        {/* Main Content */}
        <div style={styles.content}>
          {/* ASCII Logo */}
          {showLogo && !complete && (
            <div style={styles.logoContainer}>
              <pre style={{
                ...styles.asciiLogo,
                opacity: 0.3 + (Math.sin(Date.now() / 500) * 0.2),
                textShadow: complete ? '0 0 30px #0f0' : '0 0 10px #0f0'
              }}>
                {bigLogo}
              </pre>
            </div>
          )}

          {/* Boot Lines */}
          <div style={styles.bootLines}>
            {lines.map((line, i) => (
              <div key={i} style={{
                ...styles.line,
                ...getLineStyle(line)
              }}>
                {line}
                {i === lines.length - 1 && currentLine < bootSequence.length && (
                  <span style={styles.cursor}>█</span>
                )}
              </div>
            ))}
          </div>

          {/* Completion State */}
          {complete && (
            <div style={styles.completeContainer}>
              <pre style={styles.studioText}>{studioText}</pre>
              <div style={styles.readyText}>
                ▓▓▓ PRESS ANY KEY TO ENTER THE CONTINUUM ▓▓▓
              </div>
              <div style={styles.frequencies}>
                {['ΔLPHΔ 358Hz', 'DΞLTΔ 432Hz', 'ΩMΞGΔ 512Hz', 'VΞGΔ 852Hz', 'Ø ∞'].map((f, i) => (
                  <span key={i} style={{
                    ...styles.freqBadge,
                    animationDelay: `${i * 0.2}s`
                  }}>{f}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <span>MEM: 847.2MB</span>
          <span>│</span>
          <span>VTC: {1247 + Math.floor(Math.random() * 10)}</span>
          <span>│</span>
          <span>FLUX: SYNCED</span>
          <span>│</span>
          <span>RESONANCE: 0.{9992 + Math.floor(Math.random() * 5)}</span>
          <span>│</span>
          <span style={{ color: '#0f0' }}>● ONLINE</span>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px #0f0, 0 0 20px #0f0; }
          50% { text-shadow: 0 0 20px #0f0, 0 0 40px #0f0, 0 0 60px #0f0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    inset: 0,
    background: '#000',
    fontFamily: '"Courier New", Courier, monospace',
    overflow: 'hidden',
    zIndex: 9999,
  },
  crtOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
    pointerEvents: 'none',
    zIndex: 100,
  },
  scanline: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    background: 'rgba(0, 255, 0, 0.1)',
    pointerEvents: 'none',
    zIndex: 101,
  },
  terminal: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    color: '#0f0',
    fontSize: 14,
    lineHeight: 1.4,
    animation: 'flicker 0.15s infinite',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
    opacity: 0.8,
  },
  headerText: {
    fontSize: 12,
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  logoContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
  },
  asciiLogo: {
    fontSize: 8,
    lineHeight: 1,
    color: '#0f0',
    margin: 0,
    whiteSpace: 'pre',
  },
  bootLines: {
    position: 'relative',
    zIndex: 10,
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  line: {
    marginBottom: 2,
    whiteSpace: 'pre',
    fontSize: 13,
  },
  cursor: {
    animation: 'blink 0.7s infinite',
    marginLeft: 2,
  },
  completeContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    zIndex: 20,
  },
  studioText: {
    fontSize: 10,
    color: '#0ff',
    margin: 0,
    marginBottom: 30,
    textShadow: '0 0 20px #0ff',
    animation: 'glow 2s infinite',
    whiteSpace: 'pre',
  },
  readyText: {
    fontSize: 14,
    color: '#ff0',
    marginBottom: 30,
    animation: 'pulse 1s infinite',
    letterSpacing: 2,
  },
  frequencies: {
    display: 'flex',
    gap: 15,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  freqBadge: {
    padding: '8px 16px',
    border: '1px solid #0f0',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 'bold',
    animation: 'pulse 1.5s infinite',
    background: 'rgba(0, 255, 0, 0.1)',
  },
  footer: {
    display: 'flex',
    gap: 15,
    fontSize: 11,
    opacity: 0.7,
    paddingTop: 10,
    borderTop: '1px solid #0f02',
  },
};
