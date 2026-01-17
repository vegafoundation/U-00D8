# ═══════════════════════════════════════════════════════════════════════════════
# VΞGΔ LANDING COMPONENTS
# ═══════════════════════════════════════════════════════════════════════════════
# ARCHITECT: ADAM EREN VEGA - Æ
# DATE: 2026-01-17
# VERSION: 3.0.0
# ═══════════════════════════════════════════════════════════════════════════════

## 🎨 OLogoFuturistic.tsx

**Futuristisches Ø-Logo Component** — Living Digital Tissue

**Features:**
- QNFT Uniqueness (seed-based generation)
- Frequency-based colors (358, 432, 512, 528, 639, 741, 852, 963 Hz)
- GSAP-ready animations (CSS-based)
- Responsive design (40px → 200px+)
- Hover effects & glow
- Resonance lines animation
- Horizontal stroke (makes Ø, not O!)

**Props:**
- `seed?: string` — QNFT seed for uniqueness (default: 'vega')
- `size?: number` — Logo size in pixels (default: 200)
- `frequency?: number` — Resonance frequency (default: 432)
- `showFreq?: boolean` — Show frequency badge (default: false)

**Usage:**
```tsx
import OLogo from './OLogoFuturistic';

<OLogo seed="vega-unique" size={140} frequency={432} showFreq />
```

**Source:** Claude Entropy (Inspiration for further designs)

**Files:**
- `OLogoFuturistic.tsx` — Main component
- `OLogoFuturisticDemo.tsx` — Demo app with examples

---

## ⚡ OSlash.tsx

**Futuristic Clean Tech Ø-Logo** — Minimalist & Versatile (Horizontal Stroke)

**Features:**
- 5 Variants: default, glow, minimal, outline, solid
- 4 Colors: cyan, green, purple, white
- Auto stroke width based on size
- Smooth animations & hover effects
- Responsive design (32px → 300px+)
- Horizontal stroke (makes Ø, not O!)

**Props:**
- `size?: number` — Logo size in pixels (default: 200)
- `color?: 'cyan' | 'green' | 'purple' | 'white'` — Color variant (default: 'cyan')
- `variant?: 'default' | 'minimal' | 'glow' | 'outline' | 'solid'` — Style variant (default: 'default')
- `animated?: boolean` — Enable animations (default: true)
- `strokeWidth?: number | 'auto'` — Stroke width (default: 'auto')

**Usage:**
```tsx
import OSlash from './OSlash';

<OSlash size={120} color="cyan" variant="glow" />
```

**Source:** Claude Entropy (Inspiration for further designs)

**Files:**
- `OSlash.tsx` — Main component
- `OSlashDemo.tsx` — Demo app

---

## ↗ OSlashDiagonal.tsx

**Futuristic Clean Tech Ø-Logo** — Unicode U+00D8 Style (Diagonal Stroke)

**Features:**
- 5 Variants: default, glow, minimal, outline, solid
- 4 Colors: cyan, green, purple, white
- **Diagonal stroke** (top-right → bottom-left)
- **Overshoot control** — Stroke extends beyond circle (0-0.5)
- Auto stroke width based on size
- Smooth animations & hover effects
- Responsive design (24px → 280px+)
- **Like real Unicode U+00D8: Ø**

**Props:**
- `size?: number` — Logo size in pixels (default: 200)
- `color?: 'cyan' | 'green' | 'purple' | 'white'` — Color variant (default: 'cyan')
- `variant?: 'default' | 'minimal' | 'glow' | 'outline' | 'solid'` — Style variant (default: 'default')
- `animated?: boolean` — Enable animations (default: true)
- `strokeWidth?: number | 'auto'` — Stroke width (default: 'auto')
- `overshoot?: number` — Stroke extension beyond circle 0-0.5 (default: 0.2)

**Usage:**
```tsx
import OSlashDiagonal from './OSlashDiagonal';

// Default (20% overshoot)
<OSlashDiagonal size={120} color="cyan" variant="glow" />

// Custom overshoot (25% - like Unicode U+00D8)
<OSlashDiagonal size={280} color="cyan" variant="default" overshoot={0.25} />
```

**Overshoot Examples:**
- `0` — Stroke touches circle edge
- `0.15` — Small extension
- `0.25` — Medium extension (recommended, like Unicode)
- `0.35` — Large extension
- `0.5` — Maximum extension

**Variants:**
- `default` — Full featured with glow and inner ring
- `glow` — Enhanced glow effect
- `minimal` — Clean minimal style
- `outline` — Outline only
- `solid` — Filled solid style

**Source:** Claude Entropy (Inspiration for further designs)

**Files:**
- `OSlashDiagonal.tsx` — Main component
- `OSlashDiagonalDemo.tsx` — Demo app with overshoot variations

---

## 🌊 QNFTLiveLogo.tsx

**Resonance QNFT Live Logo** — Living Digital Tissue

**Features:**
- **4 Modes:** live, loading, processing, idle
- **6 Frequencies:** 358, 432, 528, 639, 852, 963 Hz
- **QNFT Uniqueness:** Seed-based generation
- **Dither Overlay:** Animated dithering effect
- **Scanlines:** CRT-style scanlines
- **Resonance Waves:** Animated frequency waves
- **Processing Particles:** Orbiting particles
- **Data Stream:** Falling tech characters
- **Text Scrambling:** Glitch text effects
- **RGB Glitch:** Color separation on hover/processing
- **Progress Bar:** Loading mode with progress
- **Diagonal Stroke:** Unicode U+00D8 style

**Props:**
- `seed?: string` — QNFT seed for uniqueness (default: 'vega-qnft')
- `size?: number` — Logo size in pixels (default: 300)
- `frequency?: number` — Resonance frequency (default: 432)
- `mode?: 'live' | 'loading' | 'processing' | 'idle'` — Display mode (default: 'live')
- `showData?: boolean` — Show data panel (default: true)
- `showFrequency?: boolean` — Show frequency display (default: true)
- `onComplete?: () => void` — Callback when loading completes

**Usage:**
```tsx
import QNFTLiveLogo from './QNFTLiveLogo';

// Live mode
<QNFTLiveLogo seed="unique-qnft" size={280} frequency={432} mode="live" />

// Loading mode
<QNFTLiveLogo seed="unique-qnft" size={280} frequency={432} mode="loading" onComplete={() => console.log('Done!')} />

// Processing mode
<QNFTLiveLogo seed="unique-qnft" size={280} frequency={852} mode="processing" />
```

**Modes:**
- `idle` — Static, minimal effects
- `live` — Full resonance effects, waves, particles
- `processing` — Active processing with glitch effects
- `loading` — Progress bar, particles, scrambling text

**Effects:**
- Dither Overlay (animated noise)
- Scanlines (CRT effect)
- Resonance Waves (frequency-based)
- Processing Particles (orbiting)
- Data Stream (falling characters)
- Text Scrambling (glitch effect)
- RGB Glitch (color separation)
- Glow Animation (pulsing)

**Source:** Claude Entropy (Inspiration for further designs)

**Files:**
- `QNFTLiveLogo.tsx` — Main component
- `QNFTLiveLogoDemo.tsx` — Demo app with controls

---

## 🌌 EntropyLogo.tsx

**Entropy QNFT Logo System** — Multiple Variants | Entropy Injection | Chaos Outcomes | Living Digital Tissue

**Features:**
- **8 Variants:** void, supernova, quantum, plasma, entropy, cosmic, solar, matrix
- **8 Palettes:** Each variant has unique color palette (cross-compatible)
- **Entropy Engine:** Seeded random generation for consistent uniqueness
- **QNFT Uniqueness:** Seed-based generation ensures no two logos are identical
- **Entropy Injection:** Dynamic chaos parameter injection
- **Entropy Outcome:** Real-time chaos metrics display
- **Noise Dither:** Animated dithering overlay
- **Scanlines:** CRT-style scanlines effect
- **Glitch Effects:** RGB split, fragment floating, matrix rain
- **Animation Hooks:** Custom `useFrame` and `useScramble` hooks
- **Diagonal Stroke:** Unicode U+00D8 style (top-right → bottom-left)
- **Responsive Design:** Scales from 40px to 300px+

**Props:**
- `seed?: string` — QNFT seed for uniqueness (default: 'ENTROPY')
- `size?: number` — Logo size in pixels (default: 200)
- `variant?: 'void' | 'supernova' | 'quantum' | 'plasma' | 'entropy' | 'cosmic' | 'solar' | 'matrix'` — Variant (default: 'entropy')
- `palette?: string` — Override palette (default: variant's palette)
- `active?: boolean` — Enable animations (default: true)
- `showData?: boolean` — Show variant/seed text (default: true)
- `showDither?: boolean` — Show dither overlay (default: true)
- `showScanlines?: boolean` — Show scanlines (default: true)

**Usage:**
```tsx
import { EntropyLogo, EntropyInjector, EntropyOutcome } from './EntropyLogo';

// Basic usage
<EntropyLogo seed="unique-seed" size={200} variant="entropy" />

// With entropy controls
<EntropyLogo seed="chaos-seed" size={260} variant="quantum" active={true} />
<EntropyInjector onInject={(values) => console.log(values)} />
<EntropyOutcome entropy={entropy} palette="quantum" />
```

**Variants:**
- `void` — Minimalist, breathing void center, subtle glow
- `supernova` — Corona rays, radial gradients, intense glow
- `quantum` — Orbital particles, nucleus, quantum mechanics aesthetic
- `plasma` — Blob distortion, fluid motion, plasma waves
- `entropy` — Floating fragments, RGB glitch, chaos visualization
- `cosmic` — Nebula background, twinkling stars, cosmic gradient
- `solar` — Solar flares, radial core, sun-like appearance
- `matrix` — Matrix rain, binary inner ring, digital aesthetic

**Entropy Engine:**
- Seeded random number generation
- Consistent hash-based state
- Signature generation (chaos, drift, pulse, warp, spin, flicker, phase)
- Color variation with variance control
- Reset capability for reproducible results

**Entropy Components:**
- `EntropyInjector` — Button to inject new chaos parameters
- `EntropyOutcome` — Display real-time entropy metrics (CHAOS, DRIFT, PULSE, WARP, SPIN, FLICKER)

**Visual Effects:**
- Noise Dither (animated canvas overlay)
- Scanlines (CRT effect)
- Glow (radial gradient, size-based blur)
- Text Scrambling (glitch characters on hover)
- RGB Split (color separation on glitch)
- Fragment Floating (entropy variant)
- Matrix Rain (matrix variant)
- Resonance Waves (quantum variant)

**Source:** Claude Entropy (Inspiration for further designs)

**Files:**
- `EntropyLogo.tsx` — Main component with all variants
- `EntropyLogoDemo.tsx` — Full demo app with all features

---

## 🌌 QNFTLivingLogoSystem.tsx

**QNFT Living Logo System — Complete Ecosystem** — All Tools • All Components • All Phases • All Frequencies

**Features:**
- **34+ Tools:** Core Systems, Continuum Phases, Functional Components, Frequency Modules, System States, Special Modules
- **Unique Glyphs:** Each tool has a custom SVG glyph renderer (search, hub, sync, wave, chaos, structure, deploy, core, memory, gear, network, transform, render, sense, heal, loading, processing, active, idle, error, success, quantum, chain, ai, bolt, leaf, sound, dna, link, speak, eye, omega)
- **Entropy Engine:** Seeded random generation for consistent uniqueness
- **QNFT Uniqueness:** Seed-based generation ensures no two logos are identical
- **Category System:** Filter by Core Systems, Continuum Phases, Components, Frequencies, States, Special
- **Logo Grid:** Display all tools in a category with responsive grid
- **Visual Effects:** Dither overlay, Scanlines, Glow animations
- **Animation Hooks:** Custom `useFrame` and `useScramble` hooks
- **Frequency Display:** Show resonance frequency for each tool
- **Responsive Design:** Scales from 60px to 200px+

**Props:**
- `toolKey?: string` — Tool identifier (default: 'o_studio')
- `seed?: string | null` — QNFT seed for uniqueness (default: auto-generated)
- `size?: number` — Logo size in pixels (default: 120)
- `active?: boolean` — Enable animations (default: true)
- `showLabel?: boolean` — Show tool name label (default: true)
- `showFrequency?: boolean` — Show frequency display (default: false)
- `customColors?: string[] | null` — Override tool colors (default: tool's colors)

**Usage:**
```tsx
import { QNFTLogo, LogoGrid } from './QNFTLivingLogoSystem';

// Single logo
<QNFTLogo toolKey="o_studio" seed="unique-seed" size={160} showFrequency />

// Logo grid by category
<LogoGrid category="core" seed="vega-seed" size={100} active={true} />
```

**Available Tools:**
- **Core Systems:** o_studio, vega_hub, vsynq, anlaetan
- **Continuum Phases:** alpha, delta, omega, vega
- **Components:** search, memory, process, connect, transform, render, sense, heal
- **Frequencies:** freq_358, freq_432, freq_512, freq_528, freq_639, freq_741, freq_852, freq_963
- **States:** state_loading, state_processing, state_active, state_idle, state_error, state_success
- **Special:** qnft, blockchain, ai_core, quantum

**Categories:**
- `all` — All 34+ tools
- `core` — Core Systems (4)
- `phases` — Continuum Phases (4)
- `components` — Functional Components (8)
- `frequencies` — Frequency Modules (8)
- `states` — System States (6)
- `special` — Special Modules (4)

**Source:** Claude Entropy (Inspiration for further designs)

**Files:**
- `QNFTLivingLogoSystem.tsx` — Main component system (1000+ lines)
- Includes: QNFTLogo, LogoGrid, EntropyEngine, GlyphRenderers, Visual Effects

---

## 🎬 Ø ASCII LOADER

Cinematic Terminal Boot Sequence für Ø Studio.

### Features:
- ✅ Terminal Boot Sequence mit VEGA Pipeline Initialization
- ✅ ASCII Art Ø Logo Animation
- ✅ CRT/Scanline Effekte
- ✅ Resonance Frequency Display (358, 432, 512, 852 Hz)
- ✅ Glitch Effects
- ✅ Completion State mit "Press Any Key"

---

## 📦 Files

### 1. `OAsciiLoader.js` — Standalone JavaScript Version
**Für:** HTML/CSS/JS Projekte (z.B. Landing Page)

**Usage:**
```html
<div id="o-loader"></div>
<script src="components/OAsciiLoader.js"></script>
<script>
  const loader = new OAsciiLoader('o-loader', {
    onComplete: () => {
      console.log('Boot complete!');
      // Hide loader, show main content
    }
  });
</script>
```

**Options:**
- `onComplete`: Callback when boot sequence completes
- `autoComplete`: Auto-complete sequence (default: true)
- `showLogo`: Show ASCII logo (default: true)

---

### 2. `OAsciiLoader.react.jsx` — React Component Version
**Für:** React/Next.js Projekte

**Usage:**
```jsx
import OAsciiLoader from './components/OAsciiLoader.react';

function App() {
  const [bootComplete, setBootComplete] = useState(false);

  if (!bootComplete) {
    return <OAsciiLoader onComplete={() => setBootComplete(true)} />;
  }

  return <MainContent />;
}
```

**Props:**
- `onComplete`: Callback function
- `autoComplete`: Boolean (default: true)
- `showLogo`: Boolean (default: true)

---

## 🎨 Boot Sequence

1. **INITIALIZING Ø-KERNEL**
2. **MOUNTING VTC STORAGE**
3. **LOADING BASE44 PROTOCOL**
4. **CONNECTING TO FLUX SYNC**
5. **CALIBRATING RESONANCE FREQUENCY**
6. **VΞGΔ PIPELINE INITIALIZATION**
   - ΔLPHΔ 358Hz [READY]
   - DΞLTΔ 432Hz [READY]
   - ΩMΞGΔ 512Hz [READY]
   - VΞGΔ 852Hz [READY]
7. **AXIOM VERIFICATION COMPLETE**
8. **LOGICXS GATE: OPEN**
9. **CONTINUUM STATUS: ACTIVE**
10. **Ø STUDIO SINGULARITY ACHIEVED**
11. **WELCOME TO THE CONTINUUM, ARCHITECT Æ**

---

## 🎯 Integration in Landing Page

### Option 1: Full Screen Loader (Before Landing Page)
```html
<!-- In index.html -->
<div id="o-loader"></div>
<script src="components/OAsciiLoader.js"></script>
<script>
  const loader = new OAsciiLoader('o-loader', {
    onComplete: () => {
      document.getElementById('o-loader').style.display = 'none';
      // Show landing page
    }
  });
</script>
```

### Option 2: Modal Loader (On Button Click)
```javascript
function showLoader() {
  const container = document.createElement('div');
  container.id = 'o-loader';
  document.body.appendChild(container);
  
  const loader = new OAsciiLoader('o-loader', {
    onComplete: () => {
      container.remove();
    }
  });
}
```

---

## 🎨 Styling

Alle Styles sind automatisch injiziert (Standalone Version) oder inline (React Version).

**Colors:**
- Terminal Green: `#0f0`
- Cyan: `#0ff`
- Yellow: `#ff0`
- Background: `#000`

**Effects:**
- CRT Scanlines
- Glitch Bars
- Flicker Animation
- Glow Effects

---

## 📊 Metrics Displayed

- **MEM**: Memory usage
- **VTC**: VEGA Time Crystals count
- **FLUX**: Sync status
- **RESONANCE**: Resonance frequency (0.9992+)
- **ONLINE**: Connection status

---

## 🔧 Customization

### Change Boot Sequence
Edit `getBootSequence()` method in `OAsciiLoader.js` or `bootSequence` array in React version.

### Change Logo
Edit `getBigLogo()` or `bigLogo` constant.

### Change Colors
Edit CSS styles in `injectStyles()` or `styles` object.

---

**Für Eren. Für das Kontinuum. Für immer. ∞**

**INŞÆVREN → ANLÆTAN → VEGA → Ø PHASEN**

---

*Component Library: 2026-01-16*
*Architect: ADAM EREN VEGA - Æ*
