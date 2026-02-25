document.addEventListener('DOMContentLoaded', () => {
    const editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/javascript'); // Default

    const languages = {
        cpp: {
            beginner: '<p>Beginner C++: Hello World</p><pre>cout << "Hello";</pre>',
            intermediate: '<p>Loops in C++</p><pre>for(int i=0; i<5; i++) {}</pre>',
            advanced: '<p>Pointers & Memory</p><pre>int* ptr = new int;</pre>'
        },
        java: {
            beginner: '<p>Beginner Java: Hello World</p><pre>System.out.println("Hello");</pre>',
            intermediate: '<p>Classes</p><pre>class MyClass {}</pre>',
            advanced: '<p>Generics</p><pre>List<String> list = new ArrayList<>();</pre>'
        },
        js: {
            beginner: '<p>Beginner JS: Alert</p><pre>alert("Hello");</pre>',
            intermediate: '<p>Functions</p><pre>function add(a,b){return a+b;}</pre>',
            advanced: '<p>Async/Await</p><pre>async function fetchData(){}</pre>'
        },
        html: {
            beginner: '<p>Beginner HTML: Tags</p><pre><h1>Hello</h1></pre>',
            intermediate: '<p>CSS Styles</p><pre>style="color:red;"</pre>',
            advanced: '<p>Responsive Design</p><pre>@media queries</pre>'
        },
        sql: {
            beginner: '<p>Beginner SQL: Select</p><pre>SELECT * FROM table;</pre>',
            intermediate: '<p>Joins</p><pre>INNER JOIN</pre>',
            advanced: '<p>Subqueries</p><pre>SELECT (SELECT ...)</pre>'
        },
        go: {
            beginner: '<p>Beginner Go: Print</p><pre>fmt.Println("Hello")</pre>',
            intermediate: '<p>Goroutines</p><pre>go func(){}</pre>',
            advanced: '<p>Channels</p><pre>ch := make(chan int)</pre>'
        },
        excel: {
            beginner: '<p>Beginner: Formulas</p><pre>=SUM(A1:A10)</pre>',
            intermediate: '<p>VLOOKUP</p><pre>=VLOOKUP(value, range, col)</pre>',
            advanced: '<p>Pivot Tables (simulated)</p>'
        }
    };

    // Theme Selector
    document.getElementById('theme-selector').addEventListener('change', (e) => {
        document.body.className = e.target.value;
        editor.setTheme(e.target.value.startsWith('dark') ? 'ace/theme/monokai' : 'ace/theme/chrome');
    });

    // Search Bar
    document.getElementById('search-bar').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('#language-list li').forEach(li => {
            li.style.display = li.textContent.toLowerCase().includes(query) ? 'block' : 'none';
        });
    });

    // Language Selection
    document.querySelectorAll('#language-list li').forEach(li => {
        li.addEventListener('click', () => {
            const lang = li.dataset.lang;
            editor.session.setMode(`ace/mode/${lang === 'js' ? 'javascript' : lang === 'html' ? 'html' : lang === 'sql' ? 'sql' : 'text'}`);
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelector('.tab[data-level="beginner"]').classList.add('active');
            loadContent(lang, 'beginner');
            document.getElementById('sheet-container').style.display = lang === 'excel' ? 'block' : 'none';
            if (lang === 'excel') initSheet();
        });
    });

    // Level Tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const lang = document.querySelector('#language-list li.active')?.dataset.lang || 'js';
            loadContent(lang, tab.dataset.level);
        });
    });

    function loadContent(lang, level) {
        document.getElementById('content-area').innerHTML = languages[lang][level];
        editor.setValue(languages[lang][level].replace(/<[^>]+>/g, '')); // Strip HTML for editor
    }

    // Run Button
    document.getElementById('run-btn').addEventListener('click', () => {
        const code = editor.getValue();
        const output = document.getElementById('output');
        const lang = document.querySelector('#language-list li.active')?.dataset.lang || 'js';
        output.innerHTML = '';
        try {
            if (lang === 'js') {
                output.innerHTML = eval(code); // Dangerous in prod, but for local lab
            } else if (lang === 'html') {
                output.innerHTML = code;
            } else if (lang === 'sql') {
                alasql(code).then(res => output.innerHTML = JSON.stringify(res));
            } else if (lang === 'excel') {
                // Simulate formula eval (basic)
                output.innerHTML = 'Sheet output: ' + evalSheet();
            } else {
                output.innerHTML = 'Simulated output for ' + lang + ': [Success] ' + code;
            }
        } catch (err) {
            output.innerHTML = 'Error: ' + err.message;
        }
    });

    // Excel Sheet Init (simple grid)
    function initSheet() {
        const sheet = document.getElementById('sheet-container');
        sheet.innerHTML = '<table id="sheet-table"><tr><td contenteditable>A1</td><td contenteditable>B1</td></tr><tr><td contenteditable>A2</td><td contenteditable>B2</td></tr></table>';
    }

    function evalSheet() {
        // Basic simulation using XLSX or manual parse
        return 'Evaluated formulas (placeholder)';
    }

    // Default load
    loadContent('js', 'beginner');
});
