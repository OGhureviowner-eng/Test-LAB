/* sql-engine.js — In-browser SQL interpreter
   Supports: CREATE TABLE, INSERT, SELECT (WHERE, GROUP BY, ORDER BY, LIMIT, JOIN),
             UPDATE, DELETE, DROP TABLE, SHOW TABLES
*/

class SQLEngine {
  constructor() {
    this.tables = {};
    this.reset();
  }

  reset() {
    this.tables = {};
  }

  execute(sqlRaw) {
    const results = [];
    // Split into statements by semicolon (but not inside strings)
    const statements = this._splitStatements(sqlRaw);

    for (const raw of statements) {
      const sql = raw.trim();
      if (!sql) continue;
      try {
        const result = this._executeOne(sql);
        if (result) results.push(result);
      } catch(e) {
        results.push({ type:'error', message: e.message, sql });
      }
    }
    return results;
  }

  _splitStatements(sql) {
    const statements = [];
    let current = '';
    let inStr = false, strChar = '';
    for (let i = 0; i < sql.length; i++) {
      const c = sql[i];
      if (!inStr && (c === "'" || c === '"')) { inStr = true; strChar = c; }
      else if (inStr && c === strChar && sql[i-1] !== '\\') { inStr = false; }
      else if (!inStr && c === ';') {
        if (current.trim()) statements.push(current.trim());
        current = '';
        continue;
      }
      current += c;
    }
    if (current.trim()) statements.push(current.trim());
    return statements;
  }

  _executeOne(sql) {
    // Remove comments
    sql = sql.replace(/--[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '').trim();
    if (!sql) return null;

    const upper = sql.toUpperCase().trimStart();

    if (upper.startsWith('CREATE TABLE'))  return this._createTable(sql);
    if (upper.startsWith('INSERT INTO'))   return this._insert(sql);
    if (upper.startsWith('SELECT'))        return this._select(sql);
    if (upper.startsWith('UPDATE'))        return this._update(sql);
    if (upper.startsWith('DELETE'))        return this._delete(sql);
    if (upper.startsWith('DROP TABLE'))    return this._dropTable(sql);
    if (upper.startsWith('SHOW TABLES'))   return this._showTables();
    if (upper.startsWith('DESCRIBE') || upper.startsWith('DESC ')) return this._describe(sql);
    if (upper.startsWith('ALTER TABLE'))   return this._alterTable(sql);
    if (upper.startsWith('CREATE INDEX'))  return { type:'ok', message:'Index created (simulated)' };
    throw new Error(`Unknown statement: ${sql.substring(0,40)}...`);
  }

  // ── CREATE TABLE ──────────────────────────────
  _createTable(sql) {
    const m = sql.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]+)\)/i);
    if (!m) throw new Error('Invalid CREATE TABLE syntax');
    const name = m[1].toLowerCase();
    if (this.tables[name]) {
      if (sql.toUpperCase().includes('IF NOT EXISTS'))
        return { type:'ok', message:`Table '${name}' already exists, skipped.` };
      throw new Error(`Table '${name}' already exists`);
    }

    const colDefs = this._parseColumnDefs(m[2]);
    this.tables[name] = {
      columns: colDefs.map(c => ({ name: c.name, type: c.type, pk: c.pk, notnull: c.notnull })),
      rows: [],
      autoInc: {}
    };
    return { type:'ok', message:`Table '${name}' created with ${colDefs.length} columns.` };
  }

  _parseColumnDefs(defs) {
    const cols = [];
    let depth = 0, current = '', parts = [];
    for (let ch of defs) {
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      else if (ch === ',' && depth === 0) { parts.push(current.trim()); current=''; continue; }
      current += ch;
    }
    if (current.trim()) parts.push(current.trim());

    for (const part of parts) {
      const p = part.trim().toUpperCase();
      if (p.startsWith('PRIMARY KEY') || p.startsWith('UNIQUE') || p.startsWith('FOREIGN KEY') || p.startsWith('CHECK') || p.startsWith('CONSTRAINT')) continue;
      const tokens = part.trim().split(/\s+/);
      if (!tokens[0]) continue;
      const colName = tokens[0].replace(/[`"[\]]/g,'').toLowerCase();
      const colType = (tokens[1] || 'TEXT').toUpperCase().split('(')[0];
      const rest = part.toUpperCase();
      cols.push({
        name: colName,
        type: colType,
        pk: rest.includes('PRIMARY KEY'),
        notnull: rest.includes('NOT NULL')
      });
    }
    return cols;
  }

  // ── INSERT INTO ──────────────────────────────
  _insert(sql) {
    // INSERT INTO table (cols) VALUES (vals), (vals), ...
    // INSERT INTO table VALUES (vals), ...
    const m = sql.match(/INSERT\s+(?:OR\s+\w+\s+)?INTO\s+(\w+)\s*(?:\(([^)]+)\))?\s*VALUES\s*([\s\S]+)/i);
    if (!m) throw new Error('Invalid INSERT syntax');

    const tableName = m[1].toLowerCase();
    const tbl = this._getTable(tableName);

    const colsStr = m[2];
    const colNames = colsStr
      ? colsStr.split(',').map(c => c.trim().replace(/[`"]/g,'').toLowerCase())
      : tbl.columns.map(c => c.name);

    // Parse multiple value groups
    const valueGroups = this._parseValueGroups(m[3]);
    let count = 0;

    for (const valStr of valueGroups) {
      const vals = this._parseValues(valStr);
      if (vals.length !== colNames.length)
        throw new Error(`Column count (${colNames.length}) doesn't match value count (${vals.length})`);

      const row = {};
      tbl.columns.forEach(c => { row[c.name] = null; });
      colNames.forEach((col, i) => {
        if (!tbl.columns.find(c => c.name === col)) throw new Error(`Unknown column: ${col}`);
        row[col] = vals[i];
      });

      // Auto-increment PK
      tbl.columns.forEach(c => {
        if (c.pk && c.type === 'INTEGER' && (row[c.name] === null || row[c.name] === undefined)) {
          tbl.autoInc[c.name] = (tbl.autoInc[c.name] || 0) + 1;
          row[c.name] = tbl.autoInc[c.name];
        }
      });

      tbl.rows.push(row);
      count++;
    }
    return { type:'ok', message:`${count} row(s) inserted into '${tableName}'.` };
  }

  _parseValueGroups(str) {
    const groups = [];
    let depth = 0, start = -1, inStr = false, strChar = '';
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (!inStr && (c==="'" || c==='"')) { inStr=true; strChar=c; }
      else if (inStr && c===strChar && str[i-1]!=='\\') { inStr=false; }
      if (!inStr) {
        if (c === '(') { depth++; if (depth===1) start=i+1; }
        else if (c === ')') { depth--; if (depth===0 && start!==-1) { groups.push(str.slice(start,i)); start=-1; } }
      }
    }
    return groups;
  }

  _parseValues(str) {
    const vals = [];
    let current = '', inStr = false, strChar = '';
    const push = () => {
      const v = current.trim();
      if (v.toUpperCase() === 'NULL') vals.push(null);
      else if (v.startsWith("'") || v.startsWith('"')) vals.push(v.slice(1,-1).replace(/\\'/g,"'").replace(/\\"/g,'"'));
      else if (!isNaN(v) && v !== '') vals.push(Number(v));
      else vals.push(v || null);
      current = '';
    };
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (!inStr && (c==="'" || c==='"')) { inStr=true; strChar=c; current+=c; }
      else if (inStr && c===strChar && str[i-1]!=='\\') { inStr=false; current+=c; }
      else if (!inStr && c===',') push();
      else current += c;
    }
    push();
    return vals;
  }

  // ── SELECT ──────────────────────────────────
  _select(sql) {
    // Parse: SELECT [cols] FROM [tbl] [JOIN] [WHERE] [GROUP BY] [HAVING] [ORDER BY] [LIMIT]
    const parsed = this._parseSelect(sql);
    let rows = [...(this._getTable(parsed.from)).rows];

    // JOINs
    if (parsed.joins) {
      for (const join of parsed.joins) {
        rows = this._doJoin(rows, join);
      }
    }

    // WHERE
    if (parsed.where) {
      rows = rows.filter(r => this._evalWhere(r, parsed.where));
    }

    // GROUP BY
    if (parsed.groupBy) {
      rows = this._doGroupBy(rows, parsed.groupBy, parsed.having, parsed.cols);
    } else {
      // Resolve columns
      rows = rows.map(r => this._resolveRow(r, parsed.cols, parsed.from));
    }

    // ORDER BY
    if (parsed.orderBy) {
      rows = this._doSort(rows, parsed.orderBy);
    }

    // LIMIT / OFFSET
    if (parsed.limit !== null) {
      const offset = parsed.offset || 0;
      rows = rows.slice(offset, offset + parsed.limit);
    }

    if (!rows.length) return { type:'table', columns:[], rows:[], message:'0 rows returned.' };
    const cols = Object.keys(rows[0]);
    return { type:'table', columns:cols, rows:rows.map(r=>cols.map(c=>r[c])), rowCount:rows.length };
  }

  _parseSelect(sql) {
    const s = sql.replace(/\s+/g, ' ').trim();

    // Extract SELECT columns
    const fromIdx = s.search(/\sFROM\s/i);
    if (fromIdx === -1) throw new Error("No FROM clause");
    const colsStr = s.slice(7, fromIdx).trim();

    // Extract rest after FROM
    let rest = s.slice(fromIdx + 5).trim();

    // FROM table
    const m_from = rest.match(/^(\w+)(?:\s+(?:AS\s+)?(\w+))?/i);
    const fromTable = m_from[1].toLowerCase();
    rest = rest.slice(m_from[0].length).trim();

    // JOINs
    const joins = [];
    const joinRe = /((?:INNER|LEFT|RIGHT|FULL|CROSS|OUTER)?\s*JOIN)\s+(\w+)(?:\s+(?:AS\s+)?(\w+))?\s+ON\s+([\w.]+)\s*=\s*([\w.]+)/gi;
    let jm;
    while ((jm = joinRe.exec(rest)) !== null) {
      joins.push({ type:jm[1].trim(), table:jm[2].toLowerCase(), alias:jm[3], on:[jm[4],jm[5]] });
    }
    rest = rest.replace(joinRe,'').trim();

    // WHERE
    let where = null;
    const whereM = rest.match(/WHERE\s+([\s\S]+?)(?:\s+GROUP BY|\s+HAVING|\s+ORDER BY|\s+LIMIT|$)/i);
    if (whereM) where = whereM[1].trim();

    // GROUP BY
    let groupBy = null;
    const groupM = rest.match(/GROUP BY\s+([\s\S]+?)(?:\s+HAVING|\s+ORDER BY|\s+LIMIT|$)/i);
    if (groupM) groupBy = groupM[1].trim().split(',').map(c=>c.trim());

    // HAVING
    let having = null;
    const havM = rest.match(/HAVING\s+([\s\S]+?)(?:\s+ORDER BY|\s+LIMIT|$)/i);
    if (havM) having = havM[1].trim();

    // ORDER BY
    let orderBy = null;
    const ordM = rest.match(/ORDER BY\s+([\s\S]+?)(?:\s+LIMIT|$)/i);
    if (ordM) orderBy = ordM[1].trim();

    // LIMIT / OFFSET
    let limit = null, offset = 0;
    const limM = rest.match(/LIMIT\s+(\d+)(?:\s+OFFSET\s+(\d+))?/i);
    if (limM) { limit = parseInt(limM[1]); if (limM[2]) offset = parseInt(limM[2]); }

    // Parse columns
    const cols = colsStr === '*' ? ['*'] : colsStr.split(',').map(c=>c.trim());

    return { cols, from:fromTable, joins:joins.length?joins:null, where, groupBy, having, orderBy, limit, offset };
  }

  _doJoin(leftRows, join) {
    const rightTbl = this._getTable(join.table);
    const [leftKey, rightKey] = join.on.map(k => k.toLowerCase().split('.').pop());
    const result = [];
    for (const lr of leftRows) {
      const matches = rightTbl.rows.filter(rr => lr[leftKey] == rr[rightKey]);
      if (matches.length) {
        matches.forEach(rr => result.push({...lr, ...rr}));
      } else if (join.type.toUpperCase().includes('LEFT')) {
        result.push({...lr});
      }
    }
    return result;
  }

  _evalWhere(row, where) {
    // Handle AND / OR (simple two-level)
    if (/\bOR\b/i.test(where)) {
      return where.split(/\bOR\b/i).some(part => this._evalWhere(row, part.trim()));
    }
    if (/\bAND\b/i.test(where)) {
      return where.split(/\bAND\b/i).every(part => this._evalWhere(row, part.trim()));
    }
    return this._evalCondition(row, where.trim());
  }

  _evalCondition(row, cond) {
    // IS NULL / IS NOT NULL
    let m = cond.match(/^(\w+)\s+IS\s+(NOT\s+)?NULL$/i);
    if (m) {
      const v = row[m[1].toLowerCase()];
      return m[2] ? v !== null && v !== undefined : (v === null || v === undefined);
    }
    // BETWEEN
    m = cond.match(/^(\w+)\s+(?:NOT\s+)?BETWEEN\s+(.+?)\s+AND\s+(.+)$/i);
    if (m) {
      const v = row[m[1].toLowerCase()];
      const lo = this._literal(m[2]), hi = this._literal(m[3]);
      const r = v >= lo && v <= hi;
      return m[0].toUpperCase().includes('NOT BETWEEN') ? !r : r;
    }
    // IN
    m = cond.match(/^(\w+)\s+(NOT\s+)?IN\s*\((.+)\)$/i);
    if (m) {
      const v = row[m[1].toLowerCase()];
      const vals = m[3].split(',').map(x => this._literal(x.trim()));
      const r = vals.includes(v);
      return m[2] ? !r : r;
    }
    // LIKE
    m = cond.match(/^(\w+)\s+(NOT\s+)?LIKE\s+'([^']*)'/i);
    if (m) {
      const v = String(row[m[1].toLowerCase()] ?? '');
      const pat = m[3].replace(/%/g,'.*').replace(/_/g,'.');
      const r = new RegExp('^'+pat+'$','i').test(v);
      return m[2] ? !r : r;
    }
    // Comparison operators
    m = cond.match(/^(\w+)\s*(>=|<=|<>|!=|>|<|=)\s*(.+)$/);
    if (m) {
      const col = m[1].toLowerCase();
      const op = m[2];
      const val = this._literal(m[3].trim());
      const rowVal = row[col];
      switch(op) {
        case '=':  return rowVal == val;
        case '<>':
        case '!=': return rowVal != val;
        case '>':  return rowVal > val;
        case '<':  return rowVal < val;
        case '>=': return rowVal >= val;
        case '<=': return rowVal <= val;
      }
    }
    return true;
  }

  _literal(str) {
    const s = str.trim();
    if (s.startsWith("'")) return s.slice(1,-1);
    if (s.toUpperCase() === 'NULL') return null;
    if (!isNaN(s) && s !== '') return Number(s);
    return s;
  }

  _resolveRow(row, cols, fromTable) {
    if (cols[0] === '*') return {...row};
    const out = {};
    for (const col of cols) {
      const clean = col.replace(/`/g,'');
      // Handle aliases: expr AS alias
      const aliasM = clean.match(/^(.+?)\s+AS\s+(\w+)$/i);
      if (aliasM) {
        out[aliasM[2]] = this._evalExpr(row, aliasM[1].trim());
      } else {
        const key = clean.split('.').pop().toLowerCase();
        out[key] = this._evalExpr(row, clean);
      }
    }
    return out;
  }

  _evalExpr(row, expr) {
    expr = expr.trim();
    // Aggregate functions (single-row context — full agg handled in GROUP BY)
    const funcM = expr.match(/^(\w+)\s*\((.+)\)$/i);
    if (funcM) {
      const fn = funcM[1].toUpperCase(), arg = funcM[2].trim();
      const v = arg === '*' ? 1 : row[arg.toLowerCase().split('.').pop()];
      switch(fn) {
        case 'UPPER': return String(v||'').toUpperCase();
        case 'LOWER': return String(v||'').toLowerCase();
        case 'LENGTH': case 'LEN': return String(v||'').length;
        case 'ROUND': return typeof v==='number' ? Math.round(v) : v;
        case 'ABS': return Math.abs(v);
        case 'TRIM': return String(v||'').trim();
        case 'SUBSTR': case 'SUBSTRING': return String(v||'');
        default: return row[expr.toLowerCase().split('.').pop()] ?? null;
      }
    }
    // COALESCE
    if (/^COALESCE\s*\(/i.test(expr)) {
      const args = expr.slice(expr.indexOf('(')+1,-1).split(',');
      for (const a of args) {
        const v = this._literal(a.trim());
        if (v !== null) return v;
      }
      return null;
    }
    // Arithmetic
    if (/[+\-*/]/.test(expr)) {
      try {
        const e = expr.replace(/\b(\w+)\b/g, m => {
          const v = row[m.toLowerCase()];
          return v !== undefined ? v : m;
        });
        return Function('"use strict"; return (' + e + ')')();
      } catch { /**/ }
    }
    // Column reference
    const col = expr.split('.').pop().toLowerCase();
    return row[col] !== undefined ? row[col] : null;
  }

  _doGroupBy(rows, groupByCols, having, selectCols) {
    // Group rows
    const groups = new Map();
    for (const row of rows) {
      const key = groupByCols.map(c => row[c.toLowerCase()]).join('|||');
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(row);
    }

    const result = [];
    for (const [, groupRows] of groups) {
      const aggRow = {...groupRows[0]};

      // Compute aggregates for each select column
      for (const col of selectCols) {
        const aliasM = col.match(/^(.+?)\s+AS\s+(\w+)$/i);
        const expr = aliasM ? aliasM[1].trim() : col.trim();
        const alias = aliasM ? aliasM[2] : null;
        const funcM = expr.match(/^(\w+)\s*\((.+)\)$/i);
        if (funcM) {
          const fn = funcM[1].toUpperCase(), arg = funcM[2].trim();
          let aggVal;
          switch(fn) {
            case 'COUNT': aggVal = arg === '*' ? groupRows.length : groupRows.filter(r=>r[arg.toLowerCase()]!=null).length; break;
            case 'SUM': aggVal = groupRows.reduce((s,r)=>s+(Number(r[arg.toLowerCase()])||0),0); break;
            case 'AVG': aggVal = groupRows.reduce((s,r)=>s+(Number(r[arg.toLowerCase()])||0),0)/groupRows.length; break;
            case 'MAX': aggVal = Math.max(...groupRows.map(r=>Number(r[arg.toLowerCase()])||0)); break;
            case 'MIN': aggVal = Math.min(...groupRows.map(r=>Number(r[arg.toLowerCase()])||0)); break;
            case 'ROUND': {
              const innerM = arg.match(/^(\w+)\s*,\s*(\d+)$/);
              if (innerM) aggVal = Number(groupRows[0][innerM[1].toLowerCase()]).toFixed(parseInt(innerM[2]));
              else aggVal = Math.round(groupRows[0][arg.toLowerCase()]);
              break;
            }
            default: aggVal = groupRows[0][arg.toLowerCase()];
          }
          aggRow[alias || expr.replace(/[^a-zA-Z0-9_]/g,'_')] = aggVal;
        }
      }

      // HAVING filter
      if (having && !this._evalWhere(aggRow, having)) continue;

      // Resolve final columns
      const out = {};
      for (const col of selectCols) {
        if (col.trim() === '*') { Object.assign(out, aggRow); continue; }
        const aliasM = col.match(/^(.+?)\s+AS\s+(\w+)$/i);
        const expr = aliasM ? aliasM[1].trim() : col.trim();
        const alias = aliasM ? aliasM[2] : expr.replace(/[^a-zA-Z0-9_]/g,'_');
        const funcM = expr.match(/^(\w+)\s*\((.+)\)$/i);
        const outKey = alias || (funcM ? alias||expr.replace(/[()*.]/g,'_') : expr.split('.').pop().toLowerCase());
        if (funcM) {
          const exprKey = expr.replace(/[^a-zA-Z0-9_]/g,'_');
          out[outKey] = aggRow[outKey] !== undefined ? aggRow[outKey] : aggRow[exprKey];
        } else {
          out[outKey] = aggRow[expr.split('.').pop().toLowerCase()];
        }
      }
      result.push(out);
    }
    return result;
  }

  _doSort(rows, orderByStr) {
    const parts = orderByStr.split(',').map(p => {
      const m = p.trim().match(/^(.+?)\s*(ASC|DESC)?$/i);
      return { col: m[1].trim().toLowerCase().split('.').pop(), dir: (m[2]||'ASC').toUpperCase() };
    });
    return rows.slice().sort((a, b) => {
      for (const { col, dir } of parts) {
        const av = a[col], bv = b[col];
        let cmp = 0;
        if (av == null && bv != null) cmp = -1;
        else if (av != null && bv == null) cmp = 1;
        else if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
        else cmp = String(av||'').localeCompare(String(bv||''));
        if (cmp !== 0) return dir === 'DESC' ? -cmp : cmp;
      }
      return 0;
    });
  }

  // ── UPDATE ──────────────────────────────────
  _update(sql) {
    const m = sql.match(/UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (!m) throw new Error('Invalid UPDATE syntax');
    const tbl = this._getTable(m[1].toLowerCase());
    const sets = m[2].split(',').map(s => {
      const [k, v] = s.split('=').map(x=>x.trim());
      return { key: k.toLowerCase(), val: this._literal(v) };
    });
    const where = m[3];
    let count = 0;
    tbl.rows.forEach(row => {
      if (!where || this._evalWhere(row, where)) {
        sets.forEach(({key, val}) => { row[key] = val; });
        count++;
      }
    });
    return { type:'ok', message:`${count} row(s) updated.` };
  }

  // ── DELETE ──────────────────────────────────
  _delete(sql) {
    const m = sql.match(/DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (!m) throw new Error('Invalid DELETE syntax');
    const tbl = this._getTable(m[1].toLowerCase());
    const where = m[2];
    const before = tbl.rows.length;
    tbl.rows = where ? tbl.rows.filter(r => !this._evalWhere(r, where)) : [];
    return { type:'ok', message:`${before - tbl.rows.length} row(s) deleted.` };
  }

  // ── DROP TABLE ───────────────────────────────
  _dropTable(sql) {
    const m = sql.match(/DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)/i);
    if (!m) throw new Error('Invalid DROP TABLE syntax');
    const name = m[1].toLowerCase();
    if (this.tables[name]) {
      delete this.tables[name];
      return { type:'ok', message:`Table '${name}' dropped.` };
    }
    if (sql.toUpperCase().includes('IF EXISTS'))
      return { type:'ok', message:`Table '${name}' not found, skipped.` };
    throw new Error(`Table '${name}' not found`);
  }

  // ── SHOW TABLES ──────────────────────────────
  _showTables() {
    const names = Object.keys(this.tables);
    if (!names.length) return { type:'ok', message:'No tables. Use CREATE TABLE to start.' };
    return {
      type:'table',
      columns:['table_name', 'rows'],
      rows: names.map(n => [n, this.tables[n].rows.length]),
      rowCount: names.length
    };
  }

  // ── DESCRIBE ────────────────────────────────
  _describe(sql) {
    const m = sql.match(/(?:DESCRIBE|DESC)\s+(\w+)/i);
    if (!m) throw new Error('Usage: DESCRIBE table_name');
    const tbl = this._getTable(m[1].toLowerCase());
    return {
      type:'table',
      columns:['column', 'type', 'pk', 'notnull'],
      rows: tbl.columns.map(c => [c.name, c.type, c.pk?'✓':'', c.notnull?'✓':'']),
      rowCount: tbl.columns.length
    };
  }

  // ── ALTER TABLE ──────────────────────────────
  _alterTable(sql) {
    const m = sql.match(/ALTER\s+TABLE\s+(\w+)\s+ADD\s+(?:COLUMN\s+)?(.+)/i);
    if (!m) throw new Error('Only ADD COLUMN supported');
    const tbl = this._getTable(m[1].toLowerCase());
    const tokens = m[2].trim().split(/\s+/);
    const colName = tokens[0].toLowerCase();
    const colType = (tokens[1] || 'TEXT').toUpperCase();
    tbl.columns.push({ name: colName, type: colType, pk: false, notnull: false });
    tbl.rows.forEach(r => { r[colName] = null; });
    return { type:'ok', message:`Column '${colName}' added to '${m[1].toLowerCase()}'.` };
  }

  _getTable(name) {
    if (!this.tables[name]) throw new Error(`Table '${name}' not found`);
    return this.tables[name];
  }
}

// Global instance
const sqlEngine = new SQLEngine();
