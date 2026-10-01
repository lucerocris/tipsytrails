import fs from 'fs'
// Decode Next.js RSC flight payload embedded in HTML into a map of row id -> value
export function decode(file) {
  const html = fs.readFileSync(file, 'utf8')
  let data = ''
  const re = /self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g
  let m
  while ((m = re.exec(html))) data += JSON.parse(m[1])
  const buf = Buffer.from(data, 'utf8')
  const rows = {}
  let i = 0
  while (i < buf.length) {
    const colon = buf.indexOf(':', i)
    if (colon < 0) break
    const id = buf.slice(i, colon).toString()
    const tag = String.fromCharCode(buf[colon + 1])
    if (tag === 'T') {
      const comma = buf.indexOf(',', colon)
      const len = parseInt(buf.slice(colon + 2, comma).toString(), 16)
      rows[id] = { text: buf.slice(comma + 1, comma + 1 + len).toString() }
      i = comma + 1 + len
    } else {
      let nl = buf.indexOf('\n', colon)
      if (nl < 0) nl = buf.length
      const raw = buf.slice(colon + 1, nl).toString()
      try { rows[id] = { json: JSON.parse(raw) } } catch { rows[id] = { raw } }
      i = nl + 1
    }
  }
  return rows
}
// Resolve "$id" references recursively
export function resolve(v, rows, seen = new Set()) {
  if (typeof v === 'string') {
    const m = /^\$([0-9a-f]+)$/.exec(v)
    if (m && rows[m[1]] && !seen.has(m[1])) {
      const r = rows[m[1]]
      if (r.text !== undefined) return r.text
      if (r.json !== undefined) return resolve(r.json, rows, new Set([...seen, m[1]]))
    }
    const p = /^\$([0-9a-f]+)((?::[^:]+)+)$/.exec(v)
    if (p && rows[p[1]]?.json !== undefined) {
      let cur = rows[p[1]].json
      for (const k of p[2].slice(1).split(":")) {
        if (typeof cur === "string") cur = resolve(cur, rows, seen)
        cur = Array.isArray(cur) && cur[0] === "$" && k === "props" ? cur[3] : cur?.[k]
      }
      if (cur !== undefined) return resolve(cur, rows, seen)
    }
    if (v.startsWith("$D")) return v.slice(2)
    if (v === '$undefined') return undefined
    return v
  }
  if (Array.isArray(v)) return v.map((x) => resolve(x, rows, seen))
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, resolve(x, rows, seen)]))
  return v
}
// Find every object carrying given keys
export function findProps(rows, keys) {
  const out = []
  const walk = (v) => {
    if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') {
      if (keys.every((k) => k in v)) out.push(v)
      Object.values(v).forEach(walk)
    }
  }
  Object.values(rows).forEach((r) => r.json !== undefined && walk(r.json))
  return out
}
