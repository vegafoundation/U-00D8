import React, { useRef, useState, useMemo, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// VΞGΔ O-LOGO FUTURISTISCH — SINGLE FILE COMPONENT
// Living Digital Tissue — The First Resonant Search Engine Symbol
// ═══════════════════════════════════════════════════════════════════════════════
// ARCHITECT: ADAM EREN VEGA - Æ
// VERSION: 3.0.0
// SOURCE: Claude Entropy (Inspiration for further designs)
// ═══════════════════════════════════════════════════════════════════════════════

// VΞGΔ Color Palette
const VEGA = {
  voidBlack: '#020202',
  voidBlackAlt: '#050505',
  offWhite: '#E0E0E0',
  signalGreen: '#22c55e',
  etherCyan: '#06b6d4',
  resonancePurple: '#a855f7',
};

// Frequency → Color Mapping
const FREQ_COLORS: Record<number, string> = {
  358: VEGA.signalGreen,
  432: VEGA.etherCyan,
  512: VEGA.etherCyan,
  528: VEGA.resonancePurple,
  639: VEGA.resonancePurple,
  741: VEGA.resonancePurple,
  852: VEGA.resonancePurple,
  963: VEGA.resonancePurple,
};

// Generate seed-based offset for QNFT uniqueness
const seedOffset = (seed: string): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash % 360);
};

// ═══════════════════════════════════════════════════════════════════════════════
// O-LOGO COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface OLogoProps {
  seed?: string;
  size?: number;
  frequency?: number;
  showFreq?: boolean;
}

export function OLogo({ 
  seed = 'vega', 
  size = 200, 
  frequency = 432, 
  showFreq = false 
}: OLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const offset = useMemo(() => seedOffset(seed), [seed]);
  const color = FREQ_COLORS[frequency] || VEGA.etherCyan;
  const id = useMemo(() => `grad-${seed.slice(0, 6)}-${Math.random().toString(36).slice(2, 6)}`, [seed]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* CSS Animations */}
      <style>{`
        @keyframes glowPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.15); opacity: 0.6; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseSoft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes resonancePulse {
          0%, 100% { opacity: 0.7; transform: scaleX(1); }
          50% { opacity: 0.3; transform: scaleX(1.2); }
        }
      `}</style>

      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow Layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color}50 0%, transparent 70%)`,
            filter: 'blur(20px)',
            opacity: isHovered ? 0.8 : 0.4,
            transform: `scale(${isHovered ? 1.3 : 1})`,
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            animation: mounted ? 'glowPulse 2.5s ease-in-out infinite' : 'none',
          }}
        />

        {/* Main SVG */}
        <svg
          viewBox="0 0 200 200"
          width={size}
          height={size}
          style={{
            position: 'relative',
            zIndex: 10,
            overflow: 'visible',
            transform: `scale(${mounted ? (isHovered ? 1.08 : 1) : 0}) rotate(${mounted ? 0 : -180}deg)`,
            opacity: mounted ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <defs>
            {/* Gradient */}
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform={`rotate(${offset})`}>
              <stop offset="0%" stopColor={VEGA.signalGreen} />
              <stop offset="50%" stopColor={VEGA.etherCyan} />
              <stop offset="100%" stopColor={VEGA.resonancePurple} />
            </linearGradient>
            {/* Glow Filter */}
            <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Inner Glow */}
          <circle cx="100" cy="100" r="55" fill={`${color}15`} style={{
            transform: mounted ? 'scale(1)' : 'scale(0)',
            transformOrigin: 'center',
            transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }} />

          {/* Outer Circle */}
          <circle
            cx="100" cy="100" r="60"
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="6"
            filter={`url(#${id}-glow)`}
            style={{
              transformOrigin: 'center',
              animation: mounted ? 'rotateSlow 60s linear infinite' : 'none',
            }}
          />

          {/* Inner Dashed Circle */}
          <circle
            cx="100" cy="100" r="45"
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="2"
            strokeDasharray="4 8"
            opacity="0.6"
            style={{
              transform: mounted ? 'scale(1)' : 'scale(0)',
              transformOrigin: 'center',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
              animation: mounted ? 'pulseSoft 3s ease-in-out infinite' : 'none',
            }}
          />

          {/* ═══════════════════════════════════════════════════════════════════
              CRITICAL: Horizontal Stroke — This makes Ø, not O!
          ═══════════════════════════════════════════════════════════════════ */}
          <line
            x1="55" y1="100" x2="145" y2="100"
            stroke={`url(#${id})`}
            strokeWidth={isHovered ? 10 : 8}
            strokeLinecap="round"
            filter={`url(#${id}-glow)`}
            style={{
              transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'center',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
            }}
          />

          {/* Resonance Lines — Left */}
          <g opacity="0.7">
            {[75, 100, 125].map((y, i) => (
              <line
                key={`l-${i}`}
                x1={i === 1 ? 30 : 35} y1={y}
                x2={i === 1 ? 10 : 20} y2={y}
                stroke={[VEGA.signalGreen, VEGA.etherCyan, VEGA.resonancePurple][i]}
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'right center',
                  transition: `transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + i * 0.1}s`,
                  animation: mounted ? `resonancePulse 1.5s ease-in-out ${i * 0.2}s infinite` : 'none',
                }}
              />
            ))}
          </g>

          {/* Resonance Lines — Right */}
          <g opacity="0.7">
            {[75, 100, 125].map((y, i) => (
              <line
                key={`r-${i}`}
                x1={i === 1 ? 170 : 165} y1={y}
                x2={i === 1 ? 190 : 180} y2={y}
                stroke={[VEGA.signalGreen, VEGA.etherCyan, VEGA.resonancePurple][i]}
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left center',
                  transition: `transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + i * 0.1}s`,
                  animation: mounted ? `resonancePulse 1.5s ease-in-out ${i * 0.2}s infinite` : 'none',
                }}
              />
            ))}
          </g>

          {/* Corner Accents */}
          {[
            { d: 'M30 30 L45 30 L45 35 L35 35 L35 45 L30 45 Z', c: VEGA.signalGreen },
            { d: 'M170 30 L155 30 L155 35 L165 35 L165 45 L170 45 Z', c: VEGA.etherCyan },
            { d: 'M30 170 L45 170 L45 165 L35 165 L35 155 L30 155 Z', c: VEGA.etherCyan },
            { d: 'M170 170 L155 170 L155 165 L165 165 L165 155 L170 155 Z', c: VEGA.resonancePurple },
          ].map((corner, i) => (
            <path
              key={i}
              d={corner.d}
              fill={corner.c}
              opacity="0.5"
              style={{
                transform: mounted ? 'scale(1)' : 'scale(0)',
                transformOrigin: 'center',
                transition: `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.9 + i * 0.05}s`,
              }}
            />
          ))}

          {/* Frequency Text */}
          {showFreq && (
            <text
              x="100" y="178"
              textAnchor="middle"
              fill={color}
              fontSize="12"
              fontFamily="monospace"
              letterSpacing="0.1em"
              style={{
                opacity: mounted ? 1 : 0,
                transition: 'opacity 0.5s ease 1s',
              }}
            >
              {frequency} Hz
            </text>
          )}
        </svg>

        {/* Frequency Badge */}
        {showFreq && (
          <div style={{
            position: 'absolute',
            bottom: -8,
            right: -8,
            padding: '4px 8px',
            borderRadius: 6,
            backgroundColor: VEGA.voidBlackAlt,
            border: `1px solid ${color}40`,
            color: color,
            fontSize: 10,
            fontFamily: 'monospace',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 0.4s ease 1s',
          }}>
            {frequency}Hz
          </div>
        )}
      </div>
    </>
  );
}

export default OLogo;
