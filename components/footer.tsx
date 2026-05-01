"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { LicensesModal } from "./licenses-modal"

export function Footer() {
  const [isLicensesOpen, setIsLicensesOpen] = useState(false)

  return (
    <>
      <footer className="bg-slate-900 pt-10 md:pt-12 pb-8">
        <div className="container mx-auto px-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-6 pb-6 md:pb-8 border-b border-slate-800">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Insurance Yeti"
                width={140}
                height={38}
                className="h-9 md:h-10"
                style={{ width: 'auto' }}
              />
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-primary transition-colors">
                Terms and Conditions
              </Link>
            </div>
          </div>

          <div className="pt-6 md:pt-8 text-center">
            <p className="text-slate-400 text-sm mb-2">
              7800 Southland Blvd. STE 200, Orlando, FL 32809
            </p>
            <p className="text-slate-500 text-sm mb-5 md:mb-6">
              QuoteYeti. Copyright &copy; 2026. All Rights Reserved.
            </p>
            <div className="max-w-4xl mx-auto text-xs text-slate-300 leading-relaxed">
              <p>
                QuoteYeti is privately owned and operated by Insurance Yeti LLC. Invitations for applications for insurance on quoteyeti.co are made through Insurance Yeti LLC, a subsidiary of Quote Yeti, only where licensed and appointed. Insurance Yeti LLC licensing information can be found <button onClick={() => setIsLicensesOpen(true)} className="text-primary hover:underline">here</button>. Submission of your information constitutes permission for an agent to contact you with additional information about the cost and coverage details of health plans. The appearance of logos related to various insurance providers is not an endorsement nor guarantee of product availability from those providers. Availability is dependent on various details such as geography, individual needs, agency appointments, and carrier relationships.
              </p>
            </div>
          </div>
        </div>
      </footer>
      <LicensesModal isOpen={isLicensesOpen} onClose={() => setIsLicensesOpen(false)} />
    </>
  )
}
