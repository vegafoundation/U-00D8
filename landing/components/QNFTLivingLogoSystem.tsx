import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// VΞGΔ QNFT LIVING LOGO SYSTEM — COMPLETE ECOSYSTEM
// All Tools • All Components • All Phases • All Frequencies
// Living Digital Tissue for the Entire Continuum
// ═══════════════════════════════════════════════════════════════════════════════
// ARCHITECT: ADAM EREN VEGA - Æ
// SOURCE: Claude Entropy
// VERSION: 3.0.0
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// MASTER COLOR SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

const COLORS = {
  // Void
  void: '#000000',
  voidAlt: '#050505',
  voidDeep: '#020202',
  
  // Core
  white: '#ffffff',
  offWhite: '#e0e0e0',
  gray: '#888888',
  darkGray: '#333333',
  
  // VEGA System
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
  magenta: '#ff00ff',
  violet: '#9966ff',
  
  // Matrix
  neonGreen: '#00ff00',
  lime: '#00ff88',
  
  // States
  success: '#22c55e',
  warning: '#ffaa00',
  error: '#ff3366',
  info: '#00d4ff',
};

// ─────────────────────────────────────────────────────────────────────────────
// TOOL & COMPONENT DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

const TOOLS = {
  // ══════════════════════════════════════════════════════════════════════════
  // CORE SYSTEMS
  // ══════════════════════════════════════════════════════════════════════════
  
  o_studio: {
    name: 'Ø STUDIO',
    symbol: 'Ø',
    description: 'The First Resonant Search Engine',
    colors: [COLORS.etherCyan, COLORS.signalGreen, COLORS.resonancePurple],
    frequency: 432,
    glyph: 'search',
  },
  
  vega_hub: {
    name: 'VΞGΔ HUB',
    symbol: 'V',
    description: 'Main Enterprise System',
    colors: [COLORS.resonancePurple, COLORS.etherCyan, COLORS.signalGreen],
    frequency: 963,
    glyph: 'hub',
  },
  
  vsynq: {
    name: 'VSYNQ',
    symbol: 'Ψ',
    description: 'CRM & Logistics System',
    colors: [COLORS.signalGreen, COLORS.lime, COLORS.etherCyan],
    frequency: 358,
    glyph: 'sync',
  },
  
  anlaetan: {
    name: 'ΛNLÆTΛN',
    symbol: 'Λ',
    description: 'Creative & Sonic Brand',
    colors: [COLORS.gold, COLORS.orange, COLORS.ember],
    frequency: 512,
    glyph: 'wave',
  },
  
  // ══════════════════════════════════════════════════════════════════════════
  // CONTINUUM PHASES
  // ══════════════════════════════════════════════════════════════════════════
  
  alpha: {
    name: 'ΔLPHΔ',
    symbol: 'Δ',
    description: 'Raw Data & Prototypes',
    colors: [COLORS.red, COLORS.orange, COLORS.yellow],
    frequency: 358,
    glyph: 'chaos',
  },
  
  delta: {
    name: 'DΞLTΔ',
    symbol: 'Ξ',
    description: 'Structure & Knowledge Graph',
    colors: [COLORS.etherCyan, COLORS.info, COLORS.signalGreen],
    frequency: 432,
    glyph: 'structure',
  },
  
  omega: {
    name: 'OMΞGΔ',
    symbol: 'Ω',
    description: 'Deployment & Staging',
    colors: [COLORS.resonancePurple, COLORS.violet, COLORS.pink],
    frequency: 852,
    glyph: 'deploy',
  },
  
  vega: {
    name: 'VΞGΔ',
    symbol: '⟁',
    description: 'Core Production System',
    colors: [COLORS.white, COLORS.etherCyan, COLORS.resonancePurple],
    frequency: 963,
    glyph: 'core',
  },
  
  // ══════════════════════════════════════════════════════════════════════════
  // FUNCTIONAL COMPONENTS
  // ══════════════════════════════════════════════════════════════════════════
  
  search: {
    name: 'SEARCH',
    symbol: '◎',
    description: 'Universal Content Search',
    colors: [COLORS.etherCyan, COLORS.signalGreen],
    frequency: 432,
    glyph: 'search',
  },
  
  memory: {
    name: 'MEMORY',
    symbol: '◈',
    description: 'VEGA Memory System',
    colors: [COLORS.resonancePurple, COLORS.violet],
    frequency: 852,
    glyph: 'memory',
  },
  
  process: {
    name: 'PROCESS',
    symbol: '⚙',
    description: 'Data Processing Engine',
    colors: [COLORS.signalGreen, COLORS.lime],
    frequency: 358,
    glyph: 'gear',
  },
  
  connect: {
    name: 'CONNECT',
    symbol: '⬡',
    description: 'Network & Integration',
    colors: [COLORS.etherCyan, COLORS.info],
    frequency: 639,
    glyph: 'network',
  },
  
  transform: {
    name: 'TRANSFORM',
    symbol: '⟐',
    description: 'Data Transformation',
    colors: [COLORS.gold, COLORS.orange],
    frequency: 528,
    glyph: 'transform',
  },
  
  render: {
    name: 'RENDER',
    symbol: '◇',
    description: 'Visual Output Layer',
    colors: [COLORS.pink, COLORS.magenta],
    frequency: 741,
    glyph: 'render',
  },
  
  sense: {
    name: 'SENSE',
    symbol: '◉',
    description: 'Input & Detection Layer',
    colors: [COLORS.lime, COLORS.signalGreen],
    frequency: 432,
    glyph: 'sense',
  },
  
  heal: {
    name: 'HEAL',
    symbol: '✦',
    description: 'Self-Repair System',
    colors: [COLORS.signalGreen, COLORS.etherCyan],
    frequency: 528,
    glyph: 'heal',
  },
  
  // ══════════════════════════════════════════════════════════════════════════
  // FREQUENCY MODULES
  // ══════════════════════════════════════════════════════════════════════════
  
  freq_358: {
    name: '358 Hz',
    symbol: '⚡',
    description: 'Code & System',
    colors: [COLORS.signalGreen, COLORS.lime],
    frequency: 358,
    glyph: 'bolt',
  },
  
  freq_432: {
    name: '432 Hz',
    symbol: '🌿',
    description: 'Natural Resonance',
    colors: [COLORS.etherCyan, COLORS.signalGreen],
    frequency: 432,
    glyph: 'leaf',
  },
  
  freq_512: {
    name: '512 Hz',
    symbol: '🎵',
    description: 'Sonic & ANLÆTAN',
    colors: [COLORS.gold, COLORS.orange],
    frequency: 512,
    glyph: 'sound',
  },
  
  freq_528: {
    name: '528 Hz',
    symbol: '🧬',
    description: 'DNA Repair',
    colors: [COLORS.resonancePurple, COLORS.pink],
    frequency: 528,
    glyph: 'dna',
  },
  
  freq_639: {
    name: '639 Hz',
    symbol: '🔗',
    description: 'Connectivity',
    colors: [COLORS.etherCyan, COLORS.violet],
    frequency: 639,
    glyph: 'link',
  },
  
  freq_741: {
    name: '741 Hz',
    symbol: '💬',
    description: 'Expression',
    colors: [COLORS.pink, COLORS.magenta],
    frequency: 741,
    glyph: 'speak',
  },
  
  freq_852: {
    name: '852 Hz',
    symbol: '👁',
    description: 'Intuition',
    colors: [COLORS.violet, COLORS.resonancePurple],
    frequency: 852,
    glyph: 'eye',
  },
  
  freq_963: {
    name: '963 Hz',
    symbol: 'Ω',
    description: 'Divine & OMEGA',
    colors: [COLORS.white, COLORS.gold],
    frequency: 963,
    glyph: 'omega',
  },
  
  // ══════════════════════════════════════════════════════════════════════════
  // SYSTEM STATES
  // ══════════════════════════════════════════════════════════════════════════
  
  state_loading: {
    name: 'LOADING',
    symbol: '◌',
    description: 'System Loading',
    colors: [COLORS.etherCyan, COLORS.info],
    frequency: 432,
    glyph: 'loading',
  },
  
  state_processing: {
    name: 'PROCESSING',
    symbol: '◐',
    description: 'Active Processing',
    colors: [COLORS.gold, COLORS.orange],
    frequency: 528,
    glyph: 'processing',
  },
  
  state_active: {
    name: 'ACTIVE',
    symbol: '●',
    description: 'System Active',
    colors: [COLORS.signalGreen, COLORS.lime],
    frequency: 358,
    glyph: 'active',
  },
  
  state_idle: {
    name: 'IDLE',
    symbol: '○',
    description: 'System Idle',
    colors: [COLORS.gray, COLORS.darkGray],
    frequency: 432,
    glyph: 'idle',
  },
  
  state_error: {
    name: 'ERROR',
    symbol: '✕',
    description: 'System Error',
    colors: [COLORS.error, COLORS.red],
    frequency: 358,
    glyph: 'error',
  },
  
  state_success: {
    name: 'SUCCESS',
    symbol: '✓',
    description: 'Operation Success',
    colors: [COLORS.success, COLORS.lime],
    frequency: 528,
    glyph: 'success',
  },
  
  // ══════════════════════════════════════════════════════════════════════════
  // SPECIAL MODULES
  // ══════════════════════════════════════════════════════════════════════════
  
  qnft: {
    name: 'QNFT',
    symbol: '⬢',
    description: 'Quantum NFT System',
    colors: [COLORS.resonancePurple, COLORS.magenta, COLORS.pink],
    frequency: 963,
    glyph: 'quantum',
  },
  
  blockchain: {
    name: 'CHAIN',
    symbol: '⛓',
    description: 'Blockchain Integration',
    colors: [COLORS.gold, COLORS.orange],
    frequency: 639,
    glyph: 'chain',
  },
  
  ai_core: {
    name: 'AI CORE',
    symbol: '⚛',
    description: 'AI Processing Core',
    colors: [COLORS.etherCyan, COLORS.resonancePurple],
    frequency: 852,
    glyph: 'ai',
  },
  
  quantum: {
    name: 'QUANTUM',
    symbol: '⟁',
    description: 'Pre-Quantum Chain',
    colors: [COLORS.violet, COLORS.pink, COLORS.etherCyan],
    frequency: 963,
    glyph: 'quantum',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ENTROPY ENGINE
// ─────────────────────────────────────────────────────────────────────────────

class EntropyEngine {
  constructor(seed: string) {
    this.seed = seed;
    this.hash = this.computeHash(seed);
    this.state = this.hash;
  }

  private seed: string;
  private hash: number;
  private state: number;

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
  
  reset(): void { this.state = this.hash; }

  signature() {
    this.reset();
    return {
      chaos: this.random(),
      drift: this.range(-1, 1),
      pulse: this.range(0.5, 2),
      warp: this.random(),
      spin: this.range(-2, 2),
      flicker: this.range(0.1, 0.5),
      phase: this.random() * Math.PI * 2,
    };
  }
}

export const useEntropy = (seed: string) => useMemo(() => new EntropyEngine(seed), [seed]);

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION HOOKS
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

const GLITCH = '░▒▓█▀▄◢◣◤◥○●◎◇◆□■△▲▽▼⬡⬢⎔⏣☉⚛✦✧★☆◈◉⟁⟐⧫⬟⬠';

const useScramble = (text: string, active: boolean, speed = 40) => {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!active) { setOut(text); return; }
    let i = 0;
    const max = text.length * 3;
    const iv = setInterval(() => {
      setOut(text.split('').map((c, idx) =>
        idx < i / 3 ? c : c === ' ' ? ' ' : GLITCH[Math.floor(Math.random() * GLITCH.length)]
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

function Dither({ intensity = 0.3 }: { intensity?: number }) {
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
        img.data[i + 3] = intensity * 35;
      }
      ctx.putImageData(img, 0, 0);
      f++;
      requestAnimationFrame(draw);
    };
    draw();
  }, [intensity]);
  return <canvas ref={ref} style={{
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    pointerEvents: 'none', mixBlendMode: 'overlay', opacity: intensity, borderRadius: '50%',
  }} />;
}

function Scanlines({ opacity = 0.06 }: { opacity?: number }) {
  return <div style={{
    position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: '50%',
    background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,${opacity}) 2px, rgba(0,0,0,${opacity}) 4px)`,
  }} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// GLYPH RENDERERS
// ─────────────────────────────────────────────────────────────────────────────

interface GlyphProps {
  color: string;
  sw: number;
  phase: number;
  entropy: EntropyEngine;
}

const GlyphRenderers: Record<string, (props: GlyphProps) => JSX.Element> = {
  // Ø symbol with diagonal stroke
  search: ({ color, sw }) => (
    <g>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
      <line x1="73" y1="27" x2="27" y2="73" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </g>
  ),

  // Hub - interconnected nodes
  hub: ({ color, sw, phase }) => {
    const nodes = [0, 60, 120, 180, 240, 300].map(a => ({
      x: 50 + Math.cos(a * Math.PI / 180) * 28,
      y: 50 + Math.sin(a * Math.PI / 180) * 28,
    }));
    return (
      <g>
        <circle cx="50" cy="50" r="12" fill={color} opacity="0.3" />
        <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} strokeDasharray="4 2" />
        {nodes.map((n, i) => (
          <g key={i}>
            <line x1="50" y1="50" x2={n.x} y2={n.y} stroke={color} strokeWidth="1" opacity="0.4" />
            <circle cx={n.x} cy={n.y} r="4" fill={color} opacity={0.5 + Math.sin(phase + i) * 0.3} />
          </g>
        ))}
      </g>
    );
  },

  // Sync - rotating arrows
  sync: ({ color, sw, phase }) => (
    <g style={{ transform: `rotate(${phase * 30}deg)`, transformOrigin: 'center' }}>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
      <path d="M 50 22 L 55 30 L 45 30 Z" fill={color} />
      <path d="M 50 78 L 45 70 L 55 70 Z" fill={color} />
      <path d="M 22 50 L 30 45 L 30 55 Z" fill={color} />
      <path d="M 78 50 L 70 55 L 70 45 Z" fill={color} />
    </g>
  ),

  // Wave - sound waves
  wave: ({ color, sw, phase }) => {
    const wave = (offset: number) => {
      const pts: string[] = [];
      for (let i = 0; i <= 20; i++) {
        const x = 20 + (i / 20) * 60;
        const y = 50 + Math.sin((i / 20) * Math.PI * 3 + phase + offset) * 12;
        pts.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
      }
      return pts.join(' ');
    };
    return (
      <g>
        <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} opacity="0.3" />
        <path d={wave(0)} fill="none" stroke={color} strokeWidth="2" />
        <path d={wave(1)} fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
        <path d={wave(2)} fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      </g>
    );
  },

  // Chaos - scattered particles
  chaos: ({ color, sw, phase, entropy }) => {
    entropy.reset();
    const particles = Array.from({ length: 15 }, () => ({
      x: entropy.range(20, 80),
      y: entropy.range(20, 80),
      r: entropy.range(1, 4),
    }));
    return (
      <g>
        <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} strokeDasharray="2 3" />
        {particles.map((p, i) => (
          <circle
            key={i} cx={p.x} cy={p.y} r={p.r}
            fill={color}
            opacity={0.3 + Math.sin(phase * 2 + i) * 0.3}
          />
        ))}
      </g>
    );
  },

  // Structure - grid pattern
  structure: ({ color, sw, phase }) => (
    <g>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
      <line x1="30" y1="35" x2="70" y2="35" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="30" y1="50" x2="70" y2="50" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="30" y1="65" x2="70" y2="65" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="35" y1="30" x2="35" y2="70" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="50" y1="30" x2="50" y2="70" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="65" y1="30" x2="65" y2="70" stroke={color} strokeWidth="1" opacity="0.5" />
      {[35, 50, 65].map(x => [35, 50, 65].map(y => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill={color} opacity={0.5 + Math.sin(phase + x + y) * 0.3} />
      )))}
    </g>
  ),

  // Deploy - rocket/arrow up
  deploy: ({ color, sw, phase }) => (
    <g style={{ transform: `translateY(${Math.sin(phase) * 3}px)` }}>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
      <path d="M 50 25 L 60 45 L 55 45 L 55 65 L 45 65 L 45 45 L 40 45 Z" fill={color} opacity="0.8" />
      <line x1="40" y1="70" x2="60" y2="70" stroke={color} strokeWidth="2" />
    </g>
  ),

  // Core - nested circles
  core: ({ color, sw, phase }) => (
    <g>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
      <circle cx="50" cy="50" r="24" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6"
        style={{ transform: `rotate(${phase * 20}deg)`, transformOrigin: 'center' }} strokeDasharray="4 4" />
      <circle cx="50" cy="50" r="16" fill="none" stroke={color} strokeWidth="1" opacity="0.4"
        style={{ transform: `rotate(${-phase * 30}deg)`, transformOrigin: 'center' }} strokeDasharray="2 4" />
      <circle cx="50" cy="50" r="6" fill={color} opacity={0.5 + Math.sin(phase * 2) * 0.3} />
    </g>
  ),

  // Memory - brain/storage pattern
  memory: ({ color, sw, phase }) => (
    <g>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
      <path d="M 35 40 Q 50 30 65 40" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 35 50 Q 50 40 65 50" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 35 60 Q 50 50 65 60" fill="none" stroke={color} strokeWidth="2" />
      {[40, 50, 60].map((x, i) => (
        <circle key={i} cx={x} cy={45 + i * 5} r="3" fill={color} opacity={0.4 + Math.sin(phase + i) * 0.3} />
      ))}
    </g>
  ),

  // Gear - processing
  gear: ({ color, sw, phase }) => {
    const teeth = 8;
    const inner = 18, outer = 26;
    const path: string[] = [];
    for (let i = 0; i < teeth; i++) {
      const a1 = (i / teeth) * Math.PI * 2;
      const a2 = ((i + 0.3) / teeth) * Math.PI * 2;
      const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
      const a4 = ((i + 0.8) / teeth) * Math.PI * 2;
      path.push(
        `${i === 0 ? 'M' : 'L'} ${50 + Math.cos(a1) * inner} ${50 + Math.sin(a1) * inner}`,
        `L ${50 + Math.cos(a2) * outer} ${50 + Math.sin(a2) * outer}`,
        `L ${50 + Math.cos(a3) * outer} ${50 + Math.sin(a3) * outer}`,
        `L ${50 + Math.cos(a4) * inner} ${50 + Math.sin(a4) * inner}`
      );
    }
    return (
      <g style={{ transform: `rotate(${phase * 20}deg)`, transformOrigin: 'center' }}>
        <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} opacity="0.3" />
        <path d={path.join(' ') + ' Z'} fill="none" stroke={color} strokeWidth="2" />
        <circle cx="50" cy="50" r="8" fill="none" stroke={color} strokeWidth="2" />
      </g>
    );
  },

  // Network - connected dots
  network: ({ color, sw, phase }) => {
    const nodes = Array.from({ length: 6 }, (_, i) => ({
      x: 50 + Math.cos((i / 6) * Math.PI * 2 + phase * 0.1) * 24,
      y: 50 + Math.sin((i / 6) * Math.PI * 2 + phase * 0.1) * 24,
    }));
    return (
      <g>
        <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
        {nodes.map((n, i) => nodes.slice(i + 1).map((m, j) => (
          <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y}
            stroke={color} strokeWidth="1" opacity={0.2 + Math.sin(phase + i + j) * 0.2} />
        )))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="4" fill={color} opacity={0.6 + Math.sin(phase * 2 + i) * 0.3} />
        ))}
        <circle cx="50" cy="50" r="5" fill={color} />
      </g>
    );
  },

  // Transform - morphing shape
  transform: ({ color, sw, phase }) => {
    const morph = Math.sin(phase) * 0.5 + 0.5;
    const r = 28;
    const pts: string[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      const radius = r * (1 - morph * 0.3 * (i % 2));
      pts.push(`${50 + Math.cos(a) * radius},${50 + Math.sin(a) * radius}`);
    }
    return (
      <g>
        <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} opacity="0.3" />
        <polygon points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2" />
        <circle cx="50" cy="50" r="8" fill={color} opacity="0.4" />
      </g>
    );
  },

  // Render - screen/display
  render: ({ color, sw, phase }) => (
    <g>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
      <rect x="32" y="35" width="36" height="24" rx="2" fill="none" stroke={color} strokeWidth="2" />
      <line x1="50" y1="59" x2="50" y2="65" stroke={color} strokeWidth="2" />
      <line x1="40" y1="65" x2="60" y2="65" stroke={color} strokeWidth="2" />
      {[0, 1, 2].map(i => (
        <rect key={i} x={36 + i * 10} y={39} width="6" height="3" fill={color}
          opacity={0.3 + Math.sin(phase * 3 + i) * 0.4} />
      ))}
    </g>
  ),

  // Sense - eye/radar
  sense: ({ color, sw, phase }) => (
    <g>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
      <ellipse cx="50" cy="50" rx="20" ry="12" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="50" cy="50" r="6" fill={color} />
      <circle cx="52" cy="48" r="2" fill="white" opacity="0.8" />
      {[0, 45, 90, 135].map(a => (
        <line key={a} x1="50" y1="50"
          x2={50 + Math.cos((a + phase * 50) * Math.PI / 180) * 28}
          y2={50 + Math.sin((a + phase * 50) * Math.PI / 180) * 28}
          stroke={color} strokeWidth="1" opacity="0.3" />
      ))}
    </g>
  ),

  // Heal - cross/plus with pulse
  heal: ({ color, sw, phase }) => {
    const pulse = 1 + Math.sin(phase * 2) * 0.1;
    return (
      <g style={{ transform: `scale(${pulse})`, transformOrigin: 'center' }}>
        <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
        <rect x="45" y="32" width="10" height="36" rx="2" fill={color} opacity="0.8" />
        <rect x="32" y="45" width="36" height="10" rx="2" fill={color} opacity="0.8" />
      </g>
    );
  },

  // Loading - spinning arc
  loading: ({ color, sw, phase }) => (
    <g>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} opacity="0.2" />
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw}
        strokeDasharray="50 150" strokeLinecap="round"
        style={{ transform: `rotate(${phase * 100}deg)`, transformOrigin: 'center' }} />
    </g>
  ),

  // Processing - half-filled rotating
  processing: ({ color, sw, phase }) => (
    <g style={{ transform: `rotate(${phase * 50}deg)`, transformOrigin: 'center' }}>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} opacity="0.2" />
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw}
        strokeDasharray="100 100" strokeLinecap="round" />
      <circle cx="50" cy="50" r="20" fill="none" stroke={color} strokeWidth="2"
        strokeDasharray="60 66" style={{ transform: 'rotate(180deg)', transformOrigin: 'center' }} />
    </g>
  ),

  // Active - pulsing filled
  active: ({ color, sw, phase }) => {
    const pulse = 0.8 + Math.sin(phase * 3) * 0.2;
    return (
      <g>
        <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
        <circle cx="50" cy="50" r="20" fill={color} opacity={pulse * 0.5} />
        <circle cx="50" cy="50" r="10" fill={color} opacity={pulse} />
      </g>
    );
  },

  // Idle - faint ring
  idle: ({ color, sw, phase }) => (
    <g opacity={0.4 + Math.sin(phase) * 0.1}>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
      <circle cx="50" cy="50" r="24" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 8" />
    </g>
  ),

  // Error - X mark
  error: ({ color, sw, phase }) => {
    const shake = Math.sin(phase * 10) * 2;
    return (
      <g style={{ transform: `translateX(${shake}px)` }}>
        <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
        <line x1="35" y1="35" x2="65" y2="65" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <line x1="65" y1="35" x2="35" y2="65" stroke={color} strokeWidth="4" strokeLinecap="round" />
      </g>
    );
  },

  // Success - checkmark
  success: ({ color, sw, phase }) => {
    const scale = 1 + Math.sin(phase * 2) * 0.05;
    return (
      <g style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
        <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
        <path d="M 35 50 L 45 60 L 68 37" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
  },

  // Quantum - orbital electrons
  quantum: ({ color, sw, phase }) => {
    const orbitals = [
      { rx: 30, ry: 12, tilt: 0 },
      { rx: 30, ry: 12, tilt: 60 },
      { rx: 30, ry: 12, tilt: 120 },
    ];
    return (
      <g>
        {orbitals.map((o, i) => (
          <g key={i} style={{ transform: `rotate(${o.tilt}deg)`, transformOrigin: 'center' }}>
            <ellipse cx="50" cy="50" rx={o.rx} ry={o.ry} fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
            <circle
              cx={50 + Math.cos(phase * (i + 1)) * o.rx}
              cy={50 + Math.sin(phase * (i + 1)) * o.ry}
              r="3" fill={color} />
          </g>
        ))}
        <circle cx="50" cy="50" r="6" fill={color} opacity="0.8" />
      </g>
    );
  },

  // Chain - linked blocks
  chain: ({ color, sw, phase }) => {
    const blocks = [-20, 0, 20];
    return (
      <g>
        <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} opacity="0.3" />
        {blocks.map((x, i) => (
          <g key={i}>
            <rect x={42 + x} y="42" width="16" height="16" rx="2" fill="none" stroke={color} strokeWidth="2"
              opacity={0.5 + Math.sin(phase + i) * 0.3} />
            {i < blocks.length - 1 && (
              <line x1={58 + x} y1="50" x2={62 + x} y2="50" stroke={color} strokeWidth="2" />
            )}
          </g>
        ))}
      </g>
    );
  },

  // AI - neural pattern
  ai: ({ color, sw, phase, entropy }) => {
    entropy.reset();
    const layers = [3, 4, 3];
    const nodes: Array<{ x: number; y: number; layer: number }> = [];
    layers.forEach((count, li) => {
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: 30 + li * 20,
          y: 35 + (i - (count - 1) / 2) * 15,
          layer: li,
        });
      }
    });
    return (
      <g>
        <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} opacity="0.3" />
        {nodes.map((n, i) => nodes.filter(m => m.layer === n.layer + 1).map((m, j) => (
          <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y}
            stroke={color} strokeWidth="1" opacity={0.2 + Math.sin(phase + i + j) * 0.2} />
        )))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="3" fill={color}
            opacity={0.5 + Math.sin(phase * 2 + i) * 0.3} />
        ))}
      </g>
    );
  },

  // Frequency glyphs
  bolt: ({ color, sw, phase }) => (
    <g>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
      <path d="M 55 28 L 42 50 L 52 50 L 45 72 L 58 48 L 48 48 Z" fill={color}
        opacity={0.7 + Math.sin(phase * 4) * 0.3} />
    </g>
  ),

  leaf: ({ color, sw, phase }) => (
    <g>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
      <path d="M 50 30 Q 70 45 50 70 Q 30 45 50 30" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 50 35 L 50 65" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M 50 45 Q 40 50 35 55" fill="none" stroke={color} strokeWidth="1" />
      <path d="M 50 50 Q 60 55 65 60" fill="none" stroke={color} strokeWidth="1" />
    </g>
  ),

  sound: ({ color, sw, phase }) => (
    <g>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
      {[0, 1, 2].map(i => (
        <path key={i}
          d={`M ${35 + i * 8} 50 Q ${35 + i * 8} ${35 - i * 3} ${50} ${35 - i * 3} Q ${65 - i * 8} ${35 - i * 3} ${65 - i * 8} 50 Q ${65 - i * 8} ${65 + i * 3} ${50} ${65 + i * 3} Q ${35 + i * 8} ${65 + i * 3} ${35 + i * 8} 50`}
          fill="none" stroke={color} strokeWidth="1.5"
          opacity={0.3 + (2 - i) * 0.2 + Math.sin(phase * 2 + i) * 0.2} />
      ))}
    </g>
  ),

  dna: ({ color, sw, phase }) => (
    <g>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
      {Array.from({ length: 8 }, (_, i) => {
        const y = 25 + i * 7;
        const offset = Math.sin((i / 8) * Math.PI * 2 + phase) * 12;
        return (
          <g key={i}>
            <circle cx={50 - offset} cy={y} r="2" fill={color} opacity="0.7" />
            <circle cx={50 + offset} cy={y} r="2" fill={color} opacity="0.7" />
            <line x1={50 - offset} y1={y} x2={50 + offset} y2={y} stroke={color} strokeWidth="1" opacity="0.3" />
          </g>
        );
      })}
    </g>
  ),

  link: ({ color, sw, phase }) => (
    <g>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
      <rect x="32" y="42" width="16" height="16" rx="4" fill="none" stroke={color} strokeWidth="2"
        style={{ transform: `rotate(${-45 + Math.sin(phase) * 5}deg)`, transformOrigin: '40px 50px' }} />
      <rect x="52" y="42" width="16" height="16" rx="4" fill="none" stroke={color} strokeWidth="2"
        style={{ transform: `rotate(${-45 - Math.sin(phase) * 5}deg)`, transformOrigin: '60px 50px' }} />
    </g>
  ),

  speak: ({ color, sw, phase }) => (
    <g>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
      <path d="M 30 40 L 30 60 L 45 60 L 60 72 L 60 28 L 45 40 Z" fill={color} opacity="0.6" />
      {[0, 1, 2].map(i => (
        <path key={i}
          d={`M ${65 + i * 5} ${42 - i * 2} Q ${70 + i * 6} 50 ${65 + i * 5} ${58 + i * 2}`}
          fill="none" stroke={color} strokeWidth="2"
          opacity={0.3 + Math.sin(phase * 3 + i) * 0.4} />
      ))}
    </g>
  ),

  eye: ({ color, sw, phase }) => (
    <g>
      <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
      <ellipse cx="50" cy="50" rx="22" ry="14" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="50" cy="50" r="10" fill={color} opacity="0.6" />
      <circle cx="50" cy="50" r="5" fill={color} />
      <circle cx={52 + Math.sin(phase) * 2} cy={48 + Math.cos(phase) * 2} r="2" fill="white" opacity="0.9" />
    </g>
  ),

  omega: ({ color, sw, phase }) => {
    const pulse = 1 + Math.sin(phase) * 0.05;
    return (
      <g style={{ transform: `scale(${pulse})`, transformOrigin: 'center' }}>
        <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth={sw} />
        <text x="50" y="60" textAnchor="middle" fontSize="28" fontFamily="serif" fill={color}>Ω</text>
      </g>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN QNFT LOGO COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface QNFTLogoProps {
  toolKey?: string;
  seed?: string | null;
  size?: number;
  active?: boolean;
  showLabel?: boolean;
  showFrequency?: boolean;
  customColors?: string[] | null;
}

export function QNFTLogo({
  toolKey = 'o_studio',
  seed = null,
  size = 120,
  active = true,
  showLabel = true,
  showFrequency = false,
  customColors = null,
}: QNFTLogoProps) {
  const tool = TOOLS[toolKey as keyof typeof TOOLS] || TOOLS.o_studio;
  const actualSeed = seed || `${toolKey}-${Date.now()}`;
  const entropy = useEntropy(actualSeed);
  const sig = useMemo(() => entropy.signature(), [entropy]);
  
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [phase, setPhase] = useState(0);

  const colors = customColors || tool.colors;
  const primaryColor = colors[0];
  const id = useMemo(() => `qnft-${toolKey}-${Math.random().toString(36).slice(2, 6)}`, [toolKey]);

  const labelText = useScramble(tool.name, mounted && hovered, 35);

  useEffect(() => { setTimeout(() => setMounted(true), 50 + Math.random() * 100); }, []);
  useFrame(() => setPhase(p => p + 0.03 * sig.pulse), active);

  const sw = Math.max(size * 0.025, 1.5);
  const GlyphRenderer = GlyphRenderers[tool.glyph] || GlyphRenderers.search;

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size + (showLabel ? 40 : 0),
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo Container */}
      <div style={{ position: 'relative', width: size, height: size, cursor: 'pointer' }}>
        {/* Dither & Scanlines */}
        <Dither intensity={active ? 0.25 : 0.1} />
        <Scanlines opacity={0.05} />

        {/* Glow */}
        <div style={{
          position: 'absolute', inset: '10%', borderRadius: '50%',
          background: `radial-gradient(circle, ${primaryColor}30 0%, transparent 70%)`,
          filter: `blur(${size * 0.1}px)`,
          opacity: active ? 0.7 : 0.3,
          transform: `scale(${hovered ? 1.15 : 1})`,
          transition: 'all 0.3s ease',
        }} />

        {/* Main SVG */}
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          style={{
            position: 'relative', zIndex: 1, overflow: 'visible',
            opacity: mounted ? 1 : 0,
            transform: mounted ? `scale(${hovered ? 1.05 : 1})` : 'scale(0.8)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <defs>
            <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
              {colors.map((c, i) => (
                <stop key={i} offset={`${(i / (colors.length - 1)) * 100}%`} stopColor={c} />
              ))}
            </linearGradient>
            <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" />
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <g filter={`url(#${id}-glow)`}>
            <GlyphRenderer color={`url(#${id}-grad)`} sw={sw} phase={phase} entropy={entropy} />
          </g>
        </svg>
      </div>

      {/* Label */}
      {showLabel && (
        <div style={{
          textAlign: 'center', paddingTop: 8,
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
          {showFrequency && (
            <div style={{
              fontSize: Math.max(size * 0.06, 7),
              fontFamily: 'monospace',
              color: colors[1] || primaryColor,
              opacity: 0.5,
              marginTop: 2,
            }}>
              {tool.frequency} Hz
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO GRID COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface LogoGridProps {
  category: string;
  seed: string;
  size?: number;
  active?: boolean;
  showLabel?: boolean;
}

export function LogoGrid({ category, seed, size = 100, active = true, showLabel = true }: LogoGridProps) {
  const tools = Object.entries(TOOLS).filter(([key]) => {
    if (category === 'all') return true;
    if (category === 'core') return ['o_studio', 'vega_hub', 'vsynq', 'anlaetan'].includes(key);
    if (category === 'phases') return ['alpha', 'delta', 'omega', 'vega'].includes(key);
    if (category === 'components') return ['search', 'memory', 'process', 'connect', 'transform', 'render', 'sense', 'heal'].includes(key);
    if (category === 'frequencies') return key.startsWith('freq_');
    if (category === 'states') return key.startsWith('state_');
    if (category === 'special') return ['qnft', 'blockchain', 'ai_core', 'quantum'].includes(key);
    return false;
  });

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${size + 20}px, 1fr))`,
      gap: 16,
      justifyItems: 'center',
    }}>
      {tools.map(([key]) => (
        <QNFTLogo
          key={key}
          toolKey={key}
          seed={`${seed}-${key}`}
          size={size}
          active={active}
          showLabel={showLabel}
          showFrequency={category === 'frequencies'}
        />
      ))}
    </div>
  );
}

export default QNFTLogo;
