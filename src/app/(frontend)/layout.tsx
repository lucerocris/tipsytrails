import React from 'react'
import '../global.css'
import type { Metadata } from 'next'
import { fontVariables } from '@/app/(frontend)/fonts'
import { Navbar } from '@/app/(frontend)/components/Navbar'
import { InquiryForm } from '@/app/(frontend)/components/InquiryForm'
import { FooterBlockUI } from '@/blocks/Footer/UI'

export const metadata: Metadata = {
  description:
    'Tipsy Trails brings the bar to your venue: cocktails and full bar service for weddings, birthdays and corporate events in Cebu.',
  title: 'Tipsy Trails | Mobile Cocktail Bar for Weddings & Events in Cebu',
}

async function getFooterData() {
  try {
    const payloadModule = await import('payload')
    const payloadAny: any = payloadModule
    const getPayload = payloadAny.getPayload ?? payloadAny.default?.getPayload
    const configModule = await import('@/payload.config')
    const config = configModule?.default ?? configModule
    const payload = await getPayload({ config })
 
    const { docs } = await payload.find({
      collection: 'footers',
      limit: 1,
      depth: 0,
    })
 
    return docs[0] ?? null
  } catch {
    return null
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const footer = await getFooterData();

  return (
    <html lang="en" className={fontVariables}>
      <body>
        <Navbar />
        <main>{children}</main>

        <InquiryForm />

        <FooterBlockUI 
          tagline={footer?.tagline}
          exploreLinks={footer?.exploreLinks}
          socialLinks={footer?.socialLinks}
          copyrightName={footer?.copyrightName}
          locationText={footer?.locationText}
        />
      </body>
    </html>
  )
}
