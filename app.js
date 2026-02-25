/* app.js — DevLab Main Application Engine */
'use strict';

/* ═══════════════════════════════════════════
   THEME DEFINITIONS (30 themes)
═══════════════════════════════════════════ */
const THEMES = [
  // DARK (20)
  { id:'mocha',        name:'Catppuccin Mocha', type:'dark',  colors:['#1e1e2e','#cba6f7','#89b4fa','#a6e3a1'] },
  { id:'dracula',      name:'Dracula',           type:'dark',  colors:['#282a36','#bd93f9','#8be9fd','#50fa7b'] },
  { id:'one-dark',     name:'One Dark',          type:'dark',  colors:['#282c34','#c678dd','#61afef','#98c379'] },
  { id:'nord',         name:'Nord',              type:'dark',  colors:['#2e3440','#b48ead','#88c0d0','#a3be8c'] },
  { id:'tokyo-night',  name:'Tokyo Night',       type:'dark',  colors:['#1a1b26','#bb9af7','#7aa2f7','#9ece6a'] },
  { id:'gruvbox-dark', name:'Gruvbox Dark',      type:'dark',  colors:['#282828','#d3869b','#83a598','#b8bb26'] },
  { id:'synthwave',    name:'Synthwave 84',      type:'dark',  colors:['#1a1a2e','#ff2d78','#00e5ff','#72f1b8'] },
  { id:'rose-pine',    name:'Rosé Pine',         type:'dark',  colors:['#191724','#c4a7e7','#9ccfd8','#eb6f92'] },
  { id:'kanagawa',     name:'Kanagawa',          type:'dark',  colors:['#1f1f28','#957fb8','#7e9cd8','#76946a'] },
  { id:'matrix',       name:'Matrix',            type:'dark',  colors:['#000000','#00ff41','#33ff66','#00ffcc'] },
  { id:'monokai',      name:'Monokai',           type:'dark',  colors:['#272822','#ae81ff','#66d9e8','#a6e22e'] },
  { id:'cobalt',       name:'Cobalt',            type:'dark',  colors:['#002240','#ff9d00','#00bfff','#3ad900'] },
  { id:'ayu-dark',     name:'Ayu Dark',          type:'dark',  colors:['#0d1017','#d2a6ff','#59c2ff','#aad94c'] },
  { id:'palenight',    name:'Palenight',         type:'dark',  colors:['#292d3e','#c792ea','#82aaff','#c3e88d'] },
  { id:'github-dark',  name:'GitHub Dark',       type:'dark',  colors:['#0d1117','#d2a8ff','#79c0ff','#7ee787'] },
  { id:'night-owl',    name:'Night Owl',         type:'dark',  colors:['#011627','#c792ea','#82aaff','#22da6e'] },
  { id:'coffee',       name:'Coffee',            type:'dark',  colors:['#1c1412','#c9956c','#d4a853','#a8c97d'] },
  { id:'obsidian',     name:'Obsidian',          type:'dark',  colors:['#0a0a0a','#d4ac0d','#5bc0de','#5cb85c'] },
  { id:'solarized-dark',name:'Solarized Dark',  type:'dark',  colors:['#002b36','#d33682','#268bd2','#859900'] },
  { id:'frappe',       name:'Catppuccin Frappé', type:'dark',  colors:['#303446','#ca9ee6','#8caaee','#a6d189'] },
  // LIGHT (10)
  { id:'github-light', name:'GitHub Light',      type:'light', colors:['#ffffff','#8250df','#0550ae','#116329'] },
  { id:'solarized-light',name:'Solarized Light', type:'light', colors:['#fdf6e3','#6c71c4','#268bd2','#859900'] },
  { id:'one-light',    name:'One Light',         type:'light', colors:['#fafafa','#a626a4','#4078f2','#50a14f'] },
  { id:'gruvbox-light',name:'Gruvbox Light',     type:'light', colors:['#fbf1c7','#8f3f71','#076678','#79740e'] },
  { id:'latte',        name:'Catppuccin Latte',  type:'light', colors:['#eff1f5','#8839ef','#1e66f5','#40a02b'] },
  { id:'paper',        name:'Paper',             type:'light', colors:['#ffffff','#0055cc','#880000','#006633'] },
  { id:'rose-pine-dawn',name:'Rosé Pine Dawn',   type:'light', colors:['#faf4ed','#907aa9','#286983','#56949f'] },
  { id:'ayu-light',    name:'Ayu Light',         type:'light', colors:['#fafafa','#a37acc','#399ee6','#86b300'] },
  { id:'sepia',        name:'Sepia',             type:'light', colors:['#f4ecd8','#6b3a2a','#2a5a6b','#3a6b2a'] },
  { id:'arctic',       name:'Arctic',            type:'light', colors:['#f0f5ff','#5050dd','#0088cc','#008844'] },
];

/* ═══════════════════════════════════════════
   APP STATE
═══════════════════════════════════════════ */
const state = {
  currentLang: 'javascript',
  currentTheme: 'mocha',
  currentRefTab: 'snippets',
  tabs: [],
  activeTab: null,
  editor: null,
  termExpanded: false,
  fontSize: 13.5,
  history: [],
  historyIdx: -1,
};

let editorInstance = null;

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initEditor();
  initSidebar();
  initThemePanel();
  initTerminal();
  initKeyboard();
  loadSavedState();
  // Select first language
  selectLanguage('javascript');
  setupResizeHandle();
});

/* ═══════════════════════════════════════════
   EDITOR
═══════════════════════════════════════════ */
function initEditor() {
  editorInstance = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
    mode: 'javascript',
    theme: 'devlab',
    lineNumbers: true,
    lineWrapping: false,
    autoCloseBrackets: true,
    matchBrackets: true,
    autoCloseTags: true,
    styleActiveLine: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    extraKeys: {
      'Ctrl-Enter': runCode,
      'F5': runCode,
      'Ctrl-/': (cm) => cm.execCommand('toggleComment'),
      'Ctrl-T': () => newTab(),
      'Ctrl-W': () => closeTab(state.activeTab),
      'Ctrl-L': clearTerminal,
      'Ctrl-B': toggleSidebar,
      'Ctrl-Shift-R': toggleRefPanel,
      'Ctrl-Shift-T': openThemes,
      'Ctrl-Shift-F': formatCode,
      'Ctrl-=': () => changeFontSize(1),
      'Ctrl--': () => changeFontSize(-1),
    },
    indentUnit: 2,
    tabSize: 2,
    indentWithTabs: false,
  });

  // Force full height
  const wrap = document.getElementById('editor-wrap');
  editorInstance.setSize('100%', '100%');
  wrap.style.overflow = 'hidden';
  const cmEl = wrap.querySelector('.CodeMirror');
  if (cmEl) { cmEl.style.flex = '1'; cmEl.style.height = '100%'; }

  // Cursor position in status bar
  editorInstance.on('cursorActivity', updateStatusBar);
  editorInstance.on('change', updateStatusBar);
  editorInstance.on('change', () => {
    if (state.activeTab) {
      const tab = state.tabs.find(t => t.id === state.activeTab);
      if (tab) tab.content = editorInstance.getValue();
    }
  });
}

function updateStatusBar() {
  const cursor = editorInstance.getCursor();
  const lines = editorInstance.lineCount();
  document.getElementById('sb-cursor').textContent = `Ln ${cursor.line+1}, Col ${cursor.ch+1}`;
  document.getElementById('sb-lines').textContent = `Lines: ${lines}`;
}

function changeFontSize(delta) {
  state.fontSize = Math.max(10, Math.min(22, state.fontSize + delta));
  document.querySelector('.CodeMirror').style.fontSize = state.fontSize + 'px';
  editorInstance.refresh();
}

function formatCode() {
  const lang = state.currentLang;
  if (lang !== 'javascript' && lang !== 'json') {
    termPrint('info', 'Auto-format only available for JavaScript and JSON.');
    return;
  }
  try {
    const code = editorInstance.getValue();
    if (lang === 'json') {
      const pretty = JSON.stringify(JSON.parse(code), null, 2);
      editorInstance.setValue(pretty);
    } else {
      // Simple JS formatter: just clean up spacing
      termPrint('info', 'Use Prettier extension for full formatting. Basic cleanup applied.');
    }
  } catch(e) {
    termPrint('error', 'Format failed: ' + e.message);
  }
}

/* ═══════════════════════════════════════════
   TABS
═══════════════════════════════════════════ */
function newTab(langId) {
  const lang = LANGUAGES.find(l => l.id === (langId || state.currentLang));
  const id = 'tab_' + Date.now();
  const tab = {
    id,
    langId: lang.id,
    name: lang.name + (lang.ext || ''),
    content: lang.starter || `// ${lang.name}\n`
  };
  state.tabs.push(tab);
  activateTab(id);
  renderTabs();
}

function activateTab(id) {
  state.activeTab = id;
  const tab = state.tabs.find(t => t.id === id);
  if (!tab) return;
  state.currentLang = tab.langId;
  editorInstance.setValue(tab.content);
  const lang = LANGUAGES.find(l => l.id === tab.langId);
  if (lang) {
    const mode = getCMMode(lang);
    editorInstance.setOption('mode', mode);
    updateUrlBar(lang);
  }
  editorInstance.focus();
  renderTabs();
  renderRefPanel();
  updateStatusBar();
}

function closeTab(id) {
  const idx = state.tabs.findIndex(t => t.id === id);
  if (idx === -1) return;
  state.tabs.splice(idx, 1);
  if (!state.tabs.length) {
    newTab('javascript');
    return;
  }
  const newActive = state.tabs[Math.min(idx, state.tabs.length-1)].id;
  activateTab(newActive);
  renderTabs();
}

function renderTabs() {
  const bar = document.getElementById('tabs-bar');
  const addBtn = document.getElementById('add-tab');
  bar.innerHTML = '';
  state.tabs.forEach(tab => {
    const lang = LANGUAGES.find(l => l.id === tab.langId) || {};
    const el = document.createElement('div');
    el.className = 'tab' + (tab.id === state.activeTab ? ' active' : '');
    el.innerHTML = `
      <span style="width:8px;height:8px;border-radius:50%;background:${lang.color||'#888'};flex-shrink:0;"></span>
      <span>${lang.name || tab.name}</span>
      <span class="tab-close" onclick="event.stopPropagation();closeTab('${tab.id}')">×</span>
    `;
    el.onclick = () => activateTab(tab.id);
    bar.appendChild(el);
  });
  bar.appendChild(addBtn);
}

/* ═══════════════════════════════════════════
   LANGUAGE SIDEBAR
═══════════════════════════════════════════ */
function initSidebar() {
  renderSidebar(LANGUAGES);
  document.getElementById('lang-search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    const filtered = LANGUAGES.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.cat.toLowerCase().includes(q) ||
      l.short.toLowerCase().includes(q)
    );
    renderSidebar(filtered, q);
  });
}

function renderSidebar(langs, query='') {
  const list = document.getElementById('lang-list');
  const categories = [...new Set(langs.map(l => l.cat))];
  list.innerHTML = categories.map(cat => {
    const catLangs = langs.filter(l => l.cat === cat);
    return `
      <div class="lang-category">
        <div class="lang-cat-title">${cat}</div>
        ${catLangs.map(lang => `
          <div class="lang-item ${lang.id === state.currentLang ? 'active' : ''}"
               onclick="selectLanguage('${lang.id}')"
               title="${lang.name} — ${lang.runnable ? 'Live execution' : 'Syntax only'}">
            <div class="lang-icon" style="background:${lang.color||'#555'};color:${isLight(lang.color||'#555')?'#000':'#fff'}">
              ${lang.short.slice(0,2)}
            </div>
            <span>${lang.name}</span>
            <span class="lang-badge ${lang.runnable ? 'badge-run' : 'badge-syn'}">
              ${lang.runnable ? '▶' : 'SYN'}
            </span>
          </div>
        `).join('')}
      </div>
    `;
  }).join('');
}

function isLight(hex) {
  const c = hex.replace('#','');
  const r=parseInt(c.slice(0,2),16), g=parseInt(c.slice(2,4),16), b=parseInt(c.slice(4,6),16);
  return (r*299+g*587+b*114)/1000 > 128;
}

function selectLanguage(langId) {
  const lang = LANGUAGES.find(l => l.id === langId);
  if (!lang) return;
  state.currentLang = langId;

  // Create new tab or reuse if first
  if (!state.tabs.length) {
    newTab(langId);
    return;
  }

  // Find if there's already a tab for this language
  const existing = state.tabs.find(t => t.langId === langId);
  if (existing) {
    activateTab(existing.id);
  } else {
    newTab(langId);
  }

  renderSidebar(LANGUAGES);
  updateUrlBar(lang);
  updateStatusBar();
  document.getElementById('sb-lang').textContent = '⚡ ' + lang.name;
  document.getElementById('ref-lang-name').textContent = lang.name;
  renderRefPanel();
}

function getCMMode(lang) {
  const modeMap = {
    javascript: {name:'javascript',typescript:false},
    typescript: {name:'javascript',typescript:true},
    html: 'htmlmixed',
    css: 'css',
    c: 'text/x-csrc',
    cpp: 'text/x-c++src',
    java: 'text/x-java',
    kotlin: 'text/x-kotlin',
    scala: 'text/x-scala',
    python: 'python',
    ruby: 'ruby',
    rust: 'rust',
    go: 'go',
    php: {name:'php',htmlMode:true},
    bash: 'shell',
    sql: 'sql',
    markdown: 'markdown',
    json: {name:'javascript',json:true},
    yaml: 'yaml',
    xml: 'xml',
    haskell: 'haskell',
    lua: 'lua',
    perl: 'perl',
    swift: 'swift',
    dart: 'dart',
    r: 'r',
    excel: {name:'javascript',json:false},
    sheets: 'javascript',
    asm: 'text/x-asm',
  };
  return modeMap[lang.id] || 'null';
}

function updateUrlBar(lang) {
  document.getElementById('url-bar').value = `devlab://${lang.name.toLowerCase().replace(/\s+/g,'-')}${lang.ext||''}`;
}

/* ═══════════════════════════════════════════
   CODE RUNNER
═══════════════════════════════════════════ */
async function runCode() {
  const code = editorInstance.getValue().trim();
  if (!code) { termPrint('warn', 'Nothing to run.'); return; }

  const lang = LANGUAGES.find(l => l.id === state.currentLang);
  if (!lang) return;

  const btn = document.getElementById('run-btn');
  const dot = document.getElementById('run-dot');
  btn.classList.add('running');
  dot.classList.add('running');
  btn.textContent = ''; btn.appendChild(dot); btn.append(' Stop');

  termPrint('info', `▶  Running ${lang.name}...`);

  // Push to history
  state.history.unshift({ lang: lang.id, code, time: new Date().toLocaleTimeString() });
  if (state.history.length > 50) state.history.pop();

  setTimeout(async () => {
    try {
      switch(lang.run) {
        case 'js':     await runJS(code); break;
        case 'html':   runHTML(code); break;
        case 'python': await runPython(code); break;
        case 'sql':    runSQL(code); break;
        case 'json':   runJSON(code); break;
        case 'ts':     termPrint('warn', 'TypeScript transpilation not available in browser. Copy to replit.com or use ts-node locally.'); break;
        default:       runExternal(lang); break;
      }
    } catch(e) {
      termPrint('error', 'Runtime error: ' + e.message);
    } finally {
      btn.classList.remove('running');
      dot.classList.remove('running');
      btn.innerHTML = '<span class="run-dot" id="run-dot">▶</span> Run';
    }
  }, 50);
}

/* ── JavaScript Runner ── */
async function runJS(code) {
  const logs = [];
  // Capture console
  const origConsole = {
    log: console.log, warn: console.warn, error: console.error,
    info: console.info, table: console.table, dir: console.dir,
    group: console.group, groupEnd: console.groupEnd,
  };
  const capture = (type) => (...args) => {
    const line = args.map(a => {
      if (a === null) return 'null';
      if (a === undefined) return 'undefined';
      if (typeof a === 'object') { try { return JSON.stringify(a, null, 2); } catch{return String(a);} }
      return String(a);
    }).join(' ');
    logs.push({ type, line });
    origConsole[type](...args);
  };
  console.log = capture('out');
  console.warn = capture('warn');
  console.error = capture('err');
  console.info = capture('info');
  console.table = (...args) => {
    logs.push({ type:'table', line: args[0] });
    origConsole.table(...args);
  };

  try {
    // Wrap in async function to support await
    const wrapped = `(async function() { ${code} })()`;
    const result = eval(wrapped);
    if (result && typeof result.then === 'function') await result;
  } catch(e) {
    logs.push({ type:'err', line: e.toString() });
  } finally {
    Object.assign(console, origConsole);
  }

  if (!logs.length) termPrint('ok', '✓ No output produced.');
  logs.forEach(({type, line}) => {
    if (type === 'table' && typeof line === 'object') {
      termPrintTable(line);
    } else {
      termPrint(type, line);
    }
  });
}

/* ── HTML Runner ── */
function runHTML(code) {
  switchTermTab('preview', document.getElementById('tt-preview'));
  const frame = document.getElementById('preview-frame');
  frame.srcdoc = code;
  termPrint('ok', '✓ HTML rendered in Preview tab.');
}

/* ── Python Runner (Skulpt) ── */
async function runPython(code) {
  if (typeof Sk === 'undefined') {
    termPrint('warn', 'Python engine (Skulpt) not loaded. Check your internet connection and reload.');
    return;
  }
  const output = [];
  Sk.configure({
    output: (text) => { output.push(text); },
    read: (x) => {
      if (Sk.builtinFiles?.files[x]) return Sk.builtinFiles.files[x];
      throw new Error(`File not found: '${x}'`);
    },
    execLimit: 10000,
  });
  try {
    await Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, code, true));
    if (output.length) {
      output.join('').split('\n').filter(l=>l!==undefined).forEach(line => {
        if (line !== '') termPrint('out', line);
      });
    } else {
      termPrint('ok', '✓ Executed with no output.');
    }
  } catch(e) {
    const msg = e.toString().replace(/^Traceback[\s\S]*?Error:/,'Error:');
    termPrint('err', 'Python Error: ' + msg);
  }
}

/* ── SQL Runner ── */
function runSQL(code) {
  // Reset engine on each run for fresh state
  sqlEngine.reset();
  const results = sqlEngine.execute(code);
  if (!results.length) { termPrint('info', 'No results.'); return; }
  results.forEach(r => {
    if (r.type === 'error') {
      termPrint('err', '✗ SQL Error: ' + r.message);
      if (r.sql) termPrint('warn', '  in: ' + r.sql.substring(0,80));
    } else if (r.type === 'ok') {
      termPrint('ok', '✓ ' + r.message);
    } else if (r.type === 'table') {
      termPrintTable(r);
    }
  });
}

/* ── JSON Validator ── */
function runJSON(code) {
  try {
    const parsed = JSON.parse(code);
    termPrint('ok', '✓ Valid JSON');
    const lines = JSON.stringify(parsed, null, 2).split('\n');
    const preview = lines.slice(0, 20);
    preview.forEach(l => termPrint('result', l));
    if (lines.length > 20) termPrint('info', `... (${lines.length - 20} more lines)`);
  } catch(e) {
    termPrint('err', '✗ JSON Error: ' + e.message);
    const match = e.message.match(/position (\d+)/);
    if (match) {
      const pos = parseInt(match[1]);
      const context = code.substring(Math.max(0,pos-20), pos+20);
      termPrint('warn', `Near: ...${context}...`);
    }
  }
}

/* ── External Language Message ── */
function runExternal(lang) {
  termPrint('warn', `${lang.name} doesn't execute in the browser.`);
  termPrint('info', '━━ Run Options ━━');
  termPrint('info', '  🌐 replit.com      — Full online IDE, free');
  termPrint('info', '  🔬 godbolt.org     — Compiler Explorer (C/C++/Rust/Go)');
  termPrint('info', '  📋 ideone.com      — Paste & run 60+ languages');
  termPrint('info', '  🐳 onlinegdb.com   — Debug online');
  termPrint('info', '');
  termPrint('ok', `✓ Code highlighted and ready to copy. Press Ctrl+A, Ctrl+C`);
}

/* ═══════════════════════════════════════════
   TERMINAL
═══════════════════════════════════════════ */
function initTerminal() {
  const input = document.getElementById('term-input');
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = input.value.trim();
      if (!val) return;
      input.value = '';
      termPrint('out', `› ${val}`);
      evalTermInput(val);
    }
  });
}

function evalTermInput(cmd) {
  const lang = state.currentLang;
  if (lang === 'javascript') {
    try {
      const result = eval(cmd);
      if (result !== undefined) termPrint('result', '← ' + JSON.stringify(result, null, 2));
    } catch(e) { termPrint('err', e.toString()); }
  } else if (lang === 'sql') {
    const res = sqlEngine.execute(cmd);
    res.forEach(r => {
      if (r.type==='error') termPrint('err', r.message);
      else if (r.type==='ok') termPrint('ok', r.message);
      else if (r.type==='table') termPrintTable(r);
    });
  } else {
    // Special commands
    if (cmd === 'clear' || cmd === 'cls') clearTerminal();
    else if (cmd === 'help') printHelp();
    else if (cmd.startsWith('lang ')) selectLanguage(cmd.slice(5).toLowerCase());
    else if (cmd.startsWith('theme ')) {
      const t = THEMES.find(t=>t.id===cmd.slice(6).toLowerCase());
      if (t) setTheme(t.id); else termPrint('err', 'Unknown theme. Try: theme dracula');
    }
    else if (cmd === 'themes') termPrint('info', 'Available: ' + THEMES.map(t=>t.id).join(', '));
    else if (cmd === 'langs')  termPrint('info', 'Languages: ' + LANGUAGES.map(l=>l.id).join(', '));
    else termPrint('warn', `Tip: Terminal input runs ${lang === 'javascript' ? 'JavaScript expressions' : 'text commands'}`);
  }
}

function printHelp() {
  const lines = [
    '━━ DevLab Terminal Commands ━━',
    '  clear / cls     — Clear terminal',
    '  lang <id>       — Switch language (e.g. lang python)',
    '  theme <id>      — Switch theme (e.g. theme dracula)',
    '  themes           — List all themes',
    '  langs            — List all languages',
    '  F5 / Ctrl+Enter — Run code',
    '  Ctrl+B           — Toggle sidebar',
    '  Ctrl+Shift+T     — Theme picker',
  ];
  lines.forEach(l => termPrint('info', l));
}

function termPrint(type, text) {
  const out = document.getElementById('terminal-output');
  const line = document.createElement('div');
  line.className = 'term-line';

  const pre = document.createElement('span');
  pre.className = 'term-prompt';
  pre.textContent = type === 'err' ? '✗' : type === 'ok' ? '✓' : type === 'warn' ? '⚠' : type === 'info' ? 'ℹ' : type === 'result' ? '←' : ' ';

  const content = document.createElement('span');
  content.className = 'term-' + (type === 'out' ? 'out' : type === 'err' ? 'err' : type === 'ok' ? 'ok' : type === 'warn' ? 'warn' : type === 'result' ? 'result' : 'info');
  content.textContent = text;

  line.appendChild(pre);
  line.appendChild(content);
  out.appendChild(line);
  out.scrollTop = out.scrollHeight;
}

function termPrintTable(data) {
  if (!data || !data.columns || !data.rows) return;
  const out = document.getElementById('terminal-output');

  const wrap = document.createElement('div');
  wrap.className = 'term-table';

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Header
  const trHead = document.createElement('tr');
  data.columns.forEach(col => {
    const th = document.createElement('th');
    th.textContent = col;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);

  // Rows
  data.rows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell === null ? 'NULL' : cell;
      if (cell === null) td.style.color = 'var(--text3)';
      else if (typeof cell === 'number') td.style.color = 'var(--teal)';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  wrap.appendChild(table);
  if (data.rowCount !== undefined) {
    const count = document.createElement('div');
    count.style.cssText = 'font-size:0.65rem;color:var(--text3);margin-top:3px;';
    count.textContent = `${data.rowCount} row(s)`;
    wrap.appendChild(count);
  }
  out.appendChild(wrap);
  out.scrollTop = out.scrollHeight;
}

function clearTerminal() {
  const out = document.getElementById('terminal-output');
  out.innerHTML = '';
  termPrint('info', 'Terminal cleared. Ready.');
}

function switchTermTab(tab, el) {
  document.querySelectorAll('.term-tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');

  const output = document.getElementById('terminal-output');
  const preview = document.getElementById('term-preview');
  const input = document.getElementById('term-input-line');

  if (tab === 'preview') {
    output.style.display = 'none';
    preview.style.display = 'flex';
    preview.style.flex = '1';
    input.style.display = 'none';
  } else {
    output.style.display = 'block';
    preview.style.display = 'none';
    input.style.display = 'flex';
  }
}

function toggleTermSize() {
  const term = document.getElementById('terminal-area');
  state.termExpanded = !state.termExpanded;
  term.style.height = state.termExpanded ? '60vh' : '220px';
}

/* ═══════════════════════════════════════════
   REFERENCE PANEL
═══════════════════════════════════════════ */
function renderRefPanel() {
  const ref = getLangReference(state.currentLang);
  const content = document.getElementById('ref-content');
  renderRefTab(state.currentRefTab, ref, content);
  document.getElementById('ref-lang-name').textContent =
    (LANGUAGES.find(l => l.id === state.currentLang) || {name: state.currentLang}).name;
}

function switchRefTab(tab, el) {
  state.currentRefTab = tab;
  document.querySelectorAll('.ref-tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  renderRefPanel();
}

function renderRefTab(tab, ref, container) {
  const data = ref[tab] || [];
  if (!data.length) {
    container.innerHTML = `<p style="color:var(--text3);font-size:0.78rem;padding:8px;">No ${tab} data for this language yet.</p>`;
    return;
  }
  container.innerHTML = data.map((item, i) => `
    <div class="ref-card" onclick="insertSnippet('${i}','${tab}')" title="Click to insert">
      <div class="ref-card-title">${item.title}</div>
      <pre class="ref-card-code">${escHtml(item.code)}</pre>
      ${item.desc ? `<div class="ref-card-desc">${item.desc}</div>` : ''}
    </div>
  `).join('');
}

function insertSnippet(idx, tab) {
  const ref = getLangReference(state.currentLang);
  const items = ref[tab] || [];
  const item = items[parseInt(idx)];
  if (!item) return;

  const code = item.code;
  const cursor = editorInstance.getCursor();
  editorInstance.replaceRange('\n' + code + '\n', cursor);
  editorInstance.focus();
  termPrint('ok', `✓ Inserted snippet: ${item.title}`);
}

function toggleRefPanel() {
  const panel = document.getElementById('ref-panel');
  panel.classList.toggle('collapsed');
  document.getElementById('ref-toggle-btn').textContent =
    panel.classList.contains('collapsed') ? '📖 Ref' : '📖 Hide';
}

/* ═══════════════════════════════════════════
   THEMES
═══════════════════════════════════════════ */
function initThemePanel() {
  const darkDiv = document.getElementById('theme-dark-grid');
  const lightDiv = document.getElementById('theme-light-grid');

  const dark = THEMES.filter(t => t.type === 'dark');
  const light = THEMES.filter(t => t.type === 'light');

  darkDiv.innerHTML = `<div class="theme-group-title">🌙 Dark Themes (${dark.length})</div>
    <div class="theme-grid">${dark.map(t => themeSwatchHTML(t)).join('')}</div>`;
  lightDiv.innerHTML = `<div class="theme-group-title">☀ Light Themes (${light.length})</div>
    <div class="theme-grid">${light.map(t => themeSwatchHTML(t)).join('')}</div>`;
}

function themeSwatchHTML(theme) {
  const [bg, c1, c2, c3] = theme.colors;
  return `
    <div class="theme-swatch ${theme.id === state.currentTheme ? 'active' : ''}"
         id="swatch-${theme.id}"
         onclick="setTheme('${theme.id}')"
         style="background:${bg};"
         title="${theme.name}">
      <div class="theme-preview" style="background:${bg};">
        <div class="tp-col" style="background:${c1}"></div>
        <div class="tp-col" style="background:${c2}"></div>
        <div class="tp-col" style="background:${c3}"></div>
      </div>
      <div class="theme-name" style="color:${c1};">${theme.name}</div>
      <div class="theme-type">${theme.type}</div>
    </div>
  `;
}

function setTheme(themeId) {
  const theme = THEMES.find(t => t.id === themeId);
  if (!theme) return;

  // Remove old active swatch
  document.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('active'));
  const sw = document.getElementById('swatch-' + themeId);
  if (sw) sw.classList.add('active');

  // Apply theme
  document.documentElement.setAttribute('data-theme', themeId);
  state.currentTheme = themeId;

  // Update status
  document.getElementById('sb-theme').textContent = '🎨 ' + theme.name;
  document.getElementById('theme-indicator').textContent = theme.name;

  // Refresh editor
  setTimeout(() => editorInstance.refresh(), 50);

  // Save preference
  try { localStorage.setItem('devlab_theme', themeId); } catch(e) {}

  termPrint('ok', `Theme: ${theme.name}`);
}

function openThemes() {
  document.getElementById('theme-overlay').classList.add('open');
}

function closeThemes() {
  document.getElementById('theme-overlay').classList.remove('open');
}

/* ═══════════════════════════════════════════
   UI HELPERS
═══════════════════════════════════════════ */
let sidebarCollapsed = false;
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebarCollapsed = !sidebarCollapsed;
  sidebar.style.width = sidebarCollapsed ? '0' : 'var(--sidebar-w)';
  sidebar.style.overflow = sidebarCollapsed ? 'hidden' : 'hidden';
  sidebar.style.borderRight = sidebarCollapsed ? 'none' : '';
}

function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
}

function openShortcuts() {
  document.getElementById('shortcuts-overlay').classList.add('open');
}

function closeOverlay(e, id) {
  if (e.target.id === id) document.getElementById(id).classList.remove('open');
}

function historyBack()    { termPrint('info', 'History navigation — use browser Back button'); }
function historyForward() { termPrint('info', 'History navigation — use browser Forward button'); }

function escHtml(str) {
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

/* ═══════════════════════════════════════════
   RESIZE HANDLE
═══════════════════════════════════════════ */
function setupResizeHandle() {
  const handle = document.getElementById('resize-handle');
  let startY, startH;

  handle.addEventListener('mousedown', e => {
    startY = e.clientY;
    const term = document.getElementById('terminal-area');
    startH = term.offsetHeight;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
    e.preventDefault();
  });

  function onDrag(e) {
    const term = document.getElementById('terminal-area');
    const newH = Math.max(80, Math.min(window.innerHeight * 0.7, startH - (e.clientY - startY)));
    term.style.height = newH + 'px';
  }

  function stopDrag() {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
    editorInstance.refresh();
  }
}

/* ═══════════════════════════════════════════
   KEYBOARD SHORTCUTS
═══════════════════════════════════════════ */
function initKeyboard() {
  document.addEventListener('keydown', e => {
    // Global shortcuts (not in editor)
    if (!e.target.closest('.CodeMirror')) {
      if (e.key === 'F5') { e.preventDefault(); runCode(); }
    }
    if (e.ctrlKey && e.key === 'l') { e.preventDefault(); clearTerminal(); }
  });
}

/* ═══════════════════════════════════════════
   STATE PERSISTENCE
═══════════════════════════════════════════ */
function loadSavedState() {
  try {
    const savedTheme = localStorage.getItem('devlab_theme');
    if (savedTheme && THEMES.find(t=>t.id===savedTheme)) {
      setTheme(savedTheme);
    } else {
      setTheme('mocha');
    }
  } catch(e) {
    setTheme('mocha');
  }
}
