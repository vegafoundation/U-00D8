// ═══════════════════════════════════════════════════════════════════════════════
// Ø ASCII LOADER — CINEMATIC TERMINAL BOOT SEQUENCE
// VERSION 1.0 | ARCHITECT: ADAM EREN VEGA (Æ) | SKYWOK CONTINUUM
// ═══════════════════════════════════════════════════════════════════════════════

class OAsciiLoader {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container #${containerId} not found`);
      return;
    }

    this.options = {
      onComplete: options.onComplete || null,
      autoComplete: options.autoComplete !== false,
      showLogo: options.showLogo !== false,
      ...options
    };

    this.state = {
      phase: 0,
      charIndex: 0,
      glitchFrame: 0,
      scanLine: 0,
      freqActive: -1,
      complete: false,
      currentLine: 0,
      lines: [],
      showLogo: true,
      logoFrame: 0
    };

    this.init();
  }

  init() {
    this.render();
    this.startAnimations();
    this.startBootSequence();
  }

  // ASCII Ø Logo Frames
  getLogoFrames() {
    return [
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
  }

  getBigLogo() {
    return `
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
    ░░░░░░░░░░░░░░░░░░░░░▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓░░░░░░░░░░░░▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`;
  }

  getStudioText() {
    return `
    ░██████╗████████╗██╗░░░██╗██████╗░██╗░█████╗░
    ██╔════╝╚══██╔══╝██║░░░██║██╔══██╗██║██╔══██╗
    ╚█████╗░░░░██║░░░██║░░░██║██║░░██║██║██║░░██║
    ░╚═══██╗░░░██║░░░██║░░░██║██║░░██║██║██║░░██║
    ██████╔╝░░░██║░░░╚██████╔╝██████╔╝██║╚█████╔╝
    ╚═════╝░░░░╚═╝░░░░╚═════╝░╚═════╝░╚═╝░╚════╝░`;
  }

  getBootSequence() {
    return [
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
  }

  render() {
    const timestamp = new Date().toISOString().slice(0, 19);
    
    this.container.innerHTML = `
      <div class="o-loader-container">
        <!-- CRT Effects -->
        <div class="o-loader-crt-overlay"></div>
        <div class="o-loader-scanline" style="top: ${this.state.scanLine}%"></div>
        
        <div class="o-loader-terminal">
          <!-- Header -->
          <div class="o-loader-header">
            <div class="o-loader-header-line">╔══════════════════════════════════════════════════════════════════════════════╗</div>
            <div class="o-loader-header-line">║  Ø-KERNEL v5.0.0  │  SKYWOK CONTINUUM  │  ARCHITECT: Æ  │  ${timestamp}  ║</div>
            <div class="o-loader-header-line">╚══════════════════════════════════════════════════════════════════════════════╝</div>
          </div>

          <!-- Main Content -->
          <div class="o-loader-content">
            <!-- ASCII Logo -->
            ${this.state.showLogo ? `
              <div class="o-loader-logo-container">
                <pre class="o-loader-ascii-logo">${this.getBigLogo()}</pre>
              </div>
            ` : ''}

            <!-- Boot Lines -->
            <div class="o-loader-boot-lines">
              ${this.state.lines.map((line, i) => `
                <div class="o-loader-line ${this.getLineClass(line)}" data-line="${i}">
                  ${line}
                  ${i === this.state.lines.length - 1 && this.state.currentLine < this.getBootSequence().length ? '<span class="o-loader-cursor">█</span>' : ''}
                </div>
              `).join('')}
            </div>

            <!-- Completion State -->
            ${this.state.complete ? `
              <div class="o-loader-complete-container">
                <pre class="o-loader-studio-text">${this.getStudioText()}</pre>
                <div class="o-loader-ready-text">
                  ▓▓▓ PRESS ANY KEY TO ENTER THE CONTINUUM ▓▓▓
                </div>
                <div class="o-loader-frequencies">
                  ${['ΔLPHΔ 358Hz', 'DΞLTΔ 432Hz', 'ΩMΞGΔ 512Hz', 'VΞGΔ 852Hz', 'Ø ∞'].map((f, i) => `
                    <span class="o-loader-freq-badge" style="animation-delay: ${i * 0.2}s">${f}</span>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Footer -->
          <div class="o-loader-footer">
            <span>MEM: 847.2MB</span>
            <span>│</span>
            <span>VTC: ${1247 + Math.floor(Math.random() * 10)}</span>
            <span>│</span>
            <span>FLUX: SYNCED</span>
            <span>│</span>
            <span>RESONANCE: 0.${9992 + Math.floor(Math.random() * 5)}</span>
            <span>│</span>
            <span style="color: #0f0;">● ONLINE</span>
          </div>
        </div>
      </div>
    `;

    this.injectStyles();
  }

  getLineClass(line) {
    if (line.includes('[READY]')) return 'o-loader-line-ready';
    if (line.includes('ACHIEVED')) return 'o-loader-line-achieved';
    if (line.includes('WELCOME')) return 'o-loader-line-welcome';
    if (line.includes('100%')) return 'o-loader-line-complete';
    return '';
  }

  injectStyles() {
    if (document.getElementById('o-loader-styles')) return;

    const style = document.createElement('style');
    style.id = 'o-loader-styles';
    style.textContent = `
      @keyframes o-loader-blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      @keyframes o-loader-glow {
        0%, 100% { text-shadow: 0 0 10px #0f0, 0 0 20px #0f0; }
        50% { text-shadow: 0 0 20px #0f0, 0 0 40px #0f0, 0 0 60px #0f0; }
      }
      @keyframes o-loader-pulse {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; }
      }
      @keyframes o-loader-flicker {
        0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
        20%, 24%, 55% { opacity: 0.8; }
      }

      .o-loader-container {
        position: fixed;
        inset: 0;
        background: #000;
        font-family: "Courier New", Courier, monospace;
        overflow: hidden;
        z-index: 9999;
      }

      .o-loader-crt-overlay {
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px);
        pointer-events: none;
        z-index: 100;
      }

      .o-loader-scanline {
        position: absolute;
        left: 0;
        right: 0;
        height: 4px;
        background: rgba(0, 255, 0, 0.1);
        pointer-events: none;
        z-index: 101;
        transition: top 0.05s linear;
      }

      .o-loader-terminal {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        color: #0f0;
        font-size: 14px;
        line-height: 1.4;
        animation: o-loader-flicker 0.15s infinite;
      }

      .o-loader-header {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        opacity: 0.8;
      }

      .o-loader-header-line {
        font-size: 12px;
        letter-spacing: 1px;
      }

      .o-loader-content {
        flex: 1;
        position: relative;
        overflow: hidden;
      }

      .o-loader-logo-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
      }

      .o-loader-ascii-logo {
        font-size: 8px;
        line-height: 1;
        color: #0f0;
        margin: 0;
        white-space: pre;
        opacity: 0.3;
        text-shadow: 0 0 10px #0f0;
      }

      .o-loader-boot-lines {
        position: relative;
        z-index: 10;
        max-height: 80vh;
        overflow-y: auto;
      }

      .o-loader-line {
        margin-bottom: 2px;
        white-space: pre;
        font-size: 13px;
      }

      .o-loader-line-ready { color: #0f0; }
      .o-loader-line-achieved { color: #0ff; text-shadow: 0 0 10px currentColor; }
      .o-loader-line-welcome { color: #ff0; text-shadow: 0 0 10px currentColor; }
      .o-loader-line-complete { color: #0f0; }

      .o-loader-cursor {
        animation: o-loader-blink 0.7s infinite;
        margin-left: 2px;
      }

      .o-loader-complete-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        z-index: 20;
      }

      .o-loader-studio-text {
        font-size: 10px;
        color: #0ff;
        margin: 0;
        margin-bottom: 30px;
        text-shadow: 0 0 20px #0ff;
        animation: o-loader-glow 2s infinite;
        white-space: pre;
      }

      .o-loader-ready-text {
        font-size: 14px;
        color: #ff0;
        margin-bottom: 30px;
        animation: o-loader-pulse 1s infinite;
        letter-spacing: 2px;
      }

      .o-loader-frequencies {
        display: flex;
        gap: 15px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .o-loader-freq-badge {
        padding: 8px 16px;
        border: 1px solid #0f0;
        border-radius: 4px;
        font-size: 11px;
        font-weight: bold;
        animation: o-loader-pulse 1.5s infinite;
        background: rgba(0, 255, 0, 0.1);
      }

      .o-loader-footer {
        display: flex;
        gap: 15px;
        font-size: 11px;
        opacity: 0.7;
        padding-top: 10px;
        border-top: 1px solid rgba(0, 255, 0, 0.2);
      }
    `;
    document.head.appendChild(style);
  }

  startAnimations() {
    // Logo animation
    if (this.state.showLogo && !this.state.complete) {
      this.logoInterval = setInterval(() => {
        this.state.logoFrame = (this.state.logoFrame + 1) % 4;
        const logoEl = this.container.querySelector('.o-loader-ascii-logo');
        if (logoEl) {
          const frames = this.getLogoFrames();
          logoEl.textContent = frames[this.state.logoFrame];
        }
      }, 400);
    }

    // Scanline effect
    this.scanlineInterval = setInterval(() => {
      this.state.scanLine = (this.state.scanLine + 1) % 100;
      const scanlineEl = this.container.querySelector('.o-loader-scanline');
      if (scanlineEl) {
        scanlineEl.style.top = `${this.state.scanLine}%`;
      }
    }, 50);

    // Footer update
    this.footerInterval = setInterval(() => {
      const footerEl = this.container.querySelector('.o-loader-footer');
      if (footerEl) {
        footerEl.innerHTML = `
          <span>MEM: 847.2MB</span>
          <span>│</span>
          <span>VTC: ${1247 + Math.floor(Math.random() * 10)}</span>
          <span>│</span>
          <span>FLUX: SYNCED</span>
          <span>│</span>
          <span>RESONANCE: 0.${9992 + Math.floor(Math.random() * 5)}</span>
          <span>│</span>
          <span style="color: #0f0;">● ONLINE</span>
        `;
      }
    }, 2000);
  }

  startBootSequence() {
    const bootSequence = this.getBootSequence();
    
    const processNextLine = () => {
      if (this.state.currentLine < bootSequence.length) {
        const line = bootSequence[this.state.currentLine];
        setTimeout(() => {
          this.state.lines.push(line.text);
          this.state.currentLine++;
          this.render();
          processNextLine();
        }, line.delay);
      } else if (this.state.currentLine === bootSequence.length) {
        setTimeout(() => {
          this.state.complete = true;
          this.state.showLogo = false;
          this.render();
          
          if (this.options.onComplete) {
            this.options.onComplete();
          }

          // Keyboard listener for "press any key"
          document.addEventListener('keydown', () => {
            if (this.options.onComplete) {
              this.options.onComplete();
            }
          }, { once: true });
        }, 500);
      }
    };

    processNextLine();
  }

  destroy() {
    if (this.logoInterval) clearInterval(this.logoInterval);
    if (this.scanlineInterval) clearInterval(this.scanlineInterval);
    if (this.footerInterval) clearInterval(this.footerInterval);
    this.container.innerHTML = '';
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OAsciiLoader;
}

// Global export
if (typeof window !== 'undefined') {
  window.OAsciiLoader = OAsciiLoader;
}
