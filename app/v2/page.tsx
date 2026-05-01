import { headers } from "next/headers"
import { Metadata } from "next"
import { HomeClientV2 } from "@/components/home-client-v2"

// Map of US state codes to full names
const stateNames: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
  DC: "District of Columbia"
}

async function getStateFromHeaders(): Promise<string | null> {
  const headersList = await headers()
  const regionCode = headersList.get("x-vercel-ip-country-region") || ""
  const country = headersList.get("x-vercel-ip-country") || ""
  
  if (country === "US" && regionCode) {
    return stateNames[regionCode] || regionCode
  }
  return null
}

export async function generateMetadata(): Promise<Metadata> {
  const userState = await getStateFromHeaders()
  
  const title = userState 
    ? `Insurance Yeti | Affordable Health Insurance Plans in ${userState}`
    : "Insurance Yeti | Affordable Health Insurance Plans"
  
  const description = userState
    ? `Find affordable healthcare plans in ${userState} with Insurance Yeti. Compare health insurance options and get coverage that fits your needs and budget.`
    : "Find affordable healthcare plans with Insurance Yeti. Compare health insurance options and get coverage that fits your needs and budget."

  return {
    title,
    description,
    keywords: userState 
      ? [`health insurance ${userState}`, `affordable healthcare ${userState}`, "health plans", "medical insurance", "ACA plans", "open enrollment"]
      : ["health insurance", "affordable healthcare", "health plans", "medical insurance", "ACA plans", "open enrollment"],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      siteName: "Insurance Yeti",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function HomeV2() {
  const userState = await getStateFromHeaders()
  return <HomeClientV2 initialState={userState} />
}
