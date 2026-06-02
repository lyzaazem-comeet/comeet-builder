import { NextResponse } from "next/server"
import { submitRSVP } from "@/lib/comeet-api"

// POST /api/rsvp — proxies Comeet RSVP submission
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = await submitRSVP(body)
    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
