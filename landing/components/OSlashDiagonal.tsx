import React, { useState, useEffect, useMemo } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// Ø — FUTURISTIC CLEAN TECH LOGO (DIAGONAL STROKE)
// Diagonal stroke von oben rechts nach unten links
// Strich schaut raus wie Unicode U+00D8: Ø
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
};

// ═══════════════════════════════════════════════════════════════════════════════
// Ø LOGO COMPONENT (DIAGONAL)
// ═══════════════════════════════════════════════════════════════════════════════

export interface OSlashDiagonalProps {
  size?: number;
  color?: 'cyan' | 'green' | 'purple' | 'white';
  variant?: 'default' | 'minimal' | 'glow' | 'outline' | 'solid';
  animated?: boolean;
  strokeWidth?: number | 'auto';
  overshoot?: number; // How much the stroke extends beyond circle (0-0.5)
}

export function OSlashDiagonal({ 
  size = 200, 
  color = 'cyan',
  variant = 'default', // 'default' | 'minimal' | 'glow' | 'outline' | 'solid'
  animated = true,
  strokeWidth = 'auto',
  overshoot = 0.2, // How much the stroke extends beyond circle (0-0.5)
}: OSlashDiagonalProps) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  const id = useMemo(() => `oslash-diag-${Math.random().toString(36).slice(2, 8)}`, []);
  
  const mainColor = {
    cyan: COLORS.cyan,
    green: COLORS.green,
    purple: COLORS.purple,
    white: COLORS.white,
  }[color] || COLORS.cyan;

  // Auto stroke width based on size
  const sw = strokeWidth === 'auto' ? Math.max(size * 0.045, 2) : strokeWidth;
  const swHover = sw * 1.15;

  // Circle parameters
  const cx = 50;
  const cy = 50;
  const r = 32;
  
  // Diagonal stroke coordinates (top-right to bottom-left)
  // Extended beyond circle by overshoot amount
  const extension = r * overshoot;
  const diagonalOffset = r * 0.707; // cos(45°) ≈ 0.707
  
  // Start point (top-right, outside circle)
  const x1 = cx + diagonalOffset + extension * 0.707;
  const y1 = cy - diagonalOffset - extension * 0.707;
  
  // End point (bottom-left, outside circle)
  const x2 = cx - diagonalOffset - extension * 0.707;
  const y2 = cy + diagonalOffset + extension * 0.707;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Variant styles
  const isGlow = variant === 'glow';
  const isMinimal = variant === 'minimal';
  const isSolid = variant === 'solid';

  return (
    <>
      {/* CSS Animations */}
      <style>{`
        @keyframes oGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes oRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Glow Background */}
        {(isGlow || variant === 'default') && (
          <div
            style={{
              position: 'absolute',
              inset: '15%',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${mainColor}25 0%, transparent 70%)`,
              filter: `blur(${size * 0.12}px)`,
              opacity: hovered ? 0.9 : 0.5,
              transform: `scale(${hovered ? 1.2 : 1})`,
              transition: 'all 0.4s ease-out',
              animation: animated && mounted ? 'oGlow 3s ease-in-out infinite' : 'none',
            }}
          />
        )}

        {/* Main SVG */}
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          style={{
            position: 'relative',
            zIndex: 1,
            overflow: 'visible',
            transform: mounted ? `scale(${hovered ? 1.05 : 1})` : 'scale(0.8)',
            opacity: mounted ? 1 : 0,
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <defs>
            {/* Gradient */}
            <linearGradient id={`${id}-grad`} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={mainColor} />
              <stop offset="100%" stopColor={mainColor} stopOpacity="0.7" />
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

          {/* ═══════════════════════════════════════════════════════════════════
              THE Ø — Circle + Diagonal Stroke (extending beyond)
              Like Unicode U+00D8: Ø
          ═══════════════════════════════════════════════════════════════════ */}
          
          <g filter={isGlow || variant === 'default' ? `url(#${id}-glow)` : 'none'}>
            
            {/* Circle */}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill={isSolid ? mainColor : 'none'}
              stroke={isSolid ? 'none' : (isMinimal ? mainColor : `url(#${id}-grad)`)}
              strokeWidth={isSolid ? 0 : (hovered ? swHover : sw)}
              style={{
                transform: mounted ? 'scale(1)' : 'scale(0)',
                transformOrigin: 'center',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />

            {/* ═══════════════════════════════════════════════════════════════
                DIAGONAL STROKE — Top Right → Bottom Left
                Extends beyond circle like real Ø
            ═══════════════════════════════════════════════════════════════ */}
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isSolid ? COLORS.void : (isMinimal ? mainColor : `url(#${id}-grad)`)}
              strokeWidth={hovered ? swHover : sw}
              strokeLinecap="round"
              style={{
                transform: mounted ? 'scale(1)' : 'scale(0)',
                transformOrigin: 'center',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
              }}
            />
          </g>

          {/* Inner Ring (optional detail for default variant) */}
          {variant === 'default' && (
            <circle
              cx={cx}
              cy={cy}
              r={r - 6}
              fill="none"
              stroke={mainColor}
              strokeWidth="1"
              strokeDasharray="2 4"
              opacity="0.25"
              style={{
                transform: mounted ? 'scale(1)' : 'scale(0)',
                transformOrigin: 'center',
                transition: 'transform 0.6s ease 0.3s',
                animation: animated && mounted ? 'oRotate 30s linear infinite reverse' : 'none',
              }}
            />
          )}
        </svg>
      </div>
    </>
  );
}

export default OSlashDiagonal;
