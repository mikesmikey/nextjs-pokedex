import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
const roboto = Roboto({ subsets: ['latin'], weight: ['400'] })

export const metadata: Metadata = {
  title: 'Pokédex',
  description: 'The best Pokémaster companion!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-gradient-to-b from-[#52b788] to-[#95d5b2] bg-no-repeat min-h-screen ${roboto.className}`}>{children}</body>
    </html>
  )
}
