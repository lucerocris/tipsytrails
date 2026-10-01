// Rebuilds content recovered from cached production pages (recovery/inventory.json).
// Run: pnpm payload run recovery/seed.ts
// Refuses to run when the target database already holds pages or media.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const inv = JSON.parse(fs.readFileSync(path.join(dirname, 'inventory.json'), 'utf8'))

const payload = await getPayload({ config })

for (const collection of ['pages', 'media', 'testimonials', 'categories', 'cocktails', 'footers'] as const) {
  const { totalDocs } = await payload.count({ collection })
  if (totalDocs > 0) {
    console.error(`Abort: ${collection} already has ${totalDocs} document(s).`)
    process.exit(1)
  }
}

const byId = (a: any, b: any) => a.id - b.id
const mediaMap = new Map<number, number>()
const testimonialMap = new Map<number, number>()
const categoryMap = new Map<number, number>()

// Media files still exist in the DigitalOcean Space, so write rows at database level: no re-upload.
for (const m of [...inv.media].sort(byId)) {
  const { id, url, thumbnailURL, createdAt, updatedAt, ...data } = m
  const doc = await payload.db.create({ collection: 'media', data })
  mediaMap.set(id, doc.id as number)
}

const mediaId = (v: any) => (v == null ? v : mediaMap.get(typeof v === 'object' ? v.id : v))

// Replace populated relationships with new ids, drop row ids so Payload generates fresh ones.
const flatten = (v: any): any => {
  if (Array.isArray(v)) return v.map(flatten)
  if (!v || typeof v !== 'object') return v
  if ('filename' in v && 'mimeType' in v) return mediaMap.get(v.id)
  const out: any = {}
  for (const [k, x] of Object.entries(v)) {
    if (k === 'id' || k === 'createdAt' || k === 'updatedAt') continue
    out[k] = flatten(x)
  }
  return out
}

for (const t of [...inv.testimonials].sort(byId)) {
  const doc = await payload.create({
    collection: 'testimonials',
    data: { quote: t.quote, clientName: t.clientName, clientRole: t.clientRole, avatar: mediaId(t.avatar) },
  })
  testimonialMap.set(t.id, doc.id)
}

for (const c of [...inv.categories].sort(byId)) {
  const doc = await payload.create({
    collection: 'categories',
    data: { name: c.name, featuredOnLanding: c.featuredOnLanding, order: c.order },
  })
  categoryMap.set(c.id, doc.id)
}

for (const c of [...inv.cocktails].sort(byId)) {
  await payload.create({
    collection: 'cocktails',
    data: {
      name: c.name,
      image: mediaId(c.image)!,
      category: categoryMap.get(typeof c.category === 'object' ? c.category.id : c.category)!,
    },
  })
}

const block = (b: any) => {
  if (b.blockType === 'menu')
    return { blockType: 'menu', cardsPerView: b.cardsPerView, categories: b.categories.map((c: any) => categoryMap.get(c.id ?? c)) }
  if (b.blockType === 'testimonial')
    return { ...flatten({ ...b, testimonials: [] }), testimonials: b.testimonials.map((t: any) => testimonialMap.get(t.id ?? t)) }
  return flatten(b)
}

for (const p of [...inv.pages].sort(byId)) {
  await payload.create({ collection: 'pages', data: { title: p.title, slug: p.slug, layout: p.layout.map(block) } })
}

// Menu page: only its hero block was visible in the cached page.
if (inv.menuHero) {
  await payload.create({ collection: 'pages', data: { title: 'Menu', slug: 'menu', layout: [block(inv.menuHero)] } })
}

// Footer values read from rendered HTML of the cached home page.
await payload.create({
  collection: 'footers',
  data: {
    tagline: 'WE DA BEST MUSIC',
    exploreLinks: [
      { label: 'HOME', href: '/' },
      { label: 'ABOUT US', href: '/about' },
      { label: 'MENU', href: '/menu' },
      { label: 'COCKTAIL TASTING', href: '/cocktail-tasting' },
    ],
    socialLinks: [
      { label: 'INSTAGRAM', href: '/' },
      { label: 'FACEBOOK', href: '/' },
      { label: 'X', href: '/' },
      { label: 'Viber', href: '/' },
    ],
    copyrightName: 'Tipsy Trails',
    locationText: 'Based in EARTH',
  },
})

for (const collection of ['media', 'testimonials', 'categories', 'cocktails', 'pages', 'footers'] as const) {
  console.log(collection, (await payload.count({ collection })).totalDocs)
}
process.exit(0)
