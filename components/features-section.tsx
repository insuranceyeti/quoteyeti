import { Shield, Award, Users, Star } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Quality Coverage",
    description: "Access top-rated health insurance plans from trusted providers. We only work with reputable carriers to ensure you get quality coverage.",
    stars: true,
  },
  {
    icon: Shield,
    title: "Variety of Plans",
    description: "We offer a variety of health plans to fit your unique needs. Whether you need comprehensive coverage or budget-friendly options, we have you covered.",
  },
  {
    icon: Users,
    title: "Trusted Advisors",
    description: "Our licensed agents have helped 25,000+ families find the right coverage. We're here to guide you every step of the way.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-14 md:py-20 bg-card">
      <div className="container mx-auto px-5">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
            Find Affordable Healthcare Plans
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our goal is to streamline your shopping process by quickly providing you with a range of affordable healthcare options.
          </p>
        </div>

        <div className="grid gap-5 md:gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-secondary/50 rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow border border-border"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 text-primary mb-5 md:mb-6">
                <feature.icon className="h-7 w-7 md:h-8 md:w-8" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">{feature.title}</h3>
              {"stars" in feature && feature.stars && (
                <div className="flex justify-center gap-0.5 mb-3" aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              )}
              <p className="text-base text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
