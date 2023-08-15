import { Inter } from 'next/font/google'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.ico" />
        <title>Shopify - Next.js Store</title>
      </head>

      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
