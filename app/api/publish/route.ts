import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { nanoid } from "nanoid"
import { submitPublishedUrl } from "@/lib/comeet-api"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, "") // Trim hyphens
    .slice(0, 60) // Limit length
}

// POST /api/publish — full publish sequence
export async function POST(req: Request) {
  try {
    const { eventId, blocks, theme, eventName } = await req.json()

    if (!eventId) {
      return NextResponse.json(
        { error: "Missing eventId" },
        { status: 400 }
      )
    }

    // Check if website already exists
    const existing = await prisma.website.findUnique({
      where: { eventId },
    })

    // Use event name as slug, fallback to nanoid
    let slug = existing?.slug || ""
    if (!slug) {
      const baseSlug = eventName ? slugify(eventName) : nanoid(10)
      // Check uniqueness
      const taken = await prisma.website.findUnique({ where: { slug: baseSlug } })
      slug = taken ? `${baseSlug}-${nanoid(4)}` : baseSlug
    }

    // Save to DB with published = true
    const website = await prisma.website.upsert({
      where: { eventId },
      update: {
        name: eventName || existing?.name || "Event Site",
        theme,
        published: true,
        publishedAt: new Date(),
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
        name: eventName || "Event Site",
        slug,
        theme,
        published: true,
        publishedAt: new Date(),
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

    // Build the published URL
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
    const publishedUrl = `${appUrl}/site/${slug}`

    // Notify Comeet API
    try {
      await submitPublishedUrl(eventId, publishedUrl)
    } catch (error) {
      console.error("Failed to notify Comeet API:", error)
      // Don't fail the whole publish if Comeet notification fails
    }

    return NextResponse.json({ publishedUrl, slug })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
