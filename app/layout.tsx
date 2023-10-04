import './globals.css'
import type { Metadata } from 'next'

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
      <body>{children}</body>
    </html>
  )
}
