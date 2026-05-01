import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get Your Free Health Insurance Quote",
  description: "Answer a few quick questions to find affordable health insurance plans that fit your needs. Compare options and save on healthcare coverage.",
  openGraph: {
    title: "Get Your Free Health Insurance Quote | Insurance Yeti",
    description: "Answer a few quick questions to find affordable health insurance plans that fit your needs.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
