import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'

// Display: serif sets the tone. UI: neutral sans. Mono: metadata labels only.
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains-mono',
})

export const fontVariables = `${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`
