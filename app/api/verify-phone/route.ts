import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { phone } = await request.json()
    
    if (!phone) {
      return NextResponse.json({ valid: false, error: "Phone number required" }, { status: 400 })
    }

    // Clean phone number - remove non-digits
    const cleanPhone = phone.replace(/\D/g, "")
    
    // Basic US phone validation (10 digits, valid area code)
    if (cleanPhone.length !== 10) {
      return NextResponse.json({ valid: false, error: "Invalid phone length" })
    }
    
    // Check for invalid area codes (000, 911, etc.)
    const areaCode = cleanPhone.substring(0, 3)
    const invalidAreaCodes = ["000", "111", "911", "555"]
    if (invalidAreaCodes.includes(areaCode) || areaCode.startsWith("0") || areaCode.startsWith("1")) {
      return NextResponse.json({ valid: false, error: "Invalid area code" })
    }

    const apiKey = process.env.NUMVERIFY_API_KEY
    
    // If we have an API key, use NumVerify for additional validation
    if (apiKey) {
      try {
        // NumVerify free tier requires HTTP (not HTTPS)
        const response = await fetch(
          `http://apilayer.net/api/validate?access_key=${apiKey}&number=1${cleanPhone}&country_code=US&format=1`,
          { 
            method: "GET",
            headers: { "Accept": "application/json" }
          }
        )
        
        if (response.ok) {
          const data = await response.json()
          
          // Check if API returned an error
          if (data.error) {
            console.error("NumVerify API error:", data.error)
            // Fall back to basic validation (already passed above)
            return NextResponse.json({ valid: true, carrier: null, lineType: null, source: "basic" })
          }
          
          return NextResponse.json({
            valid: data.valid === true,
            carrier: data.carrier || null,
            lineType: data.line_type || null,
            source: "numverify"
          })
        }
      } catch (apiError) {
        console.error("NumVerify API fetch error:", apiError)
        // Fall back to basic validation
      }
    }
    
    // Fallback: basic validation passed
    return NextResponse.json({ valid: true, carrier: null, lineType: null, source: "basic" })
    
  } catch (error) {
    console.error("Phone verification error:", error)
    return NextResponse.json({ valid: false, error: "Verification failed" }, { status: 500 })
  }
}
