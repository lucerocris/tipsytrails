import { decode, resolve, findProps } from './flight.mjs'
import fs from 'fs'
const dir = new URL('./snapshots/', import.meta.url).pathname
const media = new Map(), testimonials = new Map(), categories = new Map(), cocktails = new Map(), pages = new Map()
const better = (map, d) => { const o = map.get(d.id); if (!o || JSON.stringify(d).length > JSON.stringify(o).length) map.set(d.id, d) }
const walk = (v) => {
  if (Array.isArray(v)) return v.forEach(walk)
  if (!v || typeof v !== 'object') return
  if ('filename' in v && 'mimeType' in v) better(media, v)
  else if ('quote' in v && 'clientName' in v) better(testimonials, v)
  else if ('featuredOnLanding' in v) better(categories, v)
  else if ('name' in v && 'category' in v && 'image' in v) better(cocktails, v)
  else if ('slug' in v && 'layout' in v) better(pages, v)
  Object.values(v).forEach(walk)
}
const extra = {}
for (const name of ['home', 'about', 'menu', 'cocktail-tasting']) {
  const rows = decode(dir + name + '.html')
  for (const r of Object.values(rows)) if (r.json !== undefined) walk(resolve(r.json, rows))
  if (name === 'menu') extra.menuHero = findProps(rows, ['heroBlock']).map((h) => resolve(h, rows).heroBlock)[0]
  const html = fs.readFileSync(dir + name + '.html', 'utf8')
  const f = /<footer[\s\S]*?<\/footer>/.exec(html)
  if (name === 'home' && f) extra.footerText = f[0].replace(/<a [^>]*href="([^"]*)"[^>]*>/g, ' [$1] ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}
const inv = { media: [...media.values()], testimonials: [...testimonials.values()], categories: [...categories.values()], cocktails: [...cocktails.values()], pages: [...pages.values()], ...extra }
fs.writeFileSync(new URL('./inventory.json', import.meta.url).pathname, JSON.stringify(inv, null, 1))
console.log('media', inv.media.map((m) => `${m.id}:${m.filename}`).join(' | '))
console.log('testimonials', inv.testimonials.map((t) => `${t.id}:${t.clientName} avatar=${t.avatar?.id ?? t.avatar}`).join(' | '))
console.log('categories', inv.categories.map((c) => `${c.id}:${c.name} order=${c.order} featured=${c.featuredOnLanding}`).join(' | '))
console.log('cocktails', inv.cocktails.map((c) => `${c.id}:${c.name} img=${c.image?.id ?? c.image} cat=${c.category?.id ?? c.category}`).join(' | '))
console.log('pages', inv.pages.map((p) => `${p.id}:${p.slug} blocks=${p.layout.map((b) => b.blockType).join(',')}`).join(' | '))
console.log('menuHero', JSON.stringify(extra.menuHero)?.slice(0, 200))
console.log('footer', extra.footerText)
