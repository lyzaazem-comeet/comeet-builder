import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { nanoid } from "nanoid"
import { fetchEventDetails, submitPublishedUrl } from "@/lib/comeet-api"
import { getPublishedSiteUrl, normalizeWebsiteSlug } from "@/lib/domains"

async function resolveWebsiteSlug(
  eventId: string,
  options: {
    eventSubDomain?: string | null
    eventName?: string | null
    existingSlug?: string | null
  },
): Promise<string> {
  const fromSubDomain = options.eventSubDomain
    ? normalizeWebsiteSlug(options.eventSubDomain)
    : ""

  let slug =
    fromSubDomain ||
    (options.existingSlug ? normalizeWebsiteSlug(options.existingSlug) : "") ||
    (options.eventName ? normalizeWebsiteSlug(options.eventName) : "") ||
    nanoid(10).toLowerCase()

  const taken = await prisma.website.findUnique({ where: { slug } })
  if (taken && taken.eventId !== eventId) {
    slug = `${slug}-${nanoid(4).toLowerCase()}`
  }

  return slug
}

// POST /api/publish — full publish sequence
export async function POST(req: Request) {
  try {
    const { eventId, blocks, theme, eventName, eventSubDomain } =
      await req.json()

    if (!eventId) {
      return NextResponse.json(
        { error: "Missing eventId" },
        { status: 400 },
      )
    }

    const existing = await prisma.website.findUnique({
      where: { eventId },
    })

    let subDomain = eventSubDomain
    if (!subDomain) {
      try {
        const eventDetails = await fetchEventDetails(eventId)
        subDomain = eventDetails.event_sub_domain
      } catch (error) {
        console.error("Failed to fetch event details for subdomain:", error)
      }
    }

    const slug = await resolveWebsiteSlug(eventId, {
      eventSubDomain: subDomain,
      eventName,
      existingSlug: existing?.slug,
    })

    const website = await prisma.website.upsert({
      where: { eventId },
      update: {
        name: eventName || existing?.name || "Event Site",
        slug,
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

    const publishedUrl = getPublishedSiteUrl(website.slug)

    try {
      await submitPublishedUrl(eventId, publishedUrl)
    } catch (error) {
      console.error("Failed to notify Comeet API:", error)
    }

    return NextResponse.json({ publishedUrl, slug: website.slug })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
