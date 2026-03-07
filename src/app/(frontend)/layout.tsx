import React from 'react'
import '../global.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { Navbar } from '@/app/(frontend)/components/Navbar'
import { InquiryForm } from '@/app/(frontend)/components/InquiryForm'

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
        <div className="bg-primary flex flex-col min-h-[50vh] lg:h-screen py-10 lg:py-20">
          <div className="flex flex-col justify-end w-full max-w-7xl mx-auto gap-10 flex-grow px-4 md:px-0">
            <img
              src="/logoLarge.svg"
              alt="Tipsy Trails logo"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </body>
    </html>
  )
}
