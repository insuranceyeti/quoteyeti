"use client"

import { ClipboardList, Search, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Complete The Form",
    description: "Fill out our simple form to let us know about your coverage needs and budget preferences.",
  },
  {
    icon: Search,
    step: "02",
    title: "Get Affordable Plans",
    description: "Licensed agents search through available plans in your area and deliver options within minutes.",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Choose Your Plan",
    description: "Review your affordable options and select the coverage that best fits your needs and lifestyle.",
  },
]

export function StepsSection() {
  return (
    <section id="how-it-works" className="py-14 md:py-20 bg-secondary">
      <div className="container mx-auto px-5">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
            Get Affordable Options in Minutes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sign up and start reviewing affordable options for providers within minutes!
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-card rounded-2xl p-7 md:p-8 text-center h-full border border-border">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-bold px-4 py-1.5 rounded-full">
                  Step {step.step}
                </div>
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 text-primary mt-4 mb-5 md:mb-6">
                  <step.icon className="h-7 w-7 md:h-8 md:w-8" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">{step.title}</h3>
                <p className="text-base text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 w-full sm:w-auto font-semibold"
            onClick={() => document.getElementById("get-quote")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  )
}
