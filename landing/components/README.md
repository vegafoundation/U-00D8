# ═══════════════════════════════════════════════════════════════════════════════
# VΞGΔ Ø ASCII LOADER — Components
# ═══════════════════════════════════════════════════════════════════════════════
# ARCHITECT: ADAM EREN VEGA - Æ
# DATE: 2026-01-16
# ═══════════════════════════════════════════════════════════════════════════════

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
