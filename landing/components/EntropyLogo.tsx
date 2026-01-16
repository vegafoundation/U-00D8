import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// Ø — ENTROPY QNFT LOGO SYSTEM
// Multiple Variants | Entropy Injection | Chaos Outcomes | Living Digital Tissue
// ═══════════════════════════════════════════════════════════════════════════════
// ARCHITECT: ADAM EREN VEGA - Æ
// SOURCE: Claude Entropy
// VERSION: 3.0.0
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// COLOR PALETTES
// ─────────────────────────────────────────────────────────────────────────────

const PALETTES = {
  void: {
    bg: '#000000',
    primary: '#ffffff',
    secondary: '#888888',
    accent: '#444444',
    glow: '#ffffff20',
  },
  supernova: {
    bg: '#050000',
    primary: '#ff6600',
    secondary: '#ffdd00',
    accent: '#ff2200',
    glow: '#ff440040',
  },
  quantum: {
    bg: '#000508',
    primary: '#00d4ff',
    secondary: '#00ff88',
    accent: '#a855f7',
    glow: '#00d4ff30',
  },
  plasma: {
    bg: '#050008',
    primary: '#ff00ff',
    secondary: '#00ffff',
    accent: '#ff0080',
    glow: '#ff00ff25',
  },
  entropy: {
    bg: '#030303',
    primary: '#ff3366',
    secondary: '#33ff99',
    accent: '#6633ff',
    glow: '#ff336630',
  },
  cosmic: {
    bg: '#000205',
    primary: '#9966ff',
    secondary: '#ff6699',
    accent: '#66ffff',
    glow: '#9966ff30',
  },
  solar: {
    bg: '#080400',
    primary: '#ffcc00',
    secondary: '#ff8800',
    accent: '#ffffff',
    glow: '#ffcc0040',
  },
  matrix: {
    bg: '#000800',
    primary: '#00ff00',
    secondary: '#00cc00',
    accent: '#00ff88',
    glow: '#00ff0030',
  },
};

const GLITCH = '░▒▓█▀▄◢◣◤◥○●◎◇◆□■△▲▽▼⬡⬢⎔⏣☉⚛︎✦✧★☆◈◉⟁⟐⧫⬟⬠⭓⭔';

// ─────────────────────────────────────────────────────────────────────────────
// ENTROPY ENGINE
// ─────────────────────────────────────────────────────────────────────────────

class EntropyEngine {
  constructor(seed) {
    this.seed = seed;
    this.hash = this.computeHash(seed);
    this.state = this.hash;
  }

  computeHash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h) + str.charCodeAt(i);
      h = h & h;
    }
    return Math.abs(h);
  }

  // Seeded random
  random() {
    this.state = (this.state * 1103515245 + 12345) & 0x7fffffff;
    return this.state / 0x7fffffff;
  }

  // Range random
  range(min, max) {
    return min + this.random() * (max - min);
  }

  // Integer range
  int(min, max) {
    return Math.floor(this.range(min, max + 1));
  }

  // Pick from array
  pick(arr) {
    return arr[this.int(0, arr.length - 1)];
  }

  // Generate color variation
  color(base, variance = 30) {
    const r = parseInt(base.slice(1, 3), 16);
    const g = parseInt(base.slice(3, 5), 16);
    const b = parseInt(base.slice(5, 7), 16);
    const nr = Math.min(255, Math.max(0, r + this.range(-variance, variance)));
    const ng = Math.min(255, Math.max(0, g + this.range(-variance, variance)));
    const nb = Math.min(255, Math.max(0, b + this.range(-variance, variance)));
    return `rgb(${Math.floor(nr)}, ${Math.floor(ng)}, ${Math.floor(nb)})`;
  }

  // Generate entropy signature
  signature() {
    return {
      chaos: this.random(),
      drift: this.range(-1, 1),
      pulse: this.range(0.5, 2),
      warp: this.range(0, 1),
      spin: this.range(-2, 2),
      flicker: this.range(0.1, 0.5),
      phase: this.random() * Math.PI * 2,
    };
  }

  // Reset state
  reset() {
    this.state = this.hash;
  }
}

// Global entropy hook
const useEntropy = (seed) => {
  return useMemo(() => new EntropyEngine(seed), [seed]);
};

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION HOOKS
// ─────────────────────────────────────────────────────────────────────────────

const useFrame = (callback, active = true) => {
  const frameRef = useRef(0);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!active) return;
    let id;
    const loop = () => {
      frameRef.current++;
      callbackRef.current(frameRef.current);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [active]);

  return frameRef.current;
};

const useScramble = (text, active, speed = 40) => {
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
// NOISE & DITHER COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function NoiseDither({ intensity = 0.3, color = '#ffffff', animated = true }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
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
      if (animated) requestAnimationFrame(draw);
    };
    draw();
  }, [intensity, animated]);
  return <canvas ref={ref} style={{
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    pointerEvents: 'none', mixBlendMode: 'overlay', opacity: intensity,
  }} />;
}

function Scanlines({ opacity = 0.08, gap = 3 }) {
  return <div style={{
    position: 'absolute', inset: 0, pointerEvents: 'none',
    background: `repeating-linear-gradient(0deg, transparent, transparent ${gap}px, rgba(0,0,0,${opacity}) ${gap}px, rgba(0,0,0,${opacity}) ${gap * 2}px)`,
  }} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// ENTROPY VISUALIZERS
// ─────────────────────────────────────────────────────────────────────────────

function EntropyField({ entropy, size, color, active }) {
  const [particles, setParticles] = useState([]);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    entropy.reset();
    const p = [];
    const count = Math.floor(15 + entropy.random() * 20);
    for (let i = 0; i < count; i++) {
      p.push({
        id: i,
        x: entropy.range(10, 90),
        y: entropy.range(10, 90),
        vx: entropy.range(-0.5, 0.5),
        vy: entropy.range(-0.5, 0.5),
        size: entropy.range(0.5, 2.5),
        life: entropy.range(0.3, 1),
      });
    }
    setParticles(p);
  }, [entropy]);

  useFrame(() => setFrame(f => f + 1), active);

  return (
    <g opacity={active ? 0.6 : 0.2}>
      {particles.map(p => {
        const age = (frame * 0.02 + p.id * 0.1) % 1;
        const x = ((p.x + p.vx * frame * 0.1) % 80) + 10;
        const y = ((p.y + p.vy * frame * 0.1) % 80) + 10;
        return (
          <circle
            key={p.id}
            cx={x} cy={y}
            r={p.size * (0.5 + Math.sin(age * Math.PI) * 0.5)}
            fill={color}
            opacity={p.life * (0.3 + Math.sin(frame * 0.05 + p.id) * 0.3)}
          />
        );
      })}
    </g>
  );
}

function ChaosRings({ entropy, color, active }) {
  const [phase, setPhase] = useState(0);
  const sig = useMemo(() => entropy.signature(), [entropy]);

  useFrame(() => setPhase(p => p + 0.03 * sig.pulse), active);

  const rings = useMemo(() => {
    entropy.reset();
    return Array.from({ length: 4 }, (_, i) => ({
      r: 20 + i * 8,
      dash: entropy.range(2, 8),
      gap: entropy.range(3, 10),
      speed: entropy.range(0.3, 1.5) * (entropy.random() > 0.5 ? 1 : -1),
      opacity: entropy.range(0.2, 0.5),
    }));
  }, [entropy]);

  return (
    <g>
      {rings.map((ring, i) => (
        <circle
          key={i}
          cx="50" cy="50" r={ring.r}
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeDasharray={`${ring.dash} ${ring.gap}`}
          opacity={ring.opacity}
          style={{
            transform: `rotate(${phase * ring.speed * 50}deg)`,
            transformOrigin: 'center',
          }}
        />
      ))}
    </g>
  );
}

function WaveDistortion({ entropy, color, active }) {
  const [phase, setPhase] = useState(0);
  const sig = useMemo(() => entropy.signature(), [entropy]);

  useFrame(() => setPhase(p => p + 0.05), active);

  const path = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const a = (i / 40) * Math.PI * 2;
      const w1 = Math.sin(a * 3 + phase) * 3 * sig.chaos;
      const w2 = Math.sin(a * 5 + phase * 1.5 + sig.phase) * 2 * sig.warp;
      const w3 = Math.sin(a * 7 + phase * 0.7) * 1.5 * sig.drift;
      const r = 30 + w1 + w2 + w3;
      pts.push(`${i === 0 ? 'M' : 'L'} ${50 + Math.cos(a) * r} ${50 + Math.sin(a) * r}`);
    }
    return pts.join(' ') + ' Z';
  }, [phase, sig]);

  return (
    <path
      d={path}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      opacity="0.4"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
}

function GlitchLayer({ active, intensity = 1 }) {
  const [offset, setOffset] = useState({ x: 0, y: 0, skew: 0 });

  useEffect(() => {
    if (!active) { setOffset({ x: 0, y: 0, skew: 0 }); return; }
    const iv = setInterval(() => {
      if (Math.random() > 0.7) {
        setOffset({
          x: (Math.random() - 0.5) * 4 * intensity,
          y: (Math.random() - 0.5) * 2 * intensity,
          skew: (Math.random() - 0.5) * 3 * intensity,
        });
      } else {
        setOffset({ x: 0, y: 0, skew: 0 });
      }
    }, 50);
    return () => clearInterval(iv);
  }, [active, intensity]);

  return offset;
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO VARIANT: VOID
// ─────────────────────────────────────────────────────────────────────────────

function LogoVoid({ size, entropy, active, palette }) {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState(0);
  const sig = useMemo(() => entropy.signature(), [entropy]);
  const id = useMemo(() => `void-${Math.random().toString(36).slice(2, 8)}`, []);

  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);
  useFrame(() => setPhase(p => p + 0.02 * sig.pulse), active);

  const sw = Math.max(size * 0.03, 2);
  const breathe = 1 + Math.sin(phase) * 0.02 * sig.chaos;

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={`${id}-void`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={palette.primary} stopOpacity="0" />
          <stop offset="70%" stopColor={palette.primary} stopOpacity="0.1" />
          <stop offset="100%" stopColor={palette.primary} stopOpacity="0.3" />
        </radialGradient>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Void center */}
      <circle cx="50" cy="50" r="25" fill={`url(#${id}-void)`} />

      {/* Outer ring */}
      <circle
        cx="50" cy="50" r="32"
        fill="none" stroke={palette.primary} strokeWidth={sw}
        opacity="0.9"
        filter={`url(#${id}-glow)`}
        style={{ transform: `scale(${breathe})`, transformOrigin: 'center' }}
      />

      {/* Diagonal stroke */}
      <line
        x1="73" y1="27" x2="27" y2="73"
        stroke={palette.primary} strokeWidth={sw} strokeLinecap="round"
        filter={`url(#${id}-glow)`}
        style={{
          transform: mounted ? 'scale(1)' : 'scale(0)',
          transformOrigin: 'center',
          transition: 'transform 0.6s ease',
        }}
      />

      {/* Inner void ring */}
      <circle
        cx="50" cy="50" r="18"
        fill="none" stroke={palette.secondary} strokeWidth="1"
        strokeDasharray="1 3" opacity="0.3"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO VARIANT: SUPERNOVA
// ─────────────────────────────────────────────────────────────────────────────

function LogoSupernova({ size, entropy, active, palette }) {
  const [phase, setPhase] = useState(0);
  const sig = useMemo(() => entropy.signature(), [entropy]);
  const id = useMemo(() => `nova-${Math.random().toString(36).slice(2, 8)}`, []);

  useFrame(() => setPhase(p => p + 0.04 * sig.pulse), active);

  const rays = useMemo(() => {
    entropy.reset();
    return Array.from({ length: 20 }, (_, i) => ({
      angle: (i / 20) * Math.PI * 2,
      len: entropy.range(8, 18),
      speed: entropy.range(0.5, 1.5),
      width: entropy.range(0.5, 1.5),
    }));
  }, [entropy]);

  const sw = Math.max(size * 0.03, 2);

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.secondary} />
          <stop offset="50%" stopColor={palette.primary} />
          <stop offset="100%" stopColor={palette.accent} />
        </linearGradient>
        <filter id={`${id}-glow`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" />
          <feMerge><feMergeNode /><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Corona rays */}
      <g opacity={active ? 0.7 : 0.3}>
        {rays.map((ray, i) => {
          const pulse = Math.sin(phase * ray.speed + i) * 0.4 + 0.6;
          const x1 = 50 + Math.cos(ray.angle) * 34;
          const y1 = 50 + Math.sin(ray.angle) * 34;
          const x2 = 50 + Math.cos(ray.angle) * (34 + ray.len * pulse);
          const y2 = 50 + Math.sin(ray.angle) * (34 + ray.len * pulse);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={i % 2 === 0 ? palette.primary : palette.secondary}
              strokeWidth={ray.width * pulse} strokeLinecap="round" opacity={pulse * 0.6}
            />
          );
        })}
      </g>

      {/* Core glow */}
      <circle cx="50" cy="50" r="15" fill={palette.secondary} opacity="0.15" filter={`url(#${id}-glow)`} />

      {/* Main ring */}
      <circle cx="50" cy="50" r="32" fill="none" stroke={`url(#${id}-grad)`} strokeWidth={sw} filter={`url(#${id}-glow)`} />

      {/* Diagonal stroke */}
      <line x1="73" y1="27" x2="27" y2="73" stroke={`url(#${id}-grad)`} strokeWidth={sw} strokeLinecap="round" filter={`url(#${id}-glow)`} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO VARIANT: QUANTUM
// ─────────────────────────────────────────────────────────────────────────────

function LogoQuantum({ size, entropy, active, palette }) {
  const [phase, setPhase] = useState(0);
  const sig = useMemo(() => entropy.signature(), [entropy]);
  const id = useMemo(() => `quantum-${Math.random().toString(36).slice(2, 8)}`, []);

  useFrame(() => setPhase(p => p + 0.03), active);

  const orbitals = useMemo(() => {
    entropy.reset();
    return Array.from({ length: 3 }, (_, i) => ({
      rx: 25 + i * 8,
      ry: 12 + i * 4,
      tilt: entropy.range(-30, 30),
      speed: entropy.range(0.5, 1.2) * (i % 2 === 0 ? 1 : -1),
      particles: Array.from({ length: 2 }, () => entropy.random()),
    }));
  }, [entropy]);

  const sw = Math.max(size * 0.025, 1.5);

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: 'visible' }}>
      <defs>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Orbitals */}
      {orbitals.map((orb, i) => (
        <g key={i} style={{ transform: `rotate(${orb.tilt + phase * orb.speed * 30}deg)`, transformOrigin: 'center' }}>
          <ellipse cx="50" cy="50" rx={orb.rx} ry={orb.ry} fill="none" stroke={palette.primary} strokeWidth="1" opacity="0.3" />
          {orb.particles.map((p, j) => {
            const a = (p + phase * orb.speed) * Math.PI * 2;
            const x = 50 + Math.cos(a) * orb.rx;
            const y = 50 + Math.sin(a) * orb.ry;
            return <circle key={j} cx={x} cy={y} r="2" fill={palette.secondary} opacity="0.8" />;
          })}
        </g>
      ))}

      {/* Nucleus */}
      <circle cx="50" cy="50" r="8" fill={palette.accent} opacity="0.3" />
      <circle cx="50" cy="50" r="4" fill={palette.primary} filter={`url(#${id}-glow)`} />

      {/* Ø symbol */}
      <circle cx="50" cy="50" r="32" fill="none" stroke={palette.primary} strokeWidth={sw} opacity="0.8" />
      <line x1="73" y1="27" x2="27" y2="73" stroke={palette.primary} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO VARIANT: PLASMA
// ─────────────────────────────────────────────────────────────────────────────

function LogoPlasma({ size, entropy, active, palette }) {
  const [phase, setPhase] = useState(0);
  const sig = useMemo(() => entropy.signature(), [entropy]);
  const id = useMemo(() => `plasma-${Math.random().toString(36).slice(2, 8)}`, []);

  useFrame(() => setPhase(p => p + 0.06), active);

  const blobPath = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      const w1 = Math.sin(a * 3 + phase) * 4;
      const w2 = Math.sin(a * 5 + phase * 1.3) * 3;
      const w3 = Math.sin(a * 7 + phase * 0.7 + sig.phase) * 2;
      const r = 28 + w1 + w2 + w3;
      pts.push(`${i === 0 ? 'M' : 'L'} ${50 + Math.cos(a) * r} ${50 + Math.sin(a) * r}`);
    }
    return pts.join(' ') + ' Z';
  }, [phase, sig.phase]);

  const sw = Math.max(size * 0.03, 2);

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.primary} />
          <stop offset="100%" stopColor={palette.secondary} />
        </linearGradient>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Plasma blob */}
      <path d={blobPath} fill={`${palette.primary}15`} stroke={palette.accent} strokeWidth="1" opacity="0.5" />

      {/* Inner plasma */}
      <circle cx="50" cy="50" r="18" fill={`${palette.secondary}10`} />

      {/* Main ring */}
      <circle cx="50" cy="50" r="32" fill="none" stroke={`url(#${id}-grad)`} strokeWidth={sw} filter={`url(#${id}-glow)`} />

      {/* Diagonal */}
      <line x1="73" y1="27" x2="27" y2="73" stroke={`url(#${id}-grad)`} strokeWidth={sw} strokeLinecap="round" filter={`url(#${id}-glow)`} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO VARIANT: ENTROPY
// ─────────────────────────────────────────────────────────────────────────────

function LogoEntropy({ size, entropy, active, palette }) {
  const [phase, setPhase] = useState(0);
  const glitch = GlitchLayer({ active, intensity: entropy.signature().chaos });
  const sig = useMemo(() => entropy.signature(), [entropy]);
  const id = useMemo(() => `entropy-${Math.random().toString(36).slice(2, 8)}`, []);

  useFrame(() => setPhase(p => p + 0.04), active);

  const fragments = useMemo(() => {
    entropy.reset();
    return Array.from({ length: 12 }, (_, i) => ({
      angle: entropy.range(0, Math.PI * 2),
      dist: entropy.range(35, 50),
      size: entropy.range(2, 6),
      rot: entropy.range(0, 360),
      speed: entropy.range(0.2, 0.8),
    }));
  }, [entropy]);

  const sw = Math.max(size * 0.03, 2);

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: 'visible' }}>
      <defs>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Floating fragments */}
      <g opacity={active ? 0.6 : 0.3}>
        {fragments.map((f, i) => {
          const a = f.angle + phase * f.speed;
          const x = 50 + Math.cos(a) * f.dist;
          const y = 50 + Math.sin(a) * f.dist;
          return (
            <rect
              key={i} x={x - f.size / 2} y={y - f.size / 2}
              width={f.size} height={f.size}
              fill={[palette.primary, palette.secondary, palette.accent][i % 3]}
              opacity={0.4 + Math.sin(phase + i) * 0.3}
              style={{ transform: `rotate(${f.rot + phase * 50}deg)`, transformOrigin: `${x}px ${y}px` }}
            />
          );
        })}
      </g>

      {/* Main Ø with glitch */}
      <g style={{ transform: `translate(${glitch.x}px, ${glitch.y}px)` }}>
        <circle cx="50" cy="50" r="32" fill="none" stroke={palette.primary} strokeWidth={sw} filter={`url(#${id}-glow)`} />
        <line x1="73" y1="27" x2="27" y2="73" stroke={palette.primary} strokeWidth={sw} strokeLinecap="round" />
      </g>

      {/* RGB split on glitch */}
      {active && (
        <g opacity="0.3" style={{ mixBlendMode: 'screen' }}>
          <circle cx={50 + glitch.x * 2} cy="50" r="32" fill="none" stroke="#ff0000" strokeWidth={sw * 0.5} />
          <circle cx={50 - glitch.x * 2} cy="50" r="32" fill="none" stroke="#00ffff" strokeWidth={sw * 0.5} />
        </g>
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO VARIANT: COSMIC
// ─────────────────────────────────────────────────────────────────────────────

function LogoCosmic({ size, entropy, active, palette }) {
  const [phase, setPhase] = useState(0);
  const sig = useMemo(() => entropy.signature(), [entropy]);
  const id = useMemo(() => `cosmic-${Math.random().toString(36).slice(2, 8)}`, []);

  useFrame(() => setPhase(p => p + 0.02), active);

  const stars = useMemo(() => {
    entropy.reset();
    return Array.from({ length: 30 }, () => ({
      x: entropy.range(5, 95),
      y: entropy.range(5, 95),
      size: entropy.range(0.3, 1.2),
      twinkle: entropy.range(0.5, 2),
    }));
  }, [entropy]);

  const sw = Math.max(size * 0.028, 2);

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={`${id}-nebula`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={palette.primary} stopOpacity="0.15" />
          <stop offset="50%" stopColor={palette.secondary} stopOpacity="0.08" />
          <stop offset="100%" stopColor={palette.accent} stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Nebula background */}
      <circle cx="50" cy="50" r="48" fill={`url(#${id}-nebula)`} />

      {/* Stars */}
      <g>
        {stars.map((s, i) => (
          <circle
            key={i} cx={s.x} cy={s.y} r={s.size}
            fill={palette.accent}
            opacity={0.3 + Math.sin(phase * s.twinkle + i) * 0.4}
          />
        ))}
      </g>

      {/* Main Ø */}
      <circle cx="50" cy="50" r="32" fill="none" stroke={palette.primary} strokeWidth={sw} filter={`url(#${id}-glow)`} />
      <line x1="73" y1="27" x2="27" y2="73" stroke={palette.primary} strokeWidth={sw} strokeLinecap="round" filter={`url(#${id}-glow)`} />

      {/* Inner ring */}
      <circle cx="50" cy="50" r="24" fill="none" stroke={palette.secondary} strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO VARIANT: SOLAR
// ─────────────────────────────────────────────────────────────────────────────

function LogoSolar({ size, entropy, active, palette }) {
  const [phase, setPhase] = useState(0);
  const sig = useMemo(() => entropy.signature(), [entropy]);
  const id = useMemo(() => `solar-${Math.random().toString(36).slice(2, 8)}`, []);

  useFrame(() => setPhase(p => p + 0.025), active);

  const flares = useMemo(() => {
    entropy.reset();
    return Array.from({ length: 8 }, (_, i) => ({
      angle: (i / 8) * Math.PI * 2 + entropy.range(-0.2, 0.2),
      length: entropy.range(15, 30),
      width: entropy.range(4, 10),
      curve: entropy.range(-15, 15),
    }));
  }, [entropy]);

  const sw = Math.max(size * 0.03, 2);

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={`${id}-core`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={palette.accent} />
          <stop offset="50%" stopColor={palette.secondary} />
          <stop offset="100%" stopColor={palette.primary} />
        </radialGradient>
        <filter id={`${id}-glow`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" />
          <feMerge><feMergeNode /><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Solar flares */}
      <g opacity={active ? 0.6 : 0.3}>
        {flares.map((f, i) => {
          const pulse = Math.sin(phase * 2 + i) * 0.3 + 0.7;
          const x1 = 50 + Math.cos(f.angle) * 32;
          const y1 = 50 + Math.sin(f.angle) * 32;
          const x2 = 50 + Math.cos(f.angle) * (32 + f.length * pulse);
          const y2 = 50 + Math.sin(f.angle) * (32 + f.length * pulse);
          const cx = (x1 + x2) / 2 + f.curve * Math.cos(f.angle + Math.PI / 2);
          const cy = (y1 + y2) / 2 + f.curve * Math.sin(f.angle + Math.PI / 2);
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
              fill="none" stroke={palette.secondary}
              strokeWidth={f.width * pulse * 0.3}
              strokeLinecap="round" opacity={pulse * 0.5}
            />
          );
        })}
      </g>

      {/* Core */}
      <circle cx="50" cy="50" r="20" fill={`url(#${id}-core)`} opacity="0.4" filter={`url(#${id}-glow)`} />

      {/* Main ring */}
      <circle cx="50" cy="50" r="32" fill="none" stroke={palette.primary} strokeWidth={sw} filter={`url(#${id}-glow)`} />

      {/* Diagonal */}
      <line x1="73" y1="27" x2="27" y2="73" stroke={palette.primary} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO VARIANT: MATRIX
// ─────────────────────────────────────────────────────────────────────────────

function LogoMatrix({ size, entropy, active, palette }) {
  const [chars, setChars] = useState([]);
  const [frame, setFrame] = useState(0);
  const id = useMemo(() => `matrix-${Math.random().toString(36).slice(2, 8)}`, []);

  useEffect(() => {
    entropy.reset();
    const c = [];
    for (let i = 0; i < 25; i++) {
      c.push({
        x: entropy.range(8, 92),
        y: entropy.range(5, 95),
        char: GLITCH[Math.floor(entropy.random() * GLITCH.length)],
        speed: entropy.range(0.3, 1),
        fade: entropy.range(0.2, 0.6),
      });
    }
    setChars(c);
  }, [entropy]);

  useFrame(() => {
    setFrame(f => f + 1);
    if (active && frame % 5 === 0) {
      setChars(prev => prev.map(c => ({
        ...c,
        y: (c.y + c.speed) % 100,
        char: Math.random() > 0.9 ? GLITCH[Math.floor(Math.random() * GLITCH.length)] : c.char,
      })));
    }
  }, active);

  const sw = Math.max(size * 0.028, 2);

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: 'visible' }}>
      <defs>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Matrix rain */}
      <g opacity={active ? 0.5 : 0.2}>
        {chars.map((c, i) => (
          <text
            key={i} x={c.x} y={c.y}
            fontSize="5" fontFamily="monospace"
            fill={palette.primary}
            opacity={c.fade * (0.5 + Math.sin(frame * 0.1 + i) * 0.3)}
          >
            {c.char}
          </text>
        ))}
      </g>

      {/* Main Ø */}
      <circle cx="50" cy="50" r="32" fill="none" stroke={palette.primary} strokeWidth={sw} filter={`url(#${id}-glow)`} />
      <line x1="73" y1="27" x2="27" y2="73" stroke={palette.primary} strokeWidth={sw} strokeLinecap="round" filter={`url(#${id}-glow)`} />

      {/* Binary inner ring */}
      <circle cx="50" cy="50" r="26" fill="none" stroke={palette.secondary} strokeWidth="1" strokeDasharray="1 2" opacity="0.3" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MASTER LOGO COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const VARIANTS = {
  void: LogoVoid,
  supernova: LogoSupernova,
  quantum: LogoQuantum,
  plasma: LogoPlasma,
  entropy: LogoEntropy,
  cosmic: LogoCosmic,
  solar: LogoSolar,
  matrix: LogoMatrix,
};

export function EntropyLogo({
  seed = 'ENTROPY',
  size = 200,
  variant = 'entropy',
  palette: paletteKey = null,
  active = true,
  showData = true,
  showDither = true,
  showScanlines = true,
}) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const entropy = useEntropy(seed);
  const sig = useMemo(() => entropy.signature(), [entropy]);

  // Auto-select palette if not provided
  const palette = useMemo(() => {
    if (paletteKey && PALETTES[paletteKey]) return PALETTES[paletteKey];
    return PALETTES[variant] || PALETTES.entropy;
  }, [paletteKey, variant]);

  const LogoComponent = VARIANTS[variant] || VARIANTS.entropy;
  const statusText = useScramble(variant.toUpperCase(), mounted && hovered, 30);
  const seedText = useScramble(seed.slice(0, 8).toUpperCase(), hovered, 25);

  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size + (showData ? 50 : 0),
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo container */}
      <div style={{ position: 'relative', width: size, height: size, cursor: 'pointer' }}>
        {/* Effects */}
        {showDither && <NoiseDither intensity={active ? 0.3 : 0.15} />}
        {showScanlines && <Scanlines opacity={0.06} />}

        {/* Glow */}
        <div style={{
          position: 'absolute', inset: '10%', borderRadius: '50%',
          background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`,
          filter: `blur(${size * 0.12}px)`,
          opacity: active ? 0.8 : 0.3,
          transform: `scale(${hovered ? 1.1 : 1})`,
          transition: 'all 0.3s ease',
        }} />

        {/* Logo */}
        <div style={{
          position: 'relative', zIndex: 1,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1)' : 'scale(0.9)',
          transition: 'all 0.5s ease',
        }}>
          <LogoComponent size={size} entropy={entropy} active={active} palette={palette} />
        </div>
      </div>

      {/* Data */}
      {showData && (
        <div style={{
          textAlign: 'center', paddingTop: 12,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.5s ease 0.3s',
        }}>
          <div style={{
            fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.3em',
            color: palette.primary, textShadow: `0 0 10px ${palette.glow}`,
          }}>
            {statusText}
          </div>
          <div style={{
            fontSize: 8, fontFamily: 'monospace', letterSpacing: '0.15em',
            color: palette.secondary, opacity: 0.4, marginTop: 4,
          }}>
            {seedText}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ENTROPY INJECTOR — Generate chaos parameters
// ─────────────────────────────────────────────────────────────────────────────

export function EntropyInjector({ onInject }) {
  const [values, setValues] = useState({ chaos: 0.5, drift: 0, warp: 0.5 });

  const inject = useCallback(() => {
    const newValues = {
      chaos: Math.random(),
      drift: (Math.random() - 0.5) * 2,
      warp: Math.random(),
      timestamp: Date.now(),
    };
    setValues(newValues);
    onInject?.(newValues);
  }, [onInject]);

  return (
    <div style={{
      padding: 16,
      backgroundColor: 'rgba(255,255,255,0.03)',
      borderRadius: 8,
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{ fontSize: 9, letterSpacing: '0.3em', opacity: 0.4, marginBottom: 12 }}>
        ENTROPY INJECTOR
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
        {Object.entries(values).filter(([k]) => k !== 'timestamp').map(([key, val]) => (
          <div key={key} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 8, opacity: 0.5, marginBottom: 4 }}>{key.toUpperCase()}</div>
            <div style={{
              fontSize: 12, fontFamily: 'monospace',
              color: val > 0.7 ? '#ff3366' : val > 0.4 ? '#ffaa00' : '#00ff88',
            }}>
              {typeof val === 'number' ? val.toFixed(3) : val}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={inject}
        style={{
          width: '100%', padding: '10px', fontSize: 10, fontFamily: 'monospace',
          letterSpacing: '0.2em', backgroundColor: 'rgba(255,51,102,0.2)',
          border: '1px solid rgba(255,51,102,0.4)', borderRadius: 4,
          color: '#ff3366', cursor: 'pointer', transition: 'all 0.2s',
        }}
      >
        INJECT ENTROPY
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ENTROPY OUTCOME — Display chaos results
// ─────────────────────────────────────────────────────────────────────────────

export function EntropyOutcome({ entropy, palette }) {
  const sig = useMemo(() => entropy.signature(), [entropy]);

  const outcomes = [
    { label: 'CHAOS', value: sig.chaos, color: sig.chaos > 0.7 ? '#ff3366' : '#00ff88' },
    { label: 'DRIFT', value: sig.drift, color: Math.abs(sig.drift) > 0.5 ? '#ffaa00' : '#00d4ff' },
    { label: 'PULSE', value: sig.pulse, color: '#a855f7' },
    { label: 'WARP', value: sig.warp, color: sig.warp > 0.5 ? '#ff6600' : '#00ffff' },
    { label: 'SPIN', value: sig.spin, color: '#ff00ff' },
    { label: 'FLICKER', value: sig.flicker, color: '#ffdd00' },
  ];

  return (
    <div style={{
      padding: 16,
      backgroundColor: 'rgba(255,255,255,0.02)',
      borderRadius: 8,
      border: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{ fontSize: 9, letterSpacing: '0.3em', opacity: 0.4, marginBottom: 12 }}>
        ENTROPY OUTCOME
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {outcomes.map(o => (
          <div key={o.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 7, opacity: 0.4, marginBottom: 2 }}>{o.label}</div>
            <div style={{
              fontSize: 11, fontFamily: 'monospace', color: o.color,
              textShadow: `0 0 8px ${o.color}50`,
            }}>
              {o.value.toFixed(3)}
            </div>
            <div style={{
              height: 2, marginTop: 4, borderRadius: 1,
              background: `linear-gradient(90deg, ${o.color}80 ${Math.abs(o.value) * 50}%, transparent ${Math.abs(o.value) * 50}%)`,
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EntropyLogo;
