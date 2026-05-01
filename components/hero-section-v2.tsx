"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Lock, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionV2Props {
  initialState: string | null
}

interface ZipValidation {
  isValidating: boolean
  isValid: boolean | null
  city?: string
  state?: string
}

export function HeroSectionV2({ initialState }: HeroSectionV2Props) {
  const router = useRouter()
  const [state, setState] = useState<string | null>(initialState)
  const [zipCode, setZipCode] = useState("")
  const [zipError, setZipError] = useState("")
  const [zipValidation, setZipValidation] = useState<ZipValidation>({ isValidating: false, isValid: null })

  // Fallback to client-side geolocation if SSR didn't provide state
  useEffect(() => {
    if (!initialState) {
      const detectState = async () => {
        try {
          const response = await fetch("https://ipapi.co/json/")
          const data = await response.json()
          if (data.region) {
            setState(data.region)
          }
        } catch {
          // Silently fail
        }
      }
      detectState()
    }
  }, [initialState])

  // Update document title dynamically when state is available
  useEffect(() => {
    if (state) {
      document.title = `Insurance Yeti | Affordable Health Insurance Plans in ${state}`
    }
  }, [state])

  // Verify ZIP code via API
  const verifyZipCode = useCallback(async (zip: string) => {
    if (zip.length !== 5) {
      setZipValidation({ isValidating: false, isValid: null })
      return
    }

    setZipValidation({ isValidating: true, isValid: null })
    
    try {
      const response = await fetch(`/api/verify-zip?zip=${zip}`)
      const data = await response.json()
      
      if (data.valid && data.city && data.state) {
        setZipValidation({ 
          isValidating: false, 
          isValid: true, 
          city: data.city, 
          state: data.state 
        })
        setZipError("")
        setState(data.state)
      } else {
        setZipValidation({ isValidating: false, isValid: false })
        setZipError("Invalid Zip Code")
      }
    } catch {
      setZipValidation({ isValidating: false, isValid: false })
      setZipError("Invalid Zip Code")
    }
  }, [])

  // Debounced ZIP verification
  useEffect(() => {
    if (zipCode.length === 5) {
      const timer = setTimeout(() => {
        verifyZipCode(zipCode)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setZipValidation({ isValidating: false, isValid: null })
    }
  }, [zipCode, verifyZipCode])

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!/^\d{5}$/.test(zipCode)) {
      setZipError("Invalid Zip Code")
      return
    }
    
    if (zipValidation.isValid === false) {
      setZipError("Invalid Zip Code")
      return
    }
    
    setZipError("")
    router.push(`/quizv2?zip=${zipCode}`)
  }

  return (
    <section className="relative min-h-screen flex items-center bg-slate-900 pt-20 pb-8 md:pt-24 md:pb-12" id="get-quote">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-1/4 -left-10 w-48 h-48 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-10 w-48 h-48 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {state ? `${state} Plans` : "Health Plans"} — Available!
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 md:mb-10 leading-tight">
            Compare Affordable Health Plans{state ? ` in ${state}` : ""}!
          </h1>

          {/* ZIP Code Form */}
          <div className="max-w-sm mx-auto w-full px-2">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-200 mb-5">
              What is your ZIP Code?
            </h2>
            <form onSubmit={handleZipSubmit} className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={5}
                  value={zipCode}
                  onChange={(e) => {
                    setZipCode(e.target.value.replace(/\D/g, ""))
                    setZipError("")
                  }}
                  placeholder="ZIP Code"
                  className={`w-full pl-12 pr-12 py-4 text-center text-lg font-medium border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-slate-900 placeholder:text-slate-400 transition-colors ${
                    zipValidation.isValid === true ? "border-green-500" : 
                    zipValidation.isValid === false ? "border-red-500" : "border-slate-200"
                  }`}
                  aria-label="ZIP Code"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {zipValidation.isValidating ? (
                    <Loader2 className="h-5 w-5 text-primary animate-spin" />
                  ) : zipValidation.isValid === true ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Lock className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </div>
              {zipError && (
                <p className="text-red-400 text-sm text-center">{zipError}</p>
              )}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full text-lg py-6 font-semibold"
                disabled={zipValidation.isValidating || zipCode.length !== 5 || zipValidation.isValid === false}
              >
                {zipValidation.isValidating ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "FIND PLANS"
                )}
              </Button>
            </form>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto text-center">
            <div className="flex flex-col items-center gap-1.5">
              <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-slate-300">Free Consultation</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-slate-300">Licensed Agents</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-slate-300">No Obligation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
