"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

interface LicensesModalProps {
  isOpen: boolean
  onClose: () => void
}

const licenses = [
  { state: "Arizona", license: "3004131098" },
  { state: "Arkansas", license: "3004129213" },
  { state: "Delaware", license: "3004089957" },
  { state: "Florida", license: "L134629" },
  { state: "Indiana", license: "4207425" },
  { state: "Iowa", license: "3004097291" },
  { state: "Kansas", license: "3004113645" },
  { state: "Louisiana", license: "1260065" },
  { state: "Michigan", license: "159424" },
  { state: "Missouri", license: "3004091247" },
  { state: "Montana", license: "3004096762" },
  { state: "Ohio", license: "1724261" },
  { state: "Oklahoma", license: "3004074067" },
  { state: "South Carolina", license: "3004075283" },
  { state: "Tennessee", license: "3004097454" },
  { state: "Texas", license: "3458442" },
  { state: "Utah", license: "1107312" },
  { state: "West Virginia", license: "3004106661" },
  { state: "Wisconsin", license: "3004149835" },
]

export function LicensesModal({ isOpen, onClose }: LicensesModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-lg shadow-2xl w-full max-w-2xl max-h-[85vh] md:max-h-[80vh] mx-2 md:mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-border">
          <h2 className="text-lg md:text-xl font-semibold text-card-foreground">Health Insurance Licenses</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        <div className="overflow-auto max-h-[calc(85vh-70px)] md:max-h-[calc(80vh-80px)]">
          <table className="w-full">
            <thead className="bg-muted sticky top-0">
              <tr>
                <th className="text-left py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-muted-foreground">State</th>
                <th className="text-left py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-semibold text-muted-foreground">License #</th>
              </tr>
            </thead>
            <tbody>
              {licenses.map((item, index) => (
                <tr key={item.state} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                  <td className="py-2 px-3 md:py-3 md:px-4 text-sm md:text-base text-card-foreground">{item.state}</td>
                  <td className="py-2 px-3 md:py-3 md:px-4 text-sm md:text-base text-card-foreground font-mono">{item.license}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
