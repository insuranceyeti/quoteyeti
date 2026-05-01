"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Insurance Yeti"
              width={140}
              height={40}
              className="h-9 md:h-11"
              style={{ width: 'auto' }}
              loading="eager"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-300 hover:text-primary transition-colors">
              Why Us
            </Link>
            <Link href="#how-it-works" className="text-slate-300 hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#enrollment" className="text-slate-300 hover:text-primary transition-colors">
              Open Enrollment
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button onClick={() => document.getElementById("get-quote")?.scrollIntoView({ behavior: "smooth" })}>
              Get a Quote
            </Button>
          </div>

          <button
            className="md:hidden text-slate-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <nav className="flex flex-col gap-4">
              <Link href="#features" className="text-slate-300 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Why Us
              </Link>
              <Link href="#how-it-works" className="text-slate-300 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                How It Works
              </Link>
              <Link href="#enrollment" className="text-slate-300 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Open Enrollment
              </Link>
              <Button 
                className="w-full" 
                onClick={() => {
                  setIsMenuOpen(false)
                  document.getElementById("get-quote")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Get a Quote
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
