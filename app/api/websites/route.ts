import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { nanoid } from "nanoid"

// POST /api/websites -> create or update website with blocks (upsert by eventId)
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      eventId,
      name,
      theme,
      blocks,
      templateId,
      published = false,
    } = body

    if (!eventId) {
      return NextResponse.json(
        { error: "Missing eventId" },
        { status: 400 }
      )
    }

    // Check if website already exists for this event
    const existing = await prisma.website.findUnique({
      where: { eventId },
    })

    const slug = existing?.slug || nanoid(10)

    const upserted = await prisma.website.upsert({
      where: { eventId },
      update: {
        name: name || existing?.name || "Untitled",
        theme,
        templateId,
        published,
        publishedAt: published ? new Date() : existing?.publishedAt,
        blocks: {
          deleteMany: {},
          create: (blocks || []).map((b: any) => ({
            type: b.type,
            position: b.position,
            config: b.config,
          })),
        },
      },
      create: {
        eventId,
        name: name || "Untitled",
        slug,
        theme,
        templateId,
        published,
        publishedAt: published ? new Date() : null,
        blocks: {
          create: (blocks || []).map((b: any) => ({
            type: b.type,
            position: b.position,
            config: b.config,
          })),
        },
      },
      include: { blocks: true },
    })

    return NextResponse.json(upserted)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// GET /api/websites?slug=...&eventId=... -> load website by slug or eventId
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("slug")
  const eventId = searchParams.get("eventId")

  if (!slug && !eventId) {
    return NextResponse.json(
      { error: "Missing slug or eventId" },
      { status: 400 }
    )
  }

  try {
    const website = await prisma.website.findUnique({
      where: slug ? { slug } : { eventId: eventId! },
      include: {
        blocks: { orderBy: { position: "asc" } },
        template: true,
      },
    })

    if (!website) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json(website)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
