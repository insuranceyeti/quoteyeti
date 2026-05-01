import { NextResponse } from "next/server"

async function verifyZip(zip: string) {
  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json({ valid: false, error: "Invalid ZIP code format" }, { status: 400 })
  }

  // Use Zippopotam.us API (free, no key required)
  const response = await fetch(`https://api.zippopotam.us/us/${zip}`)
  
  if (!response.ok) {
    return NextResponse.json({ valid: false, error: "Invalid ZIP code" }, { status: 400 })
  }
  
  const data = await response.json()
  
  if (data.places && data.places.length > 0) {
    const place = data.places[0]
    return NextResponse.json({
      valid: true,
      city: place["place name"],
      state: place["state"],
      stateAbbr: place["state abbreviation"],
    })
  }
  
  return NextResponse.json({ valid: false, error: "ZIP code not found" }, { status: 400 })
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const zip = searchParams.get("zip") || ""
    return verifyZip(zip)
  } catch (error) {
    console.error("ZIP verification error:", error)
    return NextResponse.json({ valid: false, error: "Verification failed" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { zip } = await request.json()
    return verifyZip(zip || "")
  } catch (error) {
    console.error("ZIP verification error:", error)
    return NextResponse.json({ valid: false, error: "Verification failed" }, { status: 500 })
  }
}
