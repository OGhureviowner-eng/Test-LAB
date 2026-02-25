# 🧪 DevLab — Programmer's Laboratory

A full interactive code editor & lab for developers. Runs entirely in your browser — zero backend, zero installs.

---

## 📁 File Structure

```
devlab/
├── index.html        ← Main app shell (open this)
├── themes.css        ← 30 themes (20 dark + 10 light)
├── languages.js      ← 30+ language configs, snippets, reference
├── sql-engine.js     ← In-browser SQL interpreter
├── app.js            ← Main application engine
└── README.md         ← This file
```

> **Save all 5 files in the SAME folder.** They reference each other.

---

## 🚀 Quick Start

### Option A — Open Locally
1. Download all 5 files into one folder
2. Double-click `index.html` — opens in your browser
3. Start coding!

### Option B — GitHub Pages
1. Create a new GitHub repository
2. Upload all 5 files to the root `/`
3. Go to **Settings → Pages → Branch: main → Save**
4. Visit: `https://yourusername.github.io/repo-name`

### Option C — VS Code Live Server
1. Open the `devlab/` folder in VS Code
2. Install the **Live Server** extension
3. Right-click `index.html` → **Open with Live Server**
4. App runs at `http://localhost:5500`

### Option D — Python Local Server
```bash
cd devlab/
python3 -m http.server 8080
# Open: http://localhost:8080
```

### Option E — Node.js
```bash
cd devlab/
npx serve .
# Open: http://localhost:3000
```

---

## ⚡ Features

### Languages (30+)
| Category | Languages |
|----------|-----------|
| **Web** | JavaScript ▶, TypeScript, HTML ▶, CSS, PHP |
| **Systems** | C, C++, Rust, Go, Assembly x86 |
| **JVM** | Java, Kotlin, Scala |
| **Scripting** | Python ▶, Ruby, Bash, Perl, Lua |
| **Data** | SQL ▶, R |
| **Markup** | Markdown, JSON ▶, YAML, XML |
| **Functional** | Haskell |
| **Mobile** | Swift, Dart |
| **Spreadsheet** | Excel Formulas, Google Sheets |

**▶ = Live execution in browser**

### Live Execution
| Language | Engine | Notes |
|----------|--------|-------|
| **JavaScript** | Native browser eval | Full ES2022+, async/await |
| **HTML/CSS** | iframe sandbox | Live preview with JS |
| **Python** | Skulpt | Standard library supported |
| **SQL** | Custom engine | SQLite-compatible subset |
| **JSON** | Built-in | Validates + formats |

### 30 Themes
**Dark (20):** Catppuccin Mocha, Dracula, One Dark, Nord, Tokyo Night, Gruvbox Dark, Synthwave 84, Rosé Pine, Kanagawa, Matrix, Monokai, Cobalt, Ayu Dark, Palenight, GitHub Dark, Night Owl, Coffee, Obsidian, Solarized Dark, Catppuccin Frappé

**Light (10):** GitHub Light, Solarized Light, One Light, Gruvbox Light, Catppuccin Latte, Paper, Rosé Pine Dawn, Ayu Light, Sepia, Arctic

---

## ⌨ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `F5` or `Ctrl+Enter` | Run code |
| `Ctrl+T` | New tab |
| `Ctrl+W` | Close tab |
| `Ctrl+L` | Clear terminal |
| `Ctrl+B` | Toggle sidebar |
| `Ctrl+Shift+R` | Toggle reference panel |
| `Ctrl+Shift+T` | Open theme picker |
| `Ctrl+/` | Toggle comment |
| `Ctrl+F` | Find in editor |
| `Ctrl++` / `Ctrl+-` | Font size |

---

## 💬 Terminal Commands

Type in the terminal input (bottom bar):
```
clear          — Clear terminal
lang python    — Switch to Python
theme dracula  — Switch to Dracula theme
themes         — List all themes
langs          — List all languages
help           — Show help
```

For JavaScript: type any JS expression and press Enter to evaluate it live.
For SQL: type any SQL statement and press Enter to execute it.

---

## 🔧 Customization

### Add a new language
In `languages.js`, add to the `LANGUAGES` array:
```javascript
{ id:'myLang', name:'My Language', short:'ML',
  cat:'Scripting',        // Category in sidebar
  cm:'javascript',        // CodeMirror mode
  run:'ext',             // 'js','python','sql','html','json', or 'ext'
  color:'#ff6600',       // Sidebar icon color
  ext:'.ml',             // File extension
  runnable: false,       // Show ▶ badge?
  starter: `// My Language\nprint("Hello!")` }
```

### Add a new theme
In `themes.css`, add:
```css
[data-theme="my-theme"] {
  --bg:#1a1a1a; --bg2:#111; --bg3:#222; --bg4:#2a2a2a;
  --surface:#333; --border:#444;
  --text:#fff; --text2:#ccc; --text3:#888;
  --accent:#ff6600; --accent2:#0099ff;
  --green:#00ff00; --red:#ff0000; --yellow:#ffff00;
  --orange:#ff8800; --teal:#00ffff; --pink:#ff00ff;
}
```
Then add it to the `THEMES` array in `app.js`.

---

## 🌐 CDN Dependencies (auto-loaded)
- **CodeMirror 5.65.16** — Code editor
- **Skulpt** — Python in browser
- **Google Fonts** — Fira Code + Outfit

> All CDN resources load from your browser when online. Works offline for non-Python languages once cached.

---

## 📝 Notes

- **Data storage**: Theme preference saved to localStorage
- **No server needed**: All execution happens in-browser
- **Python**: Requires internet (Skulpt CDN). Standard library modules supported.
- **Other languages**: Displays syntax highlighting. Click "Run" to see online compiler links.
- **SQL**: Full custom interpreter — CREATE, INSERT, SELECT (with JOINs, GROUP BY, ORDER BY, LIMIT), UPDATE, DELETE, DROP, SHOW TABLES, DESCRIBE

---

*DevLab — Your Programmer's Laboratory*
