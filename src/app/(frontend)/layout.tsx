import React from 'react'
import '../global.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { Navbar } from '@/app/(frontend)/components/Navbar'
import { InquiryForm } from '@/app/(frontend)/components/InquiryForm'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Tipsy Trails',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>

        <InquiryForm />

        <Footer />
      </body>
    </html>
  )
}
