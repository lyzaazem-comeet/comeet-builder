import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { fetchEventDetails } from "@/lib/comeet-api"

// GET /api/event/[eventId] — fetch event details + check DB for existing website
export async function GET(
  req: Request,
  { params }: { params: { eventId: string } },
) {
  const { eventId } = params

  try {
    // Fetch event details from Comeet API
    let eventDetails = null
    try {
      eventDetails = await fetchEventDetails(eventId)
    } catch (error) {
      console.error("Failed to fetch event details from Comeet:", error)
    }
    // Check DB for existing website with this eventId
    const existingWebsite = await prisma.website.findUnique({
      where: { eventId },
      include: { blocks: { orderBy: { position: "asc" } } },
    })

    return NextResponse.json({ eventDetails, existingWebsite })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
