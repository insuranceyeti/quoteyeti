import { HeroSectionV2 } from "@/components/hero-section-v2"
import { FeaturesSection } from "@/components/features-section"
import { StepsSection } from "@/components/steps-section"
import { EnrollmentSection } from "@/components/enrollment-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

interface HomeClientV2Props {
  initialState: string | null
}

export function HomeClientV2({ initialState }: HomeClientV2Props) {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSectionV2 initialState={initialState} />
      <FeaturesSection />
      <StepsSection />
      <EnrollmentSection />
      <CTASection />
      <Footer />
    </main>
  )
}
