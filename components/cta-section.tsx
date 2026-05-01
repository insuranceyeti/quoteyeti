"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section id="cta" className="py-14 md:py-20 bg-primary">
      <div className="container mx-auto px-5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-5 md:mb-6 leading-tight">
            You Are Only Clicks Away From Affordable Healthcare!
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Affordable options are at your fingertips. Start comparing plans today and find coverage that works for you.
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6 gap-2 w-full sm:w-auto font-semibold"
              onClick={() => document.getElementById("get-quote")?.scrollIntoView({ behavior: "smooth" })}
            >
              Find Plans Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
