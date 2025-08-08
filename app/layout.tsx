import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster' // Import Toaster

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VectorShift Pipeline Editor',
  description: 'Build and visualize your data processing pipeline',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${inter.style.fontFamily};
  --font-sans: ${inter.variable};
}
        `}</style>
      </head>
      <body className={inter.className}>
        {children}
        <Toaster /> {/* Add Toaster component here */}
      </body>
    </html>
  )
}
