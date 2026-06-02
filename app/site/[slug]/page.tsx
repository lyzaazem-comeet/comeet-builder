import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { PublishedSite } from "@/components/published-site"
import type { Metadata } from "next"
import type { BlockType } from "@/types/blocks"

interface Props {
  params: { slug: string }
  searchParams: { data?: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const website = await prisma.website.findUnique({
    where: { slug: params.slug },
  })

  return {
    title: website?.name || "Event Site",
    description: `${website?.name || "Event"} — powered by Comeet Builder`,
  }
}

export default async function PublishedSitePage({ params, searchParams }: Props) {
  const website = await prisma.website.findUnique({
    where: { slug: params.slug },
    include: { blocks: { orderBy: { position: "asc" } } },
  })

  if (!website || !website.published) {
    notFound()
  }

  const blocks = website.blocks.map((b) => ({
    id: b.id,
    type: b.type as BlockType,
    position: b.position,
    config: b.config as any,
  }))

  const theme = website.theme as any

  return (
    <PublishedSite
      blocks={blocks}
      theme={theme}
      eventId={website.eventId}
      encryptedGuestData={searchParams.data}
    />
  )
}
