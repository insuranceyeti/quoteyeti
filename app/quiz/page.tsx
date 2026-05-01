"use client"

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
    gtag: (...args: unknown[]) => void
  }
}

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { ArrowRight, Check, Loader2 } from "lucide-react"

interface LocationData {
  city: string
  state: string
  stateAbbr: string
}

interface ValidationState {
  isValidating: boolean
  isValid: boolean | null
}

function QuizContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const zipCode = searchParams.get("zip") || ""
  
  // Capture UTM parameters and gclid
  const utmParams = {
    utm_source: searchParams.get("utm_source") || "",
    utm_medium: searchParams.get("utm_medium") || "",
    utm_campaign: searchParams.get("utm_campaign") || "",
    utm_content: searchParams.get("utm_content") || "",
    utm_term: searchParams.get("utm_term") || "",
    gclid: searchParams.get("gclid") || "",
  }
  
  const [currentStep, setCurrentStep] = useState(0)
  const [location, setLocation] = useState<LocationData | null>(null)
  
  // Validation states
  const [zipValidation, setZipValidation] = useState<ValidationState>({ isValidating: false, isValid: null })
  const [emailValidation, setEmailValidation] = useState<ValidationState>({ isValidating: false, isValid: null })
  const [phoneValidation, setPhoneValidation] = useState<ValidationState>({ isValidating: false, isValid: null })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [trustedFormCertUrl, setTrustedFormCertUrl] = useState<string>("")
  
  // Form data
  const [formData, setFormData] = useState({
    insured: "",
    peopleCount: "",
    coverageStart: "",
    firstName: "",
    lastName: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    gender: "",
    income: "",
    reason: "",
    email: "",
    phone: "",
  })

  const totalSteps = 7
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const currentYear = 2026
  // Start from 18 years ago (minimum age 18)
  const years = Array.from({ length: 82 }, (_, i) => currentYear - 18 - i)

  // Load TrustedForm script
  useEffect(() => {
    // Load TrustedForm script
    const script = document.createElement("script")
    script.src = "https://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&ping_field=xxTrustedFormPingUrl&l=" + new Date().getTime() + Math.random()
    script.async = true
    document.body.appendChild(script)

    // Poll for certificate URL from the hidden input inside the form
    const checkCert = setInterval(() => {
      const certField = document.getElementById("xxTrustedFormCertUrl") as HTMLInputElement
      if (certField && certField.value) {
        setTrustedFormCertUrl(certField.value)
        clearInterval(checkCert)
      }
    }, 500)

    return () => {
      clearInterval(checkCert)
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  // Verify ZIP code on mount and get location from ZIP (not IP)
  useEffect(() => {
    if (zipCode) {
      verifyZipCode(zipCode)
    }
  }, [zipCode])

  const verifyZipCode = async (zip: string) => {
    setZipValidation({ isValidating: true, isValid: null })
    try {
      const response = await fetch("/api/verify-zip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zip }),
      })
      const data = await response.json()
      if (data.valid) {
        setLocation({
          city: data.city,
          state: data.state,
          stateAbbr: data.stateAbbr,
        })
        setZipValidation({ isValidating: false, isValid: true })
        document.title = `Get Your ${data.state} Health Plan Quote | Insurance Yeti`
      } else {
        setZipValidation({ isValidating: false, isValid: false })
      }
    } catch {
      setZipValidation({ isValidating: false, isValid: false })
    }
  }

  // Email validation with regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (email: string) => {
    setFormData(prev => ({ ...prev, email }))
    if (email.length > 5) {
      const isValid = validateEmail(email)
      if (isValid) {
        setEmailValidation({ isValidating: true, isValid: null })
        setTimeout(() => {
          setEmailValidation({ isValidating: false, isValid: true })
        }, 500)
      } else {
        setEmailValidation({ isValidating: false, isValid: false })
      }
    } else {
      setEmailValidation({ isValidating: false, isValid: null })
    }
  }

  // Phone verification with NumVerify API
  const verifyPhone = async (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "")
    if (cleanPhone.length < 10) {
      setPhoneValidation({ isValidating: false, isValid: null })
      return
    }
    
    setPhoneValidation({ isValidating: true, isValid: null })
    try {
      const response = await fetch("/api/verify-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone }),
      })
      const data = await response.json()
      setPhoneValidation({ isValidating: false, isValid: data.valid })
    } catch {
      setPhoneValidation({ isValidating: false, isValid: false })
    }
  }

  const handlePhoneChange = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "")
    let formatted = cleaned
    if (cleaned.length >= 6) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
    } else if (cleaned.length >= 3) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
    }
    setFormData(prev => ({ ...prev, phone: formatted }))
    
    if (cleaned.length === 10) {
      verifyPhone(cleaned)
    } else {
      setPhoneValidation({ isValidating: false, isValid: null })
    }
  }

  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleOptionSelect = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    setTimeout(() => {
      setCurrentStep(currentStep + 1)
    }, 250)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleNext = async () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit to webhook
      setIsSubmitting(true)
      try {
        const payload = {
          ...formData,
          zipCode,
          city: location?.city || "",
          state: location?.state || "",
          stateAbbr: location?.stateAbbr || "",
          dateOfBirth: `${formData.birthMonth} ${formData.birthDay}, ${formData.birthYear}`,
          trustedFormCertUrl: trustedFormCertUrl || "",
          submittedAt: new Date().toISOString(),
          // UTM parameters for tracking
          utm_source: utmParams.utm_source,
          utm_medium: utmParams.utm_medium,
          utm_campaign: utmParams.utm_campaign,
          utm_content: utmParams.utm_content,
          utm_term: utmParams.utm_term,
          gclid: utmParams.gclid,
        }
        
        await fetch("https://services.leadconnectorhq.com/hooks/OVhPioOHTTulrFmc8BIO/webhook-trigger/b6d436e5-7e53-42bf-a0f5-65ec3ab3c7d0", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        // Fire Google Ads conversion with Enhanced Conversions data via dataLayer
        // Only fire if income is NOT "Under $30,000"
        if (typeof window !== "undefined" && formData.income !== "Under $30,000") {
          // Normalize data for Enhanced Conversions
          const normalizedPhone = "+1" + formData.phone.replace(/\D/g, "") // E.164 format
          const normalizedEmail = formData.email.toLowerCase().trim()
          
          // Push enhanced conversion data to dataLayer FIRST
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({
            event: "enhanced_conversion_data",
            enhanced_conversion_data: {
              email: normalizedEmail,
              phone_number: normalizedPhone,
              first_name: formData.firstName.toLowerCase().trim(),
              last_name: formData.lastName.toLowerCase().trim(),
              home_address: {
                city: (location?.city || "").toLowerCase().trim(),
                region: location?.stateAbbr || "",
                postal_code: zipCode,
                country: "US",
              },
            },
          })
          
          // Then fire the conversion event with user_data included
          if (typeof window.gtag === "function") {
            window.gtag("event", "conversion", {
              send_to: "AW-16832077746/ZrSECP_IusIbELK_lNo-",
              user_data: {
                email: normalizedEmail,
                phone_number: normalizedPhone,
                address: {
                  first_name: formData.firstName.toLowerCase().trim(),
                  last_name: formData.lastName.toLowerCase().trim(),
                  city: (location?.city || "").toLowerCase().trim(),
                  region: location?.stateAbbr || "",
                  postal_code: zipCode,
                  country: "US",
                },
              },
            })
          }
        }
      } catch (error) {
        console.error("Webhook submission error:", error)
      }
      setIsSubmitting(false)
      router.push(`/quiz/thank-you?zip=${zipCode}&name=${formData.firstName}`)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.insured !== ""
      case 1: return formData.peopleCount !== ""
      case 2: return formData.coverageStart !== ""
      case 3: return formData.firstName !== "" && formData.lastName !== ""
      case 4: return formData.birthMonth !== "" && formData.birthDay !== "" && formData.birthYear !== "" && formData.gender !== ""
      case 5: return formData.income !== "" && formData.reason !== ""
      case 6: return formData.email !== "" && formData.phone !== "" && emailValidation.isValid === true && phoneValidation.isValid === true
      default: return false
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-14 md:h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Insurance Yeti"
                width={130}
                height={36}
                className="h-8 md:h-10"
                style={{ width: 'auto' }}
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 shrink-0">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-5 py-8 md:py-10">
        <form 
          id="quiz-form"
          className="w-full max-w-md text-center min-h-[380px] flex flex-col justify-center"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* TrustedForm hidden fields */}
          <input type="hidden" id="xxTrustedFormCertUrl" name="xxTrustedFormCertUrl" />
          <input type="hidden" id="xxTrustedFormPingUrl" name="xxTrustedFormPingUrl" />
          
          {/* Step 0: Currently Insured */}
          {currentStep === 0 && (
            <div className="animate-in fade-in duration-300">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                {"You're"} minutes away from saving on healthcare coverage!
              </h1>
              {zipValidation.isValidating ? (
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Finding your location...</span>
                </div>
              ) : location ? (
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6 text-sm animate-in fade-in duration-500">
                  <span>Finding plans in <span className="font-semibold text-foreground">{location.city}, {location.stateAbbr}</span></span>
                  <Check className="h-4 w-4 text-green-500 animate-in zoom-in duration-300" />
                </div>
              ) : (
                <div className="mb-6" />
              )}
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-5">
                Are you currently insured?
              </h2>
              <div className="flex justify-center gap-4">
                {["Yes", "No"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect("insured", option)}
                    className={`px-10 py-4 rounded-xl border-2 transition-all text-lg font-semibold ${
                      formData.insured === option
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: How many people */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
                How many people are you covering?
              </h1>
              <div className="flex justify-center gap-4">
                {["1", "2", "3+"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect("peopleCount", option)}
                    className={`px-8 py-4 rounded-xl border-2 transition-all text-xl font-semibold ${
                      formData.peopleCount === option
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Coverage start */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
                When do you want your coverage to start?
              </h1>
              <div className="flex flex-col gap-3">
                {["Today", "Within a Month", "Just Shopping"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect("coverageStart", option)}
                    className={`w-full px-6 py-4 rounded-xl border-2 transition-all text-lg font-semibold ${
                      formData.coverageStart === option
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Name */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                Who is this plan for?
              </h1>
              <div className="flex flex-col gap-4 mb-6">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border-2 border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border-2 border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                />
              </div>
              <Button onClick={handleNext} disabled={!canProceed()} size="lg" className="w-full gap-2 py-6 text-lg">
                Next <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Step 4: DOB & Gender */}
          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 leading-tight">
                Hello, {formData.firstName}!
              </h1>
              <p className="text-muted-foreground mb-4 text-base">
                Finish your profile before viewing your options.
              </p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 text-left font-medium">Date of Birth</label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={formData.birthMonth}
                      onChange={(e) => handleInputChange("birthMonth", e.target.value)}
                      className="px-3 py-3 rounded-xl border-2 border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Month</option>
                      {months.map((month) => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <select
                      value={formData.birthDay}
                      onChange={(e) => handleInputChange("birthDay", e.target.value)}
                      className="px-3 py-3 rounded-xl border-2 border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Day</option>
                      {days.map((day) => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                    <select
                      value={formData.birthYear}
                      onChange={(e) => handleInputChange("birthYear", e.target.value)}
                      className="px-3 py-3 rounded-xl border-2 border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 text-left font-medium">Gender</label>
                  <div className="flex gap-3">
                    {["Male", "Female"].map((option) => (
                      <button
                        key={option}
                        onClick={() => handleInputChange("gender", option)}
                        className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all text-base font-semibold ${
                          formData.gender === option
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card text-foreground hover:border-primary/50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Button onClick={handleNext} disabled={!canProceed()} size="lg" className="w-full gap-2 py-6 text-lg">
                Next <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Step 5: Income & Reason */}
          {currentStep === 5 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
                {"You're"} just moments away from discovering affordable options
                {location && <> in <span className="text-primary">{location.city}, {location.stateAbbr}</span></>}!
              </h1>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 text-left font-medium">Household Income</label>
                  <select
                    value={formData.income}
                    onChange={(e) => handleInputChange("income", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select income range</option>
                    <option value="Under $30,000">Under $30,000</option>
                    <option value="$30,000 - $60,000">$30,000 - $60,000</option>
                    <option value="$60,000 - $100,000">$60,000 - $100,000</option>
                    <option value="Over $100,000">Over $100,000</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 text-left font-medium">Reason for Shopping</label>
                  <select
                    value={formData.reason}
                    onChange={(e) => handleInputChange("reason", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select reason</option>
                    <option value="Find a new plan">Find a new plan</option>
                    <option value="Save money">Save money</option>
                    <option value="Improve benefits">Improve benefits</option>
                    <option value="Just shopping">Just shopping</option>
                  </select>
                </div>
              </div>
              <Button onClick={handleNext} disabled={!canProceed()} size="lg" className="w-full gap-2 py-6 text-lg">
                Next <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Step 6: Contact Info */}
          {currentStep === 6 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 leading-tight">
                Congratulations {formData.firstName}!
              </h1>
              <p className="text-primary text-lg font-semibold mb-2">Your Health Quote is Ready!</p>
              <p className="text-muted-foreground mb-5 text-sm">
                Enter your information below to explore your options now.
              </p>
              
              <div className="space-y-4 mb-5">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={`w-full px-4 py-4 pr-12 rounded-xl border-2 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base transition-colors ${
                      emailValidation.isValid === false ? "border-red-400" : emailValidation.isValid === true ? "border-green-400" : "border-border"
                    }`}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {emailValidation.isValidating && (
                      <Loader2 className="h-5 w-5 text-primary animate-spin" />
                    )}
                    {emailValidation.isValid === true && (
                      <div className="animate-in zoom-in duration-200">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    maxLength={14}
                    className={`w-full px-4 py-4 pr-12 rounded-xl border-2 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base transition-colors ${
                      phoneValidation.isValid === false ? "border-red-400" : phoneValidation.isValid === true ? "border-green-400" : "border-border"
                    }`}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {phoneValidation.isValidating && (
                      <Loader2 className="h-5 w-5 text-primary animate-spin" />
                    )}
                    {phoneValidation.isValid === true && (
                      <div className="animate-in zoom-in duration-200">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                    {phoneValidation.isValid === false && (
                      <span className="text-xs text-red-500 font-medium">Invalid</span>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-[7px] text-muted-foreground mb-5 text-left leading-relaxed">
                By entering and submitting a telephone number, email and other information and clicking Submit, you represent that you are at least 18 years old, you provide your electronic signature expressly consenting and authorizing us to share the information you provided with Insurance Yeti LLC, and one or more of our{" "}
                <a href="https://americachoicenetwork.co/partners-5370-page" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">network of advertisers</a>
                {" "}and parties calling on their behalf, so they may process and respond to your request and contact you for marketing/telemarketing purposes at the number and email address you provided above, including your wireless number if provided, using live operators, automated telephone dialing systems, prerecorded, artificial and/or AI generative voice, text messages and/or emails, even if the number you provide is on a state, internal or Federal Do Not Call registry. You also agree to our{" "}
                <Link href="/terms" className="text-primary underline hover:text-primary/80">Terms of Use</Link>
                {" "}and you expressly consent to your information being used and disclosed as described in our{" "}
                <Link href="/privacy" className="text-primary underline hover:text-primary/80">Privacy Policy</Link>
                . Message and Data rates may apply. You are not required to consent as a condition of purchasing goods or services and may revoke consent at any time.
              </p>
              <Button onClick={handleNext} disabled={!canProceed() || isSubmitting} size="lg" className="w-full gap-2 py-6 text-lg">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Get My Quote <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          )}

        </form>
      </main>

      {/* Trust Badges */}
      <div className="bg-white py-4 md:py-6 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-6 md:gap-10 flex-wrap">
            <Image
              src="/badges/trustedform.png"
              alt="TrustedForm"
              width={140}
              height={40}
              className="h-6 md:h-8 w-auto"
            />
            <Image
              src="/badges/trustpilot.png"
              alt="Trustpilot"
              width={100}
              height={30}
              className="h-5 md:h-6 w-auto"
            />
            <Image
              src="/badges/ssl-secure.png"
              alt="Secure SSL Encryption"
              width={100}
              height={40}
              className="h-6 md:h-8 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <QuizContent />
    </Suspense>
  )
}
