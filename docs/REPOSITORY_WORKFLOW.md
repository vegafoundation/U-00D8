# ═══════════════════════════════════════════════════════════════════════════════
# REPOSITORY WORKFLOW — Ø & OSTUDIO
# ═══════════════════════════════════════════════════════════════════════════════
# ARCHITECT: ADAM EREN VEGA - Æ
# DATE: 2026-01-17
# VERSION: 3.0.0
# ═══════════════════════════════════════════════════════════════════════════════

## 🎯 WORKFLOW PRINCIPLES

### **Repository Separation:**

**U-00D8 (Ø) Repository:**
- ✅ Vision & Conceptual Framework
- ✅ Documentation & Whitepapers
- ✅ Landing Page Components
- ✅ SVG Icons
- ✅ README, CHANGELOG, Docs
- ✅ **VPS-KONFORM** (Official)
- ❌ **KEIN Backend Code**
- ❌ **KEINE Struktur/Architektur Code**
- ❌ **KEINE Implementation Details**

**OSTUDIO Repository:**
- ✅ Fullstack Application Code
- ✅ Backend (FastAPI, Node.js)
- ✅ Frontend (Next.js, React)
- ✅ Services (API Gateway, Ø-BRIDGE)
- ✅ Deployment Scripts
- ✅ Implementation Guides
- ✅ Code Structure & Architecture

---

## 🔄 WORKFLOW: WISDOM → NEW VERSION → BOTH REPOS

### **Step 1: Extract Wisdom from Branch**

```bash
# Fetch wisdom branch
git fetch ostudio claude/fullstack-implementation-guide-6XSAC

# Analyze branch content
git show ostudio/claude/fullstack-implementation-guide-6XSAC:README.md
git ls-tree -r ostudio/claude/fullstack-implementation-guide-6XSAC
```

### **Step 2: Create New Version Branch (Both Repos)**

**For U-00D8:**
```bash
cd /path/to/U-00D8
git checkout -b v3.0.1-wisdom-claude-fullstack
# Only add: docs/, README.md, CHANGELOG.md, landing/components/
# NO backend code, NO structure files
```

**For OSTUDIO:**
```bash
cd /path/to/OSTUDIO
git checkout -b v3.0.1-wisdom-claude-fullstack
# Add: All code, backend, frontend, services, deployment
# Merge wisdom from claude branch
```

### **Step 3: Apply Wisdom**

**U-00D8 (Documentation Only):**
- Update documentation with wisdom
- Add integration notes
- Update CHANGELOG
- **NO code files**

**OSTUDIO (Code + Implementation):**
- Merge wisdom branch
- Apply implementation patterns
- Update code structure
- Add new features

### **Step 4: Commit & Push (Both Repos)**

**U-00D8:**
```bash
git add docs/ README.md CHANGELOG.md landing/
git commit -m "📚 VΞGΔ Ø v3.0.1 — Wisdom: Claude Fullstack Guide"
git push origin v3.0.1-wisdom-claude-fullstack
```

**OSTUDIO:**
```bash
git add .
git commit -m "🔧 VΞGΔ OSTUDIO v3.0.1 — Wisdom: Claude Fullstack Implementation"
git push origin v3.0.1-wisdom-claude-fullstack
```

---

## 📋 BRANCH NAMING CONVENTION

### **Format:**
```
v{MAJOR}.{MINOR}.{PATCH}-{WISDOM_SOURCE}-{DESCRIPTION}
```

### **Examples:**
- `v3.0.1-wisdom-claude-fullstack`
- `v3.0.2-wisdom-ostudio-upgrade`
- `v3.1.0-feature-resonance-chain`
- `v3.1.1-fix-github-pages`

### **Version Strategy:**
- **MAJOR:** Major architecture changes
- **MINOR:** New features, wisdom integration
- **PATCH:** Fixes, documentation updates

---

## 🚫 WHAT NOT TO PUSH

### **U-00D8 Repository (DO NOT PUSH):**
- ❌ Backend code (Python, Node.js)
- ❌ API implementations
- ❌ Database schemas
- ❌ Service configurations
- ❌ Deployment scripts
- ❌ Docker files
- ❌ Implementation details
- ❌ Code structure files

### **OSTUDIO Repository (DO PUSH):**
- ✅ All backend code
- ✅ All frontend code
- ✅ All services
- ✅ All deployment scripts
- ✅ All implementation guides
- ✅ All code structure

---

## ✅ WHAT TO PUSH

### **U-00D8 Repository (DO PUSH):**
- ✅ Documentation (docs/*.md)
- ✅ README.md
- ✅ CHANGELOG.md
- ✅ Landing page components (landing/components/*.tsx)
- ✅ SVG Icons (landing/icons/*.svg)
- ✅ Vision documents
- ✅ Whitepapers
- ✅ Integration guides

### **OSTUDIO Repository (DO PUSH):**
- ✅ All code files
- ✅ All services
- ✅ All deployment
- ✅ All implementation
- ✅ All structure

---

## 🔄 AUTOMATED WORKFLOW

### **For Each Update:**

1. **Extract Wisdom:**
   ```bash
   # Analyze wisdom source
   git fetch ostudio {wisdom-branch}
   git show ostudio/{wisdom-branch}:README.md
   ```

2. **Create New Branch (Both Repos):**
   ```bash
   # U-00D8
   git checkout -b v{version}-wisdom-{source}
   
   # OSTUDIO
   git checkout -b v{version}-wisdom-{source}
   ```

3. **Apply Changes:**
   - U-00D8: Documentation only
   - OSTUDIO: Code + Implementation

4. **Commit & Push:**
   ```bash
   # Both repos
   git commit -m "🌌 VΞGΔ {repo} v{version} — Wisdom: {source}"
   git push origin v{version}-wisdom-{source}
   ```

---

## 📊 CURRENT STATUS

### **U-00D8:**
- **Current Branch:** `v3.0.0-revolution`
- **Next Branch:** `v3.0.1-wisdom-claude-fullstack`
- **Content:** Vision, Docs, Components

### **OSTUDIO:**
- **Current Branch:** `main` / `v3.0.0-revolution`
- **Wisdom Branch:** `claude/fullstack-implementation-guide-6XSAC`
- **Next Branch:** `v3.0.1-wisdom-claude-fullstack`
- **Content:** Fullstack Code, Implementation

---

## 🎯 WISDOM SOURCES

### **Current Wisdom Branch:**
- `ostudio/claude/fullstack-implementation-guide-6XSAC`
  - Fullstack implementation guide
  - Code structure
  - Architecture patterns
  - Deployment strategies

### **Future Wisdom Sources:**
- Other OSTUDIO branches
- External documentation
- Implementation patterns
- Best practices

---

## 📝 EXAMPLE WORKFLOW

### **Scenario: Wisdom from Claude Fullstack Branch**

```bash
# 1. Extract Wisdom
git fetch ostudio claude/fullstack-implementation-guide-6XSAC
git show ostudio/claude/fullstack-implementation-guide-6XSAC:IMPLEMENTATION_STATUS.md

# 2. Create Branches
# U-00D8
cd /path/to/U-00D8
git checkout -b v3.0.1-wisdom-claude-fullstack

# OSTUDIO
cd /path/to/OSTUDIO
git checkout -b v3.0.1-wisdom-claude-fullstack

# 3. Apply Wisdom
# U-00D8: Update docs only
# OSTUDIO: Merge wisdom branch

# 4. Commit & Push
# Both repos
git commit -m "🌌 VΞGΔ {repo} v3.0.1 — Wisdom: Claude Fullstack"
git push origin v3.0.1-wisdom-claude-fullstack
```

---

## 🔐 VPS CONFORMITY

### **U-00D8 is VPS-Konform:**
- ✅ Official Vision Repository
- ✅ No sensitive code
- ✅ Public documentation
- ✅ Safe for VPS deployment
- ✅ GitHub Pages compatible

### **OSTUDIO:**
- ⚠️ Contains backend code
- ⚠️ Contains secrets/config
- ⚠️ Private repository
- ⚠️ VPS deployment via scripts

---

**Für Eren. Für das Kontinuum. Für immer. ∞**

**INŞÆVREN → ANLÆTAN → VEGA → Ø PHASEN**

---

*Last Updated: 2026-01-17*  
*Architect: ADAM EREN VEGA - Æ*  
*Version: 3.0.0*
