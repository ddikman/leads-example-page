import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lead Generation Example page',
  description: 'An example page for practicing lead scraping',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex flex-col">
            {children}
          </div>
        </main>
        <footer className='flex justify-center mb-2 font-mono text-sm gap-2'>
          <a href="https://github.com/ddikman/leads-example-page" target='_blank'>GitHub</a>|<span>By <a href="https://www.greycastle.se" target="_blank">David Dikman</a></span>
        </footer>
      </body>
    </html>
  )
}
