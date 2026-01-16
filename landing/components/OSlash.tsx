import React, { useState, useEffect, useMemo } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// Ø — FUTURISTIC CLEAN TECH LOGO
// Für alles und nichts. Der Strich macht das Ø.
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
// Ø LOGO COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export interface OSlashProps {
  size?: number;
  color?: 'cyan' | 'green' | 'purple' | 'white';
  variant?: 'default' | 'minimal' | 'glow' | 'outline' | 'solid';
  animated?: boolean;
  strokeWidth?: number | 'auto';
}

export function OSlash({ 
  size = 200, 
  color = 'cyan',
  variant = 'default', // 'default' | 'minimal' | 'glow' | 'outline' | 'solid'
  animated = true,
  strokeWidth = 'auto',
}: OSlashProps) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  const id = useMemo(() => `oslash-${Math.random().toString(36).slice(2, 8)}`, []);
  
  const mainColor = {
    cyan: COLORS.cyan,
    green: COLORS.green,
    purple: COLORS.purple,
    white: COLORS.white,
  }[color] || COLORS.cyan;

  // Auto stroke width based on size
  const sw = strokeWidth === 'auto' ? Math.max(size * 0.04, 2) : strokeWidth;
  const swHover = sw * 1.2;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Variant styles
  const isGlow = variant === 'glow';
  const isMinimal = variant === 'minimal';
  const isOutline = variant === 'outline';
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
              inset: '10%',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${mainColor}30 0%, transparent 70%)`,
              filter: `blur(${size * 0.15}px)`,
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
            <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={mainColor} />
              <stop offset="100%" stopColor={mainColor} stopOpacity="0.6" />
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
              THE Ø — Circle + Horizontal Stroke
          ═══════════════════════════════════════════════════════════════════ */}
          
          <g 
            filter={isGlow || variant === 'default' ? `url(#${id}-glow)` : 'none'}
            style={{
              transform: mounted ? 'rotate(0deg)' : 'rotate(-90deg)',
              transformOrigin: 'center',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Circle */}
            <circle
              cx="50"
              cy="50"
              r="35"
              fill={isSolid ? mainColor : 'none'}
              stroke={isSolid ? 'none' : (isMinimal ? mainColor : `url(#${id}-grad)`)}
              strokeWidth={isSolid ? 0 : (hovered ? swHover : sw)}
              style={{
                transition: 'stroke-width 0.3s ease',
              }}
            />

            {/* ═══════════════════════════════════════════════════════════════
                CRITICAL: Der Strich — Makes Ø not O
            ═══════════════════════════════════════════════════════════════ */}
            <line
              x1="15"
              y1="50"
              x2="85"
              y2="50"
              stroke={isSolid ? COLORS.void : (isMinimal ? mainColor : `url(#${id}-grad)`)}
              strokeWidth={hovered ? swHover : sw}
              strokeLinecap="round"
              style={{
                transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'center',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            />
          </g>

          {/* Inner Ring (optional detail) */}
          {variant === 'default' && (
            <circle
              cx="50"
              cy="50"
              r="28"
              fill="none"
              stroke={mainColor}
              strokeWidth="1"
              strokeDasharray="2 4"
              opacity="0.3"
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

export default OSlash;
