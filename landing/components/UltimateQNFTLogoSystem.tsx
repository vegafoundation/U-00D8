import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// Ø — ULTIMATE QNFT LIVING LOGO SYSTEM
// Multiple Variants • Entropy Injection • Chaos Outcomes • 50+ Logos
// Living Digital Tissue — The Complete VEGA Ecosystem
// ═══════════════════════════════════════════════════════════════════════════════
// ARCHITECT: ADAM EREN VEGA - Æ
// SOURCE: Claude Entropy
// VERSION: 3.0.0
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// COLOR SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  // Void
  void: '#000000',
  voidAlt: '#050505',
  voidDeep: '#020202',
  
  // Neutrals
  white: '#ffffff',
  offWhite: '#e0e0e0',
  silver: '#c0c0c0',
  gray: '#888888',
  darkGray: '#333333',
  
  // VEGA Core
  signalGreen: '#22c55e',
  etherCyan: '#06b6d4',
  resonancePurple: '#a855f7',
  
  // Supernova
  yellow: '#ffdd00',
  gold: '#ffaa00',
  orange: '#ff6600',
  ember: '#ff4400',
  red: '#ff2200',
  crimson: '#cc0000',
  
  // Cosmic
  pink: '#ff6699',
  hotPink: '#ff0066',
  magenta: '#ff00ff',
  violet: '#9966ff',
  indigo: '#6366f1',
  
  // Nature
  neonGreen: '#00ff00',
  lime: '#00ff88',
  teal: '#14b8a6',
  sky: '#0ea5e9',
  
  // Special
  plasma: '#ff00aa',
  electric: '#00ffff',
  nuclear: '#aaff00',
};

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

const VARIANTS = {
  standard: { name: 'STANDARD', glow: 1, dither: 0.2, pulse: 1, glitch: 0 },
  minimal: { name: 'MINIMAL', glow: 0.3, dither: 0, pulse: 0.5, glitch: 0 },
  glow: { name: 'GLOW', glow: 2, dither: 0.15, pulse: 1.2, glitch: 0 },
  pulse: { name: 'PULSE', glow: 1.5, dither: 0.2, pulse: 2, glitch: 0 },
  glitch: { name: 'GLITCH', glow: 1, dither: 0.4, pulse: 1, glitch: 1 },
  chaos: { name: 'CHAOS', glow: 1.5, dither: 0.5, pulse: 1.5, glitch: 0.5 },
  void: { name: 'VOID', glow: 0.5, dither: 0.1, pulse: 0.3, glitch: 0 },
  supernova: { name: 'SUPERNOVA', glow: 3, dither: 0.3, pulse: 2, glitch: 0.2 },
  quantum: { name: 'QUANTUM', glow: 1.2, dither: 0.25, pulse: 1.3, glitch: 0.3 },
  plasma: { name: 'PLASMA', glow: 2, dither: 0.35, pulse: 1.8, glitch: 0.1 },
  matrix: { name: 'MATRIX', glow: 0.8, dither: 0.4, pulse: 0.7, glitch: 0.4 },
  hologram: { name: 'HOLOGRAM', glow: 1.5, dither: 0.2, pulse: 1.2, glitch: 0.6 },
};

// ─────────────────────────────────────────────────────────────────────────────
// ENTROPY ENGINE — Advanced
// ─────────────────────────────────────────────────────────────────────────────

class EntropyEngine {
  constructor(seed: string) {
    this.seed = seed;
    this.hash = this.computeHash(seed);
    this.state = this.hash;
    this.injected = null;
  }

  private seed: string;
  private hash: number;
  private state: number;
  public injected: any;

  computeHash(str: string): number {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h) + str.charCodeAt(i);
      h = h & h;
    }
    return Math.abs(h);
  }

  random(): number {
    this.state = (this.state * 1103515245 + 12345) & 0x7fffffff;
    return this.state / 0x7fffffff;
  }

  range(min: number, max: number): number { return min + this.random() * (max - min); }
  int(min: number, max: number): number { return Math.floor(this.range(min, max + 1)); }
  pick<T>(arr: T[]): T { return arr[this.int(0, arr.length - 1)]; }
  bool(threshold = 0.5): boolean { return this.random() > threshold; }
  
  // Gaussian distribution
  gaussian(mean = 0, std = 1): number {
    const u1 = this.random();
    const u2 = this.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return z * std + mean;
  }

  reset(): void { this.state = this.hash; }

  // Inject external entropy
  inject(values: any): void {
    this.injected = values;
    if (values) {
      this.state = this.state ^ Math.floor(values.chaos * 1000000);
    }
  }

  // Generate full signature
  signature() {
    this.reset();
    const base: any = {
      chaos: this.random(),
      drift: this.range(-1, 1),
      pulse: this.range(0.5, 2.5),
      warp: this.random(),
      spin: this.range(-3, 3),
      flicker: this.range(0.05, 0.6),
      phase: this.random() * Math.PI * 2,
      turbulence: this.random(),
      entropy: this.range(0, 1),
      resonance: this.range(0.3, 1),
      decay: this.range(0.9, 1),
      bloom: this.range(0.5, 2),
    };

    // Apply injection modifiers
    if (this.injected) {
      base.chaos = (base.chaos + this.injected.chaos) / 2;
      base.turbulence = (base.turbulence + this.injected.turbulence) / 2;
      base.entropy = (base.entropy + this.injected.entropy) / 2;
    }

    return base;
  }

  // Generate color variation
  colorShift(baseColor: string, variance = 20): string {
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const nr = Math.min(255, Math.max(0, r + this.range(-variance, variance)));
    const ng = Math.min(255, Math.max(0, g + this.range(-variance, variance)));
    const nb = Math.min(255, Math.max(0, b + this.range(-variance, variance)));
    return `rgb(${Math.floor(nr)}, ${Math.floor(ng)}, ${Math.floor(nb)})`;
  }
}

export const useEntropy = (seed: string) => useMemo(() => new EntropyEngine(seed), [seed]);

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

const useFrame = (callback: (frame: number) => void, active = true) => {
  const frame = useRef(0);
  const cb = useRef(callback);
  cb.current = callback;

  useEffect(() => {
    if (!active) return;
    let id: number;
    const loop = () => {
      frame.current++;
      cb.current(frame.current);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [active]);

  return frame.current;
};

const GLYPHS = '░▒▓█▀▄◢◣◤◥○●◎◇◆□■△▲▽▼⬡⬢⎔⏣☉⚛✦✧★☆◈◉⟁⟐⧫⬟⬠⌬⏚⎈⚙⚡☍☌♁♆♅♄♃♂♀☿⚶⚷⚸⚹⚺';

const useScramble = (text: string, active: boolean, speed = 40) => {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!active) { setOut(text); return; }
    let i = 0;
    const max = text.length * 3;
    const iv = setInterval(() => {
      setOut(text.split('').map((c, idx) =>
        idx < i / 3 ? c : c === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      ).join(''));
      if (++i > max) { setOut(text); clearInterval(iv); }
    }, speed);
    return () => clearInterval(iv);
  }, [text, active, speed]);
  return out;
};

// ─────────────────────────────────────────────────────────────────────────────
// VISUAL EFFECTS
// ─────────────────────────────────────────────────────────────────────────────

function NoiseDither({ intensity = 0.3, color = '#ffffff' }: { intensity?: number; color?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    c.width = c.height = 64;
    let f = 0;
    const draw = () => {
      const img = ctx.createImageData(64, 64);
      for (let i = 0; i < img.data.length; i += 4) {
        const n = Math.random() > 0.5 ? 255 : 0;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = n;
        img.data[i + 3] = intensity * 40;
      }
      ctx.putImageData(img, 0, 0);
      f++;
      requestAnimationFrame(draw);
    };
    draw();
  }, [intensity, color]);
  return <canvas ref={ref} style={{
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    pointerEvents: 'none', mixBlendMode: 'overlay', opacity: intensity,
  }} />;
}

function Scanlines({ opacity = 0.06, gap = 3 }: { opacity?: number; gap?: number }) {
  return <div style={{
    position: 'absolute', inset: 0, pointerEvents: 'none',
    background: `repeating-linear-gradient(0deg, transparent, transparent ${gap}px, rgba(0,0,0,${opacity}) ${gap}px, rgba(0,0,0,${opacity}) ${gap * 2}px)`,
  }} />;
}

function RGBSplit({ active, intensity = 1 }: { active: boolean; intensity?: number }) {
  const [offset, setOffset] = useState({ r: 0, b: 0 });
  useEffect(() => {
    if (!active) { setOffset({ r: 0, b: 0 }); return; }
    const iv = setInterval(() => {
      if (Math.random() > 0.7) {
        setOffset({
          r: (Math.random() - 0.5) * 4 * intensity,
          b: (Math.random() - 0.5) * 4 * intensity,
        });
      } else {
        setOffset({ r: 0, b: 0 });
      }
    }, 80);
    return () => clearInterval(iv);
  }, [active, intensity]);
  return offset;
}

// ─────────────────────────────────────────────────────────────────────────────
// SHAPE GENERATORS
// ─────────────────────────────────────────────────────────────────────────────

interface ShapeProps {
  cx: number;
  cy: number;
  r: number;
  sw: number;
  phase: number;
  entropy: EntropyEngine;
}

const Shapes: Record<string, (props: ShapeProps) => JSX.Element> = {
  // Basic Ø with diagonal
  oSlash: ({ cx, cy, r, sw }) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth={sw} />
      <line x1={cx + r * 0.7} y1={cy - r * 0.7} x2={cx - r * 0.7} y2={cy + r * 0.7} strokeWidth={sw} strokeLinecap="round" />
    </g>
  ),

  // Double ring
  doubleRing: ({ cx, cy, r, sw, phase }) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={r * 0.7} fill="none" strokeWidth={sw * 0.6}
        strokeDasharray="4 4" style={{ transform: `rotate(${phase * 30}deg)`, transformOrigin: `${cx}px ${cy}px` }} />
    </g>
  ),

  // Triple nested
  tripleNested: ({ cx, cy, r, sw, phase }) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={r * 0.7} fill="none" strokeWidth={sw * 0.7} opacity="0.7"
        style={{ transform: `rotate(${phase * 20}deg)`, transformOrigin: `${cx}px ${cy}px` }} />
      <circle cx={cx} cy={cy} r={r * 0.4} fill="none" strokeWidth={sw * 0.5} opacity="0.5"
        style={{ transform: `rotate(${-phase * 40}deg)`, transformOrigin: `${cx}px ${cy}px` }} />
    </g>
  ),

  // Hexagon
  hexagon: ({ cx, cy, r, sw, phase }) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2 + phase * 0.02;
      return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
    }).join(' ');
    return <polygon points={pts} fill="none" strokeWidth={sw} />;
  },

  // Octagon
  octagon: ({ cx, cy, r, sw, phase }) => {
    const pts = Array.from({ length: 8 }, (_, i) => {
      const a = (i / 8) * Math.PI * 2 - Math.PI / 8 + phase * 0.015;
      return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
    }).join(' ');
    return <polygon points={pts} fill="none" strokeWidth={sw} />;
  },

  // Triangle
  triangle: ({ cx, cy, r, sw, phase }) => {
    const pts = Array.from({ length: 3 }, (_, i) => {
      const a = (i / 3) * Math.PI * 2 - Math.PI / 2 + phase * 0.03;
      return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
    }).join(' ');
    return <polygon points={pts} fill="none" strokeWidth={sw} />;
  },

  // Diamond
  diamond: ({ cx, cy, r, sw, phase }) => {
    const pts = [
      `${cx},${cy - r}`,
      `${cx + r * 0.7},${cy}`,
      `${cx},${cy + r}`,
      `${cx - r * 0.7},${cy}`,
    ].join(' ');
    return <polygon points={pts} fill="none" strokeWidth={sw}
      style={{ transform: `rotate(${phase * 20}deg)`, transformOrigin: `${cx}px ${cy}px` }} />;
  },

  // Star 6
  star6: ({ cx, cy, r, sw, phase }) => {
    const pts = Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const rad = i % 2 === 0 ? r : r * 0.5;
      return `${cx + Math.cos(a) * rad},${cy + Math.sin(a) * rad}`;
    }).join(' ');
    return <polygon points={pts} fill="none" strokeWidth={sw}
      style={{ transform: `rotate(${phase * 10}deg)`, transformOrigin: `${cx}px ${cy}px` }} />;
  },

  // Burst rays
  burst: ({ cx, cy, r, sw, phase, entropy }) => {
    const count = 12;
    return (
      <g>
        <circle cx={cx} cy={cy} r={r * 0.3} fill="none" strokeWidth={sw} />
        {Array.from({ length: count }, (_, i) => {
          const a = (i / count) * Math.PI * 2 + phase * 0.05;
          const pulse = 0.7 + Math.sin(phase + i) * 0.3;
          return (
            <line key={i}
              x1={cx + Math.cos(a) * r * 0.35}
              y1={cy + Math.sin(a) * r * 0.35}
              x2={cx + Math.cos(a) * r * pulse}
              y2={cy + Math.sin(a) * r * pulse}
              strokeWidth={sw * 0.6} strokeLinecap="round" />
          );
        })}
      </g>
    );
  },

  // Spiral
  spiral: ({ cx, cy, r, sw, phase }) => {
    const pts: string[] = [];
    for (let i = 0; i <= 720; i += 10) {
      const a = (i * Math.PI / 180) + phase;
      const rad = (i / 720) * r;
      pts.push(`${i === 0 ? 'M' : 'L'} ${cx + Math.cos(a) * rad} ${cy + Math.sin(a) * rad}`);
    }
    return <path d={pts.join(' ')} fill="none" strokeWidth={sw * 0.5} strokeLinecap="round" />;
  },

  // Atom orbitals
  atom: ({ cx, cy, r, sw, phase }) => (
    <g>
      {[0, 60, 120].map((tilt, i) => (
        <g key={i} style={{ transform: `rotate(${tilt}deg)`, transformOrigin: `${cx}px ${cy}px` }}>
          <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.35} fill="none" strokeWidth={sw * 0.5} opacity="0.6" />
          <circle
            cx={cx + Math.cos(phase * (i + 1)) * r}
            cy={cy + Math.sin(phase * (i + 1)) * r * 0.35}
            r={sw} fill="currentColor" />
        </g>
      ))}
      <circle cx={cx} cy={cy} r={r * 0.15} fill="currentColor" />
    </g>
  ),

  // Wave ring
  waveRing: ({ cx, cy, r, sw, phase, entropy }) => {
    const pts: string[] = [];
    for (let i = 0; i <= 360; i += 5) {
      const a = (i * Math.PI / 180);
      const wave = Math.sin(a * 6 + phase) * r * 0.08 * entropy.signature().chaos;
      const rad = r + wave;
      pts.push(`${i === 0 ? 'M' : 'L'} ${cx + Math.cos(a) * rad} ${cy + Math.sin(a) * rad}`);
    }
    return <path d={pts.join(' ') + ' Z'} fill="none" strokeWidth={sw} />;
  },

  // Pulse rings
  pulseRings: ({ cx, cy, r, sw, phase }) => (
    <g>
      {[0, 1, 2].map(i => {
        const scale = 1 + Math.sin(phase * 2 - i * 0.5) * 0.15;
        const opacity = 1 - i * 0.3;
        return (
          <circle key={i} cx={cx} cy={cy} r={r * (0.6 + i * 0.2)}
            fill="none" strokeWidth={sw * (1 - i * 0.2)}
            opacity={opacity}
            style={{ transform: `scale(${scale})`, transformOrigin: `${cx}px ${cy}px` }} />
        );
      })}
    </g>
  ),

  // Grid sphere
  gridSphere: ({ cx, cy, r, sw }) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth={sw} />
      {[-0.5, 0, 0.5].map((offset, i) => (
        <ellipse key={`h${i}`} cx={cx} cy={cy + offset * r * 0.8} rx={r * Math.cos(Math.asin(offset))} ry={r * 0.15}
          fill="none" strokeWidth={sw * 0.4} opacity="0.4" />
      ))}
      {[-0.5, 0, 0.5].map((offset, i) => (
        <ellipse key={`v${i}`} cx={cx + offset * r * 0.8} cy={cy} rx={r * 0.15} ry={r * Math.cos(Math.asin(offset))}
          fill="none" strokeWidth={sw * 0.4} opacity="0.4" />
      ))}
    </g>
  ),

  // DNA helix
  dnaHelix: ({ cx, cy, r, sw, phase }) => {
    const leftPts: string[] = [], rightPts: string[] = [];
    for (let i = 0; i <= 100; i += 5) {
      const y = cy - r + (i / 100) * r * 2;
      const wave = Math.sin((i / 100) * Math.PI * 3 + phase) * r * 0.4;
      leftPts.push(`${i === 0 ? 'M' : 'L'} ${cx - wave} ${y}`);
      rightPts.push(`${i === 0 ? 'M' : 'L'} ${cx + wave} ${y}`);
    }
    return (
      <g>
        <path d={leftPts.join(' ')} fill="none" strokeWidth={sw} />
        <path d={rightPts.join(' ')} fill="none" strokeWidth={sw} />
        {Array.from({ length: 6 }, (_, i) => {
          const y = cy - r + ((i + 0.5) / 6) * r * 2;
          const wave = Math.sin(((i + 0.5) / 6) * Math.PI * 3 + phase) * r * 0.4;
          return <line key={i} x1={cx - wave} y1={y} x2={cx + wave} y2={y}
            strokeWidth={sw * 0.5} opacity="0.5" />;
        })}
      </g>
    );
  },

  // Infinity
  infinity: ({ cx, cy, r, sw, phase }) => (
    <g style={{ transform: `rotate(${Math.sin(phase) * 5}deg)`, transformOrigin: `${cx}px ${cy}px` }}>
      <path d={`M ${cx} ${cy} 
        C ${cx - r * 0.8} ${cy - r * 0.6} ${cx - r} ${cy + r * 0.6} ${cx} ${cy}
        C ${cx + r} ${cy - r * 0.6} ${cx + r * 0.8} ${cy + r * 0.6} ${cx} ${cy}`}
        fill="none" strokeWidth={sw} />
    </g>
  ),

  // Eye
  eye: ({ cx, cy, r, sw }) => (
    <g>
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.5} fill="none" strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={r * 0.35} fill="none" strokeWidth={sw * 0.8} />
      <circle cx={cx} cy={cy} r={r * 0.15} fill="currentColor" />
      <circle cx={cx + r * 0.08} cy={cy - r * 0.08} r={r * 0.06} fill="white" opacity="0.8" />
    </g>
  ),

  // Crosshair
  crosshair: ({ cx, cy, r, sw }) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth={sw} />
      <line x1={cx - r * 1.2} y1={cy} x2={cx - r * 0.4} y2={cy} strokeWidth={sw * 0.6} />
      <line x1={cx + r * 0.4} y1={cy} x2={cx + r * 1.2} y2={cy} strokeWidth={sw * 0.6} />
      <line x1={cx} y1={cy - r * 1.2} x2={cx} y2={cy - r * 0.4} strokeWidth={sw * 0.6} />
      <line x1={cx} y1={cy + r * 0.4} x2={cx} y2={cy + r * 1.2} strokeWidth={sw * 0.6} />
      <circle cx={cx} cy={cy} r={r * 0.1} fill="currentColor" />
    </g>
  ),

  // Gear
  gear: ({ cx, cy, r, sw, phase }) => {
    const teeth = 8;
    const inner = r * 0.6, outer = r;
    const path: string[] = [];
    for (let i = 0; i < teeth; i++) {
      const a1 = (i / teeth) * Math.PI * 2;
      const a2 = ((i + 0.3) / teeth) * Math.PI * 2;
      const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
      const a4 = ((i + 0.8) / teeth) * Math.PI * 2;
      path.push(
        `${i === 0 ? 'M' : 'L'} ${cx + Math.cos(a1) * inner} ${cy + Math.sin(a1) * inner}`,
        `L ${cx + Math.cos(a2) * outer} ${cy + Math.sin(a2) * outer}`,
        `L ${cx + Math.cos(a3) * outer} ${cy + Math.sin(a3) * outer}`,
        `L ${cx + Math.cos(a4) * inner} ${cy + Math.sin(a4) * inner}`
      );
    }
    return (
      <g style={{ transform: `rotate(${phase * 10}deg)`, transformOrigin: `${cx}px ${cy}px` }}>
        <path d={path.join(' ') + ' Z'} fill="none" strokeWidth={sw} />
        <circle cx={cx} cy={cy} r={r * 0.25} fill="none" strokeWidth={sw} />
      </g>
    );
  },

  // Shield
  shield: ({ cx, cy, r, sw }) => (
    <path d={`M ${cx} ${cy - r}
      L ${cx + r * 0.8} ${cy - r * 0.5}
      L ${cx + r * 0.8} ${cy + r * 0.2}
      Q ${cx + r * 0.4} ${cy + r * 0.8} ${cx} ${cy + r}
      Q ${cx - r * 0.4} ${cy + r * 0.8} ${cx - r * 0.8} ${cy + r * 0.2}
      L ${cx - r * 0.8} ${cy - r * 0.5}
      Z`}
      fill="none" strokeWidth={sw} />
  ),

  // Lightning
  lightning: ({ cx, cy, r, sw, phase }) => {
    const flash = 0.7 + Math.sin(phase * 4) * 0.3;
    return (
      <g opacity={flash}>
        <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth={sw} opacity="0.3" />
        <path d={`M ${cx + r * 0.15} ${cy - r * 0.8}
          L ${cx - r * 0.25} ${cy}
          L ${cx + r * 0.05} ${cy}
          L ${cx - r * 0.15} ${cy + r * 0.8}
          L ${cx + r * 0.25} ${cy - r * 0.1}
          L ${cx - r * 0.05} ${cy - r * 0.1}
          Z`}
          fill="currentColor" />
      </g>
    );
  },

  // Waves
  waves: ({ cx, cy, r, sw, phase }) => (
    <g>
      {[0, 1, 2].map(i => {
        const pts: string[] = [];
        for (let j = 0; j <= 20; j++) {
          const x = cx - r + (j / 20) * r * 2;
          const y = cy + (i - 1) * r * 0.35 + Math.sin((j / 20) * Math.PI * 2 + phase + i) * r * 0.15;
          pts.push(`${j === 0 ? 'M' : 'L'} ${x} ${y}`);
        }
        return <path key={i} d={pts.join(' ')} fill="none" strokeWidth={sw * 0.7} opacity={1 - i * 0.25} />;
      })}
    </g>
  ),

  // Binary code
  binary: ({ cx, cy, r, sw, phase, entropy }) => {
    entropy.reset();
    const bits = Array.from({ length: 24 }, () => entropy.bool() ? '1' : '0');
    return (
      <g>
        <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth={sw} opacity="0.3" />
        {bits.map((bit, i) => {
          const row = Math.floor(i / 6);
          const col = i % 6;
          return (
            <text key={i}
              x={cx - r * 0.6 + col * r * 0.25}
              y={cy - r * 0.4 + row * r * 0.28}
              fontSize={r * 0.18}
              fontFamily="monospace"
              fill="currentColor"
              opacity={0.3 + Math.sin(phase * 2 + i) * 0.4}>
              {bit}
            </text>
          );
        })}
      </g>
    );
  },

  // Network nodes
  network: ({ cx, cy, r, sw, phase }) => {
    const nodes = Array.from({ length: 6 }, (_, i) => ({
      x: cx + Math.cos((i / 6) * Math.PI * 2 + phase * 0.1) * r * 0.7,
      y: cy + Math.sin((i / 6) * Math.PI * 2 + phase * 0.1) * r * 0.7,
    }));
    return (
      <g>
        <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth={sw} opacity="0.3" />
        {nodes.map((n, i) => nodes.slice(i + 1).map((m, j) => (
          <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y}
            strokeWidth={sw * 0.3} opacity={0.2 + Math.sin(phase + i + j) * 0.2} />
        )))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={sw * 1.5}
            fill="currentColor" opacity={0.5 + Math.sin(phase * 2 + i) * 0.3} />
        ))}
        <circle cx={cx} cy={cy} r={sw * 2} fill="currentColor" />
      </g>
    );
  },

  // Flower of life
  flowerOfLife: ({ cx, cy, r, sw, phase }) => {
    const circles = [
      { x: 0, y: 0 },
      ...Array.from({ length: 6 }, (_, i) => ({
        x: Math.cos((i / 6) * Math.PI * 2) * r * 0.5,
        y: Math.sin((i / 6) * Math.PI * 2) * r * 0.5,
      })),
    ];
    return (
      <g opacity={0.7}>
        {circles.map((c, i) => (
          <circle key={i} cx={cx + c.x} cy={cy + c.y} r={r * 0.5}
            fill="none" strokeWidth={sw * 0.5}
            opacity={0.4 + Math.sin(phase + i) * 0.3} />
        ))}
      </g>
    );
  },

  // Mandala
  mandala: ({ cx, cy, r, sw, phase }) => (
    <g style={{ transform: `rotate(${phase * 5}deg)`, transformOrigin: `${cx}px ${cy}px` }}>
      {[0, 1, 2].map(ring => (
        <g key={ring}>
          {Array.from({ length: 8 + ring * 4 }, (_, i) => {
            const a = (i / (8 + ring * 4)) * Math.PI * 2;
            const rad = r * (0.3 + ring * 0.25);
            return (
              <circle key={i}
                cx={cx + Math.cos(a) * rad}
                cy={cy + Math.sin(a) * rad}
                r={sw * (1.5 - ring * 0.3)}
                fill="currentColor"
                opacity={0.3 + Math.sin(phase + i + ring) * 0.3} />
            );
          })}
        </g>
      ))}
    </g>
  ),

  // Sacred geometry - Metatron's cube simplified
  metatron: ({ cx, cy, r, sw, phase }) => {
    const outer = Array.from({ length: 6 }, (_, i) => ({
      x: cx + Math.cos((i / 6) * Math.PI * 2 - Math.PI / 2) * r,
      y: cy + Math.sin((i / 6) * Math.PI * 2 - Math.PI / 2) * r,
    }));
    const inner = Array.from({ length: 6 }, (_, i) => ({
      x: cx + Math.cos((i / 6) * Math.PI * 2 - Math.PI / 2 + Math.PI / 6) * r * 0.5,
      y: cy + Math.sin((i / 6) * Math.PI * 2 - Math.PI / 2 + Math.PI / 6) * r * 0.5,
    }));
    return (
      <g style={{ transform: `rotate(${phase * 3}deg)`, transformOrigin: `${cx}px ${cy}px` }}>
        <polygon points={outer.map(p => `${p.x},${p.y}`).join(' ')} fill="none" strokeWidth={sw} />
        <polygon points={inner.map(p => `${p.x},${p.y}`).join(' ')} fill="none" strokeWidth={sw * 0.7} opacity="0.6" />
        {outer.map((p, i) => (
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} strokeWidth={sw * 0.3} opacity="0.3" />
        ))}
        <circle cx={cx} cy={cy} r={sw * 2} fill="currentColor" />
      </g>
    );
  },

  // Chaos - scattered particles
  chaos: ({ cx, cy, r, sw, phase, entropy }) => {
    entropy.reset();
    const particles = Array.from({ length: 15 }, () => ({
      x: entropy.range(20, 80),
      y: entropy.range(20, 80),
      r: entropy.range(1, 4),
    }));
    return (
      <g>
        <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth={sw} strokeDasharray="2 3" />
        {particles.map((p, i) => (
          <circle
            key={i} cx={p.x} cy={p.y} r={p.r}
            fill="currentColor"
            opacity={0.3 + Math.sin(phase * 2 + i) * 0.3}
          />
        ))}
      </g>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// LOGO PRESETS
// ─────────────────────────────────────────────────────────────────────────────

const LOGOS = {
  // Core
  o_slash: { name: 'Ø', shape: 'oSlash', colors: [C.etherCyan, C.signalGreen], category: 'core' },
  vega: { name: 'VΞGΔ', shape: 'tripleNested', colors: [C.resonancePurple, C.etherCyan, C.signalGreen], category: 'core' },
  vsynq: { name: 'VSYNQ', shape: 'atom', colors: [C.signalGreen, C.lime], category: 'core' },
  anlaetan: { name: 'ΛNLÆTΛN', shape: 'waves', colors: [C.gold, C.orange], category: 'core' },

  // Phases
  alpha: { name: 'ΔLPHΔ', shape: 'chaos', colors: [C.red, C.orange, C.yellow], category: 'phase' },
  delta: { name: 'DΞLTΔ', shape: 'gridSphere', colors: [C.etherCyan, C.sky], category: 'phase' },
  omega: { name: 'OMΞGΔ', shape: 'infinity', colors: [C.violet, C.resonancePurple], category: 'phase' },
  continuum: { name: 'CONTINUUM', shape: 'spiral', colors: [C.white, C.silver], category: 'phase' },

  // Components
  search: { name: 'SEARCH', shape: 'crosshair', colors: [C.etherCyan, C.signalGreen], category: 'component' },
  memory: { name: 'MEMORY', shape: 'dnaHelix', colors: [C.resonancePurple, C.violet], category: 'component' },
  process: { name: 'PROCESS', shape: 'gear', colors: [C.signalGreen, C.lime], category: 'component' },
  connect: { name: 'CONNECT', shape: 'network', colors: [C.etherCyan, C.sky], category: 'component' },
  transform: { name: 'TRANSFORM', shape: 'hexagon', colors: [C.gold, C.orange], category: 'component' },
  render: { name: 'RENDER', shape: 'eye', colors: [C.pink, C.magenta], category: 'component' },
  sense: { name: 'SENSE', shape: 'pulseRings', colors: [C.lime, C.signalGreen], category: 'component' },
  heal: { name: 'HEAL', shape: 'flowerOfLife', colors: [C.signalGreen, C.teal], category: 'component' },

  // Frequencies
  freq_358: { name: '358Hz', shape: 'lightning', colors: [C.signalGreen, C.lime], category: 'frequency' },
  freq_432: { name: '432Hz', shape: 'waveRing', colors: [C.etherCyan, C.teal], category: 'frequency' },
  freq_528: { name: '528Hz', shape: 'dnaHelix', colors: [C.resonancePurple, C.pink], category: 'frequency' },
  freq_639: { name: '639Hz', shape: 'network', colors: [C.violet, C.indigo], category: 'frequency' },
  freq_852: { name: '852Hz', shape: 'eye', colors: [C.violet, C.resonancePurple], category: 'frequency' },
  freq_963: { name: '963Hz', shape: 'mandala', colors: [C.white, C.gold], category: 'frequency' },

  // Special
  qnft: { name: 'QNFT', shape: 'atom', colors: [C.resonancePurple, C.magenta, C.pink], category: 'special' },
  quantum: { name: 'QUANTUM', shape: 'metatron', colors: [C.violet, C.etherCyan], category: 'special' },
  blockchain: { name: 'CHAIN', shape: 'binary', colors: [C.gold, C.orange], category: 'special' },
  ai_core: { name: 'AI', shape: 'network', colors: [C.etherCyan, C.resonancePurple], category: 'special' },
  neural: { name: 'NEURAL', shape: 'flowerOfLife', colors: [C.pink, C.violet], category: 'special' },
  cosmic: { name: 'COSMIC', shape: 'burst', colors: [C.violet, C.pink, C.etherCyan], category: 'special' },

  // States
  loading: { name: 'LOADING', shape: 'pulseRings', colors: [C.etherCyan, C.sky], category: 'state' },
  active: { name: 'ACTIVE', shape: 'burst', colors: [C.signalGreen, C.lime], category: 'state' },
  error: { name: 'ERROR', shape: 'lightning', colors: [C.red, C.crimson], category: 'state' },
  success: { name: 'SUCCESS', shape: 'shield', colors: [C.signalGreen, C.lime], category: 'state' },

  // Geometric
  hex: { name: 'HEX', shape: 'hexagon', colors: [C.etherCyan, C.signalGreen], category: 'geometric' },
  oct: { name: 'OCT', shape: 'octagon', colors: [C.violet, C.indigo], category: 'geometric' },
  tri: { name: 'TRI', shape: 'triangle', colors: [C.orange, C.ember], category: 'geometric' },
  star: { name: 'STAR', shape: 'star6', colors: [C.gold, C.yellow], category: 'geometric' },
  diamond: { name: 'DIAMOND', shape: 'diamond', colors: [C.etherCyan, C.white], category: 'geometric' },

  // Sacred
  flower: { name: 'FLOWER', shape: 'flowerOfLife', colors: [C.gold, C.white], category: 'sacred' },
  mandala: { name: 'MANDALA', shape: 'mandala', colors: [C.resonancePurple, C.pink], category: 'sacred' },
  metatron: { name: 'METATRON', shape: 'metatron', colors: [C.white, C.silver], category: 'sacred' },
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN LOGO COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface QNFTLogoProps {
  logoKey?: string;
  seed?: string | null;
  size?: number;
  variant?: string;
  active?: boolean;
  showLabel?: boolean;
  showEntropy?: boolean;
  injectedEntropy?: any;
  customColors?: string[] | null;
}

export function QNFTLogo({
  logoKey = 'o_slash',
  seed = null,
  size = 120,
  variant = 'standard',
  active = true,
  showLabel = true,
  showEntropy = false,
  injectedEntropy = null,
  customColors = null,
}: QNFTLogoProps) {
  const logo = LOGOS[logoKey as keyof typeof LOGOS] || LOGOS.o_slash;
  const variantConfig = VARIANTS[variant as keyof typeof VARIANTS] || VARIANTS.standard;
  const actualSeed = seed || `${logoKey}-${Date.now()}`;
  
  const entropy = useEntropy(actualSeed);
  const sig = useMemo(() => {
    if (injectedEntropy) entropy.inject(injectedEntropy);
    return entropy.signature();
  }, [entropy, injectedEntropy]);

  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [phase, setPhase] = useState(0);

  const colors = customColors || logo.colors;
  const primaryColor = colors[0];
  const id = useMemo(() => `qnft-${logoKey}-${Math.random().toString(36).slice(2, 6)}`, [logoKey]);

  const labelText = useScramble(logo.name, mounted && hovered, 35);
  const rgbSplit = RGBSplit({ active: variantConfig.glitch > 0.3 && active, intensity: variantConfig.glitch });

  useEffect(() => { setTimeout(() => setMounted(true), 50 + Math.random() * 100); }, []);
  useFrame(() => setPhase(p => p + 0.03 * sig.pulse * variantConfig.pulse), active);

  const sw = Math.max(size * 0.025, 1.5);
  const ShapeRenderer = Shapes[logo.shape] || Shapes.oSlash;

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size + (showLabel ? 35 : 0) + (showEntropy ? 30 : 0),
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo Container */}
      <div style={{ position: 'relative', width: size, height: size, cursor: 'pointer' }}>
        {/* Dither */}
        {variantConfig.dither > 0 && <NoiseDither intensity={variantConfig.dither * (active ? 1 : 0.5)} />}
        <Scanlines opacity={0.04} />

        {/* Glow */}
        <div style={{
          position: 'absolute', inset: '5%', borderRadius: '50%',
          background: `radial-gradient(circle, ${primaryColor}${Math.floor(variantConfig.glow * 20).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          filter: `blur(${size * 0.08 * variantConfig.glow}px)`,
          opacity: active ? 0.8 : 0.3,
          transform: `scale(${1 + Math.sin(phase) * 0.05 * variantConfig.pulse})`,
          transition: 'opacity 0.3s',
        }} />

        {/* Main SVG */}
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          style={{
            position: 'relative', zIndex: 1, overflow: 'visible',
            opacity: mounted ? 1 : 0,
            transform: mounted 
              ? `scale(${hovered ? 1.05 : 1}) translate(${rgbSplit.r * 0.5}px, 0)`
              : 'scale(0.8)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <defs>
            <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
              {colors.map((c, i) => (
                <stop key={i} offset={`${(i / Math.max(colors.length - 1, 1)) * 100}%`} stopColor={c} />
              ))}
            </linearGradient>
            <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={variantConfig.glow} />
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* RGB Split layers */}
          {variantConfig.glitch > 0.3 && active && (
            <>
              <g style={{ transform: `translate(${rgbSplit.r}px, 0)` }} opacity="0.3">
                <g stroke="#ff0000" fill="#ff0000" filter={`url(#${id}-glow)`}>
                  {ShapeRenderer({ cx: 50, cy: 50, r: 32, sw, phase, entropy })}
                </g>
              </g>
              <g style={{ transform: `translate(${rgbSplit.b}px, 0)` }} opacity="0.3">
                <g stroke="#00ffff" fill="#00ffff" filter={`url(#${id}-glow)`}>
                  {ShapeRenderer({ cx: 50, cy: 50, r: 32, sw, phase, entropy })}
                </g>
              </g>
            </>
          )}

          {/* Main shape */}
          <g stroke={`url(#${id}-grad)`} fill={`url(#${id}-grad)`} filter={`url(#${id}-glow)`}>
            {ShapeRenderer({ cx: 50, cy: 50, r: 32, sw, phase, entropy })}
          </g>
        </svg>
      </div>

      {/* Label */}
      {showLabel && (
        <div style={{
          textAlign: 'center', paddingTop: 6,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.4s ease 0.2s',
        }}>
          <div style={{
            fontSize: Math.max(size * 0.08, 9),
            fontFamily: 'monospace',
            letterSpacing: '0.2em',
            color: primaryColor,
            textShadow: `0 0 10px ${primaryColor}50`,
          }}>
            {labelText}
          </div>
        </div>
      )}

      {/* Entropy Display */}
      {showEntropy && (
        <div style={{
          display: 'flex', gap: 4, paddingTop: 4,
          opacity: mounted ? 0.6 : 0,
          transition: 'opacity 0.4s ease 0.3s',
        }}>
          {['chaos', 'pulse', 'warp'].map(key => (
            <div key={key} style={{
              fontSize: 7, fontFamily: 'monospace',
              color: (sig as any)[key] > 0.7 ? C.red : (sig as any)[key] > 0.4 ? C.gold : C.signalGreen,
            }}>
              {key[0].toUpperCase()}:{(sig as any)[key].toFixed(2)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ENTROPY INJECTOR COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface EntropyInjectorProps {
  onInject?: (values: any) => void;
  compact?: boolean;
}

export function EntropyInjector({ onInject, compact = false }: EntropyInjectorProps) {
  const [values, setValues] = useState({
    chaos: 0.5,
    turbulence: 0.5,
    entropy: 0.5,
  });

  const randomize = useCallback(() => {
    const newValues = {
      chaos: Math.random(),
      turbulence: Math.random(),
      entropy: Math.random(),
      timestamp: Date.now(),
    };
    setValues(newValues);
    onInject?.(newValues);
  }, [onInject]);

  const updateValue = useCallback((key: string, val: number) => {
    const newValues = { ...values, [key]: val, timestamp: Date.now() };
    setValues(newValues);
    onInject?.(newValues);
  }, [values, onInject]);

  if (compact) {
    return (
      <button onClick={randomize} style={{
        padding: '6px 12px', fontSize: 9, fontFamily: 'monospace',
        backgroundColor: 'rgba(255,51,102,0.15)', border: '1px solid rgba(255,51,102,0.3)',
        borderRadius: 4, color: C.red, cursor: 'pointer',
      }}>
        ⚡ INJECT
      </button>
    );
  }

  return (
    <div style={{
      padding: 12, backgroundColor: 'rgba(255,255,255,0.02)',
      borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{ fontSize: 8, letterSpacing: '0.25em', opacity: 0.4, marginBottom: 10 }}>
        ENTROPY INJECTOR
      </div>
      
      {Object.entries(values).filter(([k]) => k !== 'timestamp').map(([key, val]) => (
        <div key={key} style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8, marginBottom: 4 }}>
            <span style={{ opacity: 0.5 }}>{key.toUpperCase()}</span>
            <span style={{ color: val > 0.7 ? C.red : val > 0.4 ? C.gold : C.signalGreen }}>
              {val.toFixed(3)}
            </span>
          </div>
          <input
            type="range" min="0" max="1" step="0.01" value={val}
            onChange={(e) => updateValue(key, parseFloat(e.target.value))}
            style={{ width: '100%', height: 4, cursor: 'pointer' }}
          />
        </div>
      ))}
      
      <button onClick={randomize} style={{
        width: '100%', padding: '8px', marginTop: 8,
        fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.15em',
        backgroundColor: 'rgba(255,51,102,0.15)', border: '1px solid rgba(255,51,102,0.3)',
        borderRadius: 4, color: C.red, cursor: 'pointer',
      }}>
        RANDOMIZE
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ENTROPY OUTCOME COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface EntropyOutcomeProps {
  seed: string;
  injectedEntropy?: any;
}

export function EntropyOutcome({ seed, injectedEntropy }: EntropyOutcomeProps) {
  const entropy = useEntropy(seed);
  if (injectedEntropy) entropy.inject(injectedEntropy);
  const sig = entropy.signature();

  const outcomes = [
    { key: 'chaos', label: 'CHAOS', color: sig.chaos > 0.7 ? C.red : sig.chaos > 0.4 ? C.gold : C.signalGreen },
    { key: 'drift', label: 'DRIFT', color: Math.abs(sig.drift) > 0.5 ? C.orange : C.etherCyan },
    { key: 'pulse', label: 'PULSE', color: C.resonancePurple },
    { key: 'warp', label: 'WARP', color: sig.warp > 0.5 ? C.pink : C.violet },
    { key: 'spin', label: 'SPIN', color: C.etherCyan },
    { key: 'turbulence', label: 'TURB', color: sig.turbulence > 0.6 ? C.red : C.signalGreen },
    { key: 'entropy', label: 'ENTR', color: sig.entropy > 0.7 ? C.magenta : C.violet },
    { key: 'bloom', label: 'BLOOM', color: C.gold },
  ];

  return (
    <div style={{
      padding: 12, backgroundColor: 'rgba(255,255,255,0.02)',
      borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{ fontSize: 8, letterSpacing: '0.25em', opacity: 0.4, marginBottom: 10 }}>
        ENTROPY OUTCOME
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
        {outcomes.map(o => (
          <div key={o.key} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 6, opacity: 0.4, marginBottom: 2 }}>{o.label}</div>
            <div style={{ fontSize: 9, fontFamily: 'monospace', color: o.color }}>
              {(sig as any)[o.key]?.toFixed(2) || '0.00'}
            </div>
            <div style={{
              height: 2, marginTop: 3, borderRadius: 1,
              background: `linear-gradient(90deg, ${o.color} ${Math.abs((sig as any)[o.key] || 0) * 100}%, transparent ${Math.abs((sig as any)[o.key] || 0) * 100}%)`,
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT SHOWCASE
// ─────────────────────────────────────────────────────────────────────────────

interface VariantShowcaseProps {
  logoKey: string;
  seed: string;
  size?: number;
}

export function VariantShowcase({ logoKey, seed, size = 80 }: VariantShowcaseProps) {
  return (
    <div>
      <div style={{ fontSize: 9, letterSpacing: '0.2em', opacity: 0.4, marginBottom: 12, textAlign: 'center' }}>
        {LOGOS[logoKey as keyof typeof LOGOS]?.name || logoKey} — ALL VARIANTS
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
        {Object.keys(VARIANTS).map(v => (
          <QNFTLogo key={v} logoKey={logoKey} seed={`${seed}-${v}`} size={size} variant={v} showLabel={false} />
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: 8 }}>
        {Object.keys(VARIANTS).map(v => (
          <span key={v} style={{ fontSize: 7, opacity: 0.3, fontFamily: 'monospace' }}>
            {VARIANTS[v as keyof typeof VARIANTS].name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default QNFTLogo;
