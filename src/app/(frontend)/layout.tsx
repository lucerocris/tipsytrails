import React from 'react'
import '../global.css'
import { Inter, Parisienne, Playfair_Display } from 'next/font/google'
import { Navbar } from '@/app/components/Navbar'

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair',
})


export const parrisienne = Parisienne({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-parrisienne',
})
const inter = Inter({subsets: ['latin']});

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <main>{children}</main>
      </body>
    </html>
  )
}
