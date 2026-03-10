'use client'

import React from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { BlockRenderer } from '@/app/(frontend)/components/BlockRenderer'

const SERVER_URL = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL ?? 'http://localhost:3000'

type PageClientProps = {
  page: any
}

export const PageClient: React.FC<PageClientProps> = ({ page: initialPage }) => {
  const { data, isLoading } = useLivePreview({
    initialData: initialPage,
    serverURL: SERVER_URL,
    depth: 2,
  })

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Loading preview…</p>
      </main>
    )
  }

  return (
    <main>
      <BlockRenderer blocks={data?.layout} />
    </main>
  )
}
