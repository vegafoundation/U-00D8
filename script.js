// ═══════════════════════════════════════════════════════════════════════════════
// VΞGΔ LANDING PAGE SCRIPT — Waitlist, Repo Search & VPS Integration
// ═══════════════════════════════════════════════════════════════════════════════

// VPS API Endpoint
const VPS_API_URL = 'https://api-studio.vxga.app/api/waitlist';
const GITHUB_API_URL = 'https://api.github.com';

// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'default';

if (savedTheme === 'game') {
    document.body.classList.add('game-theme');
    themeToggle.textContent = '🌐';
} else {
    themeToggle.textContent = '🎮';
}

themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('game-theme')) {
        document.body.classList.remove('game-theme');
        themeToggle.textContent = '🎮';
        localStorage.setItem('theme', 'default');
    } else {
        document.body.classList.add('game-theme');
        themeToggle.textContent = '🌐';
        localStorage.setItem('theme', 'game');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Waitlist Form Handler
const waitlistForm = document.getElementById('waitlist-form');
const formMessage = document.getElementById('form-message');

waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        useCase: document.getElementById('use-case').value || null,
        timestamp: new Date().toISOString(),
        source: 'landing-page',
        repo: 'U-00D8'
    };
    
    // Show loading state
    const submitButton = waitlistForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Joining...';
    submitButton.disabled = true;
    formMessage.style.display = 'none';
    
    try {
        // Try VPS API first
        const response = await fetch(VPS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            const data = await response.json();
            showMessage('success', 'Successfully joined the waitlist! We\'ll notify you soon.');
            waitlistForm.reset();
        } else {
            throw new Error('API error');
        }
    } catch (error) {
        // Fallback: Store locally or use alternative endpoint
        console.log('VPS API not available, using fallback:', error);
        
        // Store in localStorage as backup
        const waitlistData = JSON.parse(localStorage.getItem('waitlist') || '[]');
        waitlistData.push(formData);
        localStorage.setItem('waitlist', JSON.stringify(waitlistData));
        
        showMessage('success', 'Successfully joined the waitlist! (Saved locally)');
        waitlistForm.reset();
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

function showMessage(type, text) {
    formMessage.className = `form-message ${type}`;
    formMessage.textContent = text;
    formMessage.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.stat, .feature-card, .claim-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(el);
});

// VPS Connection Status (optional)
async function checkVPSStatus() {
    try {
        const response = await fetch('https://api-studio.vxga.app/health');
        if (response.ok) {
            console.log('✅ VPS Connected');
        }
    } catch (error) {
        console.log('⚠️ VPS not reachable (using fallback)');
    }
}

// Check VPS on load
checkVPSStatus();

// Repo Search
const repoSearch = document.getElementById('repo-search');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');

async function searchRepos(query) {
    if (!query || query.trim() === '') return;
    
    searchResults.innerHTML = '<div class="loading">Searching...</div>';
    searchResults.classList.add('active');
    
    try {
        // GitHub API (kostenlos, keine Auth nötig für public repos)
        const response = await fetch(`${GITHUB_API_URL}/search/repositories?q=${encodeURIComponent(query)}&per_page=10`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            displayRepos(data.items);
        } else {
            throw new Error('API error');
        }
    } catch (error) {
        console.log('GitHub API error, trying VPS fallback:', error);
        
        // Fallback: VPS API
        try {
            const vpsResponse = await fetch(`${VPS_API_URL.replace('/waitlist', '/search/repos')}?q=${encodeURIComponent(query)}`);
            if (vpsResponse.ok) {
                const vpsData = await vpsResponse.json();
                displayRepos(vpsData.repos || []);
            } else {
                throw new Error('VPS API error');
            }
        } catch (vpsError) {
            searchResults.innerHTML = '<div class="error">Search temporarily unavailable. Please try again later.</div>';
        }
    }
}

function displayRepos(repos) {
    if (!repos || repos.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No repositories found.</div>';
        return;
    }
    
    searchResults.innerHTML = repos.map(repo => `
        <div class="repo-card">
            <div class="repo-header">
                <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.full_name}</a>
                <div class="repo-stats">
                    <span>⭐ ${repo.stargazers_count || 0}</span>
                    <span>🍴 ${repo.forks_count || 0}</span>
                </div>
            </div>
            <div class="repo-description">${repo.description || 'No description available.'}</div>
            <div class="repo-meta">
                ${repo.language ? `<span><span class="repo-language" style="background: ${getLanguageColor(repo.language)}"></span>${repo.language}</span>` : ''}
                <span>Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
        </div>
    `).join('');
}

function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#2b7489',
        'Python': '#3572A5',
        'Java': '#b07219',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'C++': '#f34b7d',
        'C': '#555555',
        'Ruby': '#701516',
        'PHP': '#4F5D95',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33',
        'Dart': '#00B4AB',
        'Scala': '#c22d40',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Shell': '#89e051',
        'Vue': '#2c3e50',
        'React': '#61dafb',
        'Angular': '#dd0031',
        'Svelte': '#ff3e00',
        'Solidity': '#AA6746',
        'R': '#198CE7',
        'MATLAB': '#e16737',
        'Perl': '#0298c3',
        'Lua': '#000080',
        'Haskell': '#5e5086',
        'Clojure': '#db5855',
        'Erlang': '#B83998',
        'Elixir': '#6e4a7e',
        'OCaml': '#3be133',
        'F#': '#b845fc',
        'C#': '#239120',
        'VB.NET': '#945db7',
        'Objective-C': '#438eff',
        'Assembly': '#6E4C13',
        'PowerShell': '#012456',
        'Racket': '#3c5caa',
        'Scheme': '#1e4a72',
        'Prolog': '#74283c',
        'Fortran': '#4d41b1',
        'COBOL': '#005CA5',
        'Ada': '#02f88c',
        'D': '#ba595e',
        'Nim': '#ffc200',
        'Crystal': '#000100',
        'Zig': '#ec915c',
        'V': '#4f87c4',
        'Julia': '#a270ba',
        'Raku': '#0000fb',
        'Elm': '#60B5CC',
        'PureScript': '#1D222D',
        'Reason': '#ff5847',
        'F*': '#572e30',
        'Idris': '#b30000',
        'Agda': '#315665',
        'Coq': '#d0b68c',
        'Lean': '#000000',
        'Isabelle': '#FEFE00',
        'TLA+': '#9B70FF',
        'Alloy': '#cc5c24',
        'Ballerina': '#FF5000',
        'Pony': '#f2a900',
        'Pike': '#005390',
        'Io': '#a9188d',
        'Ioke': '#078193',
        'Nu': '#c9df40',
        'Opa': '#0827F5',
        'Rebol': '#358a5b',
        'Red': '#f50000',
        'Ring': '#0e60e3',
        'Sage': '#00FF00',
        'Smalltalk': '#596706',
        'Tcl': '#e4cc98',
        'X10': '#4B6BEF',
        'Xtend': '#24255d',
        'Yorick': '#000000',
        'Zephir': '#118f9e',
        'Apex': '#1797c0',
        'API Blueprint': '#2ACCA8',
        'Arduino': '#bd79d1',
        'AspectJ': '#a957b0',
        'AutoHotkey': '#6594b9',
        'AutoIt': '#1C3552',
        'BlitzMax': '#cd6400',
        'Boo': '#d4bec1',
        'Brainfuck': '#2F2530',
        'C-ObjDump': '#000000',
        'C2hs Haskell': '#000000',
        'Cap\'n Proto': '#c42727',
        'CartoCSS': '#000000',
        'Ceylon': '#dfa535',
        'Chapel': '#8dc63f',
        'Cirru': '#ccccff',
        'Clarion': '#db901e',
        'Clean': '#3F85AF',
        'Click': '#E4E6F3',
        'CLIPS': '#00A300',
        'CMake': '#DA3434',
        'COBOL': '#005CA5',
        'CoffeeScript': '#244776',
        'ColdFusion': '#ed2cd6',
        'Common Lisp': '#3fb68b',
        'Component Pascal': '#b0ce4e',
        'Cool': '#3b85bb',
        'Coq': '#d0b68c',
        'Crystal': '#000100',
        'CSS': '#563d7c',
        'Cuda': '#3A4E3A',
        'D': '#ba595e',
        'Dart': '#00B4AB',
        'DataWeave': '#003a52',
        'DIGITAL Command Language': '#000000',
        'DM': '#447265',
        'Dockerfile': '#384d54',
        'Dogescript': '#cca760',
        'Dylan': '#6c616e',
        'E': '#ccce35',
        'eC': '#913960',
        'ECL': '#8a1267',
        'Eiffel': '#946d57',
        'Elixir': '#6e4a7e',
        'Elm': '#60B5CC',
        'Emacs Lisp': '#c065db',
        'EmberScript': '#FFF4F3',
        'EQ': '#a78649',
        'Erlang': '#B83998',
        'F#': '#b845fc',
        'F*': '#572e30',
        'Factor': '#636746',
        'Fancy': '#7b9db4',
        'Fantom': '#14253c',
        'Filebench WML': '#000000',
        'Filterscript': '#000000',
        'fish': '#4aae47',
        'FLUX': '#88ccff',
        'Formatted': '#000000',
        'Forth': '#341708',
        'Fortran': '#4d41b1',
        'FreeMarker': '#0050b2',
        'Frege': '#00cafe',
        'Game Maker Language': '#71b417',
        'GAMS': '#f49a22',
        'GAP': '#0000cc',
        'GCC Machine Description': '#FFCFAB',
        'GDB': '#000000',
        'GDScript': '#355570',
        'Genie': '#fb855d',
        'Genshi': '#000000',
        'Gentoo Ebuild': '#000000',
        'Gentoo Eclass': '#000000',
        'Gerber Image': '#d20b00',
        'Gettext Catalog': '#000000',
        'Gherkin': '#5B2063',
        'GLSL': '#5686a5',
        'Glyph': '#e4cc98',
        'Gnuplot': '#f0a9f0',
        'Go': '#00ADD8',
        'Golo': '#88562A',
        'Gosu': '#82937f',
        'Grace': '#615f8b',
        'Grammatical Framework': '#ff0000',
        'Graph Modeling Language': '#000000',
        'GraphQL': '#e10098',
        'Graphviz (DOT)': '#2596be',
        'Groovy': '#4298b8',
        'Hack': '#878787',
        'Haml': '#ece2a9',
        'Handlebars': '#f7931e',
        'Harbour': '#0e60e3',
        'Haskell': '#5e5086',
        'Haxe': '#df7900',
        'HCL': '#000000',
        'HiveQL': '#dce200',
        'HLSL': '#aace60',
        'HolyC': '#ffefaf',
        'HTML': '#e34c26',
        'Hy': '#7790b2',
        'HyPhy': '#000000',
        'IDL': '#a3522f',
        'Idris': '#b30000',
        'IGOR Pro': '#0000ff',
        'Inform 7': '#000000',
        'Inno Setup': '#264b99',
        'Io': '#a9188d',
        'Ioke': '#078193',
        'Isabelle': '#FEFE00',
        'Isabelle ROOT': '#FEFE00',
        'J': '#9EEDFF',
        'Jasmin': '#d03600',
        'Java': '#b07219',
        'Java Server Pages': '#2A0277',
        'JavaScript': '#f1e05a',
        'JavaScript+ERB': '#f1e05a',
        'JFlex': '#DBCA00',
        'Jison': '#56b3cb',
        'Jison Lex': '#56b3cb',
        'Jolie': '#843179',
        'JSONiq': '#40d47e',
        'Jsonnet': '#0064bd',
        'Julia': '#a270ba',
        'Jupyter Notebook': '#DA5B0B',
        'K': '#000000',
        'Kaitai Struct': '#773b37',
        'Kotlin': '#F18E33',
        'KRL': '#28430A',
        'LabVIEW': '#fede06',
        'Lasso': '#999999',
        'Latte': '#f2a542',
        'Lean': '#000000',
        'Less': '#1d365d',
        'Lex': '#DBCA00',
        'LFE': '#4C3023',
        'LilyPond': '#9ccc7c',
        'Limbo': '#000000',
        'Liquid': '#67b8de',
        'Literate Agda': '#315665',
        'Literate CoffeeScript': '#244776',
        'Literate Haskell': '#5e5086',
        'LiveScript': '#499886',
        'LLVM': '#185619',
        'Logos': '#000000',
        'Logtalk': '#295b9a',
        'LOLCODE': '#cc9900',
        'LookML': '#652B81',
        'LoomScript': '#000000',
        'LSL': '#3d9970',
        'Lua': '#000080',
        'M': '#000000',
        'M4': '#000000',
        'M4Sugar': '#000000',
        'Makefile': '#427819',
        'Mako': '#7e858d',
        'Markdown': '#083fa1',
        'Marko': '#42bff2',
        'Mask': '#f97732',
        'Mathematica': '#dd1100',
        'MATLAB': '#e16737',
        'Max': '#c4a79c',
        'MAXScript': '#00a6a6',
        'mcfunction': '#E22837',
        'MediaWiki': '#063691',
        'Mercury': '#ff2b2b',
        'Meson': '#007800',
        'Metal': '#8f14e9',
        'MiniD': '#000000',
        'Mirah': '#c7a938',
        'mIRC Script': '#3d57c3',
        'MLIR': '#5EC8DB',
        'Modelica': '#de1d31',
        'Modula-2': '#10253f',
        'Modula-3': '#223388',
        'Module Management System': '#000000',
        'Monkey': '#000000',
        'Moocode': '#000000',
        'MoonScript': '#ff4585',
        'Motorola 68K Assembly': '#005daa',
        'MQL4': '#62A8D6',
        'MQL5': '#4A76B8',
        'MTML': '#b7e1f4',
        'MUF': '#000000',
        'mupad': '#244963',
        'Myghty': '#000000',
        'NASL': '#000000',
        'NCL': '#28431f',
        'Nearley': '#990000',
        'Nemerle': '#3d3c6e',
        'nesC': '#94B0C7',
        'NetLinx': '#0aa0ff',
        'NetLinx+ERB': '#747faa',
        'NetLogo': '#ff6375',
        'NewLisp': '#87AED7',
        'Nextflow': '#3ac486',
        'Nim': '#ffc200',
        'Nit': '#009917',
        'Nix': '#7e7eff',
        'NSIS': '#000000',
        'Nu': '#c9df40',
        'NumPy': '#9C8AF9',
        'Nunjucks': '#3d8137',
        'NWScript': '#111522',
        'OASv2-json': '#85ea2d',
        'OASv2-yaml': '#85ea2d',
        'OASv3-json': '#85ea2d',
        'OASv3-yaml': '#85ea2d',
        'Objective-C': '#438eff',
        'Objective-C++': '#6866fb',
        'Objective-J': '#ff0c5a',
        'ObjectScript': '#424893',
        'OCaml': '#3be133',
        'Odin': '#60AFFE',
        'Omgrofl': '#cabbff',
        'ooc': '#b0b77e',
        'Opa': '#0827F5',
        'Opal': '#f7ede0',
        'Open Policy Agent': '#7d9199',
        'OpenCL': '#ed2e2d',
        'OpenEdge ABL': '#5ce600',
        'OpenQASM': '#AA70FF',
        'OpenSCAD': '#e5cd45',
        'Org': '#77aa99',
        'Oxygene': '#cdd0e3',
        'Oz': '#fab738',
        'P4': '#7055b5',
        'Pan': '#cc0000',
        'Papyrus': '#6600cc',
        'Parrot': '#f3ca0a',
        'Parrot Assembly': '#000000',
        'Parrot Internal Representation': '#000000',
        'Pascal': '#E3F171',
        'Pawn': '#dbb284',
        'Pep8': '#C76F5B',
        'Perl': '#0298c3',
        'PHP': '#4F5D95',
        'PicoLisp': '#6067af',
        'PigLatin': '#fcd7de',
        'Pike': '#005390',
        'PLpgSQL': '#336790',
        'PLSQL': '#dad8d8',
        'PogoScript': '#d80074',
        'Pony': '#f2a900',
        'PostCSS': '#dc3a0c',
        'PostScript': '#da291c',
        'POV-Ray SDL': '#6bac65',
        'PowerBuilder': '#8f0f8d',
        'PowerShell': '#012456',
        'Prisma': '#0c344b',
        'Processing': '#0096D8',
        'Prolog': '#74283c',
        'Propeller Spin': '#7fa2a7',
        'Pug': '#a86454',
        'Puppet': '#302B6D',
        'PureBasic': '#5a6986',
        'PureScript': '#1D222D',
        'Python': '#3572A5',
        'Python console': '#3572A5',
        'Q#': '#fed659',
        'QML': '#44a51c',
        'Qt Script': '#00b841',
        'Quake': '#882233',
        'R': '#198CE7',
        'Racket': '#3c5caa',
        'Ragel': '#9d5200',
        'Raku': '#0000fb',
        'RAML': '#77d9fb',
        'Rascal': '#fffaa0',
        'REALbasic': '#000000',
        'Reason': '#ff5847',
        'Rebol': '#358a5b',
        'Red': '#f50000',
        'Redcode': '#000000',
        'Ren\'Py': '#ff7f7f',
        'RenderScript': '#000000',
        'ReScript': '#ed5051',
        'reStructuredText': '#141414',
        'REXX': '#d90e09',
        'Ring': '#0e60e3',
        'Riot': '#A71E49',
        'RobotFramework': '#00c0b6',
        'Roff': '#ecdebe',
        'Roff Manpage': '#ecdebe',
        'Rouge': '#cc0088',
        'Ruby': '#701516',
        'RUNOFF': '#665a4e',
        'Rust': '#dea584',
        'Sage': '#00FF00',
        'SaltStack': '#646464',
        'SAS': '#B34936',
        'Scala': '#c22d40',
        'Scaml': '#bd181a',
        'Scheme': '#1e4a72',
        'Scilab': '#ca0f21',
        'SCSS': '#c6538c',
        'sed': '#64b970',
        'Self': '#0579aa',
        'ShaderLab': '#222c37',
        'Shell': '#89e051',
        'ShellSession': '#89e051',
        'Shen': '#120F14',
        'Sieve': '#000000',
        'Slash': '#007eff',
        'Slice': '#003fa2',
        'Slim': '#2b2b2b',
        'Smali': '#000000',
        'Smalltalk': '#596706',
        'Smarty': '#000000',
        'SmPL': '#c94949',
        'SMT': '#000000',
        'Solidity': '#AA6746',
        'SourcePawn': '#5c7611',
        'SPARQL': '#0C4597',
        'SQF': '#3F3F3F',
        'SQL': '#e38c00',
        'SQLPL': '#e38c00',
        'Squirrel': '#800000',
        'SRecode Template': '#348a34',
        'Stan': '#b2011d',
        'Standard ML': '#dc566d',
        'Starlark': '#76d275',
        'Stata': '#1a5f91',
        'STON': '#000000',
        'Stylus': '#ff6347',
        'SubRip Text': '#9e0101',
        'SugarSS': '#2fcc9f',
        'SuperCollider': '#46390b',
        'Svelte': '#ff3e00',
        'SVG': '#ff9900',
        'Swift': '#ffac45',
        'SWIG': '#000000',
        'SystemVerilog': '#DAE1C2',
        'Tcl': '#e4cc98',
        'Tcsh': '#000000',
        'TeX': '#3D6117',
        'Textile': '#ffe7ac',
        'Thrift': '#000000',
        'TI Program': '#A0AA87',
        'TLA': '#4b0079',
        'TOML': '#9c4221',
        'TSQL': '#e38c00',
        'TSX': '#2b7489',
        'Turing': '#cf142b',
        'Turtle': '#000000',
        'Twig': '#c1d026',
        'TXL': '#0178b8',
        'TypeScript': '#2b7489',
        'Unified Parallel C': '#4e3617',
        'Unity3D Asset': '#222c37',
        'Unix Assembly': '#000000',
        'Uno': '#9933cc',
        'UnrealScript': '#a54c4d',
        'UrWeb': '#000000',
        'V': '#4f87c4',
        'Vala': '#fbe5cd',
        'VBA': '#867db1',
        'VBScript': '#141414',
        'VCL': '#148AA8',
        'Verilog': '#b2b7f8',
        'VHDL': '#adb2cb',
        'Vim script': '#199f4b',
        'Visual Basic .NET': '#945db7',
        'Volt': '#1F1F1F',
        'Vue': '#2c3e50',
        'Vyper': '#2980b9',
        'wdl': '#42f43f',
        'WebAssembly': '#04133b',
        'WebIDL': '#000000',
        'WebVTT': '#000000',
        'Wren': '#383838',
        'X10': '#4B6BEF',
        'xBase': '#403a40',
        'XC': '#99DA07',
        'XML': '#000000',
        'Xojo': '#81bd41',
        'Xonsh': '#285EEF',
        'XQuery': '#5232e7',
        'XSLT': '#EB8CEB',
        'Yacc': '#4B6C4B',
        'YAML': '#cb171e',
        'YANG': '#000000',
        'YARA': '#220000',
        'YASnippet': '#32AB90',
        'ZAP': '#0d665e',
        'Zephir': '#118f9e',
        'Zig': '#ec915c',
        'ZIL': '#dc75e5',
        'Zimpl': '#d67711'
    };
    
    return colors[language] || '#6e6e6e';
}

searchBtn.addEventListener('click', () => {
    const query = repoSearch.value.trim();
    if (query) {
        searchRepos(query);
    }
});

repoSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = repoSearch.value.trim();
        if (query) {
            searchRepos(query);
        }
    }
});
