import { NextResponse } from "next/server"
import { decryptGuestData } from "@/lib/comeet-api"

// POST /api/decrypt — proxies Comeet decrypt API
export async function POST(req: Request) {
  try {
    const { data } = await req.json()

    if (!data) {
      return NextResponse.json(
        { error: "Missing data parameter" },
        { status: 400 },
      )
    }

    const result = await decryptGuestData(data)
    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
