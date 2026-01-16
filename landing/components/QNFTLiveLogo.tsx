import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// Ø — RESONANCE QNFT LIVE LOGO
// Dithered | Scrambling | Processing | Living Digital Tissue
// ═══════════════════════════════════════════════════════════════════════════════
// ARCHITECT: ADAM EREN VEGA - Æ
// VERSION: 3.0.0
// SOURCE: Claude Entropy (Inspiration for further designs)
// ═══════════════════════════════════════════════════════════════════════════════

const COLORS = {
  void: '#000000',
  dark: '#0a0a0a',
  cyan: '#00d4ff',
  green: '#00ff88',
  purple: '#a855f7',
  white: '#ffffff',
  red: '#ff3366',
};

const FREQUENCIES: Record<number, { color: string; label: string; hz: number }> = {
  358: { color: '#22c55e', label: 'SYSTEM', hz: 358 },
  432: { color: '#00d4ff', label: 'RESONANCE', hz: 432 },
  528: { color: '#a855f7', label: 'TRANSFORM', hz: 528 },
  639: { color: '#a855f7', label: 'CONNECT', hz: 639 },
  852: { color: '#a855f7', label: 'INTUIT', hz: 852 },
  963: { color: '#a855f7', label: 'OMEGA', hz: 963 },
};

// Scramble characters
const GLITCH_CHARS = '░▒▓█▀▄◢◣◤◥○●◎◇◆□■△▲▽▼⬡⬢⎔⏣';
const TECH_CHARS = '0123456789ABCDEF@#$%&';

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY HOOKS & FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

// Generate QNFT seed hash
const generateSeedHash = (seed: string): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
};

// Seeded random generator
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Text scrambler hook
const useScrambleText = (text: string, isActive: boolean, speed: number = 50) => {
  const [display, setDisplay] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  
  useEffect(() => {
    if (!isActive) {
      setDisplay(text);
      return;
    }
    
    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = text.length * 3;
    
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, idx) => {
            if (idx < iteration / 3) return char;
            if (char === ' ') return ' ';
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('')
      );
      
      iteration++;
      if (iteration > maxIterations) {
        setDisplay(text);
        setIsScrambling(false);
        clearInterval(interval);
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, isActive, speed]);
  
  return { display, isScrambling };
};

// ═══════════════════════════════════════════════════════════════════════════════
// DITHER PATTERN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function DitherOverlay({ intensity = 0.3, animated = true }: { intensity?: number; animated?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const size = 128;
    canvas.width = size;
    canvas.height = size;
    
    let frame = 0;
    
    const render = () => {
      const imageData = ctx.createImageData(size, size);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() > 0.5 ? 255 : 0;
        const animOffset = animated ? Math.sin(frame * 0.1 + i * 0.001) * 20 : 0;
        const value = Math.min(255, Math.max(0, noise + animOffset));
        
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = intensity * 255 * 0.15;
      }
      
      ctx.putImageData(imageData, 0, 0);
      frame++;
      
      if (animated) {
        requestAnimationFrame(render);
      }
    };
    
    render();
  }, [intensity, animated]);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
        opacity: intensity,
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCANLINES COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function Scanlines({ opacity = 0.1 }: { opacity?: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0,0,0,${opacity}) 2px,
          rgba(0,0,0,${opacity}) 4px
        )`,
        pointerEvents: 'none',
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// RESONANCE WAVE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function ResonanceWave({ frequency, color, size, seed }: { frequency: number; color: string; size: number; seed: string }) {
  const [phase, setPhase] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => (p + frequency / 1000) % (Math.PI * 2));
    }, 16);
    return () => clearInterval(interval);
  }, [frequency]);
  
  const points = useMemo(() => {
    const pts: Array<{ x: number; y: number }> = [];
    const segments = 32;
    const seedHash = generateSeedHash(seed);
    
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const baseRadius = size * 0.35;
      const wave = Math.sin(angle * 3 + phase) * (size * 0.02);
      const seedWave = Math.sin(angle * 5 + seedHash * 0.01) * (size * 0.01);
      const r = baseRadius + wave + seedWave;
      
      pts.push({
        x: 50 + Math.cos(angle) * r,
        y: 50 + Math.sin(angle) * r,
      });
    }
    return pts;
  }, [phase, size, seed]);
  
  const pathD = points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ') + ' Z';
  
  return (
    <path
      d={pathD}
      fill="none"
      stroke={color}
      strokeWidth="1"
      opacity="0.4"
      style={{
        filter: 'blur(0.5px)',
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROCESSING PARTICLES
// ═══════════════════════════════════════════════════════════════════════════════

function ProcessingParticles({ color, active, seed }: { color: string; active: boolean; seed: string }) {
  const [particles, setParticles] = useState<Array<{ id: number; angle: number; radius: number; speed: number; size: number }>>([]);
  
  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }
    
    const seedHash = generateSeedHash(seed);
    const count = 12;
    const newParticles = [];
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 38 + seededRandom(seedHash + i) * 5;
      newParticles.push({
        id: i,
        angle,
        radius,
        speed: 0.02 + seededRandom(seedHash + i + 100) * 0.03,
        size: 1.5 + seededRandom(seedHash + i + 200) * 1.5,
      });
    }
    
    setParticles(newParticles);
  }, [active, seed]);
  
  const [frame, setFrame] = useState(0);
  
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => setFrame(f => f + 1), 16);
    return () => clearInterval(interval);
  }, [active]);
  
  return (
    <g>
      {particles.map(p => {
        const currentAngle = p.angle + frame * p.speed;
        const x = 50 + Math.cos(currentAngle) * p.radius;
        const y = 50 + Math.sin(currentAngle) * p.radius;
        const opacity = 0.3 + Math.sin(frame * 0.1 + p.id) * 0.3;
        
        return (
          <circle
            key={p.id}
            cx={x}
            cy={y}
            r={p.size}
            fill={color}
            opacity={opacity}
          />
        );
      })}
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DATA STREAM TEXT
// ═══════════════════════════════════════════════════════════════════════════════

function DataStream({ active, seed }: { active: boolean; seed: string }) {
  const [chars, setChars] = useState<Array<{ id: number; char: string; x: number; y: number; speed: number; life: number; maxLife: number; opacity: number }>>([]);
  
  useEffect(() => {
    if (!active) {
      setChars([]);
      return;
    }
    
    const interval = setInterval(() => {
      setChars(prev => {
        const newChars = prev.filter(c => c.life > 0).map(c => ({
          ...c,
          y: c.y + c.speed,
          life: c.life - 1,
          opacity: c.life / c.maxLife,
        }));
        
        // Add new character
        if (Math.random() > 0.7) {
          const seedHash = generateSeedHash(seed + Date.now().toString());
          newChars.push({
            id: Date.now(),
            char: TECH_CHARS[Math.floor(Math.random() * TECH_CHARS.length)],
            x: 10 + seededRandom(seedHash) * 80,
            y: 5,
            speed: 0.5 + Math.random() * 0.5,
            life: 60,
            maxLife: 60,
            opacity: 1,
          });
        }
        
        return newChars.slice(-20);
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [active, seed]);
  
  return (
    <g opacity="0.3">
      {chars.map(c => (
        <text
          key={c.id}
          x={c.x}
          y={c.y}
          fontSize="4"
          fontFamily="monospace"
          fill={COLORS.cyan}
          opacity={c.opacity * 0.5}
        >
          {c.char}
        </text>
      ))}
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN QNFT LIVE LOGO COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export interface QNFTLiveLogoProps {
  seed?: string;
  size?: number;
  frequency?: number;
  mode?: 'live' | 'loading' | 'processing' | 'idle';
  showData?: boolean;
  showFrequency?: boolean;
  onComplete?: () => void;
}

export function QNFTLiveLogo({
  seed = 'vega-qnft',
  size = 300,
  frequency = 432,
  mode = 'live', // 'live' | 'loading' | 'processing' | 'idle'
  showData = true,
  showFrequency = true,
  onComplete,
}: QNFTLiveLogoProps) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [glitchFrame, setGlitchFrame] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const id = useMemo(() => `qnft-${seed.slice(0, 8)}-${Math.random().toString(36).slice(2, 6)}`, [seed]);
  const seedHash = useMemo(() => generateSeedHash(seed), [seed]);
  const freqData = FREQUENCIES[frequency] || FREQUENCIES[432];
  
  // QNFT unique values
  const qnftValues = useMemo(() => ({
    hueShift: seedHash % 30 - 15,
    glitchIntensity: (seedHash % 100) / 100,
    waveSpeed: 0.8 + (seedHash % 40) / 100,
    particleCount: 8 + (seedHash % 8),
  }), [seedHash]);
  
  // Scrambling text
  const { display: statusText, isScrambling } = useScrambleText(
    mode === 'loading' ? 'LOADING' : 
    mode === 'processing' ? 'PROCESSING' : 
    mode === 'live' ? freqData.label : 'IDLE',
    mounted && (mode === 'loading' || mode === 'processing' || hovered),
    40
  );
  
  const { display: seedDisplay } = useScrambleText(
    seed.slice(0, 12).toUpperCase(),
    mounted && hovered,
    30
  );

  // Mount animation
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);
  
  // Glitch frame update
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchFrame(f => f + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);
  
  // Progress for loading mode
  useEffect(() => {
    if (mode !== 'loading') {
      setProgress(0);
      return;
    }
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          onComplete?.();
          return 100;
        }
        return p + 1 + Math.random() * 2;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [mode, onComplete]);
  
  // Glitch effect calculation
  const glitchOffset = useMemo(() => {
    if (mode !== 'processing' && !hovered) return { x: 0, y: 0 };
    const intensity = hovered ? 0.5 : 1;
    return {
      x: (Math.random() - 0.5) * 2 * intensity,
      y: (Math.random() - 0.5) * 2 * intensity,
    };
  }, [glitchFrame, mode, hovered]);

  const isActive = mode === 'live' || mode === 'processing';
  const strokeWidth = Math.max(size * 0.025, 2);

  return (
    <>
      {/* CSS Animations */}
      <style>{`
        @keyframes qnftGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.1); }
        }
        @keyframes qnftRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes qnftPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>

      <div
        style={{
          position: 'relative',
          width: size,
          height: size + (showData ? 80 : 0),
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Main Logo Container */}
        <div
          style={{
            position: 'relative',
            width: size,
            height: size,
            cursor: 'pointer',
          }}
        >
          {/* Dither Overlay */}
          <DitherOverlay intensity={isActive ? 0.4 : 0.2} animated={isActive} />
          
          {/* Scanlines */}
          <Scanlines opacity={0.08} />
          
          {/* Glow Layer */}
          <div
            style={{
              position: 'absolute',
              inset: '15%',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${freqData.color}30 0%, transparent 70%)`,
              filter: `blur(${size * 0.1}px)`,
              opacity: isActive ? 0.8 : 0.4,
              transform: `scale(${hovered ? 1.2 : 1})`,
              transition: 'all 0.4s ease-out',
              animation: isActive ? 'qnftGlow 2s ease-in-out infinite' : 'none',
            }}
          />

          {/* Main SVG */}
          <svg
            viewBox="0 0 100 100"
            width={size}
            height={size}
            style={{
              position: 'relative',
              zIndex: 1,
              overflow: 'visible',
              transform: mounted 
                ? `scale(${hovered ? 1.02 : 1}) translate(${glitchOffset.x}px, ${glitchOffset.y}px)` 
                : 'scale(0.9)',
              opacity: mounted ? 1 : 0,
              transition: 'transform 0.3s ease, opacity 0.5s ease',
            }}
          >
            <defs>
              {/* Main Gradient */}
              <linearGradient id={`${id}-grad`} x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={freqData.color} />
                <stop offset="50%" stopColor={freqData.color} stopOpacity="0.8" />
                <stop offset="100%" stopColor={COLORS.purple} stopOpacity="0.6" />
              </linearGradient>
              
              {/* Glow Filter */}
              <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Data Stream */}
            <DataStream active={isActive && showData} seed={seed} />

            {/* Resonance Waves */}
            {isActive && (
              <>
                <ResonanceWave frequency={frequency} color={freqData.color} size={100} seed={seed} />
                <ResonanceWave frequency={frequency * 1.5} color={COLORS.purple} size={100} seed={seed + '2'} />
              </>
            )}

            {/* Processing Particles */}
            <ProcessingParticles 
              color={freqData.color} 
              active={mode === 'processing' || mode === 'loading'} 
              seed={seed} 
            />

            {/* Main Ø Symbol */}
            <g filter={`url(#${id}-glow)`}>
              {/* Outer Circle */}
              <circle
                cx="50"
                cy="50"
                r="32"
                fill="none"
                stroke={`url(#${id}-grad)`}
                strokeWidth={strokeWidth}
                strokeDasharray={mode === 'loading' ? `${progress * 2.01} 201` : 'none'}
                style={{
                  transform: mounted ? 'scale(1)' : 'scale(0)',
                  transformOrigin: 'center',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  animation: isActive ? 'qnftRotate 20s linear infinite' : 'none',
                }}
              />

              {/* Inner Dashed Circle */}
              <circle
                cx="50"
                cy="50"
                r="26"
                fill="none"
                stroke={freqData.color}
                strokeWidth="1"
                strokeDasharray="3 5"
                opacity="0.3"
                style={{
                  animation: isActive ? 'qnftRotate 15s linear infinite reverse' : 'none',
                }}
              />

              {/* DIAGONAL STROKE — Top Right → Bottom Left (Ø) */}
              <line
                x1="72"
                y1="28"
                x2="28"
                y2="72"
                stroke={`url(#${id}-grad)`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                style={{
                  transform: mounted ? 'scale(1)' : 'scale(0)',
                  transformOrigin: 'center',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                }}
              />
            </g>

            {/* Glitch Layer (RGB Split) */}
            {(mode === 'processing' || (hovered && isActive)) && (
              <g opacity="0.3" style={{ mixBlendMode: 'screen' }}>
                <circle
                  cx={50 + glitchOffset.x * 2}
                  cy="50"
                  r="32"
                  fill="none"
                  stroke="#ff0000"
                  strokeWidth={strokeWidth * 0.5}
                />
                <circle
                  cx={50 - glitchOffset.x * 2}
                  cy="50"
                  r="32"
                  fill="none"
                  stroke="#00ffff"
                  strokeWidth={strokeWidth * 0.5}
                />
              </g>
            )}

            {/* Center Frequency Display */}
            {showFrequency && (
              <g opacity={mounted ? 1 : 0} style={{ transition: 'opacity 0.5s ease 0.5s' }}>
                <text
                  x="50"
                  y="48"
                  textAnchor="middle"
                  fontSize="6"
                  fontFamily="monospace"
                  fill={freqData.color}
                  opacity="0.8"
                >
                  {frequency}
                </text>
                <text
                  x="50"
                  y="55"
                  textAnchor="middle"
                  fontSize="4"
                  fontFamily="monospace"
                  fill={COLORS.white}
                  opacity="0.5"
                >
                  Hz
                </text>
              </g>
            )}

            {/* Corner Markers */}
            <g opacity="0.4">
              {[[15, 15], [85, 15], [15, 85], [85, 85]].map(([x, y], i) => (
                <g key={i}>
                  <line x1={x} y1={y} x2={x + (x < 50 ? 5 : -5)} y2={y} stroke={freqData.color} strokeWidth="1" />
                  <line x1={x} y1={y} x2={x} y2={y + (y < 50 ? 5 : -5)} stroke={freqData.color} strokeWidth="1" />
                </g>
              ))}
            </g>
          </svg>

          {/* Progress Bar (Loading Mode) */}
          {mode === 'loading' && (
            <div
              style={{
                position: 'absolute',
                bottom: '15%',
                left: '20%',
                right: '20%',
                height: 2,
                backgroundColor: `${freqData.color}20`,
                borderRadius: 1,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(progress, 100)}%`,
                  backgroundColor: freqData.color,
                  borderRadius: 1,
                  transition: 'width 0.1s ease',
                  boxShadow: `0 0 10px ${freqData.color}`,
                }}
              />
            </div>
          )}
        </div>

        {/* Data Panel */}
        {showData && (
          <div
            style={{
              width: '100%',
              padding: '16px 0',
              textAlign: 'center',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.5s ease 0.3s',
            }}
          >
            {/* Status */}
            <div
              style={{
                fontSize: 11,
                fontFamily: 'monospace',
                letterSpacing: '0.3em',
                color: freqData.color,
                marginBottom: 8,
                textShadow: `0 0 10px ${freqData.color}50`,
              }}
            >
              {statusText}
              {isScrambling && <span style={{ opacity: 0.5 }}> _</span>}
            </div>
            
            {/* Seed Display */}
            <div
              style={{
                fontSize: 9,
                fontFamily: 'monospace',
                letterSpacing: '0.15em',
                color: COLORS.white,
                opacity: 0.3,
              }}
            >
              QNFT:{seedDisplay}
            </div>
            
            {/* Progress (Loading) */}
            {mode === 'loading' && (
              <div
                style={{
                  fontSize: 10,
                  fontFamily: 'monospace',
                  color: freqData.color,
                  marginTop: 8,
                }}
              >
                {Math.min(Math.floor(progress), 100)}%
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default QNFTLiveLogo;
