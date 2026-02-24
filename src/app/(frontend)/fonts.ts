import { Parisienne, Playfair_Display } from 'next/font/google'

const playfairFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair',
})

const parrisienneFont = Parisienne({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-parrisienne',
})

export const playfair = { className: playfairFont.className }
export const parrisienne = { className: parrisienneFont.className }
