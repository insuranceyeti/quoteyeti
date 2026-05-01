import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { StepsSection } from "@/components/steps-section"
import { EnrollmentSection } from "@/components/enrollment-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

interface HomeClientProps {
  initialState: string | null
}

export function HomeClient({ initialState }: HomeClientProps) {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection initialState={initialState} />
      <FeaturesSection />
      <StepsSection />
      <EnrollmentSection />
      <CTASection />
      <Footer />
    </main>
  )
}
