"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"

export default function ThankYouPage() {
  useEffect(() => {
    document.title = "Thank You | Insurance Yeti"
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Wistia Scripts */}
      <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
      
      {/* Header */}
      <header className="bg-slate-900 py-4 md:py-5 border-b border-slate-800">
        <div className="container mx-auto px-5 flex justify-center">
          <Link href="/v2">
            <Image
              src="/logo.png"
              alt="Insurance Yeti"
              width={160}
              height={44}
              className="h-10 md:h-11"
              style={{ width: 'auto' }}
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-slate-900 py-10 md:py-14">
          <div className="container mx-auto px-5">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Based On Your Answers, You Qualify For Better Health Coverage For Up To 30% Less!
              </h1>
              
              <p className="text-slate-300 text-lg mb-8">
                Watch the video below for the next steps
              </p>

              {/* Main Video */}
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-800">
                <div 
                  dangerouslySetInnerHTML={{
                    __html: `
                      <script src="https://fast.wistia.com/embed/t36movf8bl.js" async type="module"></script>
                      <style>wistia-player[media-id='t36movf8bl']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/t36movf8bl/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }</style>
                      <wistia-player media-id="t36movf8bl" aspect="1.7777777777777777"></wistia-player>
                    `
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Video Section */}
        <section className="py-12 md:py-16 bg-card">
          <div className="container mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-card-foreground mb-10">
              Frequently Asked Questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* What is Insurance Yeti */}
              <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                <h3 className="font-semibold text-card-foreground mb-3 text-lg">{`"What is Insurance Yeti?"`}</h3>
                <div 
                  className="rounded-lg overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: `
                      <script src="https://fast.wistia.com/embed/zxw4b951ap.js" async type="module"></script>
                      <style>wistia-player[media-id='zxw4b951ap']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/zxw4b951ap/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }</style>
                      <wistia-player media-id="zxw4b951ap" aspect="1.7777777777777777"></wistia-player>
                    `
                  }}
                />
              </div>

              {/* Deductible */}
              <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                <h3 className="font-semibold text-card-foreground mb-3 text-lg">{`"What's the deductible & out-of-pocket look like?"`}</h3>
                <div 
                  className="rounded-lg overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: `
                      <script src="https://fast.wistia.com/embed/elrikuobjo.js" async type="module"></script>
                      <style>wistia-player[media-id='elrikuobjo']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/elrikuobjo/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }</style>
                      <wistia-player media-id="elrikuobjo" aspect="1.7777777777777777"></wistia-player>
                    `
                  }}
                />
              </div>

              {/* Up to 30% savings */}
              <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                <h3 className="font-semibold text-card-foreground mb-3 text-lg">{`"How can it be up to 30% cheaper?"`}</h3>
                <div 
                  className="rounded-lg overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: `
                      <script src="https://fast.wistia.com/embed/lwirtxszf0.js" async type="module"></script>
                      <style>wistia-player[media-id='lwirtxszf0']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/lwirtxszf0/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }</style>
                      <wistia-player media-id="lwirtxszf0" aspect="1.7777777777777777"></wistia-player>
                    `
                  }}
                />
              </div>

              {/* Doctors */}
              <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                <h3 className="font-semibold text-card-foreground mb-3 text-lg">{`"Can I keep my doctor and specialists?"`}</h3>
                <div 
                  className="rounded-lg overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: `
                      <script src="https://fast.wistia.com/embed/chg66wxs5t.js" async type="module"></script>
                      <style>wistia-player[media-id='chg66wxs5t']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/chg66wxs5t/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }</style>
                      <wistia-player media-id="chg66wxs5t" aspect="1.7777777777777777"></wistia-player>
                    `
                  }}
                />
              </div>

              {/* I'm busy */}
              <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                <h3 className="font-semibold text-card-foreground mb-3 text-lg">{`"How long does the first call take?"`}</h3>
                <div 
                  className="rounded-lg overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: `
                      <script src="https://fast.wistia.com/embed/qoz47ej3z7.js" async type="module"></script>
                      <style>wistia-player[media-id='qoz47ej3z7']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/qoz47ej3z7/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }</style>
                      <wistia-player media-id="qoz47ej3z7" aspect="1.7777777777777777"></wistia-player>
                    `
                  }}
                />
              </div>

              {/* Telehealth */}
              <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                <h3 className="font-semibold text-card-foreground mb-3 text-lg">{`"Do you cover prescriptions & telehealth?"`}</h3>
                <div 
                  className="rounded-lg overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: `
                      <script src="https://fast.wistia.com/embed/rbh7tjll9t.js" async type="module"></script>
                      <style>wistia-player[media-id='rbh7tjll9t']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/rbh7tjll9t/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }</style>
                      <wistia-player media-id="rbh7tjll9t" aspect="1.7777777777777777"></wistia-player>
                    `
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-8">
        <div className="container mx-auto px-5">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/logo.png"
              alt="Insurance Yeti"
              width={120}
              height={32}
              className="h-8"
              style={{ width: 'auto' }}
            />
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-primary transition-colors">
                Terms and Conditions
              </Link>
            </div>
            <p className="text-xs text-slate-500">
              Insurance Yeti LLC &copy; {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
