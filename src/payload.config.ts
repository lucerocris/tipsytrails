import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { s3Storage } from '@payloadcms/storage-s3'
import { Media } from './collections/Media'
import { Inquiries } from '@/collections/Inquiries'
import { Cocktails } from '@/collections/Cocktails'
import { Testimonials } from '@/collections/Testimonials'
import { Categories } from '@/collections/Categories'
import { Clients } from '@/collections/Clients'
import { Events } from '@/collections/Events'
import { Packages } from '@/collections/Packages'
import { Pages } from '@/collections/Pages'
import { Footer } from '@/collections/Footers'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },

    livePreview: {
      url: ({ data }) => {
        const baseURL = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL ?? 'http://localhost:3000'
        const slug = data?.slug as string | undefined
        return slug && slug !== 'home' ? `${baseURL}/${slug}` : baseURL
      },
      collections: ['pages'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },

    components: {
      views: {
        tipsyCommandCenter: {
          Component: '/components/CommandCenter#CommandCenter',
          path: '/command-center',
          exact: true,
        },
      },
      beforeNavLinks: ['/components/CommandCenterLink#CommandCenterLink'],
    },
  },
  collections: [
    Users,
    Media,
    Inquiries,
    Cocktails,
    Testimonials,
    Categories,
    Clients,
    Events,
    Packages,
    Pages,
    Footer,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      acl: 'public-read',
      collections: {
        media: {
          prefix: 'tipsytrails',
          generateFileURL: ({ filename, prefix }: { filename: string; prefix?: string }) =>
            `https://${process.env.DO_SPACE_NAME}.sgp1.cdn.digitaloceanspaces.com/${prefix}/${filename}`,
        },
      },
      bucket: process.env.DO_SPACE_NAME!,
      config: {
        endpoint: 'https://sgp1.digitaloceanspaces.com',
        credentials: {
          accessKeyId: process.env.DO_ACCESS_KEY_ID!,
          secretAccessKey: process.env.DO_SECRET_ACCESS_KEY!,
        },
        region: 'sgp1',
        forcePathStyle: false,
      },
    }),
  ],
})
