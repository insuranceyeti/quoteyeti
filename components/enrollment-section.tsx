import { Calendar, Info } from "lucide-react"

export function EnrollmentSection() {
  return (
    <section id="enrollment" className="py-14 md:py-20 bg-card">
      <div className="container mx-auto px-5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 rounded-2xl md:rounded-3xl p-7 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-primary" />
            
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/20 text-primary mb-5 md:mb-6">
              <Calendar className="h-7 w-7 md:h-8 md:w-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-5 md:mb-6 leading-tight">
              Open Enrollment &amp; The Affordable Care Act
            </h2>

            <div className="space-y-4 text-base text-slate-300">
              <p>
                The Open Enrollment period starts <strong className="text-primary">November 1st</strong> and ends on <strong className="text-primary">December 15th</strong>. During Open Enrollment, you can sign up for affordable health care plan options that may be available through the Health Insurance Marketplace.
              </p>
              <p>
                Outside of Open Enrollment, you typically must qualify for a special enrollment period in order to enroll. Find out more by visiting{" "}
                <a href="https://www.healthcare.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  healthcare.gov
                </a>{" "}
                or speaking to one of our licensed agents.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-400">
              <div className="flex items-center justify-center gap-2">
                <Info className="h-4 w-4 text-primary shrink-0" />
                <span>Marketplace Plans Available</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Info className="h-4 w-4 text-primary shrink-0" />
                <span>Subsidies May Apply</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Info className="h-4 w-4 text-primary shrink-0" />
                <span>Special Enrollment Exceptions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
