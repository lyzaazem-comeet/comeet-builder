import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/templates -> list curated templates
export async function GET() {
  try {
    const templates = await prisma.template.findMany({
      include: { blocks: { orderBy: { position: "asc" } } },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(templates)
  } catch (e: any) {
    console.log(e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// POST /api/templates -> create a template with blocks
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, description, thumbnail, theme, blocks } = body

    if (!name || !Array.isArray(blocks)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    const created = await prisma.template.create({
      data: {
        name,
        description,
        thumbnail,
        theme,
        blocks: {
          create: blocks.map((b: any, idx: number) => ({
            type: b.type,
            position: b.position ?? idx,
            config: b.config ?? {},
          })),
        },
      },
      include: { blocks: true },
    })

    return NextResponse.json(created, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
