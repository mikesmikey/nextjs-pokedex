import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
const roboto = Roboto({ subsets: ['latin'], weight: ['100','300','400','500','700','900'] })

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
      <body className={`bg-gradient-to-b from-[#52b69a] to-[#b5e48c] bg-no-repeat min-h-screen ${roboto.className}`}>{children}</body>
    </html>
  )
}
