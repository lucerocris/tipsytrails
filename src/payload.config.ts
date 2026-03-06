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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Inquiries, Cocktails, Testimonials, Categories],
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
      collections: {
        media: {
          prefix: 'tipsytrails',
        }, 
      },
      bucket: process.env.DO_SPACE_NAME!,
      config: {
        endpoint: process.env.DO_SPACE_ENDPOINT,
        credentials: {
          accessKeyId: process.env.DO_ACCESS_KEY_ID!,
          secretAccessKey: process.env.DO_SECRET_ACCESS_KEY!,
        },
        region: process.env.DO_SPACE_REGION,
      },
    }),
  ],
})
