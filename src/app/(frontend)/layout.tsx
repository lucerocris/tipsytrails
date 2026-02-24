import React from 'react'
import '../global.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { Navbar } from '@/app/components/Navbar'
import { InquiryForm } from '@/app/components/InquiryForm'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>

        <InquiryForm />

        {/* footer */}
        <div className="bg-primary h-screen py-20 pb-10">
          <div className="flex flex-col justify-end max-w-7xl mx-auto gap-10 h-full">
            <img src="/logoLarge.svg" alt="Tipsy Trails logo" />
          </div>
        </div>
      </body>
    </html>
  )
}
